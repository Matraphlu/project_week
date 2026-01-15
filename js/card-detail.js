// ===================================
// CARD-DETAIL.JS - Card detail page logic
// ===================================

let currentCard = null;
let currentDetailTab = 'info';

document.addEventListener('DOMContentLoaded', () => {
    initCardDetail();
});

function initCardDetail() {
    loadCardFromURL();
    setupDetailTabs();
    setupActions();
}

function loadCardFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const cardId = urlParams.get('id');
    
    if (!cardId) {
        window.location.href = 'collection.html';
        return;
    }
    
    const card = getCardById(cardId);
    
    if (!card) {
        showToast('Carte introuvable', 'error');
        setTimeout(() => {
            window.location.href = 'collection.html';
        }, 2000);
        return;
    }
    
    currentCard = card;
    displayCard(card);
    displayCardDetails(card);
}

function displayCard(card) {
    // Update card display
    const categoryEl = document.getElementById('card-category');
    const rarityEl = document.getElementById('card-rarity');
    const imageEl = document.getElementById('card-image');
    const nameEl = document.getElementById('card-name');
    const subtitleEl = document.getElementById('card-subtitle');
    const numberEl = document.getElementById('card-number');
    const editionEl = document.getElementById('card-edition');
    
    if (categoryEl) categoryEl.textContent = getCategoryLabel(card.category);
    if (rarityEl) rarityEl.textContent = getRarityStars(card.rarity);
    if (nameEl) nameEl.textContent = card.name;
    if (subtitleEl) subtitleEl.textContent = card.description || getRarityLabel(card.rarity);
    if (numberEl) numberEl.textContent = `#${card.id}`;
    if (editionEl) editionEl.textContent = 'Édition 2026';
    
    if (imageEl) {
        imageEl.innerHTML = `<div class="placeholder-image">${card.icon || '🏇'}</div>`;
    }
    
    // Update card front class for rarity color
    const cardFront = document.querySelector('.card-front');
    if (cardFront) {
        cardFront.className = `card-front ${card.rarity}`;
    }
}

function displayCardDetails(card) {
    // Description
    const descriptionEl = document.getElementById('card-description');
    if (descriptionEl) {
        descriptionEl.textContent = card.description || 'Carte de collection unique du Salon du Cheval 2026.';
    }
    
    // Characteristics
    const disciplineEl = document.getElementById('card-discipline');
    const periodEl = document.getElementById('card-period');
    const nationalityEl = document.getElementById('card-nationality');
    
    if (disciplineEl) disciplineEl.textContent = card.discipline || 'N/A';
    if (periodEl) periodEl.textContent = card.years || card.period || 'N/A';
    if (nationalityEl) nationalityEl.textContent = card.nationality || 'N/A';
    
    // Achievements
    if (card.achievements) {
        const achievementsEl = document.getElementById('achievements-list');
        if (achievementsEl) {
            achievementsEl.innerHTML = card.achievements.map(achievement => 
                `<li>${achievement}</li>`
            ).join('');
        }
    }
    
    // Stats
    displayStats(card);
    
    // History
    displayHistory(card);
}

function displayStats(card) {
    const totalCopiesEl = document.getElementById('total-copies');
    const inCirculationEl = document.getElementById('in-circulation');
    const inCollectionsEl = document.getElementById('in-collections');
    
    if (totalCopiesEl) totalCopiesEl.textContent = card.total || 'Illimité';
    if (inCirculationEl) {
        const circulating = card.total ? Math.floor(card.total * 0.7) : 0;
        inCirculationEl.textContent = circulating;
    }
    if (inCollectionsEl) {
        const collected = card.total ? Math.floor(card.total * 0.3) : 0;
        inCollectionsEl.textContent = collected;
    }
}

