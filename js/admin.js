// ═══════════════════════════════════════════════════════
// CLENTIS PHARMACEUTICAL — Admin Panel Logic
// Medicine CRUD + PDF Upload
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
  // State
  let editingId = null;
  let searchQuery = '';
  let filterSegment = 'all';

  // DOM
  const tableBody = document.getElementById('medicine-table-body');
  const searchInput = document.getElementById('admin-search');
  const segmentFilter = document.getElementById('segment-filter');
  const totalCount = document.getElementById('total-count');
  const modalOverlay = document.getElementById('medicine-modal');
  const modalTitle = document.getElementById('modal-title');
  const medicineForm = document.getElementById('medicine-form');

  // Init
  const synced = await initClentisData();
  renderTable();
  populateSegmentFilter();
  showToast(synced ? 'Connected to shared Supabase database' : 'Using local browser storage. Run Supabase setup SQL to enable sharing.', synced ? 'success' : 'error');

  // ── Search & Filter ─────────────────────────────────

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTable();
  });

  segmentFilter.addEventListener('change', (e) => {
    filterSegment = e.target.value;
    renderTable();
  });

  // ── Render Table ────────────────────────────────────

  function renderTable() {
    const medicines = getMedicines();
    let filtered = medicines;

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.brand.toLowerCase().includes(searchQuery) ||
        m.composition.toLowerCase().includes(searchQuery)
      );
    }

    if (filterSegment !== 'all') {
      filtered = filtered.filter(m => m.segment === filterSegment);
    }

    totalCount.textContent = `${filtered.length} of ${medicines.length}`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;padding:40px;color:var(--clr-text-muted);">
            No medicines found
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(m => `
      <tr>
        <td style="font-weight:600;color:var(--clr-text-secondary);font-size:0.75rem;">${m.id}</td>
        <td style="font-weight:700;color:var(--clr-primary-300);">${m.brand}</td>
        <td style="max-width:280px;font-size:0.8rem;color:var(--clr-text-secondary);">${m.composition}</td>
        <td><span class="segment-badge">${m.segment}</span></td>
        <td style="font-size:0.8rem;">${m.packing}</td>
        <td style="font-weight:600;">₹${m.mrp}</td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="editMedicine(${m.id})" title="Edit">✏️</button>
            <button class="btn btn-ghost btn-sm" onclick="deleteMedicine(${m.id})" title="Delete">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function populateSegmentFilter() {
    const medicines = getMedicines();
    const segments = [...new Set(medicines.map(m => m.segment))].sort();
    let html = '<option value="all">All Segments</option>';
    segments.forEach(s => {
      html += `<option value="${s}">${s}</option>`;
    });
    segmentFilter.innerHTML = html;
  }

  // ── Add / Edit Medicine ─────────────────────────────

  window.openAddModal = function() {
    editingId = null;
    modalTitle.textContent = 'Add New Medicine';
    medicineForm.reset();
    openModal();
  };

  window.editMedicine = function(id) {
    const medicines = getMedicines();
    const med = medicines.find(m => m.id === id);
    if (!med) return;

    editingId = id;
    modalTitle.textContent = 'Edit Medicine';
    
    document.getElementById('med-brand').value = med.brand;
    document.getElementById('med-composition').value = med.composition;
    document.getElementById('med-segment').value = med.segment;
    document.getElementById('med-packing').value = med.packing;
    document.getElementById('med-mrp').value = med.mrp;

    openModal();
  };

  window.saveMedicine = async function() {
    const brand = document.getElementById('med-brand').value.trim();
    const composition = document.getElementById('med-composition').value.trim();
    const segment = document.getElementById('med-segment').value.trim();
    const packing = document.getElementById('med-packing').value.trim();
    const mrp = document.getElementById('med-mrp').value.trim();

    if (!brand || !composition || !segment) {
      showToast('Please fill in Brand Name, Composition, and Segment', 'error');
      return;
    }

    let medicines = getMedicines();

    const wasEditing = Boolean(editingId);

    try {
      if (wasEditing) {
        // Update
        const idx = medicines.findIndex(m => m.id === editingId);
        if (idx > -1) {
          medicines[idx] = { ...medicines[idx], brand, composition, segment, packing, mrp };
        }
      } else {
        // Add new
        const newMed = {
          id: getNextId(),
          brand,
          composition,
          segment,
          packing: packing || '-',
          mrp: mrp || '-'
        };
        medicines.push(newMed);
      }

      await saveMedicines(medicines);
      closeModal();
      renderTable();
      populateSegmentFilter();
      showToast(wasEditing ? `${brand} updated successfully` : `${brand} added successfully`, 'success');
    } catch (error) {
      console.error(error);
      showToast('Could not save medicine to Supabase', 'error');
    }
  };

  // ── Delete Medicine ─────────────────────────────────

  window.deleteMedicine = async function(id) {
    const medicines = getMedicines();
    const med = medicines.find(m => m.id === id);
    if (!med) return;

    if (!confirm(`Delete "${med.brand}"? This action cannot be undone.`)) return;

    try {
      await deleteMedicineById(id);
      renderTable();
      populateSegmentFilter();
      showToast(`${med.brand} deleted`, 'success');
    } catch (error) {
      console.error(error);
      showToast('Could not delete medicine from Supabase', 'error');
    }
  };

  // ── Reset to Default ────────────────────────────────

  window.resetToDefault = async function() {
    if (!confirm('Reset all medicines to the original Clentis price list? Any custom additions will be lost.')) return;
    try {
      await resetMedicinesToDefault();
      renderTable();
      populateSegmentFilter();
      showToast('Medicine list reset to default', 'success');
    } catch (error) {
      console.error(error);
      showToast('Could not reset medicines in Supabase', 'error');
    }
  };

  // ── PDF Upload ──────────────────────────────────────

  window.triggerPdfUpload = function() {
    document.getElementById('pdf-upload').click();
  };

  document.getElementById('pdf-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showToast('Please upload a PDF file', 'error');
      return;
    }

    showToast('PDF parsing is available in the full version. Please use manual entry or contact support.', 'error');
    e.target.value = '';
  });

  // ── Export Data ─────────────────────────────────────

  window.exportData = function() {
    const medicines = getMedicines();
    const csv = [
      ['ID', 'Brand Name', 'Composition', 'Segment', 'Packing', 'MRP'].join(','),
      ...medicines.map(m => [
        m.id,
        `"${m.brand}"`,
        `"${m.composition}"`,
        `"${m.segment}"`,
        `"${m.packing}"`,
        m.mrp
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clentis_medicines_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Medicine list exported as CSV', 'success');
  };

  // ── Modal Helpers ───────────────────────────────────

  function openModal() {
    modalOverlay.classList.add('open');
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    editingId = null;
  }

  window.closeModal = closeModal;

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Toast ───────────────────────────────────────────

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : '⚠️'}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  window.showToast = showToast;
});
