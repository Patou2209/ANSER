
        /* =========================================================
           CONFIGURATION DES SLIDES
        ========================================================== */

        const slidesData = [

            {
                image: "./img/solar.jpg",

                kicker: "ANSER RDC",

                title:
                    "ANSER : pour une RDC nouvelle, électrifiée, équitable et durable",

                description:
                    "Faisons plus qu’imaginer une RDC où l’énergie éclaire chaque foyer, chaque école et chaque entreprise, pour construire ensemble un avenir plus juste et prospère.",

                buttonText: "En lire plus",

                buttonLink: "#apropos"
            },


            {
                image: "./img/power.jpg",

                kicker: "ACCÈS À L'ÉNERGIE",

                title:
                    "Accélérer l’accès à l’énergie pour une RDC inclusive et prospère",

                description:
                    "Faire de l’électricité un levier concret pour l’inclusion et la croissance, afin que chaque communauté bénéficie et participe pleinement au développement du pays.",

                buttonText: "Découvrir nos actions",

                buttonLink: "#actions"
            },


            {
                image: "./img/energy2.jpg",

                kicker: "NOTRE ENGAGEMENT",

                title:
                    "Construire ensemble un avenir énergétique durable",

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

                            <div class="hero-kicker">
                                ${slide.kicker}
                            </div>

                            <h1 class="hero-title">
                                ${slide.title}
                            </h1>

                            <p class="hero-description">
                                ${slide.description}
                            </p>

                            <a
                                class="hero-button"
                                href="${slide.buttonLink}">
                                ${slide.buttonText}
                                <span aria-hidden="true">→</span>
                            </a>

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

        nextBtn.addEventListener(
            "click",
            nextSlide
        );

        prevBtn.addEventListener(
            "click",
            previousSlide
        );


        /* =========================================================
           PAUSE LORSQUE LA SOURIS EST SUR LE HERO
        ========================================================== */

        const hero =
            document.querySelector(".hero");

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


        /* =========================================================
           SUPPORT DU CLAVIER
        ========================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowRight") {
                    nextSlide();
                }

                if (event.key === "ArrowLeft") {
                    previousSlide();
                }
            }
        );

        /* =========================================================
           MENU
        ========================================================== */

        let menuBtn = document.getElementById('menu-btn');
            let menuClose = document.getElementById('menu-close');
            
            menuBtn.addEventListener('click', function() {
                document.querySelector('.navigation').classList.add('active');
            });
            menuClose.addEventListener('click', function() {
                document.querySelector('.navigation').classList.remove('active');
            });
        /* =========================================================
           INITIALISATION
        ========================================================== */

        createSlides();

        showSlide(0);

        startAutoPlay();

