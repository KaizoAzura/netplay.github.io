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
  const canPlayVideo = window.matchMedia("(min-width: 993px)");
  const SLIDE_DURATION = 6000; // lama slide gambar / cover (ms)
  let slideTimer;

  function startActiveSlide() {
    clearTimeout(slideTimer);

    heroEl.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    const active = heroEl.querySelector(".carousel-item.active");
    const video = active.querySelector("video");

    if (video && canPlayVideo.matches) {
      // desktop: putar trailer, pindah saat selesai
      video.play().catch(() => {});
    } else {
      // mobile atau slide gambar: tampilkan cover, pindah via timer
      slideTimer = setTimeout(() => heroCarousel.next(), SLIDE_DURATION);
    }
  }

  heroEl.querySelectorAll("video").forEach((v) =>
    v.addEventListener("ended", () => heroCarousel.next())
  );

  heroEl.addEventListener("slid.bs.carousel", startActiveSlide);

  // layar di-resize melewati 992px: sesuaikan perilaku slide aktif
  canPlayVideo.addEventListener("change", startActiveSlide);

  startActiveSlide();

