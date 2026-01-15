// ===================================
// MAIN.JS - Homepage logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initHomepage();
});

function initHomepage() {
    updateUserStats();
    loadFeaturedCards();
    
    // Refresh stats every time page is loaded
    window.addEventListener('focus', updateUserStats);
}

function updateUserStats() {
    const totalCards = UserCollection.getTotalCards();
    const completion = UserCollection.getCompletionRate();
    
    const totalCardsEl = document.getElementById('total-cards');
    const completionEl = document.getElementById('completion');
    
    if (totalCardsEl) {
        animateNumber(totalCardsEl, 0, totalCards, 800);
    }
    
    if (completionEl) {
        setTimeout(() => {
            animateNumber(completionEl, 0, completion, 1000);
            completionEl.innerHTML = `<span id="completion-number">${completion}</span>%`;
            const numberEl = document.getElementById('completion-number');
            if (numberEl) {
                animateNumber(numberEl, 0, completion, 1000);
            }
        }, 200);
    }
}

function loadFeaturedCards() {
    const featuredContainer = document.getElementById('featured-cards');
    if (!featuredContainer) return;
    
    // Get some random legendary and ultra-rare cards
    const legendaryCards = getCardsByRarity('legendary');
    const ultraRareCards = getCardsByRarity('ultra-rare');
    const featuredCards = [...legendaryCards, ...ultraRareCards]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    
    featuredContainer.innerHTML = '';
    
    featuredCards.forEach((card, index) => {
        const cardEl = createFeaturedCardElement(card);
        cardEl.classList.add('stagger-item');
        featuredContainer.appendChild(cardEl);
    });
}

function createFeaturedCardElement(card) {
    const owned = UserCollection.hasCard(card.id);
    const count = UserCollection.getCardCount(card.id);
    
    const cardEl = document.createElement('div');
    cardEl.className = `trading-card ${card.rarity} ${owned ? 'owned' : 'missing'}`;
    cardEl.innerHTML = `
        <div class="card-header">
            <span class="card-category">${getCategoryLabel(card.category)}</span>
            <span class="card-rarity">${getRarityStars(card.rarity)}</span>
        </div>
        <div class="card-image-container">
            <div class="card-image">
                ${card.image ? `<img src="${card.image}" alt="${card.name}" onerror="this.parentElement.innerHTML='<div class=\"placeholder-image\">${card.icon || '\ud83c\udfcf'}</div>'">` : `<div class="placeholder-image">${card.icon || '🏇'}</div>`}
            </div>
        </div>
        <div class="card-info">
            <h2 class="card-name">${card.name}</h2>
            <p class="card-subtitle">${getRarityLabel(card.rarity)}</p>
        </div>
        <div class="card-footer">
            <span class="card-number">#${card.id}</span>
            ${owned ? `<span class="card-edition">×${count}</span>` : '<span class="card-edition">Non possédée</span>'}
        </div>
    `;
    
    cardEl.addEventListener('click', () => {
        window.location.href = `card-detail.html?id=${card.id}`;
    });
    
    return cardEl;
}

// Add stagger animation to action cards
document.querySelectorAll('.action-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('slide-in-up');
});

// Add news items animation
document.querySelectorAll('.news-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    item.classList.add('slide-in-left');
});
