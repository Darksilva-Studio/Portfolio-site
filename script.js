// Builds the whole page from data.js. You normally never need to edit this file.

const $ = (sel) => document.querySelector(sel);
const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let activeCat = CATEGORIES[0]?.id;
let activeTag = "All";

/* ---------- Header / footer ---------- */
function renderHeader() {
  document.title = `${SITE.name} | Portfolio`;
  $("#siteName").textContent = SITE.name;
  $("#siteTagline").textContent = SITE.tagline;
  $("#siteAbout").textContent = SITE.about;
  $("#footName").textContent = SITE.name;
  $("#year").textContent = new Date().getFullYear();
  $("#siteLinks").innerHTML = (SITE.links || [])
    .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
    .join("");
}

/* ---------- Tabs ---------- */
function renderTabs() {
  $("#tabs").innerHTML = CATEGORIES.map(
    (c) => `<button class="tab ${c.id === activeCat ? "active" : ""}" data-id="${esc(c.id)}">${esc(c.label)}</button>`
  ).join("");
  document.querySelectorAll(".tab").forEach((b) =>
    b.addEventListener("click", () => selectCategory(b.dataset.id))
  );
}

function selectCategory(id) {
  activeCat = id;
  activeTag = "All";
  history.replaceState(null, "", "#" + id);
  renderAll();
}

/* ---------- Filters (subcategories from item.tag) ---------- */
function renderFilters(cat) {
  const tags = [...new Set(cat.items.map((i) => i.tag).filter(Boolean))];
  const box = $("#filters");
  if (tags.length < 2) { box.innerHTML = ""; return; }
  box.innerHTML = ["All", ...tags]
    .map((t) => `<button class="chip ${t === activeTag ? "active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");
  box.querySelectorAll(".chip").forEach((b) =>
    b.addEventListener("click", () => { activeTag = b.dataset.tag; renderAll(); })
  );
}

/* ---------- Cards ---------- */
function placeholderHTML(path) {
  return `<div class="placeholder"><div>Add your file here:<br><code>${esc(path)}</code></div></div>`;
}

function buildMedia(item) {
  const wrap = document.createElement("div");
  wrap.className = "media";

  if (item.type === "youtube" || item.type === "sketchfab") {
    wrap.classList.add("embed");
    const url = item.type === "youtube"
      ? `https://www.youtube.com/embed/${encodeURIComponent(item.id)}`
      : `https://sketchfab.com/models/${encodeURIComponent(item.id)}/embed`;
    wrap.innerHTML = `<iframe loading="lazy" allowfullscreen src="${url}" title="${esc(item.title)}"></iframe>`;
    return wrap;
  }

  const fail = () => { wrap.innerHTML = placeholderHTML(item.src); wrap.style.cursor = "default"; };

  if (item.type === "video") {
    const v = document.createElement("video");
    v.src = item.src; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
    v.addEventListener("mouseenter", () => v.play());
    v.addEventListener("mouseleave", () => v.pause());
    v.addEventListener("error", fail);
    wrap.appendChild(v);
    wrap.addEventListener("click", () => openLightbox("video", item.src));
  } else {
    const img = document.createElement("img");
    img.loading = "lazy"; img.src = item.src; img.alt = item.title;
    img.addEventListener("error", fail);
    wrap.appendChild(img);
    wrap.addEventListener("click", () => { if (img.isConnected) openLightbox("image", item.src); });
  }
  return wrap;
}

function buildCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  card.appendChild(buildMedia(item));

  const tools = (item.tools || []).map((t) => `<span>${esc(t)}</span>`).join("");
  const meta = [item.tag, item.date].filter(Boolean).map(esc).join(" · ");
  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `
    <h3>${esc(item.title)}</h3>
    ${meta ? `<div class="meta">${meta}</div>` : ""}
    ${item.description ? `<p class="desc">${esc(item.description)}</p>` : ""}
    ${tools ? `<div class="tools">${tools}</div>` : ""}
    ${item.download ? `<a class="dl" href="${esc(item.download)}" target="_blank" rel="noopener">Download / view source &rarr;</a>` : ""}`;
  card.appendChild(info);
  return card;
}

/* ---------- Page ---------- */
function renderAll() {
  const cat = CATEGORIES.find((c) => c.id === activeCat) || CATEGORIES[0];
  renderTabs();
  $("#catTitle").textContent = cat.label;
  $("#catDesc").textContent = cat.description || "";
  renderFilters(cat);

  const grid = $("#grid");
  grid.innerHTML = "";
  const items = cat.items.filter((i) => activeTag === "All" || i.tag === activeTag);
  if (!items.length) {
    grid.innerHTML = `<p class="empty">Nothing here yet. Add items in data.js.</p>`;
    return;
  }
  items.forEach((i) => grid.appendChild(buildCard(i)));
}

/* ---------- Lightbox ---------- */
function openLightbox(kind, src) {
  $("#lbContent").innerHTML = kind === "video"
    ? `<video src="${esc(src)}" controls autoplay loop></video>`
    : `<img src="${esc(src)}" alt="">`;
  $("#lightbox").hidden = false;
}
function closeLightbox() { $("#lightbox").hidden = true; $("#lbContent").innerHTML = ""; }
$("#lbClose").addEventListener("click", closeLightbox);
$("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* ---------- Start ---------- */
const fromHash = location.hash.slice(1);
if (CATEGORIES.some((c) => c.id === fromHash)) activeCat = fromHash;
renderHeader();
renderAll();
