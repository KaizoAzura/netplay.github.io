  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

//   offcanvas search

const searchCanvas = document.getElementById("offcanvasSearch");
const mq = window.matchMedia("(min-width: 993px)");

function setSearchDirection(e) {
  searchCanvas.classList.toggle("offcanvas-top", e.matches);
  searchCanvas.classList.toggle("offcanvas-bottom", !e.matches);
}

setSearchDirection(mq);
mq.addEventListener("change", setSearchDirection);