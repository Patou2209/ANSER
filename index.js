/* =========================================================
           CONFIGURATION DES SLIDES
        ========================================================== */

        const slidesData = [

            {
                image: "./img/visuelVue.png",

                //kicker: "ANSER RDC",

                title:
                    "ANSER œuvre au quotidien pour améliorer les conditions de vie des populations à travers un accès durable à l’énergie",

                description:
                    "Faisons plus qu’imaginer une RDC où l’énergie éclaire chaque foyer, chaque école et chaque entreprise, pour construire ensemble un avenir plus juste et prospère.",

                buttonText: "En lire plus",

                buttonLink: "#apropos"
            },



            {
                image: "./img/visuelNuit.png",

                //kicker: "NOTRE ENGAGEMENT",

                title:
                    "Cap 2030 : Electrifier 50% de la RDC",

                description:
                    "Des solutions adaptées aux réalités locales pour rapprocher l’énergie des populations et contribuer durablement au développement de la République démocratique du Congo.",

                buttonText: "Voir nos projets",

                buttonLink: "#projets"
            },


            {
                image: "./img/visuelDG.png",

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
            const FLAGS   = { fr: "fi-fr", en: "fi-gb", ln: "fi-cd" };   // ln = Lingala (drapeau RDC)

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
            image: "./img/poppup.jpeg",     // ← l'image du pop-up
            alt: "Information ANSER",
            duree: 100000,                          // visible pendant 10 min (après l'animation d'entrée)
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


            const CSS = `
.acc-popup{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(0,0,0,0);visibility:hidden;transition:background-color .6s ease,visibility 0s linear .6s}
.acc-popup.is-open{background:rgba(0,0,0,.6);visibility:visible;transition:background-color .6s ease,visibility 0s}
.acc-popup__cadre{position:relative;width:min(460px,90vw);aspect-ratio:1/1;max-height:86vh;overflow:hidden;border-radius:4px;background:#0f1d63;box-shadow:0 24px 70px rgba(0,0,0,.45);opacity:0;transform:translateY(22px) scale(.94);transition:opacity .5s ease,transform .5s ease;will-change:opacity,transform}
.acc-popup.is-open .acc-popup__cadre{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.acc-popup__cadre img{display:block;width:100%;height:100%;object-fit:cover}
.acc-popup__fermer{position:absolute;top:10px;right:10px;width:42px;height:42px;display:grid;place-items:center;border:0;border-radius:50%;background:rgba(15,29,99,.6);font-size:24px;color:#FFF200;cursor:pointer;transition:transform .3s ease,background .3s ease}
.acc-popup__fermer:hover{transform:rotate(90deg);background:rgba(15,29,99,.9)}
.acc-popup__fermer:focus-visible{outline:3px solid #FFF200;outline-offset:3px}
@media (prefers-reduced-motion:reduce){.acc-popup__cadre,.acc-popup.is-open .acc-popup__cadre{transform:none}}`;
            if (!document.getElementById("acc-popup-style")) {
                const style = document.createElement("style");
                style.id = "acc-popup-style";
                style.textContent = CSS;
                document.head.appendChild(style);
            }

            const img = new Image();
            img.alt = POPUP_ACCUEIL.alt;
            img.onload = build;          // on attend l'image : pas de flash ni de cadre vide
            img.onerror = () => console.warn(
                "Pop-up d'accueil : image introuvable → " + POPUP_ACCUEIL.image +
                " (vérifie le chemin et le nom du fichier dans POPUP_ACCUEIL.image)");
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


        /* =========================================================
           PAGES LÉGALES : le sommaire met en avant la section lue
        ========================================================== */
        (function () {
            const links = [...document.querySelectorAll(".leg__sommaire a")];
            if (!links.length || !("IntersectionObserver" in window)) return;

            const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    links.forEach(a => a.classList.remove("active"));
                    byId.get(entry.target.id)?.classList.add("active");
                });
            }, { rootMargin: "-20% 0px -70% 0px" });

            byId.forEach((_, id) => observer.observe(document.getElementById(id)));
        })();


        /* =========================================================
           PIED DE PAGE : NEWSLETTER + FORMULAIRE DE CONTACT
           Le style est embarqué ici : il suffit de copier le HTML du
           footer (footer.html) sur chaque page, index.js est déjà chargé.
        ========================================================== */

        (function () {

            /* ---------- RÉGLAGES ---------- */
            const EMAIL_DESTINATAIRE = "anser@anser.gouv.cd";

            // Crée deux formulaires sur https://formspree.io (gratuit) et colle ici
            // leur adresse "https://formspree.io/f/xxxxxxxx".
            // Tant que "VOTRE_ID" est présent, le message s'ouvre dans la messagerie
            // de l'utilisateur (mailto:) : pratique pour tester.
            const FORMULAIRES = {
                contact:    "https://formspree.io/f/VOTRE_ID_CONTACT",
                newsletter: "https://formspree.io/f/VOTRE_ID_NEWSLETTER"
            };

            const nlForm  = document.getElementById("newsletterForm");
            const ctForm  = document.getElementById("contactForm");
            const dialog  = document.getElementById("contactDialog");
            if (!nlForm && !ctForm && !dialog) return;

            /* ---------- STYLE ---------- */
            const CSS = `
/* Newsletter */
#footer .nl{flex:1 1 100%;display:grid;grid-template-columns:1fr 1.15fr;gap:28px 40px;align-items:center;padding:28px 32px;margin-bottom:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:16px}
#footer .nl h3{padding-bottom:0;margin-bottom:8px;font-size:20px;color:#fff!important}
#footer .nl h3::after{display:none}
#footer .nl p{margin:0;font-size:14.5px;line-height:1.6;color:rgba(255,255,255,.82);text-align:left}
#footer .nl__champ{display:flex}
#footer .nl__champ input[type=email]{flex:1;min-width:0;width:100%;padding:15px 22px;border:0;border-radius:999px 0 0 999px;background:#fff;color:#111;font:500 15px "Montserrat",sans-serif}
#footer .nl__champ input[type=email]::placeholder{color:#7a8294}
#footer .nl__champ input[type=email]:focus-visible{outline:3px solid #FFF200;outline-offset:-3px}
#footer .nl__btn{display:inline-flex;align-items:center;gap:9px;padding:0 26px;border:0;border-radius:0 999px 999px 0;background:#FFF200;color:#253E86;font:700 14.5px "Montserrat",sans-serif;cursor:pointer;white-space:nowrap;transition:background .3s,color .3s}
#footer .nl__btn:hover{background:#fff}
#footer .nl__btn:disabled{opacity:.65;cursor:wait}
#footer .nl__consent{display:flex;gap:10px;align-items:flex-start;margin-top:12px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.78);cursor:pointer}
#footer .nl__consent input{flex:0 0 auto;width:16px;height:16px;margin-top:2px;padding:0;accent-color:#FFF200}
#footer .nl__consent a{color:#FFF200;text-decoration:underline}
#footer .nl__statut{min-height:20px;margin-top:8px;font-size:13.5px;font-weight:600}
#footer .nl__statut.ok{color:#9be7b0}
#footer .nl__statut.err{color:#ffb4b4}
.ct-piege{position:absolute!important;left:-9999px;width:1px;height:1px;opacity:0}
@media (max-width:900px){#footer .nl{grid-template-columns:1fr;padding:24px 20px}}
@media (max-width:480px){#footer .nl__champ{flex-direction:column;gap:10px}#footer .nl__champ input[type=email]{border-radius:999px}#footer .nl__btn{justify-content:center;padding:14px 26px;border-radius:999px}}

/* Boutons « Contactez-nous » (button au lieu de lien) */
button.footer-bouton{font-family:inherit;cursor:pointer}

/* Fenêtre de contact */
.ct-dialog{position:fixed;inset:0;margin:auto;width:min(520px,92vw);height:fit-content;max-height:92vh;padding:0;border:0;border-radius:14px;background:#fff;color:#1c1c1c;overflow:auto;overscroll-behavior:contain;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.ct-dialog::backdrop{background:rgba(7,2,69,.65)}
.ct-dialog[open]{animation:ct-in .35s cubic-bezier(.22,1,.36,1)}
@keyframes ct-in{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
.ct-entete{padding:34px 32px 8px;border-top:6px solid #FFF200}
.ct-etiquette{display:inline-block;margin-bottom:8px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#253E86}
.ct-entete h2{margin:0 0 8px;font-size:26px;font-weight:800;line-height:1.2;color:#111}
.ct-entete p{margin:0;font-size:14.5px;line-height:1.6;color:#555;text-align:left}
.ct-fermer{position:absolute;top:14px;right:14px;width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:50%;background:#f1f3f9;color:#253E86;font-size:18px;cursor:pointer;transition:background .25s,transform .25s}
.ct-fermer:hover{background:#FFF200;transform:rotate(90deg)}
.ct-form{display:grid;gap:16px;padding:22px 32px 32px}
.ct-champ{display:flex;flex-direction:column;gap:7px}
.ct-champ label{font-size:14px;font-weight:600;color:#253E86}
.ct-champ label span{color:#d64545}
.ct-champ input,.ct-champ textarea{width:100%;padding:13px 15px;border:1px solid #dde5f0;border-radius:9px;background:#f9fcff;font:400 15px "Montserrat",sans-serif;color:#1c1c1c;transition:border-color .25s,box-shadow .25s,background .25s}
.ct-champ textarea{min-height:130px;resize:vertical}
.ct-champ input:focus,.ct-champ textarea:focus{outline:0;background:#fff;border-color:#FFF200;box-shadow:0 0 0 4px rgba(255,242,0,.35)}
.ct-champ input:user-invalid,.ct-champ textarea:user-invalid{border-color:#d64545}
.ct-envoyer{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:15px 24px;border:0;border-radius:8px;background:#FFF200;color:#253E86;font:700 15px "Montserrat",sans-serif;cursor:pointer;transition:background .3s,color .3s,transform .3s}
.ct-envoyer:hover{background:#253E86;color:#FFF200;transform:translateY(-2px)}
.ct-envoyer:disabled{opacity:.65;cursor:wait;transform:none}
.ct-statut{min-height:22px;font-size:14.5px;font-weight:600;text-align:left}
.ct-statut.ok{color:#1e7a50}
.ct-statut.err{color:#b03636}
@media (prefers-reduced-motion:reduce){.ct-dialog[open]{animation:none}}`;

            if (!document.getElementById("anser-footer-style")) {
                const style = document.createElement("style");
                style.id = "anser-footer-style";
                style.textContent = CSS;
                document.head.appendChild(style);
            }

            /* ---------- ENVOI ---------- */
            const configure = url => url && !/VOTRE_ID/.test(url);

            function lire(form) {
                const data = {};
                new FormData(form).forEach((v, k) => { data[k] = String(v).trim(); });
                return data;
            }

            async function envoyer(form, endpoint, sujet, ui) {
                const data = lire(form);
                if (data._gotcha) return true;               // piège anti-spam : on fait comme si c'était envoyé
                delete data._gotcha;
                data._subject = sujet;

                // Pas encore d'identifiant Formspree : repli sur la messagerie de l'utilisateur
                if (!configure(endpoint)) {
                    const corps = Object.entries(data)
                        .filter(([k]) => k !== "_subject")
                        .map(([k, v]) => k + " : " + v).join("\n");
                    window.location.href = "mailto:" + EMAIL_DESTINATAIRE +
                        "?subject=" + encodeURIComponent(sujet) +
                        "&body=" + encodeURIComponent(corps);
                    ui.dire("Votre messagerie va s’ouvrir pour finaliser l’envoi.", true);
                    return true;
                }

                try {
                    const rep = await fetch(endpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Accept": "application/json" },
                        body: JSON.stringify(data)
                    });
                    if (rep.ok) return true;
                    let detail = "";
                    try { detail = (await rep.json()).errors?.map(e => e.message).join(" ") || ""; } catch (e) {}
                    ui.dire(detail || "L’envoi a échoué. Merci de réessayer ou d’écrire à " + EMAIL_DESTINATAIRE + ".", false);
                } catch (e) {
                    ui.dire("Connexion impossible. Vérifiez votre réseau puis réessayez.", false);
                }
                return false;
            }

            function branche(form, statutEl, bouton, endpoint, sujetFn, succes, apres) {
                const libelle = bouton.innerHTML;
                const ui = {
                    dire(msg, ok) {
                        statutEl.textContent = msg;
                        statutEl.className = statutEl.className.replace(/\b(ok|err)\b/g, "").trim() + " " + (ok ? "ok" : "err");
                    }
                };
                form.addEventListener("submit", async e => {
                    e.preventDefault();
                    if (!form.checkValidity()) { form.reportValidity(); return; }
                    bouton.disabled = true;
                    bouton.textContent = "Envoi en cours…";
                    ui.dire("", true);
                    const ok = await envoyer(form, endpoint, sujetFn(lire(form)), ui);
                    bouton.disabled = false;
                    bouton.innerHTML = libelle;
                    if (ok) {
                        if (configure(endpoint)) ui.dire(succes, true);
                        form.reset();
                        if (apres) apres();
                    }
                });
            }

            /* ---------- NEWSLETTER ---------- */
            if (nlForm) {
                branche(
                    nlForm,
                    nlForm.querySelector(".nl__statut"),
                    nlForm.querySelector(".nl__btn"),
                    FORMULAIRES.newsletter,
                    () => "Nouvelle inscription à la newsletter ANSER",
                    "Merci ! Votre inscription à la newsletter est bien enregistrée."
                );
            }

            /* ---------- FENÊTRE DE CONTACT ---------- */
            if (dialog && ctForm) {
                let lastTrigger = null;
                let savedScroll = 0;

                document.querySelectorAll("[data-contact-ouvrir]").forEach(btn =>
                    btn.addEventListener("click", () => {
                        lastTrigger = btn;
                        savedScroll = window.scrollY;
                        dialog.showModal();
                        window.scrollTo(0, savedScroll);
                    }));

                dialog.querySelector(".ct-fermer").addEventListener("click", () => dialog.close());
                dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
                dialog.addEventListener("close", () => {
                    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
                    window.scrollTo(0, savedScroll);
                });

                branche(
                    ctForm,
                    ctForm.querySelector(".ct-statut"),
                    ctForm.querySelector(".ct-envoyer"),
                    FORMULAIRES.contact,
                    d => "Message depuis le site ANSER – " + (d.nom || "visiteur"),
                    "Merci ! Votre message a bien été envoyé. Nous vous répondrons très vite.",
                    () => setTimeout(() => dialog.open && dialog.close(), 2800)
                );
            }
        })();