/* =========================================================
   ANSER — SCRIPT COMMUN AUX PAGES DU SITE
   Contient : menu mobile, animations au défilement,
   compteurs animés, jauges, accordéon, filtres,
   barre de progression de lecture, retour en haut,
   validation des formulaires.
========================================================= */

(function () {
    'use strict';

    var mouvementReduit = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    /* =====================================================
       1. MENU MOBILE
    ===================================================== */

    function initialiserMenu() {
        var bouton = document.getElementById('menu-btn');
        var fermeture = document.getElementById('menu-close');
        var navigation = document.querySelector('.navigation');

        if (!navigation) {
            return;
        }

        function ouvrir() {
            navigation.classList.add('active');
        }

        function fermer() {
            navigation.classList.remove('active');
        }

        if (bouton) {
            bouton.addEventListener('click', ouvrir);
        }

        if (fermeture) {
            fermeture.addEventListener('click', fermer);
        }

        /* Fermeture au clic sur un lien du menu */
        navigation.querySelectorAll('a').forEach(function (lien) {
            lien.addEventListener('click', fermer);
        });

        /* Fermeture avec la touche Échap */
        document.addEventListener('keydown', function (evenement) {
            if (evenement.key === 'Escape') {
                fermer();
            }
        });
    }

    /* =====================================================
       2. ANIMATIONS D'APPARITION AU DÉFILEMENT
    ===================================================== */

    function initialiserAnimations() {
        var elements = document.querySelectorAll('[data-anim]');

        if (!elements.length) {
            return;
        }

        if (mouvementReduit || !('IntersectionObserver' in window)) {
            elements.forEach(function (element) {
                element.classList.add('est-visible');
            });
            return;
        }

        var observateur = new IntersectionObserver(
            function (entrees) {
                entrees.forEach(function (entree) {
                    if (!entree.isIntersecting) {
                        return;
                    }

                    var element = entree.target;
                    var delai = parseInt(
                        element.getAttribute('data-anim-delai') || '0',
                        10
                    );

                    window.setTimeout(function () {
                        element.classList.add('est-visible');
                    }, delai);

                    observateur.unobserve(element);
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            }
        );

        elements.forEach(function (element) {
            observateur.observe(element);
        });
    }

    /* =====================================================
       3. COMPTEURS ANIMÉS
       Utilisation : <span data-compteur="500" data-decimales="0">0</span>
    ===================================================== */

    function animerCompteur(element) {
        var cible = parseFloat(element.getAttribute('data-compteur'));
        var decimales = parseInt(
            element.getAttribute('data-decimales') || '0',
            10
        );
        var duree = parseInt(
            element.getAttribute('data-duree') || '1800',
            10
        );

        if (isNaN(cible)) {
            return;
        }

        if (mouvementReduit) {
            element.textContent = cible.toLocaleString('fr-FR', {
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales
            });
            return;
        }

        var debut = null;

        function etape(horodatage) {
            if (debut === null) {
                debut = horodatage;
            }

            var avancement = Math.min((horodatage - debut) / duree, 1);

            /* Courbe d'accélération douce (easeOutCubic) */
            var lisse = 1 - Math.pow(1 - avancement, 3);
            var valeur = cible * lisse;

            element.textContent = valeur.toLocaleString('fr-FR', {
                minimumFractionDigits: decimales,
                maximumFractionDigits: decimales
            });

            if (avancement < 1) {
                window.requestAnimationFrame(etape);
            }
        }

        window.requestAnimationFrame(etape);
    }

    function initialiserCompteurs() {
        var compteurs = document.querySelectorAll('[data-compteur]');

        if (!compteurs.length) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            compteurs.forEach(animerCompteur);
            return;
        }

        var observateur = new IntersectionObserver(
            function (entrees) {
                entrees.forEach(function (entree) {
                    if (entree.isIntersecting) {
                        animerCompteur(entree.target);
                        observateur.unobserve(entree.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        compteurs.forEach(function (compteur) {
            observateur.observe(compteur);
        });
    }

    /* =====================================================
       4. JAUGES ANIMÉES
       Utilisation : <div class="jauge__valeur" data-jauge="52"></div>
    ===================================================== */

    function initialiserJauges() {
        var jauges = document.querySelectorAll('[data-jauge]');

        if (!jauges.length) {
            return;
        }

        function remplir(jauge) {
            jauge.style.width = jauge.getAttribute('data-jauge') + '%';
        }

        if (!('IntersectionObserver' in window)) {
            jauges.forEach(remplir);
            return;
        }

        var observateur = new IntersectionObserver(
            function (entrees) {
                entrees.forEach(function (entree) {
                    if (entree.isIntersecting) {
                        remplir(entree.target);
                        observateur.unobserve(entree.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        jauges.forEach(function (jauge) {
            observateur.observe(jauge);
        });
    }

    /* =====================================================
       5. ACCORDÉON
    ===================================================== */

    function initialiserAccordeons() {
        var accordeons = document.querySelectorAll('.accordeon');

        accordeons.forEach(function (accordeon) {
            var items = accordeon.querySelectorAll('.accordeon__item');

            items.forEach(function (item) {
                var tete = item.querySelector('.accordeon__tete');
                var corps = item.querySelector('.accordeon__corps');

                if (!tete || !corps) {
                    return;
                }

                tete.setAttribute('aria-expanded', 'false');

                tete.addEventListener('click', function () {
                    var etaitOuvert = item.classList.contains('is-ouvert');

                    /* Fermer les autres éléments du même accordéon */
                    items.forEach(function (autre) {
                        autre.classList.remove('is-ouvert');

                        var autreCorps = autre.querySelector('.accordeon__corps');
                        var autreTete = autre.querySelector('.accordeon__tete');

                        if (autreCorps) {
                            autreCorps.style.maxHeight = null;
                        }

                        if (autreTete) {
                            autreTete.setAttribute('aria-expanded', 'false');
                        }
                    });

                    if (!etaitOuvert) {
                        item.classList.add('is-ouvert');
                        corps.style.maxHeight = corps.scrollHeight + 'px';
                        tete.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        });
    }

    /* =====================================================
       6. FILTRES DE CONTENU
       Boutons : <button class="filtre" data-filtre="solaire">
       Éléments : <article data-categorie="solaire">
    ===================================================== */

    function initialiserFiltres() {
        var groupes = document.querySelectorAll('[data-groupe-filtres]');

        groupes.forEach(function (groupe) {
            var cible = document.querySelector(
                groupe.getAttribute('data-groupe-filtres')
            );

            if (!cible) {
                return;
            }

            var boutons = groupe.querySelectorAll('.filtre');
            var elements = cible.querySelectorAll('[data-categorie]');

            boutons.forEach(function (bouton) {
                bouton.addEventListener('click', function () {
                    var valeur = bouton.getAttribute('data-filtre');

                    boutons.forEach(function (autre) {
                        autre.classList.remove('is-actif');
                    });

                    bouton.classList.add('is-actif');

                    elements.forEach(function (element) {
                        var categories = (
                            element.getAttribute('data-categorie') || ''
                        ).split(' ');

                        var visible =
                            valeur === 'tous' ||
                            categories.indexOf(valeur) !== -1;

                        if (visible) {
                            element.style.display = '';
                            element.classList.remove('est-visible');

                            /* Réanimation douce à l'affichage */
                            window.requestAnimationFrame(function () {
                                element.classList.add('est-visible');
                            });
                        } else {
                            element.style.display = 'none';
                        }
                    });
                });
            });
        });
    }

    /* =====================================================
       7. BARRE DE PROGRESSION DE LECTURE
    ===================================================== */

    function initialiserBarreLecture() {
        var barre = document.querySelector('.barre-lecture');

        if (!barre) {
            return;
        }

        function mettreAJour() {
            var hauteur =
                document.documentElement.scrollHeight - window.innerHeight;

            var avancement =
                hauteur > 0 ? (window.scrollY / hauteur) * 100 : 0;

            barre.style.width = Math.min(avancement, 100) + '%';
        }

        window.addEventListener('scroll', mettreAJour, { passive: true });
        mettreAJour();
    }

    /* =====================================================
       8. BOUTON RETOUR EN HAUT
    ===================================================== */

    function initialiserRetourHaut() {
        var bouton = document.querySelector('.retour-haut');

        if (!bouton) {
            return;
        }

        function basculer() {
            if (window.scrollY > 480) {
                bouton.classList.add('est-visible');
            } else {
                bouton.classList.remove('est-visible');
            }
        }

        bouton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: mouvementReduit ? 'auto' : 'smooth'
            });
        });

        window.addEventListener('scroll', basculer, { passive: true });
        basculer();
    }

    /* =====================================================
       9. NAVIGATION COMPACTE AU DÉFILEMENT
    ===================================================== */

    function initialiserNavigationCompacte() {
        var navigation = document.querySelector('nav');

        if (!navigation) {
            return;
        }

        function basculer() {
            if (window.scrollY > 120) {
                navigation.classList.add('est-compacte');
            } else {
                navigation.classList.remove('est-compacte');
            }
        }

        window.addEventListener('scroll', basculer, { passive: true });
        basculer();
    }

    /* =====================================================
       10. VALIDATION DES FORMULAIRES
    ===================================================== */

    function initialiserFormulaires() {
        var formulaires = document.querySelectorAll('[data-formulaire]');

        formulaires.forEach(function (formulaire) {
            var message = formulaire.querySelector('.formulaire__message');

            formulaire.addEventListener('submit', function (evenement) {
                evenement.preventDefault();

                var valide = formulaire.checkValidity();

                if (!message) {
                    return;
                }

                message.classList.remove(
                    'formulaire__message--succes',
                    'formulaire__message--erreur'
                );

                if (valide) {
                    message.classList.add(
                        'is-visible',
                        'formulaire__message--succes'
                    );

                    message.innerHTML =
                        '<i class="fas fa-circle-check"></i>' +
                        '<span>Votre message a bien été pris en compte. ' +
                        'Nos équipes vous répondront dans les meilleurs délais.</span>';

                    formulaire.reset();
                } else {
                    message.classList.add(
                        'is-visible',
                        'formulaire__message--erreur'
                    );

                    message.innerHTML =
                        '<i class="fas fa-circle-exclamation"></i>' +
                        '<span>Veuillez compléter correctement ' +
                        'tous les champs obligatoires.</span>';
                }

                message.scrollIntoView({
                    behavior: mouvementReduit ? 'auto' : 'smooth',
                    block: 'center'
                });
            });
        });
    }

    /* =====================================================
       11. ANNÉE COURANTE DANS LE PIED DE PAGE
    ===================================================== */

    function initialiserAnnee() {
        var cibles = document.querySelectorAll('[data-annee]');
        var annee = new Date().getFullYear();

        cibles.forEach(function (cible) {
            cible.textContent = annee;
        });
    }

    /* =====================================================
       INITIALISATION GLOBALE
    ===================================================== */

    function initialiser() {
        initialiserMenu();
        initialiserAnimations();
        initialiserCompteurs();
        initialiserJauges();
        initialiserAccordeons();
        initialiserFiltres();
        initialiserBarreLecture();
        initialiserRetourHaut();
        initialiserNavigationCompacte();
        initialiserFormulaires();
        initialiserAnnee();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialiser);
    } else {
        initialiser();
    }
})();
