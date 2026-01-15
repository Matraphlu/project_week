// ===================================
// SHOP.JS - Shop page logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initShop();
});

function initShop() {
    updateCreditsDisplay();
    attachBuyButtonListeners();
    setupPackModal();
}

function updateCreditsDisplay() {
    const creditsEl = document.getElementById('user-credits');
    if (creditsEl) {
        const balance = Credits.getBalance();
        creditsEl.textContent = balance;
    }
}

function attachBuyButtonListeners() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const packType = button.dataset.pack || button.dataset.bundle;
            const price = parseInt(button.dataset.price);
            
            if (button.dataset.pack) {
                purchasePack(packType, price);
            } else if (button.dataset.bundle) {
                purchaseBundle(packType, price);
            }
        });
    });
}

function purchasePack(packType, price) {
    if (!Credits.canAfford(price)) {
        showToast('Crédits insuffisants !', 'error');
        return;
    }
    
    // Deduct credits
    Credits.subtract(price);
    updateCreditsDisplay();
    
    // Open pack
    // Open pack
    const cards = PackOpening.openPack(packType);
    
    // Add cards to collection
    //cards.forEach(card => {
    //    UserCollection.addCard(card.id);
   // });
    
    // Show pack opening animation
   // showPackOpening(cards);
}

function purchaseBundle(bundleType, price) {
    if (!Credits.canAfford(price)) {
        showToast('Crédits insuffisants !', 'error');
        return;
    }
    
    Credits.subtract(price);
    updateCreditsDisplay();
    
    const [packType, count] = bundleType.split('-');
    const numPacks = parseInt(count);
    const allCards = [];
    
    for (let i = 0; i < numPacks; i++) {
        const cards = PackOpening.openPack(packType);
        cards.forEach(card => {
            UserCollection.addCard(card.id);
            allCards.push(card);
        });
    }
    
    showToast(`${numPacks} paquets ouverts ! ${allCards.length} cartes obtenues`, 'success');
    
    // Show summary of best cards
    setTimeout(() => {
        const bestCards = allCards
            .sort((a, b) => {
                const rarityOrder = { 'mythic': 5, 'legendary': 4, 'ultra-rare': 3, 'rare': 2, 'common': 1 };
                return (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0);
            })
            .slice(0, 5);
        
        showPackOpening(bestCards, true);
    }, 1000);
}

function setupPackModal() {
    const modal = document.getElementById('pack-modal');
    const closeBtn = document.getElementById('close-pack');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            Modal.close('pack-modal');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                Modal.close('pack-modal');
            }
        });
    }
}

function showPackOpening(cards, isBundle = false) {
    const modal = document.getElementById('pack-modal');
    const packAnimation = document.getElementById('pack-animation');
    const revealedCards = document.getElementById('revealed-cards');
    
    if (!modal || !packAnimation || !revealedCards) return;
    
    // Reset
    revealedCards.innerHTML = '';
    packAnimation.innerHTML = '<div class="pack-box">📦</div>';
    
    Modal.open('pack-modal');
    
    // Shake animation
    const packBox = packAnimation.querySelector('.pack-box');
    packBox.classList.add('pack-shake');
    
    setTimeout(() => {
        // Explosion animation
        packBox.classList.remove('pack-shake');
        packBox.classList.add('pack-explosion');
        
        setTimeout(() => {
            // Hide pack
            packAnimation.style.display = 'none';
            
            // Reveal cards
            cards.forEach((card, index) => {
                const cardEl = createRevealedCardElement(card);
                cardEl.style.animationDelay = `${index * 0.15}s`;
                revealedCards.appendChild(cardEl);
            });
        }, 600);
    }, 1500);
}

function createRevealedCardElement(card) {
    const cardEl = document.createElement('div');
    cardEl.className = 'revealed-card';
    cardEl.innerHTML = `
        <div class="card-image ${card.rarity}">
            ${card.image ? `<img src="${card.image}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);" onerror="this.outerHTML='<div class=\"placeholder-image\">${card.icon || '\ud83c\udfcf'}</div>'">` : `<div class="placeholder-image">${card.icon || '🏇'}</div>`}
        </div>
        <div class="card-name">${card.name}</div>
        <div class="card-rarity" style="color: ${getRarityColor(card.rarity)}">
            ${getRarityStars(card.rarity)} ${getRarityLabel(card.rarity)}
        </div>
    `;
    
    cardEl.addEventListener('click', () => {
        window.location.href = `card-detail.html?id=${card.id}`;
    });
    
    return cardEl;
}

// Add hover effects to pack cards
document.querySelectorAll('.pack-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('slide-in-up');
});
