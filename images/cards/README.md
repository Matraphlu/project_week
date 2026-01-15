# Images de Cartes

## Comment ajouter des images aux cartes

### 1. Préparer l'image

Les images de cartes doivent être au format de carte verticale (comme l'exemple de Pénélope Leprevost).

**Dimensions recommandées :**
- Ratio : 2:3 (par exemple 400x600px ou 600x900px)
- Format : JPG ou PNG
- Poids : Optimisé (< 500KB par image)

### 2. Nommer l'image

Utilisez un nom de fichier simple et descriptif :
- Format : `nom-prenom.jpg` ou `nom-carte.jpg`
- Exemple : `penelope-leprevost.jpg`
- Pas d'espaces, utilisez des tirets `-`
- Tout en minuscules

### 3. Placer l'image

Copiez votre image dans ce dossier :
```
images/cards/votre-image.jpg
```

### 4. Mettre à jour la base de données

Dans le fichier `js/data.js`, ajoutez le champ `image` à la carte :

```javascript
{ 
    id: 'CAV-001', 
    name: 'Pénélope Leprevost', 
    category: 'cavaliers', 
    type: 'actif', 
    rarity: 'common', 
    discipline: 'Saut d\'obstacles', 
    nationality: '🇫🇷', 
    icon: '👤', 
    total: 12000,
    image: 'images/cards/penelope-leprevost.jpg'  // ← Ajouter cette ligne
}
```

### 5. Vérifier

L'image apparaîtra automatiquement :
- Sur la page d'accueil (cartes en vedette)
- Dans la boutique (lors de l'ouverture de paquets)
- Dans le scanner (après scan)
- Dans la collection
- Sur la page de détails de la carte

Si l'image ne charge pas, le système affichera automatiquement l'emoji de fallback (icon).

## Exemple avec l'image fournie

L'image de Pénélope Leprevost fournie montre le style attendu :
- Cadre décoratif avec coins arrondis
- Photo du cavalier en tenue officielle
- Nom en grand en bas
- Informations de série en haut
- Design professionnel style carte de collection

Pour ajouter cette image :
1. Enregistrez l'image sous `images/cards/penelope-leprevost.jpg`
2. La carte CAV-001 est déjà configurée pour utiliser cette image

## Créer vos propres cartes

Vous pouvez utiliser un outil de design comme :
- Canva (modèle de carte à collectionner)
- Photoshop / GIMP
- Figma

Inspirez-vous du style de la carte fournie pour créer des designs cohérents.
