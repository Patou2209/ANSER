/* =========================================================
   PAGE ARTICLE — lit ?id=... dans l'URL et affiche l'actualité
   correspondante de NEWS_DATA (news.js). Aucune modification
   nécessaire ici pour ajouter un article.
========================================================= */
(function () {
    const root = document.getElementById("articleRoot");
    if (!root || typeof NEWS_DATA === "undefined") return;

    const esc = (s = "") => String(s).replace(/[&<>"']/g, c =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    // **gras** autorisé dans le texte des articles
    const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    const dateLongue = iso => new Date(iso + "T00:00:00")
        .toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const dateCourte = iso => new Date(iso + "T00:00:00")
        .toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

    const id = new URLSearchParams(location.search).get("id");
    const item = NEWS_DATA.find(n => n.id === id);

    const banniere = document.getElementById("artBanniere");
    const elTitre  = document.getElementById("artTitre");
    const elDate   = document.getElementById("artDate");
    const elFil    = document.getElementById("artFil");

    /* ---------- Article introuvable ---------- */
    if (!item) {
        document.title = "Article introuvable — ANSER";
        elTitre.textContent = "Article introuvable";
        elDate.textContent = "Actualités";
        elFil.textContent = "Introuvable";
        root.innerHTML = `
            <div class="art-introuvable">
                <p>Cette actualité n’existe pas ou n’est plus disponible.</p>
                <a class="btn btn--jaune" href="actualites.html">Voir toutes les actualités</a>
            </div>`;
        return;
    }

    /* ---------- URL de partage : toujours la page de CET article ---------- */
    const url = new URL(location.href);
    url.search = "?id=" + encodeURIComponent(item.id);
    url.hash = "";
    const shareUrl = url.toString();

    /* ---------- En-tête de page ---------- */
    document.title = item.title + " — ANSER";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = item.lead || item.title;
    const setMeta = (prop, val) => {
        let m = document.querySelector(`meta[property="${prop}"]`);
        if (!m) { m = document.createElement("meta"); m.setAttribute("property", prop); document.head.appendChild(m); }
        m.content = val;
    };
    setMeta("og:title", item.title);
    setMeta("og:description", item.lead || item.title);
    setMeta("og:type", "article");
    setMeta("og:url", shareUrl);
    if (item.image) setMeta("og:image", new URL(item.image, location.href).href);

    if (item.image) banniere.style.backgroundImage = `url("${item.image.replace(/"/g, "%22")}")`;
    elTitre.textContent = item.title;
    elDate.innerHTML = `<i class="far fa-calendar" aria-hidden="true"></i> ${esc(dateLongue(item.date))}`;
    elFil.textContent = item.title.length > 48 ? item.title.slice(0, 46) + "…" : item.title;

    /* ---------- Bloc de partage ---------- */
    const txt = encodeURIComponent(item.title);
    const u   = encodeURIComponent(shareUrl);
    const canShare = typeof navigator.share === "function";

    const shareBlock = extra => `
        <div class="partage ${extra}" role="group" aria-label="Partager cette actualité">
            <span class="partage__titre"><i class="fas fa-share-nodes" aria-hidden="true"></i> Partager</span>
            <a class="partage__btn" href="https://wa.me/?text=${txt}%20${u}" target="_blank" rel="noopener" aria-label="Partager sur WhatsApp"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
            <a class="partage__btn" href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" aria-label="Partager sur Facebook"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
            <a class="partage__btn" href="https://twitter.com/intent/tweet?text=${txt}&url=${u}" target="_blank" rel="noopener" aria-label="Partager sur X"><i class="fab fa-x-twitter" aria-hidden="true"></i></a>
            <a class="partage__btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${u}" target="_blank" rel="noopener" aria-label="Partager sur LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a>
            <a class="partage__btn" href="mailto:?subject=${txt}&body=${txt}%0A${u}" aria-label="Partager par e-mail"><i class="fas fa-envelope" aria-hidden="true"></i></a>
            <button class="partage__btn" type="button" data-copier aria-label="Copier le lien"><i class="fas fa-link" aria-hidden="true"></i></button>
            ${canShare ? `<button class="partage__btn" type="button" data-natif aria-label="Partager via une autre application"><i class="fas fa-arrow-up-from-bracket" aria-hidden="true"></i></button>` : ""}
            <span class="partage__statut" role="status" aria-live="polite"></span>
        </div>`;

    /* ---------- Contenu ---------- */
    const renderBlock = b => {
        switch (b.type) {
            case "h2":    return `<h2>${fmt(b.text)}</h2>`;
            case "ul":    return `<ul>${b.items.map(i => `<li>${fmt(i)}</li>`).join("")}</ul>`;
            case "quote": return `<blockquote class="art__citation">${fmt(b.text)}</blockquote>`;
            default:      return `<p>${fmt(b.text)}</p>`;
        }
    };

    root.innerHTML = `
        <article class="art">
            ${shareBlock("partage--haut")}
            ${item.lead ? `<p class="art__chapo">${fmt(item.lead)}</p>` : ""}
            <div class="art__corps">${(item.content || []).map(renderBlock).join("")}</div>
            ${item.tags && item.tags.length
                ? `<div class="art__tags">${item.tags.map(t => `<span class="art__tag">${esc(t)}</span>`).join("")}</div>` : ""}
            ${shareBlock("")}
            <p class="art__retour"><a class="btn btn--contour" href="actualites.html"><i class="fas fa-arrow-left" aria-hidden="true"></i> Toutes les actualités</a></p>
        </article>`;

    /* ---------- Actions de partage ---------- */
    const flash = msg => root.querySelectorAll(".partage__statut").forEach(s => {
        s.textContent = msg;
        setTimeout(() => { s.textContent = ""; }, 2500);
    });

    root.addEventListener("click", async e => {
        const copy = e.target.closest("[data-copier]");
        const nat  = e.target.closest("[data-natif]");
        if (copy) {
            try {
                await navigator.clipboard.writeText(shareUrl);
            } catch (_) {
                const t = document.createElement("textarea");
                t.value = shareUrl; document.body.appendChild(t);
                t.select(); document.execCommand("copy"); t.remove();
            }
            flash("Lien copié !");
        }
        if (nat) {
            try { await navigator.share({ title: item.title, text: item.title, url: shareUrl }); } catch (_) {}
        }
    });

    /* ---------- À lire aussi (les 2 plus récentes, hors article courant) ---------- */
    const autres = [...NEWS_DATA]
        .filter(n => n.id !== item.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    if (autres.length) {
        document.getElementById("artAutresGrille").innerHTML = autres.map(n => `
            <a href="${esc(n.link)}" class="news-card">
                ${n.image ? `<img src="${esc(n.image)}" alt="" loading="lazy">` : ""}
                <time datetime="${esc(n.date)}">${esc(dateCourte(n.date))}</time>
                <h3>${esc(n.title)}</h3>
            </a>`).join("");
        document.getElementById("artAutres").hidden = false;
    }
})();
