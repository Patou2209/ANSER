# Site institutionnel de l'ANSER

Site vitrine de l'**Agence Nationale de l'Électrification et des Services Énergétiques
en milieux rural et périurbain** (ANSER) — République Démocratique du Congo.

## Présentation du projet

- **Nature** : site statique (HTML, CSS, JavaScript natif). Aucune dépendance Node.js,
  aucun processus serveur, aucune étape de compilation obligatoire.
- **Objectif** : présenter la mission, les projets, les mécanismes de financement et les
  procédures de l'ANSER, et offrir un point de contact clair aux partenaires,
  investisseurs et opérateurs privés.
- **Langue** : français intégral.
- **Accessibilité** : structure sémantique, attributs `aria-*`, lien d'évitement,
  respect de `prefers-reduced-motion`, cibles tactiles confortables sur mobile.

## Pages du site

| Fichier | Page | Contenu principal |
|---|---|---|
| `index.html` | Accueil | Diaporama d'ouverture, chiffres clés animés, six domaines d'intervention, démarche en quatre étapes, pools d'électrification, Fonds Mwinda, citation, dernières actualités, bandeau de partenaires, appel à l'action |
| `about.html` | À propos | Mission, vision, valeurs, historique, gouvernance, objectifs, réalisations, équipe, partenariats |
| `projets.html` | Projets | Compteurs d'impact, filtres par technologie, neuf projets détaillés, frise du cycle de projet, indicateurs d'impact |
| `appels-offres.html` | Appels d'offres | Principes de passation, tableau des consultations avec statuts (ouvert / bientôt / clos), procédure en cinq étapes, pièces à fournir, questions fréquentes |
| `fonds-mwinda.html` | Fonds Mwinda | Statistiques du fonds, mécanisme de financement basé sur les résultats, technologies éligibles, critères d'éligibilité, parcours de candidature, questions fréquentes |
| `actualites.html` | Actualités | Article à la une, filtres thématiques, neuf actualités |
| `blog.html` | Blog | Quatre dossiers thématiques, filtres, huit articles de fond |
| `contact.html` | Contact | Coordonnées, formulaire de contact validé côté client, six pools d'électrification, réseaux sociaux |
| `mentions-legales.html` | Mentions légales | Éditeur, cadre juridique, conditions d'utilisation, données personnelles, propriété intellectuelle |
| `maintennance.html` | Maintenance | Page d'attente pour les rubriques en préparation |

La **barre de navigation** et le **pied de page** sont rigoureusement identiques sur les
dix pages (vérifiés par empreinte). Seul le contenu central change.

## Architecture des fichiers

```
webapp/
├── index.html … mentions-legales.html   Pages générées (ne pas modifier à la main)
├── index.css                            Feuille d'origine — accueil, navbar, pied de page
├── about.css                            Feuille d'origine — page À propos
├── track.css                            Feuille d'origine — carrousels et bannières
├── responsiveness.css                   Feuille d'origine — points de rupture
├── pages.css                            Système de design partagé (chargé en dernier)
├── index.js                             Diaporama d'accueil et carrousel de projets
├── pages.js                             Script partagé (menu, animations, filtres…)
├── about.js                             Ancien script — plus référencé
├── img/                                 Photographies et logos fournis par l'ANSER
├── _generateur/                         Générateur des pages (voir ci-dessous)
│   ├── build.py                         Source unique de la navbar et du pied de page
│   └── bodies/                          Contenu central de chaque page
├── ecosystem.config.cjs                 Serveur statique local (PM2)
└── README.md
```

### Discipline CSS

Les quatre feuilles d'origine (`index.css`, `about.css`, `track.css`,
`responsiveness.css`) **ne sont jamais modifiées**. Toute correction ou tout ajout passe
par `pages.css`, systématiquement chargé en dernier, à l'aide de sélecteurs cadrés.
Cette règle garantit que les feuilles d'origine restent réutilisables telles quelles.

## Charte graphique

La palette provient exclusivement des feuilles d'origine ; aucune couleur nouvelle n'a
été introduite.

