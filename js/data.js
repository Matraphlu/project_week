// ===================================
// DATA.JS - Database of all cards
// ===================================

const CARDS_DATABASE = {
    disciplines: [
        // Saut d'obstacles
        { id: 'DISC-001', name: 'Saut d\'obstacles - Bronze', category: 'disciplines', discipline: 'Saut d\'obstacles', rarity: 'common', color: '#3B82F6', icon: '🐎', total: 15000 },
        { id: 'DISC-002', name: 'Saut d\'obstacles - Argent', category: 'disciplines', discipline: 'Saut d\'obstacles', rarity: 'common', color: '#3B82F6', icon: '🐎', total: 12000 },
        { id: 'DISC-003', name: 'Saut d\'obstacles - Or', category: 'disciplines', discipline: 'Saut d\'obstacles', rarity: 'rare', color: '#3B82F6', icon: '🐎', total: 8000 },
        
        // Courses
        { id: 'DISC-011', name: 'Course de Plat', category: 'disciplines', discipline: 'Courses', rarity: 'common', color: '#F97316', icon: '🏇', total: 15000 },
        { id: 'DISC-012', name: 'Course d\'Obstacle', category: 'disciplines', discipline: 'Courses', rarity: 'common', color: '#F97316', icon: '🏇', total: 12000 },
        
        // Dressage
        { id: 'DISC-021', name: 'Dressage Classique', category: 'disciplines', discipline: 'Dressage', rarity: 'common', color: '#10B981', icon: '🎭', total: 15000 },
        { id: 'DISC-022', name: 'Dressage Artistique', category: 'disciplines', discipline: 'Dressage', rarity: 'rare', color: '#10B981', icon: '🎭', total: 8000 },
        
        // Western - Plus rare
        { id: 'DISC-051', name: 'Western - Reining', category: 'disciplines', discipline: 'Western', rarity: 'rare', color: '#8B5CF6', icon: '🤠', total: 5000 },
        { id: 'DISC-052', name: 'Western - Barrel Racing', category: 'disciplines', discipline: 'Western', rarity: 'ultra-rare', color: '#8B5CF6', icon: '🤠', total: 3000 },
    ],
    
    cavaliers: [
        // Cavaliers actifs - Communs
        { id: 'CAV-001', name: 'Pénélope Leprevost', category: 'cavaliers', type: 'actif', rarity: 'common', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '👤', total: 12000, image: 'images/cards/penelope-leprevost.jpg' },
        { id: 'CAV-002', name: 'Pauline Basquin', category: 'cavaliers', type: 'actif', rarity: 'common', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '👤', total: 12000 },
        { id: 'CAV-003', name: 'Gaspard Maksud', category: 'cavaliers', type: 'actif', rarity: 'common', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '👤', total: 10000 },
        
        // Cavaliers actifs - Rares
        { id: 'CAV-011', name: 'Kevin Staut', category: 'cavaliers', type: 'actif', rarity: 'rare', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '⭐', total: 7000 },
        { id: 'CAV-012', name: 'Simon Delestre', category: 'cavaliers', type: 'actif', rarity: 'rare', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '⭐', total: 7000 },
        { id: 'CAV-013', name: 'Julien Épaillard', category: 'cavaliers', type: 'actif', rarity: 'rare', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '⭐', total: 6000 },
        
        // Cavaliers actifs - Ultra rares
        { id: 'CAV-021', name: 'Martin Fuchs', category: 'cavaliers', type: 'actif', rarity: 'ultra-rare', discipline: 'Saut d\'obstacles', nationality: '🇨🇭', icon: '💎', total: 3000 },
        { id: 'CAV-022', name: 'Isabell Werth', category: 'cavaliers', type: 'actif', rarity: 'ultra-rare', discipline: 'Dressage', nationality: '🇩🇪', icon: '💎', total: 3000 },
        
        // Cavaliers légendes
        { id: 'LEG-001', name: 'Pierre Durand', category: 'cavaliers', type: 'legende', rarity: 'legendary', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '🏆', total: 500, description: 'Champion olympique 1988 avec Jappeloup' },
        { id: 'LEG-002', name: 'Michel Robert', category: 'cavaliers', type: 'legende', rarity: 'legendary', discipline: 'Saut d\'obstacles', nationality: '🇫🇷', icon: '🏆', total: 500 },
        { id: 'LEG-003', name: 'John Whitaker', category: 'cavaliers', type: 'legende', rarity: 'legendary', discipline: 'Saut d\'obstacles', nationality: '🇬🇧', icon: '🏆', total: 400 },
    ],
    
    chevaux: [
        // Chevaux récents
        { id: 'CHV-001', name: 'Big Star', category: 'chevaux', type: 'recent', rarity: 'rare', discipline: 'Saut d\'obstacles', cavalier: 'Nick Skelton', icon: '🐴', total: 7000 },
        { id: 'CHV-002', name: 'Explosion W', category: 'chevaux', type: 'recent', rarity: 'rare', discipline: 'Saut d\'obstacles', cavalier: 'Peder Fredricson', icon: '🐴', total: 7000 },
        { id: 'CHV-003', name: 'Dalera', category: 'chevaux', type: 'recent', rarity: 'rare', discipline: 'Dressage', cavalier: 'Jessica von Bredow-Werndl', icon: '🐴', total: 6000 },
        
        // Chevaux légendaires
        { id: 'CHV-L01', name: 'Jappeloup', category: 'chevaux', type: 'legendaire', rarity: 'legendary', discipline: 'Saut d\'obstacles', cavalier: 'Pierre Durand', icon: '🦄', total: 500, years: '1980-1991', description: 'Légende olympique française' },
        { id: 'CHV-L02', name: 'Totilas', category: 'chevaux', type: 'legendaire', rarity: 'mythic', discipline: 'Dressage', cavalier: 'Edward Gal', icon: '🦄', total: 200, years: '2000-2020' },
        { id: 'CHV-L03', name: 'Baloubet du Rouet', category: 'chevaux', type: 'legendaire', rarity: 'legendary', discipline: 'Saut d\'obstacles', cavalier: 'Rodrigo Pessoa', icon: '🦄', total: 400 },
        { id: 'CHV-L04', name: 'Milton', category: 'chevaux', type: 'legendaire', rarity: 'legendary', discipline: 'Saut d\'obstacles', cavalier: 'John Whitaker', icon: '🦄', total: 350 },
    ],
    
    duos: [
        { id: 'DUO-001', name: 'Pierre Durand × Jappeloup', category: 'duos', rarity: 'mythic', discipline: 'Saut d\'obstacles', icon: '⭐', total: 200, description: 'Duo légendaire olympique 1988' },
        { id: 'DUO-002', name: 'Charlotte Dujardin × Valegro', category: 'duos', rarity: 'mythic', discipline: 'Dressage', icon: '⭐', total: 150 },
        { id: 'DUO-003', name: 'Isabell Werth × Totilas', category: 'duos', rarity: 'mythic', discipline: 'Dressage', icon: '⭐', total: 150 },
    ],
    
    moments: [
        { id: 'MOM-001', name: 'Finale Olympique 1988', category: 'moments', rarity: 'ultra-rare', discipline: 'Saut d\'obstacles', icon: '🏅', total: 1000, temporary: true },
        { id: 'MOM-002', name: 'Record du Monde Dressage', category: 'moments', rarity: 'ultra-rare', discipline: 'Dressage', icon: '🏅', total: 1000, temporary: true },
    ],
    
    event: [
        { id: 'EVT-001', name: 'Salon du Cheval 2025', category: 'event', rarity: 'rare', icon: '🏆', total: 5000, eventOnly: true },
        { id: 'EVT-002', name: 'Spectacle Équestre 2026', category: 'event', rarity: 'ultra-rare', icon: '🎪', total: 2000, eventOnly: true },
    ]
};

