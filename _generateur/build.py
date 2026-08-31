#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Assemble les pages du site ANSER en injectant un en-tête (barre supérieure +
navigation) et un pied de page strictement identiques sur toutes les pages.

Usage :
    python3 build.py
Les corps de page sont lus depuis ./bodies/<nom>.html
Les pages finales sont écrites dans /home/user/webapp/<nom>.html
"""

import os
import re

RACINE = "/home/user/webapp"
BODIES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "bodies")

# ---------------------------------------------------------------------------
# MENU PRINCIPAL — source unique de vérité
# ---------------------------------------------------------------------------

MENU = [
    ("index.html",           "Accueil"),
    ("about.html",           "À propos"),
    ("projets.html",         "Projets"),
    ("appels-offres.html",   "Appels d'offres"),
    ("fonds-mwinda.html",    "Fonds Mwinda"),
    ("blog.html",            "Blog"),
    ("actualites.html",      "Actualités"),
    ("contact.html",         "Contact"),
]

TELEPHONE = "+243 810 111 171"
TELEPHONE_BRUT = "243810111171"
COURRIEL = "anser@anser.gouv.cd"

# ---------------------------------------------------------------------------
# GABARIT : BARRE SUPÉRIEURE + NAVIGATION
# ---------------------------------------------------------------------------

def entete(page_active):
    liens = []
    for fichier, libelle in MENU:
        classe = ' class="active-tab"' if fichier == page_active else ""
        aria = ' aria-current="page"' if fichier == page_active else ""
        liens.append(
            '                <li><a href="{0}"{1}{2}>{3}</a></li>'.format(
                fichier, classe, aria, libelle
            )
        )
    liens = "\n".join(liens)

    return """    <!-- =========================================================
         BARRE SUPÉRIEURE — contact rapide et réseaux sociaux
         (identique sur toutes les pages)
    ========================================================== -->
    <div class="top-nav">
        <div class="contact-info">
            <span>
                <i class="fas fa-phone" aria-hidden="true"></i>
                <a href="tel:+{tel_brut}">{tel}</a>
            </span>
            <span>
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <a href="mailto:{mail}">{mail}</a>
            </span>
        </div>
        <div class="social-icons">
            <a href="https://www.facebook.com/p/ANSER-100066298099565/" target="_blank" rel="noopener" aria-label="Facebook">
                <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
            <a href="https://twitter.com/ANSER_RDC" target="_blank" rel="noopener" aria-label="X (anciennement Twitter)">
                <i class="fab fa-x-twitter" aria-hidden="true"></i>
            </a>
            <a href="https://cd.linkedin.com/company/anser-rdc" target="_blank" rel="noopener" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
            <a href="https://www.youtube.com/@ANSER_RDC" target="_blank" rel="noopener" aria-label="YouTube">
                <i class="fab fa-youtube" aria-hidden="true"></i>
            </a>
        </div>
    </div>

    <!-- =========================================================
         NAVIGATION PRINCIPALE (identique sur toutes les pages)
    ========================================================== -->
    <nav id="navigation-principale" aria-label="Navigation principale">
        <a href="index.html" class="nav-logo" aria-label="Retour à l'accueil">
            <img src="./img/anser_logo_bleu_font.png" alt="Logo de l'ANSER">
        </a>
        <div class="navigation">
            <ul>
                <i id="menu-close" class="fas fa-times" role="button" tabindex="0" aria-label="Fermer le menu"></i>
{liens}
            </ul>
            <img id="menu-btn" src="./img/menu.png" alt="" role="button" tabindex="0" aria-label="Ouvrir le menu">
        </div>
    </nav>
