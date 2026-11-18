/* =========================================================
   Génère une page de partage statique par actualité :
       partage/<id>.html
   Les réseaux (WhatsApp, Facebook, LinkedIn, X...) ne lisent PAS le
   JavaScript : ils ont besoin des balises og: directement dans le HTML.
   Cette page les contient, puis redirige les visiteurs vers l'article.

   Utilisation (à relancer après chaque nouvelle actualité) :
       node generer-partage.js
   Puis envoyer le dossier partage/ sur le serveur.
========================================================= */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE_URL = "https://anser.gouv.cd";   // <- adapte si besoin (sans "/" final)
const SITE_NOM = "ANSER";

// Lecture de NEWS_DATA depuis news.js
const code = fs.readFileSync(path.join(__dirname, "news.js"), "utf8");
const sandbox = {
    document: { getElementById: () => null, querySelectorAll: () => [] },
    window: {}
};
vm.createContext(sandbox);
vm.runInContext(code + "\n;globalThis.__NEWS = NEWS_DATA;", sandbox);
const news = sandbox.__NEWS;

const esc = (s = "") => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const abs = p => new URL(p, SITE_URL + "/").href;   // ./img/x.jpg -> https://.../img/x.jpg

const resume = s => {
    const t = String(s || "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
    return t.length > 200 ? t.slice(0, 197).replace(/\s+\S*$/, "") + "…" : t;
};

const outDir = path.join(__dirname, "partage");
fs.mkdirSync(outDir, { recursive: true });

for (const n of news) {
    const pageUrl    = `${SITE_URL}/partage/${encodeURIComponent(n.id)}.html`;
    const articleUrl = `${SITE_URL}/article.html?id=${encodeURIComponent(n.id)}`;
    const image      = n.image ? abs(n.image) : "";
    const desc       = resume(n.lead || n.title);

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(n.title)} — ${SITE_NOM}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(articleUrl)}">

<meta property="og:site_name" content="${SITE_NOM}">
<meta property="og:type" content="article">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(n.title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(pageUrl)}">
${image ? `<meta property="og:image" content="${esc(image)}">\n<meta property="og:image:alt" content="${esc(n.title)}">` : ""}
<meta property="article:published_time" content="${esc(n.date)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(n.title)}">
<meta name="twitter:description" content="${esc(desc)}">
${image ? `<meta name="twitter:image" content="${esc(image)}">` : ""}

<meta http-equiv="refresh" content="0;url=${esc(articleUrl)}">
<script>location.replace(${JSON.stringify(articleUrl)});</script>
</head>
<body>
<p>Redirection vers <a href="${esc(articleUrl)}">${esc(n.title)}</a>…</p>
</body>
</html>
`;
    fs.writeFileSync(path.join(outDir, n.id + ".html"), html);
    console.log("OK  partage/" + n.id + ".html");
}
