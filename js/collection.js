// ===================================
// COLLECTION.JS - Collection page logic
// ===================================

let currentFilter = {
    category: 'all',
    rarity: 'all',
    owned: 'all'
};

let currentView = 'grid';

document.addEventListener('DOMContentLoaded', () => {
    initCollection();
});

function initCollection() {
    updateCollectionStats();
    updateCategoryProgress();
    setupFilters();
    setupViewToggle();
    loadCards();
}

function updateCollectionStats() {
    const owned = UserCollection.getUniqueCards();
    const total = getAllCards().length;
    const completion = UserCollection.getCompletionRate();
    
    const ownedEl = document.getElementById('owned-cards');
    const totalEl = document.getElementById('total-available');
    const completionEl = document.getElementById('completion-rate');
    
    if (ownedEl) animateNumber(ownedEl, 0, owned, 800);
    if (totalEl) totalEl.textContent = total;
    if (completionEl) {
        animateNumber(completionEl, 0, completion, 1000);
        completionEl.innerHTML = `<span id="completion-number">${completion}</span>%`;
        const numberEl = document.getElementById('completion-number');
        if (numberEl) animateNumber(numberEl, 0, completion, 1000);
    }
}

function updateCategoryProgress() {
    const categories = {
        'disciplines': { owned: 0, total: 0, emoji: '🟦' },
        'cavaliers': { owned: 0, total: 0, emoji: '🟢' },
        'chevaux': { owned: 0, total: 0, emoji: '🐴' },
        'duos': { owned: 0, total: 0, emoji: '⭐' },
        'moments': { owned: 0, total: 0, emoji: '🎯' },
        'event': { owned: 0, total: 0, emoji: '🏆' }
    };
    
    // Count cards
    Object.keys(CARDS_DATABASE).forEach(category => {
        const cards = CARDS_DATABASE[category];
        categories[category].total = cards.length;
        
        cards.forEach(card => {
            if (UserCollection.hasCard(card.id)) {
                categories[category].owned++;
            }
        });
    });
    
    // Update display
    const progressContainer = document.querySelector('.category-progress');
    if (!progressContainer) return;
    
    progressContainer.innerHTML = '';
    
    Object.entries(categories).forEach(([key, data]) => {
        const percentage = data.total > 0 ? Math.round((data.owned / data.total) * 100) : 0;
        
        const item = document.createElement('div');
        item.className = 'progress-item';
        item.innerHTML = `
            <div class="progress-header">
                <span class="category-name">${data.emoji} ${getCategoryLabel(key)}</span>
                <span class="progress-count">${data.owned}/${data.total}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        
        progressContainer.appendChild(item);
    });
}

function setupFilters() {
    // Category filters
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter.category = tab.dataset.filter;
            loadCards();
        });
    });
    
    // Rarity filter
    const rarityFilter = document.getElementById('rarity-filter');
    if (rarityFilter) {
        rarityFilter.addEventListener('change', (e) => {
            currentFilter.rarity = e.target.value;
            loadCards();
        });
    }
    
    // Owned filter
    const ownedFilter = document.getElementById('owned-filter');
    if (ownedFilter) {
        ownedFilter.addEventListener('change', (e) => {
            currentFilter.owned = e.target.value;
            loadCards();
        });
    }
}

function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            updateViewMode();
        });
    });
}

function updateViewMode() {
    const grid = document.getElementById('cards-grid');
    if (!grid) return;
    
    if (currentView === 'list') {
        grid.classList.add('list-view');
    } else {
        grid.classList.remove('list-view');
    }
}

function loadCards() {
    const cardsGrid = document.getElementById('cards-grid');
    if (!cardsGrid) return;
    
    let cards = getAllCards();
    
    // Apply category filter
    if (currentFilter.category !== 'all') {
        cards = cards.filter(card => card.category === currentFilter.category);
    }
    
    // Apply rarity filter
    if (currentFilter.rarity !== 'all') {
        cards = cards.filter(card => card.rarity === currentFilter.rarity);
    }
    
    // Apply owned filter
    if (currentFilter.owned === 'owned') {
        cards = cards.filter(card => UserCollection.hasCard(card.id));
    } else if (currentFilter.owned === 'missing') {
        cards = cards.filter(card => !UserCollection.hasCard(card.id));
    }
    
    // Sort by rarity and name
    cards.sort((a, b) => {
        const rarityOrder = { 'mythic': 5, 'legendary': 4, 'ultra-rare': 3, 'rare': 2, 'common': 1 };
        const rarityDiff = (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
        if (rarityDiff !== 0) return rarityDiff;
        return a.name.localeCompare(b.name);
    });
    
    // Render cards
    cardsGrid.innerHTML = '';
    
    if (cards.length === 0) {
        cardsGrid.innerHTML = '<p class="empty-state">Aucune carte trouvée</p>';
        return;
    }
    
    cards.forEach((card, index) => {
        const cardEl = createCollectionCardElement(card);
        cardEl.style.animationDelay = `${(index % 20) * 0.02}s`;
        cardEl.classList.add('fade-in');
        cardsGrid.appendChild(cardEl);
    });
}

function createCollectionCardElement(card) {
    const owned = UserCollection.hasCard(card.id);
    const count = UserCollection.getCardCount(card.id);
    
    const cardEl = document.createElement('a');
    cardEl.href = `card-detail.html?id=${card.id}`;
    cardEl.className = `collection-card ${owned ? 'owned' : 'missing'}`;
    
    cardEl.innerHTML = `
        ${owned ? `<div class="card-owned-badge">✓</div>` : ''}
        <div class="card-thumbnail ${card.rarity}">
            <div class="card-thumbnail-icon">${card.icon || '🏇'}</div>
        </div>
        <div class="card-info-bottom">
            <div class="card-number-small">#${card.id}</div>
            <div class="card-title-small">${card.name}</div>
            <div class="card-category-small">${getRarityLabel(card.rarity)}</div>
        </div>
        ${count > 1 ? `<div class="duplicate-count">×${count}</div>` : ''}
    `;
    
    return cardEl;
}

// Add initial animation
document.querySelectorAll('.progress-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('slide-in-left');
});