function displayHistory(card) {
    const owned = UserCollection.hasCard(card.id);
    
    if (!owned) {
        const historyContainer = document.querySelector('.history-timeline');
        if (historyContainer) {
            historyContainer.innerHTML = `
                <p class="empty-state">Vous ne possédez pas encore cette carte</p>
            `;
        }
        return;
    }
    
    const collection = UserCollection.getCollection();
    const cardData = collection.find(c => c.id === card.id);
    
    if (cardData) {
        const historyContainer = document.querySelector('.history-timeline');
        if (historyContainer) {
            historyContainer.innerHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">📅</div>
                    <div class="timeline-content">
                        <h4>Première obtention</h4>
                        <p>${formatDate(cardData.obtainedAt)}</p>
                    </div>
                </div>
                ${cardData.count > 1 ? `
                <div class="timeline-item">
                    <div class="timeline-icon">🔄</div>
                    <div class="timeline-content">
                        <h4>Dernière obtention</h4>
                        <p>${formatDate(cardData.lastObtained)}</p>
                        <span class="timeline-date">×${cardData.count} exemplaires</span>
                    </div>
                </div>
                ` : ''}
            `;
        }
    }
}

function setupDetailTabs() {
    const tabs = document.querySelectorAll('.detail-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            currentDetailTab = tab.dataset.tab;
            showDetailTab(currentDetailTab);
        });
    });
}

function showDetailTab(tabName) {
    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`${tabName}-tab`);
    if (activePanel) {
        activePanel.classList.add('active');
    }
}

function setupActions() {
    const shareBtn = document.getElementById('share-card');
    const favoriteBtn = document.getElementById('favorite-card');
    const tradeBtn = document.getElementById('trade-card');
    const sellBtn = document.getElementById('sell-card');
    const similarBtn = document.getElementById('view-similar');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareCard);
    }
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', toggleFavorite);
        updateFavoriteButton();
    }
    
    if (tradeBtn) {
        tradeBtn.addEventListener('click', () => {
            window.location.href = 'trade.html';
        });
    }
    
    if (sellBtn) {
        sellBtn.addEventListener('click', sellCard);
    }
    
    if (similarBtn) {
        similarBtn.addEventListener('click', viewSimilarCards);
    }
}

function shareCard() {
    if (!currentCard) return;
    
    const shareText = `Découvrez ma carte ${currentCard.name} (${getRarityLabel(currentCard.rarity)}) sur Salon du Cheval 2026 !`;
    
    if (navigator.share) {
        navigator.share({
            title: currentCard.name,
            text: shareText,
            url: window.location.href
        }).catch(() => {});
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Lien copié !', 'success');
    }
}

function toggleFavorite() {
    if (!currentCard) return;
    
    const isFavorite = UserCollection.toggleFavorite(currentCard.id);
    updateFavoriteButton();
    
    showToast(isFavorite ? 'Ajouté aux favoris' : 'Retiré des favoris', 'success');
}

function updateFavoriteButton() {
    const favoriteBtn = document.getElementById('favorite-card');
    if (!favoriteBtn || !currentCard) return;
    
    const collection = UserCollection.getCollection();
    const cardData = collection.find(c => c.id === currentCard.id);
    
    if (cardData?.favorite) {
        favoriteBtn.textContent = '⭐';
        favoriteBtn.style.color = '#F59E0B';
    } else {
        favoriteBtn.textContent = '⭐';
        favoriteBtn.style.color = 'inherit';
    }
}

function sellCard() {
    if (!currentCard) return;
    
    const owned = UserCollection.hasCard(currentCard.id);
    if (!owned) {
        showToast('Vous ne possédez pas cette carte', 'error');
        return;
    }
    
    // Calculate sell value based on rarity
    const rarityValues = {
        'common': 10,
        'rare': 25,
        'ultra-rare': 75,
        'legendary': 200,
        'mythic': 500
    };
    
    const value = rarityValues[currentCard.rarity] || 10;
    
    if (confirm(`Vendre cette carte pour ${value} crédits ?`)) {
        UserCollection.removeCard(currentCard.id, 1);
        Credits.add(value);
        showToast(`Carte vendue pour ${value} crédits !`, 'success');
        
        setTimeout(() => {
            window.location.href = 'collection.html';
        }, 1500);
    }
}

function viewSimilarCards() {
    if (!currentCard) return;
    
    // Redirect to collection with filters
    window.location.href = `collection.html?category=${currentCard.category}&rarity=${currentCard.rarity}`;
}

// Add 3D card effect on mouse move
const card3d = document.querySelector('.card-3d');
if (card3d) {
    card3d.addEventListener('mousemove', (e) => {
        const rect = card3d.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card3d.addEventListener('mouseleave', () => {
        card3d.style.transform = '';
    });
}
