# Salon du Cheval 2026 - Application de Collection de Cartes

**Un salon où la passion équestre se collectionne**

## 📋 Description

Application web mobile de collection de cartes pour le Salon du Cheval 2026. Les utilisateurs peuvent :
- Acheter des paquets de cartes
- Scanner des cartes physiques pour les ajouter à leur collection
- Consulter et gérer leur collection type "Pokédex"
- Échanger des cartes avec d'autres collectionneurs

## 🎨 Design

### Couleurs
- **Principales** : `#202222` (noir), `#FFFFFF` (blanc)
- **Complémentaire** : `#36C1D2` (cyan)

### Raretés
- ⭐ **Commun** : Gris `#9CA3AF`
- ⭐⭐ **Rare** : Bleu `#3B82F6`
- ⭐⭐⭐ **Ultra Rare** : Violet `#8B5CF6`
- ⭐⭐⭐⭐ **Légendaire** : Or `#F59E0B`
- ⭐⭐⭐⭐⭐ **Mythique** : Rouge `#EF4444`

## 🗂️ Catégories de Cartes

### 1. Disciplines (70 cartes)
- Saut d'obstacles 🟦
- Courses (plat/obstacle) 🟧
- Dressage 🟩
- Concours Complet 🟥
- Endurance 🟨
- Western 🟪 (plus rare)
- Attelage 🟫 (plus rare)
- Voltige ⚫ (plus rare)

### 2. Cavaliers
#### Cavaliers Actifs 🟢
- Communs : 10,000-15,000 exemplaires
- Rares : 5,000-10,000 exemplaires
- Ultra Rares : 1,000-5,000 exemplaires

#### Cavaliers Légendes 🔵
- Légendaires : 100-500 exemplaires
- Design vintage avec effets dorés

### 3. Chevaux Iconiques 🐴
- Chevaux récents (5,000-10,000 ex.)
- Chevaux légendaires (50-3,000 ex.)
  - Jappeloup, Totilas, Baloubet du Rouet, Milton

### 4. Duos Mythiques ⭐
- Cartes premium ultra-rares
- 100-200 exemplaires uniquement
- Exemples : Pierre Durand × Jappeloup, Charlotte Dujardin × Valegro

### 5. Moments de Légende 🎯
- Cartes temporaires (disponibles par semaine)
- 500 exemplaires puis disparaissent
- Créent un sentiment de FOMO

### 6. Salon du Cheval 🏆
- Exclusives à l'événement
- Non récupérables après le salon (sauf échange)
- Déblocables via : stands, conférences, achats

## 🚀 Structure du Projet

```
project week/
├── index.html              # Page d'accueil
├── shop.html              # Boutique de paquets
├── scan.html              # Scanner de cartes
├── collection.html        # Collection (Pokédex)
├── trade.html             # Échanges entre joueurs
├── card-detail.html       # Détails d'une carte
│
├── css/
│   ├── main.css          # Styles globaux
│   ├── components.css    # Composants réutilisables
│   ├── animations.css    # Animations
│   ├── shop.css          # Styles boutique
│   ├── scan.css          # Styles scanner
│   ├── collection.css    # Styles collection
│   ├── trade.css         # Styles échanges
│   └── card-detail.css   # Styles détail carte
│
└── js/
    ├── data.js           # Base de données des cartes
    ├── utils.js          # Fonctions utilitaires
    ├── main.js           # Logic page d'accueil
    ├── shop.js           # Logic boutique
    ├── scan.js           # Logic scanner
    ├── collection.js     # Logic collection
    ├── trade.js          # Logic échanges
    └── card-detail.js    # Logic détail carte
```

## 🎮 Fonctionnalités

### Page d'accueil
- Statistiques utilisateur (cartes possédées, % complétion)
- Accès rapide aux fonctionnalités principales
- Cartes en vedette
- Actualités et événements

### Boutique
- **Pack Starter** (50 💰) : Cartes communes
- **Pack Premium** (100 💰) : Meilleure chance de rares
- **Pack Légendaire** (200 💰) : Garantit au moins 1 rare
- **Pack Événementiel** (300 💰) : Exclusif salon
- Offres groupées avec réductions
- Animation d'ouverture de paquets

### Scanner
- Activation caméra (simulée)
- Entrée manuelle de code (format XXXX-XXXX-XXXX)
- Historique des dernières cartes scannées
- Conseils de scan
- Modal de succès avec animation

### Collection
- Vue grille / liste
- Filtres par catégorie, rareté, possession
- Progression par catégorie
- Indicateur de doublons
- Statistiques de complétion
- Cartes manquantes en grisé

### Échanges
- **Onglet Offres** : Propositions reçues
- **Onglet Marché** : Cartes disponibles
- **Onglet Mes échanges** : Historique
- Système de notation des joueurs
- Création d'offres personnalisées

### Détails de carte
- Affichage 3D avec effet de survol
- Onglets : Informations, Statistiques, Historique
- Informations détaillées (palmarès, années, etc.)
- Popularité et valeur estimée
- Actions : Échanger, Vendre, Partager, Favoris

## 💾 Stockage Local

Utilise `localStorage` pour :
- Collection utilisateur
- Crédits
- Historique de scans
- Échanges en cours
- Favoris

## 🎯 Mécaniques de Jeu

### Système de Crédits
- Crédit de départ : 500 💰
- Gain lors de doublons : +10 💰
- Vente de cartes selon rareté :
  - Commun : 10 💰
  - Rare : 25 💰
  - Ultra Rare : 75 💰
  - Légendaire : 200 💰
  - Mythique : 500 💰

### Probabilités d'obtention
Les paquets ont des poids différents pour chaque rareté, favorisant les cartes légendaires dans les packs premium.

## 📱 Responsive Design

- Optimisé pour mobile (max-width: 428px)
- Format vertical
- Navigation bottom-bar fixe
- Animations fluides
- Touch-friendly

## 🚀 Lancement

1. Ouvrir `index.html` dans un navigateur
2. L'application utilise uniquement HTML, CSS et JavaScript vanilla
3. Aucune installation nécessaire
4. Fonctionne hors-ligne (données locales)

## 🎨 Animations

- Fade in / Slide in pour les entrées
- Card flip pour révélation
- Pack shake et explosion lors d'ouverture
- Scan line animée
- Hover effects sur cartes
- Transitions fluides entre pages

## 🔮 Évolutions Futures

- Backend API pour synchronisation
- Vrai système de scan QR code
- Marketplace avec prix réels
- Notifications push pour événements
- Mode sombre
- Classements et achievements
- Mini-jeux pour gagner des cartes

## 👥 Crédits

Projet créé pour le Salon du Cheval 2026
© 2026 Tous droits réservés
