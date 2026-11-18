/* =========================================================
   ACTUALITÉS
   1) DONNÉES  : ajoute une actualité en copiant un bloc.
      L'ordre n'a pas d'importance, le tri par date
      (la plus récente d'abord) est automatique.
      Format de la date : "AAAA-MM-JJ"
   2) AFFICHAGE : automatique, rien à modifier plus bas.

   Chaque actualité contient :
     id      : identifiant unique, sans espace ni accent (sert dans l'URL :
               article.html?id=mon-id). Ne le change plus une fois partagé.
     date, title, image, link
     lead    : le chapô (introduction mise en avant)
     content : la liste des blocs de l'article, dans l'ordre :
                 { type: "h2",    text: "Intertitre" }
                 { type: "p",     text: "Paragraphe (**gras** autorisé)" }
                 { type: "ul",    items: ["puce 1", "puce 2"] }
                 { type: "quote", text: "Citation mise en valeur" }
     tags    : mots-clés affichés en bas de l'article

   Ce fichier contient aussi les IMAGES DES PROJETS du pop-up
   « Découvrez nos œuvres » (PROJETS_GALERIE, juste après les actualités).

   Accueil      : <div class="news-grid" id="newsGrid" data-limit="3"></div>
   actualites   : <div class="news-grid" id="newsGrid" data-year="true"></div>
========================================================= */

