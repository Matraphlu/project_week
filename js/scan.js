// ===================================
// SCAN.JS - Scan page logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initScan();
});

function initScan() {
    setupCameraButton();
    setupManualEntry();
    loadRecentScans();
    setupScanModal();
}

function setupCameraButton() {
    const activateBtn = document.getElementById('activate-camera');
    const cameraView = document.getElementById('camera-view');
    
    if (activateBtn) {
        activateBtn.addEventListener('click', () => {
            // Simulate camera activation
            activateBtn.textContent = '📷 Caméra active...';
            activateBtn.disabled = true;
            
            // Simulate scanning after 2 seconds
            setTimeout(() => {
                const randomCard = getRandomCard();
                scanCard(randomCard.id);
                activateBtn.textContent = '📷 Activer la caméra';
                activateBtn.disabled = false;
            }, 2000);
        });
    }
}

function setupManualEntry() {
    const manualEntryBtn = document.getElementById('manual-entry');
    const manualSection = document.getElementById('manual-section');
    const codeInputs = document.querySelectorAll('.code-input');
    const validateBtn = document.getElementById('validate-code');
    
    if (manualEntryBtn && manualSection) {
        manualEntryBtn.addEventListener('click', () => {
            const isHidden = manualSection.style.display === 'none';
            manualSection.style.display = isHidden ? 'block' : 'none';
            manualSection.classList.add('slide-in-up');
        });
    }
    
    // Auto-focus next input
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 4 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
            checkCodeComplete();
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });
    
    if (validateBtn) {
        validateBtn.addEventListener('click', validateCode);
    }
}

function checkCodeComplete() {
    const codeInputs = document.querySelectorAll('.code-input');
    const validateBtn = document.getElementById('validate-code');
    
    const allFilled = Array.from(codeInputs).every(input => input.value.length === 4);
    
    if (validateBtn) {
        validateBtn.disabled = !allFilled;
    }
}

function validateCode() {
    const codeInputs = document.querySelectorAll('.code-input');
    const code = Array.from(codeInputs).map(input => input.value).join('-');
    
    // Find card by code (simulated - in real app would verify with backend)
    const cardId = findCardByCode(code);
    
    if (cardId) {
        scanCard(cardId);
        // Reset inputs
        codeInputs.forEach(input => input.value = '');
    } else {
        showToast('Code invalide !', 'error');
    }
}

function findCardByCode(code) {
    // Simulate code validation
    // In real app, this would make an API call
    const allCards = getAllCards();
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
    return randomCard.id;
}

function scanCard(cardId) {
    const card = getCardById(cardId);
    if (!card) {
        showToast('Carte non trouvée !', 'error');
        return;
    }
    
    // Add to collection
    UserCollection.addCard(cardId);
    
    // Save to recent scans
    saveRecentScan(card);
    
    // Show success modal
    showScanSuccess(card);
    
    // Reload recent scans
    loadRecentScans();
}

function saveRecentScan(card) {
    let recentScans = Storage.get('recentScans', []);
    
    // Add to beginning
    recentScans.unshift({
        cardId: card.id,
        scannedAt: new Date().toISOString()
    });
    
    // Keep only last 10
    recentScans = recentScans.slice(0, 10);
    
    Storage.set('recentScans', recentScans);
}

function loadRecentScans() {
    const recentScans = Storage.get('recentScans', []);
    const container = document.getElementById('recent-scans');
    
    if (!container) return;
    
    if (recentScans.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucune carte scannée récemment</p>';
        return;
    }
    
    container.innerHTML = '';
    
    recentScans.forEach(scan => {
        const card = getCardById(scan.cardId);
        if (!card) return;
        
        const scanEl = document.createElement('a');
        scanEl.href = `card-detail.html?id=${card.id}`;
        scanEl.className = 'recent-card-item';
        scanEl.innerHTML = `
            <div class="recent-card-icon">${card.icon || '🏇'}</div>
            <div class="recent-card-name">${card.name}</div>
            <div class="recent-card-time">${formatDate(scan.scannedAt)}</div>
        `;
        
        container.appendChild(scanEl);
    });
}

function setupScanModal() {
    const modal = document.getElementById('scan-modal');
    const viewCardBtn = document.getElementById('view-card');
    const continueBtn = document.getElementById('continue-scan');
    
    if (viewCardBtn) {
        viewCardBtn.addEventListener('click', () => {
            const cardId = viewCardBtn.dataset.cardId;
            window.location.href = `card-detail.html?id=${cardId}`;
        });
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            Modal.close('scan-modal');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                Modal.close('scan-modal');
            }
        });
    }
}

function showScanSuccess(card) {
    const modal = document.getElementById('scan-modal');
    const preview = document.getElementById('scanned-card-preview');
    const viewCardBtn = document.getElementById('view-card');
    
    if (!modal || !preview) return;
    
    const count = UserCollection.getCardCount(card.id);
    const isDuplicate = count > 1;
    
    preview.innerHTML = `
        <div class="trading-card ${card.rarity}" style="width: 240px; height: 340px; margin: 0 auto;">
            <div class="card-header">
                <span class="card-category">${getCategoryLabel(card.category)}</span>
                <span class="card-rarity">${getRarityStars(card.rarity)}</span>
            </div>
            <div class="card-image-container">
                <div class="card-image">
                    ${card.image ? `<img src="${card.image}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);" onerror="this.outerHTML='<div class=\\"placeholder-image\\">${card.icon || '🏇'}</div>'">` : `<div class="placeholder-image">${card.icon || '🏇'}</div>`}
                </div>
            </div>
            <div class="card-info">
                <h2 class="card-name">${card.name}</h2>
                <p class="card-subtitle">${getRarityLabel(card.rarity)}</p>
            </div>
            <div class="card-footer">
                <span class="card-number">#${card.id}</span>
                <span class="card-edition">×${count} ${isDuplicate ? '(Double)' : ''}</span>
            </div>
        </div>
    `;
    
    if (viewCardBtn) {
        viewCardBtn.dataset.cardId = card.id;
    }
    
    Modal.open('scan-modal');
    
    if (isDuplicate) {
        showToast('Double ! +10 crédits', 'success');
        Credits.add(10);
    }
}

function getRandomCard() {
    const allCards = getAllCards();
    return allCards[Math.floor(Math.random() * allCards.length)];
}

// Add animation to scan frame corners
const corners = document.querySelectorAll('.corner');
corners.forEach((corner, index) => {
    corner.style.animationDelay = `${index * 0.1}s`;
});
