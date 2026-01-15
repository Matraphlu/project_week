// ===================================
// TRADE.JS - Trade page logic
// ===================================

let currentTab = 'offers';

document.addEventListener('DOMContentLoaded', () => {
    initTrade();
});

function initTrade() {
    setupTabs();
    setupCreateOfferModal();
    loadTradeData();
}

function setupTabs() {
    const tabs = document.querySelectorAll('.trade-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            currentTab = tab.dataset.tab;
            showTabContent(currentTab);
        });
    });
}

function showTabContent(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`${tabName}-tab`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.classList.add('fade-in');
    }
}

function setupCreateOfferModal() {
    const createBtn = document.getElementById('create-offer');
    const modal = document.getElementById('create-offer-modal');
    const cancelBtn = document.getElementById('cancel-offer');
    const submitBtn = document.getElementById('submit-offer');
    
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            Modal.open('create-offer-modal');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            Modal.close('create-offer-modal');
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitTradeOffer);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                Modal.close('create-offer-modal');
            }
        });
    }
    
    // Setup select cards button
    const selectBtn = document.getElementById('select-my-cards');
    if (selectBtn) {
        selectBtn.addEventListener('click', () => {
            showCardSelector();
        });
    }
}

function showCardSelector() {
    // In a real app, this would show a card selection interface
    const userCards = UserCollection.getCollection();
    
    if (userCards.length === 0) {
        showToast('Vous n\'avez aucune carte à échanger', 'error');
        return;
    }
    
    // Simulate card selection
    const randomCard = userCards[Math.floor(Math.random() * userCards.length)];
    const card = getCardById(randomCard.id);
    
    const container = document.getElementById('my-cards-offer');
    if (container) {
        container.innerHTML = `
            <div class="mini-card ${card.rarity}">
                <div class="card-name">${card.name}</div>
                <div class="card-rarity">${getRarityStars(card.rarity)} ${getRarityLabel(card.rarity)}</div>
            </div>
        `;
    }
    
    showToast('Carte sélectionnée !', 'success');
}

function submitTradeOffer() {
    const myCardsContainer = document.getElementById('my-cards-offer');
    const wantedCardsContainer = document.getElementById('wanted-cards');
    
    if (!myCardsContainer?.innerHTML.trim() || !wantedCardsContainer?.innerHTML.trim()) {
        showToast('Veuillez sélectionner les cartes à échanger', 'error');
        return;
    }
    
    // In a real app, this would submit to backend
    const tradeOffer = {
        id: generateId(),
        offeredCards: ['CARD-001'], // Would be actual selected cards
        requestedCards: ['CARD-002'],
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to local storage
    let myTrades = Storage.get('myTrades', []);
    myTrades.push(tradeOffer);
    Storage.set('myTrades', myTrades);
    
    showToast('Offre d\'échange créée avec succès !', 'success');
    Modal.close('create-offer-modal');
    
    // Refresh display
    loadMyTrades();
}

function loadTradeData() {
    loadOffers();
    loadMarket();
    loadMyTrades();
}

function loadOffers() {
    // Simulated offers - in real app would load from backend
    const offersContainer = document.querySelector('.offers-list');
    if (!offersContainer) return;
    
    // Offers are already in HTML, could be dynamically loaded
    setupOfferActions();
}

function setupOfferActions() {
    // Accept buttons
    const acceptButtons = document.querySelectorAll('.accept-btn');
    acceptButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const offer = e.target.closest('.trade-offer');
            if (offer) {
                acceptTradeOffer(offer);
            }
        });
    });
    
    // Decline buttons
    const declineButtons = document.querySelectorAll('.decline-btn');
    declineButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const offer = e.target.closest('.trade-offer');
            if (offer) {
                declineTradeOffer(offer);
            }
        });
    });
}

function acceptTradeOffer(offerElement) {
    // In real app, would process the trade
    showToast('Échange accepté ! Les cartes ont été transférées.', 'success');
    offerElement.style.animation = 'slideOutLeft 0.3s ease-in';
    setTimeout(() => {
        offerElement.remove();
    }, 300);
}

function declineTradeOffer(offerElement) {
    showToast('Offre refusée', 'info');
    offerElement.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
        offerElement.remove();
    }, 300);
}

function loadMarket() {
    // Market listings are already in HTML
    setupMarketActions();
}

function setupMarketActions() {
    const tradeButtons = document.querySelectorAll('.trade-btn');
    tradeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const marketItem = e.target.closest('.market-item');
            if (marketItem) {
                proposeTradeForItem(marketItem);
            }
        });
    });
}

function proposeTradeForItem(marketItem) {
    // In real app, would open trade proposal interface
    showToast('Ouverture de la fenêtre d\'échange...', 'info');
    setTimeout(() => {
        Modal.open('create-offer-modal');
    }, 500);
}

function loadMyTrades() {
    const myTrades = Storage.get('myTrades', []);
    const container = document.querySelector('.my-trades-list');
    
    if (!container) return;
    
    // Keep existing HTML structure and add dynamic trades if any
    if (myTrades.length > 0) {
        const pendingSection = container.querySelector('h3:first-of-type');
        if (pendingSection) {
            myTrades.forEach(trade => {
                const tradeEl = createMyTradeElement(trade);
                pendingSection.insertAdjacentElement('afterend', tradeEl);
            });
        }
    }
    
    // Setup cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-trade');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tradeItem = e.target.closest('.trade-item');
            if (tradeItem) {
                cancelTrade(tradeItem);
            }
        });
    });
}

function createMyTradeElement(trade) {
    const tradeEl = document.createElement('div');
    tradeEl.className = 'trade-item pending';
    tradeEl.dataset.tradeId = trade.id;
    tradeEl.innerHTML = `
        <div class="trade-status">⏳ En attente</div>
        <div class="trade-summary">
            <span>Offre personnalisée</span>
            <span>Créée ${formatDate(trade.createdAt)}</span>
        </div>
        <button class="cancel-trade">Annuler</button>
    `;
    
    return tradeEl;
}

function cancelTrade(tradeElement) {
    const tradeId = tradeElement.dataset.tradeId;
    
    if (tradeId) {
        let myTrades = Storage.get('myTrades', []);
        myTrades = myTrades.filter(t => t.id !== tradeId);
        Storage.set('myTrades', myTrades);
    }
    
    showToast('Échange annulé', 'info');
    tradeElement.style.animation = 'slideOutRight 0.3s ease-in';
    setTimeout(() => {
        tradeElement.remove();
    }, 300);
}

// Add animations to trade offers
document.querySelectorAll('.trade-offer').forEach((offer, index) => {
    offer.style.animationDelay = `${index * 0.1}s`;
    offer.classList.add('slide-in-up');
});

// Add animations to market items
document.querySelectorAll('.market-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('slide-in-up');
});
