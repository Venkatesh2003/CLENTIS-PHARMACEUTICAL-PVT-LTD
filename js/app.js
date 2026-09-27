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
  const hospitalInput = document.getElementById('hospital-name');
  const presetReferenceInput = document.getElementById('preset-reference');
  const searchInput = document.getElementById('medicine-search');
  const multiSelectTrigger = document.getElementById('multi-select-trigger');
  const dropdown = document.getElementById('medicine-dropdown');
  const selectedPillsContainer = document.getElementById('selected-pills');
  const selectionCounter = document.getElementById('selection-counter');
  const selectionCount = document.getElementById('selection-count');
  const previewArea = document.getElementById('template-preview');
  const presetList = document.getElementById('preset-list');
  const presetSearchInput = document.getElementById('preset-search');
  const showMrpToggle = document.getElementById('show-mrp');

  // ── Initialize ──────────────────────────────────────
  const synced = await initClentisData();
  renderDropdown();
  renderPresets();
  updatePreview();
  showToast(synced ? 'Connected to shared Supabase database' : 'Using local browser storage. Run Supabase setup SQL to enable sharing.', synced ? 'success' : 'error');

  presetSearchInput.addEventListener('input', () => renderPresets());

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
        <span class="selected-pill" data-id="${m.id}" draggable="true">
          <span class="drag-handle" title="Drag to reorder" aria-hidden="true">⠿</span>
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

    bindDragAndDrop(selectedPillsContainer.querySelectorAll('.selected-pill'));
  }

  function bindDragAndDrop(items) {
    items.forEach(item => {
      item.addEventListener('dragstart', (event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', item.dataset.id);
        item.classList.add('is-dragging');
      });

      item.addEventListener('dragover', (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        item.classList.add('is-drop-target');
      });

      item.addEventListener('dragleave', () => item.classList.remove('is-drop-target'));

      item.addEventListener('drop', (event) => {
        event.preventDefault();
        reorderMedicine(parseInt(event.dataTransfer.getData('text/plain')), parseInt(item.dataset.id));
      });

      item.addEventListener('dragend', () => {
        document.querySelectorAll('.is-dragging, .is-drop-target').forEach(element => {
          element.classList.remove('is-dragging', 'is-drop-target');
        });
      });
    });
  }

  function reorderMedicine(draggedId, targetId) {
    const draggedIndex = selectedMedicines.findIndex(m => m.id === draggedId);
    const targetIndex = selectedMedicines.findIndex(m => m.id === targetId);
    if (draggedIndex < 0 || targetIndex < 0 || draggedIndex === targetIndex) return;

    const [draggedMedicine] = selectedMedicines.splice(draggedIndex, 1);
    selectedMedicines.splice(targetIndex, 0, draggedMedicine);
    renderSelectedPills();
    updatePreview();
  }

  // ── Template Preview ────────────────────────────────

  // Live update on doctor name change
  doctorInput.addEventListener('input', () => updatePreview());
  hospitalInput.addEventListener('input', () => updatePreview());

  // Live update on MRP toggle change
  showMrpToggle.addEventListener('change', () => updatePreview());

  function updatePreview() {
    const doctorName = doctorInput.value.trim();
    const hospitalName = hospitalInput.value.trim();

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

    const medicineColors = [
      '#0e7490', '#be123c', '#6d28d9', '#b45309',
      '#047857', '#1d4ed8', '#c2410c', '#9d174d',
      '#4d7c0f', '#7e22ce', '#0369a1', '#b91c1c',
      '#15803d', '#a16207', '#4338ca', '#0f766e'
    ];

    let medCardsHtml = selectedMedicines.map((m, index) => {
      const mrpHtml = (showMrp && m.mrp && m.mrp !== '-') 
        ? `<div class="med-card-mrp">MRP ₹${m.mrp}</div>` 
        : '';
      const compositionClass = m.composition.length > 110 ? ' med-card-comp--long' : '';
      const medicineColor = medicineColors[index % medicineColors.length];
      return `
        <div class="med-card" data-id="${m.id}" draggable="true" style="--medicine-color: ${medicineColor};">
          <div class="med-card-brand">${m.brand}</div>
          <div class="med-card-comp${compositionClass}">${m.composition}</div>
          ${mrpHtml}
        </div>
      `;
    }).join('');

    const renderMarketingTemplate = (templateId, recipientName, recipientHospital = '') => `
      <div class="marketing-template" id="${templateId}" data-print-template="${templateId}">
        <div class="template-inner">
          <div class="template-header">
            <div class="template-dr-section">
              ${recipientName ? `<div class="template-dr-name">${recipientName}</div>` : ''}
              ${recipientHospital ? `<div class="template-hospital-name">${recipientHospital}</div>` : ''}
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
          ${renderMarketingTemplate('printable-template-doctor', doctorName ? `Dr. ${doctorName}` : '', hospitalName)}
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
    bindDragAndDrop(previewArea.querySelectorAll('.med-card'));
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
    const referenceNumber = presetReferenceInput.value.trim();
    const existingIdx = referenceNumber
      ? presets.findIndex(p =>
        p.doctorName.toLowerCase() === doctorName.toLowerCase() &&
        (p.referenceNumber || '').toLowerCase() === referenceNumber.toLowerCase()
      )
      : -1;
    
    const preset = {
      id: existingIdx > -1 ? presets[existingIdx].id : Date.now(),
      doctorName: doctorName,
      hospitalName: hospitalInput.value.trim(),
      referenceNumber: referenceNumber,
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
      showToast(existingIdx > -1 ? `Preset ${referenceNumber} updated for Dr. ${doctorName}` : `Preset saved for Dr. ${doctorName}`, 'success');
    } catch (error) {
      console.error(error);
      const needsDatabaseUpdate = error?.code === '23505' || /hospital_name|reference_number/i.test(error?.message || '');
      showToast(needsDatabaseUpdate ? 'Run the latest Supabase schema SQL once to save multiple presets' : 'Could not save preset to Supabase', 'error');
    }
  };

  function renderPresets() {
    const searchQuery = presetSearchInput.value.trim().toLowerCase();
    const presets = getPresets().filter(p =>
      !searchQuery ||
      p.doctorName.toLowerCase().includes(searchQuery) ||
      (p.referenceNumber || '').toLowerCase().includes(searchQuery) ||
      (p.hospitalName || '').toLowerCase().includes(searchQuery)
    );
    
    if (presets.length === 0) {
      presetList.innerHTML = `
        <div class="empty-state">
          <div class="icon">📁</div>
          <p style="font-size:0.85rem;">No saved presets found</p>
          <p style="font-size:0.75rem;color:var(--clr-text-muted);">Save a doctor + medicines combination to create a preset</p>
        </div>
      `;
      return;
    }

    const doctorGroups = new Map();
    presets.forEach(preset => {
      const key = preset.doctorName.trim().toLowerCase();
      if (!doctorGroups.has(key)) doctorGroups.set(key, { doctorName: preset.doctorName, presets: [] });
      doctorGroups.get(key).presets.push(preset);
    });

    let html = '';
    [...doctorGroups.values()]
      .sort((a, b) => a.doctorName.localeCompare(b.doctorName))
      .forEach(group => {
        const orderedPresets = group.presets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        html += `
          <details class="preset-doctor-group" ${searchQuery ? 'open' : ''}>
            <summary>
              <span class="preset-doctor-name">Dr. ${escapeHtml(group.doctorName)}</span>
              <span class="preset-doctor-total">${orderedPresets.length} preset${orderedPresets.length !== 1 ? 's' : ''}</span>
            </summary>
            <div class="preset-sub-list">
              ${orderedPresets.map((preset, index) => `
                <div class="preset-item" data-id="${preset.id}">
                  <button class="preset-item-click" onclick="loadPreset(${preset.id})" title="Load this preset">
                    <span class="preset-name">${escapeHtml(preset.referenceNumber || `Preset ${index + 1}`)}</span>
                    <span class="preset-count">${preset.medicineIds.length} medicine${preset.medicineIds.length !== 1 ? 's' : ''}${preset.hospitalName ? ` · ${escapeHtml(preset.hospitalName)}` : ''}</span>
                  </button>
                  <div class="preset-actions">
                    <button class="btn btn-ghost btn-sm" onclick="printSavedPreset(${preset.id})" title="Load and print">🖨️</button>
                    <button class="btn btn-ghost btn-sm" onclick="deletePreset(${preset.id})" title="Delete">🗑️</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </details>
        `;
      });
    presetList.innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  window.loadPreset = function(presetId) {
    const presets = getPresets();
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    const medicines = getMedicines();
    doctorInput.value = preset.doctorName;
    hospitalInput.value = preset.hospitalName || '';
    presetReferenceInput.value = preset.referenceNumber || '';
    selectedMedicines = preset.medicineIds
      .map(id => medicines.find(m => m.id === id))
      .filter(Boolean);

    renderSelectedPills();
    renderDropdown();
    updatePreview();
    showToast(`Loaded preset for Dr. ${preset.doctorName}`, 'success');
  };

  window.printSavedPreset = function(presetId) {
    window.loadPreset(presetId);
    window.requestAnimationFrame(() => window.printTemplate('doctor'));
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
    hospitalInput.value = '';
    presetReferenceInput.value = '';
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
