# Code Scout Morse - Application d'Apprentissage du Code Morse

## 🏕️ Description

**Code Scout Morse** est une application web ludique et éducative destinée aux scouts de tous âges pour apprendre le code Morse de manière progressive et amusante, inspirée des méthodes de gamification comme Duolingo.

## ✨ Fonctionnalités

### 🎯 Pour les Apprenants
- **Leçons Progressives** : Alphabet découpé en leçons de 5 lettres
- **Quiz Interactifs** : 3 niveaux de difficulté (Débutant, Intermédiaire, Expert)
- **Audio Morse** : Écoutez le vrai son du code Morse généré en temps réel
- **Système d'XP** : Gagnez de l'expérience à chaque bonne réponse
- **Niveaux Évolutifs** : Progressez de niveau en accumulant de l'XP

### 🏆 Gamification
- **Badges à Débloquer** : 10 badges différents à collectionner
- **Séries Quotidiennes** : Maintenez votre série de jours consécutifs
- **Tableau de Progression** : Suivez votre avancement en temps réel
- **Statistiques Détaillées** : XP, leçons complétées, badges, séries

### 📱 Interface Utilisateur
- **Design Responsive** : Fonctionne sur mobile, tablette et desktop
- **Thème Moderne** : Utilisation de DaisyUI avec Tailwind CSS
- **Navigation Intuitive** : 4 pages principales (Accueil, Apprentissage, Quiz, Profil)
- **Feedback Visuel** : Animations et couleurs pour les bonnes/mauvaises réponses

## 🚀 Technologies Utilisées

- **React 19** - Bibliothèque UI moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Framework CSS utilitaire
- **DaisyUI 5** - Composants UI prêts à l'emploi
- **Lucide React** - Icônes modernes
- **Web Audio API** - Génération de sons Morse en temps réel
- **LocalStorage** - Sauvegarde locale de la progression

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version production
npm run preview
```

## 🎮 Comment Jouer

### Page d'Accueil
- Vue d'ensemble de votre progression
- Accès rapide aux leçons et quiz
- Statistiques principales (XP, niveau, badges, séries)

### Mode Apprentissage
1. Sélectionnez une leçon (5 lettres par leçon)
2. Découvrez chaque lettre avec son code Morse
3. Écoutez le son en cliquant sur le haut-parleur
4. Marquez les lettres comme "apprises"
5. Complétez la leçon pour gagner 50 XP bonus

### Mode Quiz
1. Choisissez votre difficulté :
   - **Débutant** : Lettres A-J, vitesse normale
   - **Intermédiaire** : Lettres A-T, vitesse normale
   - **Expert** : Toutes les lettres, vitesse rapide
2. Répondez aux questions (code → lettre ou lettre → code)
3. Gagnez des points selon la difficulté (10/20/30 pts)
4. Gardez vos 3 vies pour continuer
5. Accumulez les séries pour plus de points

### Page de Profil
- Consultez vos statistiques détaillées
- Voyez vos badges débloqués
- Découvrez les badges restants à obtenir
- Réinitialisez votre progression si besoin

## 🏅 Système de Badges

| Badge | Condition |
|-------|-----------|
| 🎯 Premiers Pas | Compléter 1 leçon |
| ⭐ Débutant | Atteindre 100 XP |
| 🌟 Intermédiaire | Atteindre 500 XP |
| ✨ Expert | Atteindre 1000 XP |
| 🏆 Maître Morse | Atteindre 2500 XP |
| 👑 Légende | Atteindre 5000 XP |
| 🔥 Série de Feu | 7 jours de suite |
| 💪 Persévérant | 15 jours de suite |
| ⚡ Dédicé | 30 jours de suite |
| 📚 Alphabet Complet | Terminer toutes les leçons |

## 💡 Conseils Pédagogiques

1. **Pratique Régulière** : Mieux vaut 5 minutes par jour qu'une heure par semaine
2. **Écoute Active** : Utilisez le son pour mémoriser le rythme
3. **Répétition** : Répétez les codes à voix haute
4. **Progressivité** : Commencez en mode débutant avant de passer expert
5. **Patience** : Le Morse s'apprend avec le temps, ne vous découragez pas !

## 🔄 Roadmap (Fonctionnalités Futures)

- [ ] Mode transmission (envoyer des messages en Morse)
- [ ] Challenge multijoueur
- [ ] Codes spéciaux (chiffres, ponctuation, signaux de détresse)
- [ ] Historique détaillé des sessions
- [ ] Thèmes personnalisables
- [ ] Mode hors-ligne (PWA)
- [ ] Export des progrès
- [ ] Sons personnalisables (vitesse, tonalité)

## 📄 Licence

Ce projet est open source et destiné à la communauté scoute.

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Ajouter de nouvelles fonctionnalités
- Améliorer la documentation

---

**Développé avec ❤️ pour la communauté scoute**

*« Un bon scout sait communiquer en Morse ! »* 🏕️
