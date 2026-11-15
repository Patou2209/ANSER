/* =========================================================
   ACTUALITÉS
   1) DONNÉES  : ajoute une actualité en copiant un bloc.
      L'ordre n'a pas d'importance, le tri par date
      (la plus récente d'abord) est automatique.
      Format de la date : "AAAA-MM-JJ"
   2) AFFICHAGE : automatique, rien à modifier plus bas.

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