// Rarity weights for pack opening
const RARITY_WEIGHTS = {
    starter: {
        common: 0.75,
        rare: 0.20,
        'ultra-rare': 0.04,
        legendary: 0.01,
        mythic: 0.001
    },
    premium: {
        common: 0.45,
        rare: 0.35,
        'ultra-rare': 0.15,
        legendary: 0.04,
        mythic: 0.01
    },
    legendary: {
        common: 0.20,
        rare: 0.40,
        'ultra-rare': 0.25,
        legendary: 0.12,
        mythic: 0.03
    },
    event: {
        common: 0.10,
        rare: 0.30,
        'ultra-rare': 0.35,
        legendary: 0.20,
        mythic: 0.05
    }
};

// Get all cards as flat array
function getAllCards() {
    const allCards = [];
    Object.keys(CARDS_DATABASE).forEach(category => {
        CARDS_DATABASE[category].forEach(card => {
            allCards.push(card);
        });
    });
    return allCards;
}

// Get card by ID
function getCardById(id) {
    const allCards = getAllCards();
    return allCards.find(card => card.id === id);
}

// Get cards by category
function getCardsByCategory(category) {
    return CARDS_DATABASE[category] || [];
}

// Get cards by rarity
function getCardsByRarity(rarity) {
    return getAllCards().filter(card => card.rarity === rarity);
}
