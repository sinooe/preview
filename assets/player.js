(function () {
  const body = document.body;
  if (!body || !body.classList.contains("slide-page")) {
    return;
  }

  const totalPages = Number(body.dataset.totalPages || 6);
  const fileMatch = window.location.pathname.match(/page(\d+)\.html$/i);
  const currentPage = Number(body.dataset.page || (fileMatch ? fileMatch[1] : 1));
  const disableClickNav = body.dataset.disableClickNav === "true";
  const bgSource = document.querySelector(".slide-image, .slide4-base");

  if (bgSource && bgSource.getAttribute("src")) {
    body.style.setProperty("--slide-bg", `url(\"${bgSource.getAttribute("src")}\")`);
  }

  const hud = document.getElementById("hud");
  const pageCount = document.querySelector(".page-count");
  let fadeTimer;

  const showHud = () => {
    if (!hud) return;
    hud.classList.remove("is-faded");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => {
      hud.classList.add("is-faded");
    }, 2000);
  };

  const gotoPage = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === currentPage) {
      showHud();
      return;
    }
    window.location.href = `page${targetPage}.html`;
  };

  if (pageCount) {
    pageCount.textContent = `${currentPage} / ${totalPages}`;
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (["ArrowRight", "PageDown", " ", "Space", "Spacebar"].includes(key)) {
      event.preventDefault();
      gotoPage(currentPage + 1);
      return;
    }

    if (["ArrowLeft", "PageUp"].includes(key)) {
      event.preventDefault();
      gotoPage(currentPage - 1);
      return;
    }

    if (key === "Home") {
      event.preventDefault();
      gotoPage(1);
      return;
    }

    if (key === "End") {
      event.preventDefault();
      gotoPage(totalPages);
      return;
    }

    showHud();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("a,button,input,textarea,select,label,[role='button']")) {
      return;
    }

    if (disableClickNav) {
      showHud();
      return;
    }

    const isLeftHalf = event.clientX < window.innerWidth / 2;
    gotoPage(isLeftHalf ? currentPage - 1 : currentPage + 1);
  });

  document.addEventListener("mousemove", showHud, { passive: true });
  document.addEventListener("touchstart", showHud, { passive: true });

  showHud();
})();
