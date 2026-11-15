/* =========================================================
   ACTUALITÉS
   1) DONNÉES  : ajoute une actualité en copiant un bloc.
      L'ordre n'a pas d'importance, le tri par date
      (la plus récente d'abord) est automatique.
      Format de la date : "AAAA-MM-JJ"
   2) AFFICHAGE : automatique, rien à modifier plus bas.

   Ce fichier contient aussi les IMAGES DES PROJETS du pop-up
   « Découvrez nos œuvres » (PROJETS_GALERIE, juste après les actualités).

   Accueil      : <div class="news-grid" id="newsGrid" data-limit="3"></div>
   actualites   : <div class="news-grid" id="newsGrid" data-year="true"></div>
========================================================= */

const NEWS_DATA = [
    {
        date: "2026-10-26",
        title: "Kindu : l’ANSER prépare une centrale solaire de 3 MWc et renforce sa présence au Maniema",
        image: "./img/actu1.jpg",
        link: "#"
    },
    {
        date: "2026-10-22",
        title: "Électrification rurale en RDC : l’ANSER et l’ACERD échangent sur les réformes du secteur énergétique",
        image: "./img/actu2.jpg",
        link: "#"
    },
    {
        date: "2026-10-14",
        title: "Centrale hydroélectrique de Mbombo : l’ANSER et le FPI franchissent une nouvelle étape",
        image: "./img/actu3.jpg",
        link: "#"
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
