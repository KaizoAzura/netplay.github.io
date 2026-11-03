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

// slide hero

  const heroEl = document.getElementById("heroCarousel");
  const heroCarousel = bootstrap.Carousel.getOrCreateInstance(heroEl);
  const IMAGE_DURATION = 6000; // lama slide gambar (ms)
  let imageTimer;

  function startActiveSlide() {
    clearTimeout(imageTimer);

    // hentikan semua video
    heroEl.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    const active = heroEl.querySelector(".carousel-item.active");
    const video = active.querySelector("video");

    if (video) {
      video.play().catch(() => {});
    } else {
      // slide gambar: pindah otomatis setelah beberapa detik
      imageTimer = setTimeout(() => heroCarousel.next(), IMAGE_DURATION);
    }
  }

  // slide video pindah setelah trailer selesai
  heroEl.querySelectorAll("video").forEach((v) =>
    v.addEventListener("ended", () => heroCarousel.next())
  );

  heroEl.addEventListener("slid.bs.carousel", startActiveSlide);
  startActiveSlide();
