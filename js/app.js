// ═══════════════════════════════════════════════════════
// CLENTIS PHARMACEUTICAL — PCD Marketing Template Builder
// Main Application Logic
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
  // State
  let selectedMedicines = [];
  let dropdownOpen = false;
  let searchQuery = '';

  // DOM Elements
  const doctorInput = document.getElementById('doctor-name');
  const searchInput = document.getElementById('medicine-search');
  const multiSelectTrigger = document.getElementById('multi-select-trigger');
  const dropdown = document.getElementById('medicine-dropdown');
  const selectedPillsContainer = document.getElementById('selected-pills');
  const selectionCounter = document.getElementById('selection-counter');
  const selectionCount = document.getElementById('selection-count');
  const previewArea = document.getElementById('template-preview');
  const presetList = document.getElementById('preset-list');
  const showMrpToggle = document.getElementById('show-mrp');

  // ── Initialize ──────────────────────────────────────
  const synced = await initClentisData();
  renderDropdown();
  renderPresets();
  updatePreview();
  showToast(synced ? 'Connected to shared Supabase database' : 'Using local browser storage. Run Supabase setup SQL to enable sharing.', synced ? 'success' : 'error');

  // ── Multi-Select Dropdown ───────────────────────────

  searchInput.addEventListener('focus', () => openDropdown());
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderDropdown();
    openDropdown();
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!multiSelectTrigger.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Click on trigger area opens dropdown
  multiSelectTrigger.addEventListener('click', (e) => {
    if (e.target === multiSelectTrigger || e.target === selectedPillsContainer) {
      searchInput.focus();
    }
  });

  function openDropdown() {
    dropdown.classList.add('open');
    dropdownOpen = true;
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    dropdownOpen = false;
  }

  function renderDropdown() {
    const medicines = getMedicines();
    const query = searchQuery.toLowerCase().trim();
    
    // Filter medicines
    let filtered = medicines;
    if (query) {
      filtered = medicines.filter(m => 
        m.brand.toLowerCase().includes(query) ||
        m.composition.toLowerCase().includes(query) ||
        m.segment.toLowerCase().includes(query)
      );
    }

    const alphabeticalMedicines = [...filtered].sort((a, b) =>
      a.brand.localeCompare(b.brand, undefined, { sensitivity: 'base' })
    );

    let html = '';
    if (alphabeticalMedicines.length === 0) {
      html = '<div class="dropdown-no-results">No medicines found matching your search</div>';
    } else {
      alphabeticalMedicines.forEach(m => {
        const isSelected = selectedMedicines.some(s => s.id === m.id);
        html += `
          <div class="dropdown-item ${isSelected ? 'selected' : ''}" data-id="${m.id}">
            <div style="flex:1;min-width:0;">
              <div class="dropdown-item-brand">${highlightMatch(m.brand, query)}</div>
              <div class="dropdown-item-comp">${highlightMatch(m.composition, query)}</div>
            </div>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;

    // Bind click events
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        toggleMedicine(id);
      });
    });
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark style="background:rgba(0,212,152,0.25);color:inherit;border-radius:2px;padding:0 1px;">$1</mark>');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function toggleMedicine(id) {
    const idx = selectedMedicines.findIndex(m => m.id === id);
    if (idx > -1) {
      selectedMedicines.splice(idx, 1);
    } else {
      if (selectedMedicines.length >= 16) {
        showToast('Maximum 16 medicines allowed per template', 'error');
        return;
      }
      const medicine = getMedicines().find(m => m.id === id);
      if (medicine) selectedMedicines.push(medicine);
    }
    renderSelectedPills();
    renderDropdown();
    updatePreview();
  }

  function renderSelectedPills() {
    let html = '';
    selectedMedicines.forEach(m => {
      html += `
        <span class="selected-pill" data-id="${m.id}">
          ${m.brand}
          <button class="remove-pill" data-id="${m.id}" title="Remove">✕</button>
        </span>
      `;
    });
    selectedPillsContainer.innerHTML = html;

    // Update counter
    if (selectedMedicines.length > 0) {
      selectionCounter.classList.remove('hidden');
      selectionCount.textContent = selectedMedicines.length;
    } else {
      selectionCounter.classList.add('hidden');
    }

    // Bind remove buttons
    selectedPillsContainer.querySelectorAll('.remove-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        toggleMedicine(id);
      });
    });
  }

  // ── Template Preview ────────────────────────────────

  // Live update on doctor name change
  doctorInput.addEventListener('input', () => updatePreview());

  // Live update on MRP toggle change
  showMrpToggle.addEventListener('change', () => updatePreview());

  function updatePreview() {
    const doctorName = doctorInput.value.trim();

    if (selectedMedicines.length === 0) {
      previewArea.innerHTML = `
        <div class="template-placeholder">
          <div class="icon">📋</div>
          <p>Select medicines to preview your template</p>
          <p style="font-size:0.8rem;">Choose 1–16 medicines from the dropdown</p>
        </div>
      `;
      return;
    }

    const count = selectedMedicines.length;
    const showMrp = showMrpToggle.checked;

    let medCardsHtml = selectedMedicines.map(m => {
      const mrpHtml = (showMrp && m.mrp && m.mrp !== '-') 
        ? `<div class="med-card-mrp">MRP ₹${m.mrp}</div>` 
        : '';
      const compositionClass = m.composition.length > 110 ? ' med-card-comp--long' : '';
      return `
        <div class="med-card">
          <div class="med-card-brand">${m.brand}</div>
          <div class="med-card-comp${compositionClass}">${m.composition}</div>
          ${mrpHtml}
        </div>
      `;
    }).join('');

    const renderMarketingTemplate = (templateId, recipientName) => `
      <div class="marketing-template" id="${templateId}" data-print-template="${templateId}">
        <div class="template-inner">
          <div class="template-header">
            <div class="template-dr-section">
              ${recipientName ? `<div class="template-dr-name">${recipientName}</div>` : ''}
            </div>
            <div class="template-company-info">
              <div>
                <div class="template-company-name">CLENTIS PHARMACEUTICAL PVT LTD</div>
                <div class="template-company-tag">An ISO 9001:2015 Certified Company</div>
              </div>
            </div>
          </div>
          <div class="template-medicines" data-count="${count}">
            <div class="template-prescribe">
              <div class="template-prescribe-greeting">Respected Doctor,</div>
              <div class="template-prescribe-text">Please do prescribe</div>
            </div>
            ${medCardsHtml}
          </div>
          <div class="template-footer">
            <div class="template-footer-item"><span class="dot"></span> Quality</div>
            <div class="template-footer-item"><span class="dot"></span> Efficacy</div>
            <div class="template-footer-item"><span class="dot"></span> Trust</div>
            <div class="template-footer-item"><span class="dot"></span> Innovation</div>
          </div>
        </div>
      </div>
    `;

    previewArea.innerHTML = `
      <div class="template-preview-stack">
        <div class="template-preview-item" data-print-item="doctor">
          <div class="template-preview-label no-print">
            <span>Doctor Name Template</span>
            <button class="btn btn-secondary btn-sm" onclick="printTemplate('doctor')">Print</button>
          </div>
          ${renderMarketingTemplate('printable-template-doctor', doctorName ? `Dr. ${doctorName}` : '')}
        </div>
        <div class="template-preview-item" data-print-item="respected">
          <div class="template-preview-label no-print">
            <span>Respected Doctor Template</span>
            <button class="btn btn-secondary btn-sm" onclick="printTemplate('respected')">Print</button>
          </div>
          ${renderMarketingTemplate('printable-template-respected', '')}
        </div>
      </div>
    `;
  }

  // ── Print ───────────────────────────────────────────

  window.printTemplate = function(templateType = 'doctor') {
    if (selectedMedicines.length === 0) {
      showToast('Please select at least one medicine first', 'error');
      return;
    }
    document.body.classList.remove('print-doctor', 'print-respected', 'print-both');
    document.body.classList.add(`print-${templateType}`);
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-doctor', 'print-respected', 'print-both');
    }, 500);
  };

  // ── Presets ─────────────────────────────────────────

  window.savePreset = async function() {
    const doctorName = doctorInput.value.trim();
    if (!doctorName) {
      showToast('Please enter a doctor name to save as preset', 'error');
      return;
    }
    if (selectedMedicines.length === 0) {
      showToast('Please select at least one medicine', 'error');
      return;
    }

    const presets = getPresets();
    const existingIdx = presets.findIndex(p => p.doctorName.toLowerCase() === doctorName.toLowerCase());
    
    const preset = {
      id: existingIdx > -1 ? presets[existingIdx].id : Date.now(),
      doctorName: doctorName,
      medicineIds: selectedMedicines.map(m => m.id),
      createdAt: existingIdx > -1 ? presets[existingIdx].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      if (existingIdx > -1) {
        presets[existingIdx] = preset;
      } else {
        presets.push(preset);
      }

      await savePresets(presets);
      renderPresets();
      showToast(existingIdx > -1 ? `Preset updated for Dr. ${doctorName}` : `Preset saved for Dr. ${doctorName}`, 'success');
    } catch (error) {
      console.error(error);
      showToast('Could not save preset to Supabase', 'error');
    }
  };

  function renderPresets() {
    const presets = getPresets();
    
    if (presets.length === 0) {
      presetList.innerHTML = `
        <div class="empty-state">
          <div class="icon">📁</div>
          <p style="font-size:0.85rem;">No saved presets yet</p>
          <p style="font-size:0.75rem;color:var(--clr-text-muted);">Save a doctor + medicines combination to create a preset</p>
        </div>
      `;
      return;
    }

    let html = '';
    presets.forEach(p => {
      html += `
        <div class="preset-item" data-id="${p.id}">
          <div class="preset-item-click" style="flex:1;cursor:pointer;" onclick="loadPreset(${p.id})">
            <div class="preset-name">Dr. ${p.doctorName}</div>
            <div class="preset-count">${p.medicineIds.length} medicine${p.medicineIds.length !== 1 ? 's' : ''}</div>
          </div>
          <div class="preset-actions">
            <button class="btn btn-ghost btn-sm" onclick="loadPreset(${p.id})" title="Load">📋</button>
            <button class="btn btn-ghost btn-sm" onclick="deletePreset(${p.id})" title="Delete">🗑️</button>
          </div>
        </div>
      `;
    });
    presetList.innerHTML = html;
  }

  window.loadPreset = function(presetId) {
    const presets = getPresets();
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    const medicines = getMedicines();
    doctorInput.value = preset.doctorName;
    selectedMedicines = preset.medicineIds
      .map(id => medicines.find(m => m.id === id))
      .filter(Boolean);

    renderSelectedPills();
    renderDropdown();
    updatePreview();
    showToast(`Loaded preset for Dr. ${preset.doctorName}`, 'success');
  };

  window.deletePreset = async function(presetId) {
    if (!confirm('Delete this preset?')) return;
    try {
      await deletePresetById(presetId);
      renderPresets();
      showToast('Preset deleted', 'success');
    } catch (error) {
      console.error(error);
      showToast('Could not delete preset from Supabase', 'error');
    }
  };

  window.clearSelection = function() {
    selectedMedicines = [];
    doctorInput.value = '';
    searchInput.value = '';
    searchQuery = '';
    renderSelectedPills();
    renderDropdown();
    updatePreview();
  };

  // ── Toast Notifications ─────────────────────────────
  
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

  // Make showToast globally available
  window.showToast = showToast;
});
