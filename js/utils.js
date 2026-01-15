// ===================================
// UTILS.JS - Utility functions
// ===================================

// Local Storage Management
const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// User Collection Management
const UserCollection = {
    getCollection() {
        return Storage.get('userCollection', []);
    },
    
    addCard(cardId) {
        const collection = this.getCollection();
        const existingCard = collection.find(c => c.id === cardId);
        
        if (existingCard) {
            existingCard.count++;
            existingCard.lastObtained = new Date().toISOString();
        } else {
            collection.push({
                id: cardId,
                count: 1,
                obtainedAt: new Date().toISOString(),
                lastObtained: new Date().toISOString(),
                favorite: false
            });
        }
        
        Storage.set('userCollection', collection);
        return collection;
    },
    
    removeCard(cardId, count = 1) {
        const collection = this.getCollection();
        const cardIndex = collection.findIndex(c => c.id === cardId);
        
        if (cardIndex !== -1) {
            collection[cardIndex].count -= count;
            if (collection[cardIndex].count <= 0) {
                collection.splice(cardIndex, 1);
            }
        }
        
        Storage.set('userCollection', collection);
        return collection;
    },
    
    hasCard(cardId) {
        const collection = this.getCollection();
        return collection.some(c => c.id === cardId);
    },
    
    getCardCount(cardId) {
        const collection = this.getCollection();
        const card = collection.find(c => c.id === cardId);
        return card ? card.count : 0;
    },
    
    toggleFavorite(cardId) {
        const collection = this.getCollection();
        const card = collection.find(c => c.id === cardId);
        if (card) {
            card.favorite = !card.favorite;
            Storage.set('userCollection', collection);
        }
        return card?.favorite;
    },
    
    getTotalCards() {
        const collection = this.getCollection();
        return collection.reduce((total, card) => total + card.count, 0);
    },
    
    getUniqueCards() {
        return this.getCollection().length;
    },
    
    getCompletionRate() {
        const totalAvailable = getAllCards().length;
        const owned = this.getUniqueCards();
        return Math.round((owned / totalAvailable) * 100);
    }
};

// Credits Management
const Credits = {
    getBalance() {
        return Storage.get('userCredits', 500);
    },
    
    add(amount) {
        const current = this.getBalance();
        const newBalance = current + amount;
        Storage.set('userCredits', newBalance);
        return newBalance;
    },
    
    subtract(amount) {
        const current = this.getBalance();
        if (current >= amount) {
            const newBalance = current - amount;
            Storage.set('userCredits', newBalance);
            return newBalance;
        }
        return null; // Insufficient funds
    },
    
    canAfford(amount) {
        return this.getBalance() >= amount;
    }
};

// Pack Opening Logic
const PackOpening = {
    openPack(packType) {
        const weights = RARITY_WEIGHTS[packType];
        const cards = [];
        
        for (let i = 0; i < 5; i++) {
            const card = this.drawCard(weights);
            cards.push(card);
        }
        
        return cards;
    },
    
    drawCard(weights) {
        const random = Math.random();
        let cumulative = 0;
        let selectedRarity = 'common';
        
        for (const [rarity, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (random <= cumulative) {
                selectedRarity = rarity;
                break;
            }
        }
        
        const cardsOfRarity = getCardsByRarity(selectedRarity);
        if (cardsOfRarity.length === 0) {
            // Fallback to common if no cards of selected rarity
            const commonCards = getCardsByRarity('common');
            return commonCards[Math.floor(Math.random() * commonCards.length)];
        }
        
        return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
    }
};

// Modal Management
const Modal = {
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },
    
    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },
    
    closeAll() {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
};

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
        return date.toLocaleDateString('fr-FR');
    } else if (days > 0) {
        return `Il y a ${days}j`;
    } else if (hours > 0) {
        return `Il y a ${hours}h`;
    } else if (minutes > 0) {
        return `Il y a ${minutes}min`;
    } else {
        return 'À l\'instant';
    }
}

// Generate unique ID
function generateId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

// Rarity color mapping
function getRarityColor(rarity) {
    const colors = {
        'common': '#9CA3AF',
        'rare': '#3B82F6',
        'ultra-rare': '#8B5CF6',
        'legendary': '#F59E0B',
        'mythic': '#EF4444'
    };
    return colors[rarity] || colors.common;
}

// Rarity stars
function getRarityStars(rarity) {
    const stars = {
        'common': '★',
        'rare': '★★',
        'ultra-rare': '★★★',
        'legendary': '★★★★',
        'mythic': '★★★★★'
    };
    return stars[rarity] || '★';
}

// Rarity label in French
function getRarityLabel(rarity) {
    const labels = {
        'common': 'Commun',
        'rare': 'Rare',
        'ultra-rare': 'Ultra Rare',
        'legendary': 'Légendaire',
        'mythic': 'Mythique'
    };
    return labels[rarity] || 'Commun';
}

// Category label in French
function getCategoryLabel(category) {
    const labels = {
        'disciplines': 'Discipline',
        'cavaliers': 'Cavalier',
        'chevaux': 'Cheval',
        'duos': 'Duo Mythique',
        'moments': 'Moment de Légende',
        'event': 'Événement'
    };
    return labels[category] || category;
}

// Animate number counting
function animateNumber(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #36c1d2;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