""".format(liens=liens, tel=TELEPHONE, tel_brut=TELEPHONE_BRUT, mail=COURRIEL)


# ---------------------------------------------------------------------------
# GABARIT : PIED DE PAGE
# ---------------------------------------------------------------------------

PIED = """    <!-- =========================================================
         PIED DE PAGE (identique sur toutes les pages)
    ========================================================== -->
    <footer>
        <section id="footer">

            <div class="footer-col">
                <img src="./img/logo_yellow_white-removebg-preview.png" alt="Logo de l'ANSER">
                <h3>Liens utiles</h3>
                <ul>
                    <li><a href="appels-offres.html">Soumission d'appels d'offres</a></li>
                    <li><a href="actualites.html">Actualités</a></li>
                    <li><a href="fonds-mwinda.html">Fonds Mwinda</a></li>
                    <li><a href="mentions-legales.html">Mentions légales</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Navigation</h3>
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="about.html">À propos</a></li>
                    <li><a href="projets.html">Projets</a></li>
                    <li><a href="appels-offres.html">Appels d'offres</a></li>
                    <li><a href="fonds-mwinda.html">Fonds Mwinda</a></li>
                    <li><a href="blog.html">Blog</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Nos domaines</h3>
                <ul>
                    <li><a href="projets.html">Réseaux et extensions</a></li>
                    <li><a href="projets.html">Centrales solaires</a></li>
                    <li><a href="projets.html">Mini-réseaux hybrides</a></li>
                    <li><a href="projets.html">Hydroélectricité rurale</a></li>
                    <li><a href="projets.html">Éclairage public</a></li>
                    <li><a href="contact.html">Nous contacter</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Coordonnées</h3>
                <ul>
                    <li>Siège social de l'ANSER, Kinshasa, RDC<br>
                        Bâtiment Orgamane, 4845,<br>
                        avenue Lukusa, commune de la Gombe</li>
                    <li><a href="tel:+243810111171">+243 810 111 171</a></li>
                    <li><a href="mailto:anser@anser.gouv.cd">anser@anser.gouv.cd</a></li>
                </ul>
                <div class="footer-boutons">
                    <a class="footer-bouton" href="https://wa.me/243810111171"
                       target="_blank" rel="noopener">
                        <i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp
                    </a>
                    <a class="footer-bouton footer-bouton--contour" href="mailto:anser@anser.gouv.cd">
                        <i class="fas fa-envelope" aria-hidden="true"></i> Courriel
                    </a>
                </div>
            </div>

            <div class="copyright">
                <p class="technoweb">
                    &copy; <span data-annee>2026</span> ANSER — Agence Nationale de l'Électrification
                    et des Services Énergétiques en milieux rural et périurbain.<br>
                    Tous droits réservés.
                </p>
                <div class="pro-links">
                    <a href="https://www.facebook.com/p/ANSER-100066298099565/" target="_blank" rel="noopener" aria-label="Facebook">
                        <i class="fab fa-facebook-f" aria-hidden="true"></i>
                    </a>
                    <a href="https://twitter.com/ANSER_RDC" target="_blank" rel="noopener" aria-label="X (anciennement Twitter)">
                        <i class="fab fa-x-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://cd.linkedin.com/company/anser-rdc" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.youtube.com/@ANSER_RDC" target="_blank" rel="noopener" aria-label="YouTube">
                        <i class="fab fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </section>
    </footer>

    <!-- Bouton de retour en haut de page -->
    <button class="retour-haut" type="button" aria-label="Revenir en haut de la page">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
"""

# ---------------------------------------------------------------------------
# GABARIT COMPLET DE LA PAGE
# ---------------------------------------------------------------------------

GABARIT = """<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titre}</title>
    <meta name="description" content="{description}">
    <meta name="theme-color" content="#151564">

    <!-- Feuilles de style -->
{styles}

    <!-- Polices et icônes -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css">

    <link rel="icon" type="image/png" href="./img/icone-removebg.png">
</head>

<body>

    <!-- Barre de progression de lecture -->
    <div class="barre-lecture" aria-hidden="true"></div>

{entete}
{corps}
{pied}