| Variable | Valeur | Usage |
|---|---|---|
| `--anser-bleu` | `rgb(21, 21, 100)` | Bleu principal |
| `--anser-bleu-nuit` | `#070245` | Fonds sombres, menu mobile |
| `--anser-bleu-fonce` | `#162667` | Pied de page |
| `--anser-bleu-clair` | `#073276` | Dégradés |
| `--anser-jaune` | `#ffd400` | Couleur d'accent |
| `--anser-jaune-clair` | `#ffe34f` | Survols |
| `--anser-gris` | `#514f4f` | Texte courant |
| `--anser-gris-clair` | `#7b838a` | Texte secondaire |
| `--anser-fond` | `#f5f5f5` | Fond de section |
| `--anser-fond-alt` | `#f0f2f7` | Fond alterné |
| `--anser-fond-carte` | `#f9fcff` | Fond de carte |
| `--anser-bordure` | `#eef3f8` | Bordures |

- **Typographie** : Oswald (Google Fonts).
- **Icônes** : Font Awesome 6.5.2 uniquement. **Aucun SVG** n'est utilisé dans le site.
- **Images** : uniquement les fichiers présents dans `img/`. Aucune image n'est générée.

## Animations et interactions

`pages.js` regroupe l'ensemble des comportements partagés :

- révélation au défilement via `IntersectionObserver` : `data-anim="bas|haut|gauche|droite|zoom|fondu"`,
  décalage progressif avec `data-anim-delai` ;
- compteurs animés `data-compteur` (interpolation `easeOutCubic`, format français,
  `data-decimales`, `data-duree`) ;
- jauges de progression `data-jauge` ;
- accordéons accessibles (`aria-expanded`) ;
- filtres de listes (`data-groupe-filtres`, `data-filtre`, `data-categorie`) ;
- barre de progression de lecture ;
- bouton de retour en haut de page ;
- navigation compacte au défilement ;
- validation du formulaire de contact ;
- mise à jour automatique de l'année dans le pied de page.

Toutes les animations sont désactivées lorsque le système signale
`prefers-reduced-motion: reduce`.

## Régénérer les pages

La navbar et le pied de page sont définis **une seule fois**, dans
`_generateur/build.py`. Le contenu central de chaque page vit dans
`_generateur/bodies/<page>.html`.

```bash
cd /home/user/webapp
python3 _generateur/build.py
```

Le script réécrit les dix fichiers HTML de la racine.

**Conséquences pratiques :**

- pour changer un lien du menu ou une coordonnée du pied de page → modifier
  `_generateur/build.py`, puis relancer le script ;
- pour changer le contenu d'une page → modifier `_generateur/bodies/<page>.html`, puis
  relancer le script ;
- pour changer uniquement le style → modifier `pages.css`, aucune régénération nécessaire.

Ne jamais éditer directement les fichiers HTML de la racine : ils seraient écrasés à la
régénération suivante.

## Prévisualisation locale

Le site étant statique, un simple serveur de fichiers suffit :

```bash
cd /home/user/webapp
python3 -m http.server 3000
```

Ou via PM2 :

```bash
cd /home/user/webapp
pm2 start ecosystem.config.cjs
pm2 logs anser-site --nostream
```

## Coordonnées publiées sur le site

- **Siège** : Bâtiment Orgamane, 4845 avenue Lukusa, Gombe, Kinshasa (RDC)
- **Téléphone** : +243 810 111 171
- **Courriel** : anser@anser.gouv.cd

## Contrôles effectués

- aucune erreur console sur les dix pages ;
- aucun débordement horizontal à 1440 px, 768 px et 390 px ;
- navbar et pied de page identiques sur les dix pages (comparaison par empreinte) ;
- tous les liens internes résolus, toutes les images référencées existantes ;
- menu mobile validé par interaction réelle (ouverture, fermeture, superposition).

## Pistes d'évolution

- Alimenter les actualités et les articles de blog depuis une source de données plutôt
  qu'en HTML statique.
- Brancher le formulaire de contact sur un service d'envoi de courriels (le formulaire
  valide actuellement les champs côté client sans transmission).
- Ajouter une version anglaise et une version lingala/swahili.
- Publier des pages détaillées par projet et par pool d'électrification.
- Remplacer les photographies génériques par les visuels définitifs de l'ANSER.

## Déploiement

- **Type** : site statique, déployable sur tout hébergeur de fichiers
  (GitHub Pages, Cloudflare Pages, Netlify, serveur Apache/Nginx…).
- **Aucune étape de compilation** n'est requise : le contenu de ce dossier est le site.
- **Dépôt** : https://github.com/Patou2209/ANSER
