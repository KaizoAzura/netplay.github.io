(function () {
  const modalEl = document.getElementById("detailModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const canHover = window.matchMedia("(hover: hover) and (min-width: 993px)");
  const HOVER_DELAY = 350;

  let hoverTimer;
  let lastClosedKey = null; // card yang baru ditutup, jangan buka ulang sebelum kursor keluar

  // ---------- render card ----------
  function cardHTML(item, type, index) {
    const shape = type === "movie" ? "is-portrait" : "is-square";
    return `
      <button type="button" class="cover-card ${shape}" data-type="${type}" data-id="${item.id}">
        <img src="${item.cover}" alt="${item.title}" loading="lazy" />
        <span class="cover-number">${index + 1}</span>
        <span class="cover-stats">
          <span><i class="ri-star-fill"></i> ${item.rating}</span>
          <span><i class="ri-chat-3-line"></i> ${item.comments}</span>
        </span>
      </button>`;
  }

  function renderRows() {
    Object.keys(CONTENT).forEach((type) => {
      const row = document.getElementById("row-" + type);
      row.innerHTML = CONTENT[type].map((item, i) => cardHTML(item, type, i)).join("");
    });
  }

  // ---------- isi modal ----------
  function fillModal(type, id) {
    const item = CONTENT[type].find((c) => c.id === id);
    if (!item) return;

    document.getElementById("detailCover").src = item.cover;
    document.getElementById("detailCover").alt = item.title;
    document.getElementById("detailType").textContent = type;
    document.getElementById("detailTitle").textContent = item.title;
    document.getElementById("detailMeta").textContent =
      `${item.year} • ${item.genre} • ★ ${item.rating} • ${item.comments} comment`;
    document.getElementById("detailDesc").textContent = item.desc;
  }

  function openDetail(card) {
    fillModal(card.dataset.type, card.dataset.id);
    modal.show();
  }

  const keyOf = (card) => card.dataset.type + ":" + card.dataset.id;

  // ---------- event ----------
  const tabContent = document.querySelector(".trending .tab-content");

  // klik / tap (semua perangkat)
  tabContent.addEventListener("click", (e) => {
    const card = e.target.closest(".cover-card");
    if (card) openDetail(card);
  });

  // hover (desktop saja)
  tabContent.addEventListener("mouseover", (e) => {
    if (!canHover.matches) return;
    const card = e.target.closest(".cover-card");
    if (!card || card.contains(e.relatedTarget)) return;
    if (keyOf(card) === lastClosedKey) return;

    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => openDetail(card), HOVER_DELAY);
  });

  tabContent.addEventListener("mouseout", (e) => {
    const card = e.target.closest(".cover-card");
    if (!card || card.contains(e.relatedTarget)) return;

    clearTimeout(hoverTimer);
    if (keyOf(card) === lastClosedKey) lastClosedKey = null;
  });

  // simpan card yang terakhir ditutup
  let currentKey = null;
  modalEl.addEventListener("show.bs.modal", () => {
    const t = document.getElementById("detailType").textContent;
    const title = document.getElementById("detailTitle").textContent;
    const item = CONTENT[t] && CONTENT[t].find((c) => c.title === title);
    currentKey = item ? t + ":" + item.id : null;
  });
  modalEl.addEventListener("hidden.bs.modal", () => {
    lastClosedKey = currentKey;
  });

  renderRows();
})();