{scripts}
</body>
</html>
"""


def construire(nom_fichier, titre, description, corps, styles, scripts):
    contenu = GABARIT.format(
        titre=titre,
        description=description,
        styles="\n".join(
            '    <link rel="stylesheet" href="{0}">'.format(s) for s in styles
        ),
        entete=entete(nom_fichier),
        corps=corps,
        pied=PIED,
        scripts="\n".join(
            '    <script src="{0}"></script>'.format(s) for s in scripts
        ),
    )

    chemin = os.path.join(RACINE, nom_fichier)
    with open(chemin, "w", encoding="utf-8") as flux:
        flux.write(contenu)
    print("écrit : {0} ({1} octets)".format(nom_fichier, len(contenu.encode())))


def lire_corps(nom):
    chemin = os.path.join(BODIES, nom)
    with open(chemin, "r", encoding="utf-8") as flux:
        return flux.read().rstrip("\n")


# ---------------------------------------------------------------------------
# DÉFINITION DES PAGES
# ---------------------------------------------------------------------------

STYLES_BASE = ["index.css", "track.css", "responsiveness.css", "pages.css"]
STYLES_INTERIEUR = ["index.css", "track.css", "responsiveness.css", "pages.css"]

PAGES = [
    {
        "fichier": "index.html",
        "titre": "ANSER — L'électricité pour tous en République Démocratique du Congo",
        "description": "L'Agence Nationale de l'Électrification et des Services Énergétiques en milieux rural et périurbain (ANSER) planifie, finance et coordonne l'électrification des territoires ruraux et périurbains de la RDC.",
        "corps": "index.html",
        "styles": STYLES_BASE,
        "scripts": ["index.js", "pages.js"],
    },
    {
        "fichier": "about.html",
        "titre": "À propos de l'ANSER — Mission, vision et gouvernance",
        "description": "Découvrez l'ANSER : son cadre institutionnel, ses 23 missions légales, sa gouvernance, ses six pools d'électrification et ses objectifs d'accès universel à l'électricité en RDC.",
        "corps": "about.html",
        "styles": ["about.css", "index.css", "responsiveness.css", "pages.css"],
        "scripts": ["pages.js"],
    },
    {
        "fichier": "projets.html",
        "titre": "Nos projets d'électrification — ANSER",
        "description": "Réseaux, centrales solaires, mini-réseaux hybrides, hydroélectricité et éclairage public : découvrez le portefeuille de projets d'électrification rurale et périurbaine conduits par l'ANSER en RDC.",
        "corps": "projets.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "appels-offres.html",
        "titre": "Appels d'offres et marchés publics — ANSER",
        "description": "Consultez les avis d'appels d'offres de l'ANSER, les conditions de participation, la procédure de soumission et les documents à fournir pour les marchés d'électrification rurale et périurbaine.",
        "corps": "appels-offres.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "fonds-mwinda.html",
        "titre": "Le Fonds Mwinda — Financer l'accès à l'énergie | ANSER",
        "description": "Le Fonds Mwinda est un mécanisme de subventions basées sur les résultats, placé sous l'égide de l'ANSER, destiné à rendre l'électricité et la cuisson propre accessibles aux ménages ruraux et périurbains de la RDC.",
        "corps": "fonds-mwinda.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "actualites.html",
        "titre": "Actualités de l'ANSER — Informations et communiqués",
        "description": "Suivez l'actualité de l'ANSER : inaugurations de projets, lancements d'appels à projets, partenariats stratégiques et communiqués officiels sur l'électrification de la RDC.",
        "corps": "actualites.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "blog.html",
        "titre": "Blog de l'ANSER — Analyses et regards sur l'énergie",
        "description": "Analyses, dossiers thématiques et retours d'expérience de l'ANSER sur l'électrification rurale, les énergies renouvelables décentralisées et le développement économique local en RDC.",
        "corps": "blog.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "contact.html",
        "titre": "Contactez l'ANSER — Siège, pools et formulaire",
        "description": "Adressez votre demande à l'ANSER : coordonnées du siège de Kinshasa, contacts des pools d'électrification, formulaire en ligne et horaires d'ouverture.",
        "corps": "contact.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "mentions-legales.html",
        "titre": "Mentions légales et politique de confidentialité — ANSER",
        "description": "Mentions légales du site de l'ANSER : éditeur, cadre juridique, propriété intellectuelle, protection des données personnelles et conditions d'utilisation.",
        "corps": "mentions-legales.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
    {
        "fichier": "maintennance.html",
        "titre": "Page en cours de construction — ANSER",
        "description": "Cette rubrique du site de l'ANSER est en cours de construction. Nos équipes travaillent à sa mise en ligne prochaine.",
        "corps": "maintennance.html",
        "styles": STYLES_INTERIEUR,
        "scripts": ["pages.js"],
    },
]


def main():
    for page in PAGES:
        chemin_corps = os.path.join(BODIES, page["corps"])
        if not os.path.exists(chemin_corps):
            print("ignoré (corps absent) : {0}".format(page["fichier"]))
            continue

        construire(
            page["fichier"],
            page["titre"],
            page["description"],
            lire_corps(page["corps"]),
            page["styles"],
            page["scripts"],
        )


if __name__ == "__main__":
    main()
