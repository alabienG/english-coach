# Coach Anglais — PWA

Application web installable (PWA) pour apprendre l'anglais : test de niveau adaptatif (CECRL A1→C1),
planning personnalisé, séance quotidienne (répétition espacée, grammaire, dictée, prononciation, lecture).
100 % gratuite, hors ligne, sans compte : les données restent dans le navigateur du téléphone.

## Tester sur l'ordinateur

```bash
python3 -m http.server 8765
```
Puis ouvrir http://localhost:8765

## Installer sur le téléphone (Android + Chrome)

Une PWA doit être servie en **HTTPS** pour être installable. Le plus simple, gratuitement :

**Option A — GitHub Pages**
1. Créer un dépôt sur GitHub et y déposer tout le contenu de ce dossier.
2. Settings › Pages › « Deploy from a branch » › `main` / racine.
3. Ouvrir l'URL `https://<votre-compte>.github.io/<depot>/` dans Chrome sur le téléphone.

**Option B — Netlify Drop**
1. Aller sur https://app.netlify.com/drop et glisser-déposer ce dossier.
2. Ouvrir l'URL fournie dans Chrome sur le téléphone.

Puis dans Chrome : menu ⋮ › **Installer l'application** (ou « Ajouter à l'écran d'accueil »).

## Bon à savoir
- La voix anglaise utilise la synthèse vocale du téléphone (réglage de l'accent GB/US dans Progrès).
- L'exercice de prononciation utilise la reconnaissance vocale de Chrome : il faut une connexion internet
  et autoriser le micro. Sans elle, l'app passe en auto-évaluation.
- Pensez à exporter votre sauvegarde (Progrès › Sauvegarde) de temps en temps.
- Pour publier une mise à jour du contenu, changez `CACHE` dans `sw.js` (ex. `coach-anglais-v2`).

## Structure
- `index.html`, `styles.css`, `app.js` : l'application
- `data/` : contenu pédagogique (200 mots, 75 phrases audio, 20 leçons de grammaire, 10 textes, 30 questions de test)
- `sw.js`, `manifest.webmanifest`, `icons/` : partie PWA (hors ligne + installation)
