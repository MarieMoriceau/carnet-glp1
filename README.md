# Carnet — suivi GLP-1

Carnet de suivi quotidien (repas, symptômes, paliers, mensurations, aliments déclencheurs)
pour les personnes sous Wegovy, Mounjaro ou un autre traitement GLP-1.

**Aucune donnée ne quitte le téléphone.** Pas de compte, pas de base de données, pas de serveur applicatif.
Le site n'est qu'une page statique : chaque carnet vit dans le navigateur de la personne qui l'utilise.
L'en-tête `Content-Security-Policy` (voir `render.yaml`) interdit d'ailleurs à la page d'envoyer quoi que ce soit ailleurs.

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'appli (interface + logique) |
| `sw.js` | Permet d'ouvrir l'appli hors connexion |
| `manifest.json` | Icône et nom quand on l'installe sur l'écran d'accueil |
| `static/icone.png` | L'icône |
| `render.yaml` | Configuration Render (site statique gratuit) |

## Mettre à jour le dépôt (depuis l'ancienne version Flask/Notion)

Dans le Terminal, depuis le dossier du dépôt `carnet-wegovy` :

```bash
git rm -r --quiet app.py requirements.txt templates
# copier ici les fichiers du nouveau zip (index.html, sw.js, manifest.json, render.yaml, README.md, static/)
git add .
git commit -m "Carnet local-first : plus de Notion, chaque carnet reste sur le téléphone"
git push
```

## Déployer sur Render

L'ancien service était un « Web Service » Python : Render ne sait pas le transformer en site statique.

1. Render → **New** → **Static Site** → choisir le dépôt `carnet-wegovy`
2. Build Command : laisser vide · Publish Directory : `.`
3. **Create Static Site**
4. Une fois en ligne, supprimer l'ancien Web Service `carnet-wegovy` (et la variable `NOTION_TOKEN` avec).

Un site statique Render ne s'endort pas : plus d'attente de 50 secondes au premier lancement.

## Installer sur l'iPhone

Safari → ouvrir l'URL → **Partager** → **Sur l'écran d'accueil**, puis ouvrir l'appli **depuis l'icône**.
Sur iPhone, Safari et l'appli installée ont chacun leur propre stockage :
un carnet commencé dans Safari n'apparaît pas dans l'icône (et inversement).

## À savoir

- **Sauvegarde** : onglet *Mes données* → *Sauvegarder mon carnet* produit un fichier `.json`.
  L'appli le rappelle toutes les semaines. *Restaurer* recharge ce fichier (nouveau téléphone, navigateur vidé…).
- **Paliers** : générés toutes les 4 semaines à partir de la première injection, modifiables un par un
  (palier prolongé, retour en arrière décidé par le médecin…).
- **Export médecin** : *Mes données* → *Préparer l'export* ouvre l'impression ; sur iPhone, Partager → Enregistrer dans Fichiers pour obtenir le PDF.
- Ce n'est pas un dispositif médical : l'appli n'affiche aucun conseil, seulement ce que la personne saisit.
