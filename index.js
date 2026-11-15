
        /* =========================================================
           CONFIGURATION DES SLIDES
        ========================================================== */

        const slidesData = [

            {
                image: "./img/solar.jpg",

                //kicker: "ANSER RDC",

                title:
                    "ANSER œuvre au quotidien pour améliorer les conditions de vie des populations à travers un accès durable à l’énergie",

                description:
                    "Faisons plus qu’imaginer une RDC où l’énergie éclaire chaque foyer, chaque école et chaque entreprise, pour construire ensemble un avenir plus juste et prospère.",

                buttonText: "En lire plus",

                buttonLink: "#apropos"
            },


            {
                image: "./img/power.jpg",

                //kicker: "ACCÈS À L'ÉNERGIE",

                title:
                    "Nous transformons le quotidien et façonnons l’avenir de toute une nation",

                description:
                    "Faire de l’électricité un levier concret pour l’inclusion et la croissance, afin que chaque communauté bénéficie et participe pleinement au développement du pays.",

                buttonText: "Découvrir nos actions",

                buttonLink: "#actions"
            },


            {
                image: "./img/energy2.jpg",

                //kicker: "NOTRE ENGAGEMENT",

                title:
                    "Cap 2030 : Electrifier 50% de la RDC",

                description:
                    "Des solutions adaptées aux réalités locales pour rapprocher l’énergie des populations et contribuer durablement au développement de la République démocratique du Congo.",

                buttonText: "Voir nos projets",

                buttonLink: "#projets"
            },


            {
                image: "./img/energy2.jpg",

                //kicker: "NOTRE ENGAGEMENT",

                title:
                    "Une gouvernance claire et rigoureuse pour consolider la confiance de nos partenaires et garantir un impact réel",

                description:
                    "Des solutions adaptées aux réalités locales pour rapprocher l’énergie des populations et contribuer durablement au développement de la République démocratique du Congo.",

                buttonText: "Voir nos projets",

                buttonLink: "#projets"
            }

        ];


        /* =========================================================
           VARIABLES
        ========================================================== */

        const slidesContainer =
            document.getElementById("slidesContainer");

        const dotsContainer =
            document.getElementById("dotsContainer");

        const prevBtn =
            document.getElementById("prevBtn");

        const nextBtn =
            document.getElementById("nextBtn");

        const progressBar =
            document.getElementById("progressBar");

        let currentSlide = 0;

        let autoPlay;
        let hero = document.querySelector(".hero");

        // Durée d'affichage d'une slide
        const SLIDE_DURATION = 4000;


        /* =========================================================
           CRÉATION DES SLIDES
        ========================================================== */

        function createSlides() {

            slidesContainer.innerHTML = "";
            dotsContainer.innerHTML = "";

            slidesData.forEach((slide, index) => {

                /*
                 * Si aucune image n'est définie,
                 * on affiche simplement un fond sombre.
                 *
                 * Tu peux donc laisser image: ""
                 * pendant que tu développes.
                 */

                const slideElement =
                    document.createElement("article");

                slideElement.className =
                    "hero-slide" +
                    (index === 0 ? " active" : "");

                const imageHTML = slide.image
                    ? `<img
                        class="hero-image"
                        src="${slide.image}"
                        alt=""
                        loading="${index === 0 ? "eager" : "lazy"}"
                      >`
                    : "";

                slideElement.innerHTML = `

                    ${imageHTML}

                    <div class="hero-overlay"></div>

                    <div class="hero-content">

                        <div class="hero-content-inner">

                            <!-- <div class="hero-kicker">
                                ${slide.kicker}
                            </div> -->

                            <h1 class="hero-title">
                                ${slide.title}
                            </h1>

                            <!--<p class="hero-description">
                                ${slide.description}
                            </p>-->

                           <!-- <a
                                class="hero-button"
                                href="${slide.buttonLink}">
                                ${slide.buttonText}
                                <span aria-hidden="true">→</span>
                            </a> -->

                        </div>

                    </div>
                `;

                slidesContainer.appendChild(slideElement);


                /* Création du point de navigation */

                const dot =
                    document.createElement("button");

                dot.className =
                    "dot" +
                    (index === 0 ? " active" : "");

                dot.setAttribute(
                    "aria-label",
                    `Afficher la slide ${index + 1}`
                );

                dot.addEventListener("click", () => {
                    goToSlide(index);
                });

                dotsContainer.appendChild(dot);
            });
        }


        /* =========================================================
           AFFICHER UNE SLIDE
        ========================================================== */

        function showSlide(index) {

            /*
             * Important : on ne masque pas brutalement l'ancienne slide.
             * Les deux slides restent superposées et CSS fait un vrai
             * fondu croisé grâce à opacity + cubic-bezier.
             */

            const slides =
                document.querySelectorAll(".hero-slide");

            const dots =
                document.querySelectorAll(".dot");


            slides.forEach((slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            });


            dots.forEach((dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            });


            currentSlide = index;


            /* Redémarre la barre de progression */

            progressBar.classList.remove("running");

            // Force le navigateur à recalculer l'animation
            void progressBar.offsetWidth;

            progressBar.classList.add("running");
        }


        /* =========================================================
           SLIDE SUIVANTE
        ========================================================== */

        function nextSlide() {

            const next =
                (currentSlide + 1) % slidesData.length;

            goToSlide(next);
        }


        /* =========================================================
           SLIDE PRÉCÉDENTE
        ========================================================== */

        function previousSlide() {

            const previous =
                (currentSlide - 1 + slidesData.length)
                % slidesData.length;

            goToSlide(previous);
        }


        /* =========================================================
           ALLER À UNE SLIDE PRÉCISE
        ========================================================== */

        function goToSlide(index) {

            showSlide(index);

            restartAutoPlay();
        }


        /* =========================================================
           AUTOPLAY
        ========================================================== */

        function startAutoPlay() {

            autoPlay =
                setInterval(
                    nextSlide,
                    SLIDE_DURATION
                );
        }


        function restartAutoPlay() {

            clearInterval(autoPlay);

            startAutoPlay();
        }


        /* =========================================================
           ÉVÉNEMENTS
        ========================================================== */

        if (nextBtn && prevBtn && hero) {
            nextBtn.addEventListener(
                "click",
                nextSlide
            );

            prevBtn.addEventListener(
                "click",
                previousSlide
            );
        }


        /* =========================================================
           PAUSE LORSQUE LA SOURIS EST SUR LE HERO
        ========================================================== */

        if (hero) {
            hero.addEventListener(
                "mouseenter",
                () => {
                    clearInterval(autoPlay);
                }
            );

            hero.addEventListener(
                "mouseleave",
                () => {
                    restartAutoPlay();
                }
            );
        }


        /* =========================================================
           SUPPORT DU CLAVIER
        ========================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowRight" && slidesContainer) {
                    nextSlide();
                }

                if (event.key === "ArrowLeft" && slidesContainer) {
                    previousSlide();
                }
            }
        );

        /* =========================================================
           MENU
        ========================================================== */

        const menuBtn = document.getElementById('menu-btn');
        const menuClose = document.getElementById('menu-close');
        const navigation = document.querySelector('.navigation');

        if (menuBtn && menuClose && navigation) {
            menuBtn.addEventListener('click', function() {
                navigation.classList.add('active');
            });
            menuClose.addEventListener('click', function() {
                navigation.classList.remove('active');
            });
        }
        /* =========================================================
           INITIALISATION
        ========================================================== */

        if (slidesContainer && dotsContainer && progressBar) {
            createSlides();
            showSlide(0);
            startAutoPlay();
        }

        

        /* =========================================================
           SÉLECTEUR DE LANGUE
           Mémorise le choix et prévient le reste du site via
           l'événement "anser:langue" (event.detail.lang = "fr" | "en").
        ========================================================== */

        (function () {
            const switcher = document.querySelector(".lang-switch");
            if (!switcher) return;

            const btn     = switcher.querySelector(".lang-switch__btn");
            const menu    = switcher.querySelector(".lang-switch__menu");
            const options = [...menu.querySelectorAll("[data-lang]")];
            const flagEl  = btn.querySelector(".fi");
            const codeEl  = btn.querySelector(".lang-switch__code");
            const FLAGS   = { fr: "fi-fr", en: "fi-gb" };

            function toggleMenu(open) {
                menu.hidden = !open;
                btn.setAttribute("aria-expanded", String(open));
            }

            function setLanguage(lang, notify) {
                if (!FLAGS[lang]) lang = "fr";

                flagEl.className = "fi " + FLAGS[lang] + " lang-switch__flag";
                codeEl.textContent = lang.toUpperCase();
                options.forEach(o =>
                    o.setAttribute("aria-selected", String(o.dataset.lang === lang)));
                document.documentElement.lang = lang;

                try { localStorage.setItem("anser-langue", lang); } catch (e) {}

                if (notify) {
                    document.dispatchEvent(
                        new CustomEvent("anser:langue", { detail: { lang } }));
                }
            }

            btn.addEventListener("click", () => toggleMenu(menu.hidden));

            options.forEach(option => {
                const choose = () => {
                    setLanguage(option.dataset.lang, true);
                    toggleMenu(false);
                    btn.focus();
                };
                option.addEventListener("click", choose);
                option.addEventListener("keydown", e => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
                });
            });

            document.addEventListener("click", e => {
                if (!switcher.contains(e.target)) toggleMenu(false);
            });
            document.addEventListener("keydown", e => {
                if (e.key === "Escape") { toggleMenu(false); }
            });

            let saved = null;
            try { saved = localStorage.getItem("anser-langue"); } catch (e) {}
            setLanguage(saved || document.documentElement.lang || "fr", false);
        })();


        /* =========================================================
           POP-UP D'OUVERTURE (page d'accueil)
           Une image + une croix. S'affiche en douceur à chaque
           chargement / rafraîchissement, puis disparaît seule.
        ========================================================== */

        const POPUP_ACCUEIL = {
            actif: true,
            image: "./img/energy.jpg",     // ← l'image du pop-up
            alt: "Information ANSER",
            duree: 3000,                          // visible pendant 3 s (après l'animation d'entrée)
            uneFoisParSession: false              // true = une seule fois par visite
        };

        (function () {
            // Uniquement sur la page d'accueil
            if (!POPUP_ACCUEIL.actif || !document.getElementById("slidesContainer")) return;

            try {
                if (POPUP_ACCUEIL.uneFoisParSession) {
                    if (sessionStorage.getItem("anser-popup")) return;
                    sessionStorage.setItem("anser-popup", "1");
                }
            } catch (e) {}

            const ENTREE = 700;   // durée de l'animation d'entrée (ms)
            const SORTIE = 600;   // durée de l'animation de sortie (ms)

            const img = new Image();
            img.alt = POPUP_ACCUEIL.alt;
            img.onload = build;          // on attend l'image : pas de flash ni de cadre vide
            img.src = POPUP_ACCUEIL.image;

            function build() {
                const popup = document.createElement("div");
                popup.className = "acc-popup";
                popup.setAttribute("role", "dialog");
                popup.setAttribute("aria-label", POPUP_ACCUEIL.alt);

                const frame = document.createElement("div");
                frame.className = "acc-popup__cadre";
                frame.appendChild(img);

                const closeBtn = document.createElement("button");
                closeBtn.type = "button";
                closeBtn.className = "acc-popup__fermer";
                closeBtn.setAttribute("aria-label", "Fermer");
                closeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

                frame.appendChild(closeBtn);
                popup.appendChild(frame);
                document.body.appendChild(popup);

                let timer = null;
                let closed = false;
                let deadline = 0;

                function close() {
                    if (closed) return;
                    closed = true;
                    clearTimeout(timer);
                    document.removeEventListener("keydown", onKey);
                    popup.classList.remove("is-open");
                    setTimeout(() => popup.remove(), SORTIE + 50);
                }

                function schedule(ms) {
                    clearTimeout(timer);
                    deadline = Date.now() + ms;
                    timer = setTimeout(close, ms);
                }

                function onKey(e) { if (e.key === "Escape") close(); }

                closeBtn.addEventListener("click", close);
                popup.addEventListener("click", e => { if (e.target === popup) close(); });
                document.addEventListener("keydown", onKey);

                // Pause quand la souris est sur l'image, reprise avec le temps restant
                let remaining = 0;
                frame.addEventListener("mouseenter", () => {
                    remaining = Math.max(deadline - Date.now(), 800);
                    clearTimeout(timer);
                });
                frame.addEventListener("mouseleave", () => { if (!closed) schedule(remaining); });

                // Affichage fluide : on laisse le navigateur peindre l'état initial, puis on ouvre
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => {
                        popup.classList.add("is-open");
                        schedule(ENTREE + POPUP_ACCUEIL.duree);
                    }));
            }
        })();
