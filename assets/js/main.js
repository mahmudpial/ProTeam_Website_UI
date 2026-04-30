const ProUI = {
  init() {
    this.navbarLogic();
    this.scrollReveal();
    this.smoothScroll();
    this.teamSlider();
  },

  navbarLogic() {
    const nav = document.querySelector("nav");
    if (!nav || nav.dataset.navbarBound === "true") return;
    nav.dataset.navbarBound = "true";

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        nav.style.padding = "0.5rem 0";
        nav.style.background = "rgba(15, 23, 42, 0.95)";
      } else {
        nav.style.padding = "1rem 0";
        nav.style.background = "rgba(15, 23, 42, 0.8)";
      }
    });
  },

  scrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      if (el.dataset.revealBound === "true") return;
      el.dataset.revealBound = "true";
      observer.observe(el);
    });
  },

  smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      if (anchor.dataset.smoothBound === "true") return;
      anchor.dataset.smoothBound = "true";
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  },

  teamSlider() {
    const slider = document.getElementById("memberSlider");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (!slider || !nextBtn || !prevBtn || slider.dataset.sliderBound === "true") return;
    slider.dataset.sliderBound = "true";

    const getScrollAmount = () => {
      const firstCard = slider.querySelector(".group\\/card");
      if (!firstCard) return Math.max(slider.clientWidth * 0.8, 280);

      const cardWidth = firstCard.getBoundingClientRect().width;
      const sliderStyles = window.getComputedStyle(slider);
      const gap = parseFloat(sliderStyles.columnGap || sliderStyles.gap || "0") || 0;

      return cardWidth + gap;
    };

    const scrollCards = (direction) => {
      slider.scrollBy({
        left: getScrollAmount() * direction,
        behavior: "smooth",
      });
    };

    const pauseAutoplay = () => {
      slider.dataset.sliderPausedUntil = String(Date.now() + 2000);
    };

    nextBtn.addEventListener("click", () => {
      scrollCards(1);
      pauseAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      scrollCards(-1);
      pauseAutoplay();
    });

    slider.addEventListener("mouseenter", () => {
      slider.dataset.sliderHovered = "true";
    });

    slider.addEventListener("mouseleave", () => {
      delete slider.dataset.sliderHovered;
    });

    if (slider._autoScrollInterval) {
      clearInterval(slider._autoScrollInterval);
    }

    slider._autoScrollInterval = setInterval(() => {
      if (slider.dataset.sliderHovered === "true") return;
      if (Date.now() < Number(slider.dataset.sliderPausedUntil || 0)) return;

      const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
      slider.scrollLeft = atEnd ? 0 : slider.scrollLeft + 1;
    }, 30);
  },
};

document.addEventListener("DOMContentLoaded", () => ProUI.init());