const NEWS_DATA = [
    {
        id: "anser-acerd-partenariat",
        date: "2026-10-22",
        title: "L’ANSER et l’ACERD renouvellent leur partenariat pour accélérer l’accès à l’énergie en RDC",
        image: "./img/ACCERD.jpg",
        link: "article.html?id=anser-acerd-partenariat",
        lead: "Le jeudi 22 octobre 2026, à Kinshasa, l’ANSER a pris part à l’Assemblée Générale Ordinaire de l’ACERD. À cette occasion, le Protocole d’Accord qui lie les deux institutions depuis 2022 a été symboliquement reconduit et sera actualisé.",
        content: [
            { type: "h2", text: "Un partenariat qui a fait ses preuves" },
            { type: "p", text: "Représentée par Maître Merphy, l’ANSER a pris la parole au nom de son Directeur Général, qui n’a pas pu être présent et qui a transmis ses salutations et ses encouragements aux participants." },
            { type: "p", text: "Signé en 2022, le Protocole d’Accord entre l’ACERD et l’ANSER définit les modalités de leur collaboration pour promouvoir les énergies renouvelables décentralisées en milieux rural et périurbain. Il poursuit un double objectif :" },
            { type: "ul", items: [
                "Soutenir la participation du secteur privé, afin de réduire progressivement le déficit énergétique des zones rurales et périurbaines ;",
                "Accélérer l’électrification grâce aux technologies hors-réseau : systèmes solaires autonomes, mini-réseaux et foyers améliorés de cuisson."
            ]},
            { type: "h2", text: "Des résultats concrets dans trois domaines" },
            { type: "p", text: "Depuis la signature, ce partenariat s’est traduit par des actions concrètes :" },
            { type: "ul", items: [
                "**Le plaidoyer :** faciliter l’agrément des opérateurs, doter les mini-réseaux d’une réglementation spécifique et garantir la qualité des équipements par une certification congolaise.",
                "**Le renforcement des capacités :** grâce à l’Académie ACERD, les opérateurs sont formés à la gestion de projets, à la maintenance, à la mobilisation des financements et à la passation des marchés publics.",
                "**La promotion du secteur :** rencontres thématiques, forums de dialogue et accompagnement des entreprises qui s’installent en RDC."
            ]},
            { type: "p", text: "L’ANSER a salué le rôle de l’ACERD, qui a largement contribué à structurer et à agrandir le secteur et qui porte avec constance plusieurs plaidoyers en faveur des activités énergétiques." },
            { type: "h2", text: "Le GTERD : quand le secteur parle d’une seule voix" },
            { type: "p", text: "Cette synergie s’est renforcée avec la création du Groupe de Travail des Énergies Renouvelables et Décentralisées (GTERD), dont le secrétariat est assuré conjointement par l’ACERD et l’ANSER. Ses sous-comités rassemblent opérateurs et partenaires techniques et financiers. Ils ont travaillé sur la fiscalité, les mini-réseaux, la cuisson propre, le renforcement des capacités et le genre." },
            { type: "p", text: "Ces travaux ont déjà produit des résultats : un plaidoyer pour la révision de la loi sur l’électricité et une proposition de décret sur les énergies renouvelables. L’ACERD a également été reçue par le Président de la République pour défendre cette révision." },
            { type: "h2", text: "Conclusion" },
            { type: "p", text: "L’ANSER a remercié les équipes de l’ACERD ainsi que l’ensemble des partenaires. C’est grâce à leur engagement que l’accès à l’énergie devient, pour des milliers de Congolaises et de Congolais, une réalité et non plus une promesse." }
        ],
        tags: ["ANSER", "ACERD", "Énergies renouvelables", "Électrification rurale", "Mini-réseaux", "GTERD", "RDC", "Kinshasa"]
    },
    {
        id: "hydro-mbombo-anser-fpi",
        date: "2026-10-14",
        title: "Centrale hydroélectrique de Mbombo : l’ANSER et le FPI franchissent une nouvelle étape",
        image: "./img/FPI.jpg",
        link: "article.html?id=hydro-mbombo-anser-fpi",
        lead: "C’est une étape historique et hautement stratégique qui vient d’être franchie dans la marche vers l’électrification du Grand Kasaï. Ce mercredi 14 octobre 2026, au siège du FPI, s’est déroulée la cérémonie officielle d’installation des dirigeants sociaux de la société de projet Hydro Mbombo SAS, chargée de piloter et de concrétiser ce chantier d’envergure. À travers cette impulsion, l’ANSER réaffirme son rôle de moteur incontournable du développement et de la transformation énergétique en République Démocratique du Congo.",
        content: [
            { type: "h2", text: "Une vision ambitieuse pour le Grand Kasaï" },
            { type: "p", text: "Le projet Hydro Mbombo ne se contente pas d’être une infrastructure de plus : il est la promesse d’un avenir lumineux et prospère pour toute une région." },
            { type: "p", text: "L’objectif initial est de produire et injecter rapidement 20 MW d’électricité pour le Grand Kasaï. Et les perspectives sont une montée en puissance projetée à 40 MW et plus, afin de répondre durablement à la croissance des besoins domestiques, économiques et industriels de la région." },
            { type: "p", text: "Pour l’ANSER, l’ambition est claire : transformer chaque mégawatt en opportunité de croissance, en améliorant concrètement le quotidien de millions de Congolais." },
            { type: "h2", text: "18 mois pour changer la donne : le défi de l’efficacité" },
            { type: "p", text: "Le temps est à l’action. Avec un délai rigoureux de 18 mois pour délivrer des résultats visibles et palpables pour la population, les équipes et partenaires sous l’impulsion de l’ANSER s’engagent dans une véritable course contre la montre." },
            { type: "p", text: "Pour garantir le succès de cette entreprise colossale, l’ANSER et ses partenaires s’imposent des standards de gouvernance et de gestion irréprochables :" },
            { type: "ul", items: [
                "Transparence absolue à chaque étape du processus ;",
                "Rigueur de gestion exemplaire pour maximiser l’impact des ressources ;",
                "Audits ponctuels réguliers pour assurer la conformité et l’efficacité des chantiers ;",
                "Collaboration étroite et permanente entre toutes les parties prenantes."
            ]},
            { type: "h2", text: "« Sans énergie, il n’y a pas de développement »" },
            { type: "p", text: "Cette phrase forte, rappelée avec conviction par le leadership lors de la cérémonie, résume à elle seule l’urgence et la noblesse de la mission de l’ANSER. L’énergie n’est pas un luxe, c’est le socle sur lequel se construisent les écoles, les hôpitaux, les entreprises et les emplois de demain." },
            { type: "p", text: "En menant de front le projet Hydro Mbombo, l’ANSER prouve une fois de plus sa capacité à fédérer, planifier et exécuter des projets d’envergure nationale. L’agence poursuit sans relâche son engagement : transformer le potentiel naturel de nos provinces en opportunités réelles, inclusives et durables pour chaque citoyen congolais." },
            { type: "quote", text: "L’aventure Hydro Mbombo est lancée, et avec elle, le renouveau énergétique du Grand Kasaï !" }
        ],
        tags: ["Électrification rurale", "Électrification pour tous", "Hydro Mbombo", "Énergie RDC", "Grand Kasaï", "RDC en marche", "ANSER"]
    },
    {
        id: "kindu-kasongo-centrales-solaires",
        date: "2026-10-26",
        title: "Kindu : l’ANSER prépare une centrale solaire de 3 MWc et renforce sa présence au Maniema",
        image: "./img/ANSER-KINDU-19.jpg",
        link: "article.html?id=kindu-kasongo-centrales-solaires",
        lead: "Ce lundi 26 octobre 2026, l’ANSER et le FPI ont signé un accord de financement majeur visant à accélérer l’accès à l’électricité dans la province du Maniema, à travers la construction de centrales solaires et d’infrastructures connexes.",
        content: [
            { type: "h2", text: "Un accord stratégique pour Kindu et Kasongo" },
            { type: "p", text: "Cet accord de financement porte spécifiquement sur la construction de centrales solaires ainsi que de leurs réseaux de distribution et des infrastructures d’éclairage public dans les villes de Kindu et Kasongo." },
            { type: "p", text: "**Les projets se détaillent comme suit :**" },
            { type: "ul", items: [
                "**À Kindu :** construction d’une centrale photovoltaïque de 3 MWc, dotée d’un système de stockage de 6 MWh.",
                "**À Kasongo :** implantation d’une centrale solaire de 2 MWc, avec une capacité de stockage de 4 MWh."
            ]},
            { type: "h2", text: "Lancement officiel des travaux" },
            { type: "p", text: "La signature de cet accord a été immédiatement suivie par la cérémonie officielle de pose de la première pierre. Cet événement s’est déroulé sous la haute égide de Son Excellence Madame la Première Ministre, Cheffe du Gouvernement." },
            { type: "h2", text: "Vers un développement durable et local" },
            { type: "p", text: "Ces initiatives s’inscrivent pleinement dans la vision du Président de la République, Félix-Antoine Tshisekedi Tshilombo. Elles témoignent de la mobilisation des pouvoirs publics autour d’un objectif commun et essentiel :" },
            { type: "ul", items: [
                "Améliorer durablement l’accès à l’électricité pour les populations ;",
                "Soutenir activement les activités économiques locales ;",
                "Favoriser le développement socio-économique de la région."
            ]}
        ],
        tags: ["Électrification pour tous", "ANSER", "FPI", "Maniema", "Kindu", "Kasongo", "Énergie solaire", "RDC"]
    }
];


/* =========================================================
   GALERIES DES PROJETS (pop-up « En voir plus »)
   Clé = valeur de data-galerie sur le bouton.
   Pour un nouveau projet : ajoute une clé ici, puis mets
   <button data-galerie="ta-cle"> dans le HTML.
   Peu importe la taille des images : elles remplissent le cadre.
========================================================= */
const PROJETS_GALERIE = {
    kamina: [
        "./img/projets-carte.jpg",
        "./img/kamina-1.jpg",
        "./img/kamina-2.jpg"
    ]
};

/* ---------- Affichage ---------- */
(function () {
    const grid = document.getElementById("newsGrid");
    if (!grid) return;

    const limit    = parseInt(grid.dataset.limit, 10) || Infinity;
    const showYear = grid.dataset.year === "true";

    const escapeHTML = (str = "") =>
        String(str).replace(/[&<>"']/g, c =>
            ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    const formatDate = iso =>
        new Date(iso + "T00:00:00").toLocaleDateString("fr-FR",
            showYear
                ? { day: "numeric", month: "short", year: "numeric" }
                : { day: "numeric", month: "short" });

    const createNewsCard = item => `
        <a href="${escapeHTML(item.link || "#")}" class="news-card">
            ${item.image ? `<img src="${escapeHTML(item.image)}" alt="" loading="lazy">` : ""}
            <time datetime="${escapeHTML(item.date)}">${formatDate(item.date)}</time>
            <h3>${escapeHTML(item.title)}</h3>
        </a>`;

    const items = [...NEWS_DATA]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);

    grid.innerHTML = items.length
        ? items.map(createNewsCard).join("")
        : `<p class="news-empty">Aucune actualité pour le moment.</p>`;
})();


/* ---------- Pop-up galerie des projets ---------- */
(function () {
    const dialog   = document.getElementById("galerieProjet");
    const triggers = document.querySelectorAll("[data-galerie]");
    if (!dialog || !triggers.length) return;

    const track    = dialog.querySelector(".acc-galerie__piste");
    const arrows   = dialog.querySelector(".acc-galerie__fleches");
    const closeBtn = dialog.querySelector(".acc-galerie__fermer");

    let slides = [];
    let index = 0;
    let lastTrigger = null;
    let savedScroll = 0;

    function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((s, n) => s.classList.toggle("active", n === index));
    }

    function open(trigger) {
        const urls = PROJETS_GALERIE[trigger.dataset.galerie] || [];
        if (!urls.length) return;

        lastTrigger = trigger;
        savedScroll = window.scrollY;

        track.innerHTML = "";
        slides = urls.map((url, i) => {
            const slide = document.createElement("div");
            slide.className = "acc-galerie__diapo";
            slide.setAttribute("role", "img");
            slide.setAttribute("aria-label", "Image " + (i + 1) + " sur " + urls.length);
            slide.style.backgroundImage = 'url("' + url.replace(/"/g, "%22") + '")';
            track.appendChild(slide);
            return slide;
        });

        arrows.hidden = urls.length < 2;
        show(0);
        dialog.showModal();
        window.scrollTo(0, savedScroll);
    }

    triggers.forEach(t => t.addEventListener("click", () => open(t)));

    dialog.querySelectorAll(".acc-galerie__fleche").forEach(btn =>
        btn.addEventListener("click", () => show(index + Number(btn.dataset.sens))));

    closeBtn.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", e => {
        if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
        if (lastTrigger) lastTrigger.focus({ preventScroll: true });
        window.scrollTo(0, savedScroll);
    });

    dialog.addEventListener("wheel", e => e.preventDefault(), { passive: false });

    dialog.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { e.stopPropagation(); show(index + 1); }
        if (e.key === "ArrowLeft")  { e.stopPropagation(); show(index - 1); }
    });

    let startX = null;
    track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", e => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
        startX = null;
    });
})();
