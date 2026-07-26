document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = document.getElementById("heroSlider");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dots = document.querySelectorAll(".hero-dots .dot");

  if (heroSlider && slides.length && prevBtn && nextBtn && dots.length) {
    let currentSlide = 0;
    let autoPlay;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      currentSlide = index;
    }

    function nextSlide() {
      showSlide((currentSlide + 1) % slides.length);
    }

    function prevSlideFn() {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlay = setInterval(nextSlide, 5500);
    }

    function stopAutoPlay() {
      clearInterval(autoPlay);
    }

    prevBtn.addEventListener("click", () => {
      prevSlideFn();
      startAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index);
        startAutoPlay();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlideFn();
        startAutoPlay();
      }

      if (e.key === "ArrowRight") {
        nextSlide();
        startAutoPlay();
      }
    });

    heroSlider.addEventListener("mouseenter", stopAutoPlay);
    heroSlider.addEventListener("mouseleave", startAutoPlay);

    heroSlider.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroSlider.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      if (swipeDistance > 50) {
        prevSlideFn();
        startAutoPlay();
      }

      if (swipeDistance < -50) {
        nextSlide();
        startAutoPlay();
      }
    });

    showSlide(0);
    startAutoPlay();
  }

  const showcaseButtons = document.querySelectorAll(".showcase-toggle-btn");
  const showcasePanels = document.querySelectorAll(".showcase-panel");

  if (showcaseButtons.length && showcasePanels.length) {
    showcaseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.target;

        showcaseButtons.forEach((btn) => btn.classList.remove("active"));
        showcasePanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const testimonialButtons = document.querySelectorAll(".testimonial-selector");
  const testimonialPanels = document.querySelectorAll(".testimonial-panel");

  if (testimonialButtons.length && testimonialPanels.length) {
    testimonialButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.testimonial;

        testimonialButtons.forEach((btn) => btn.classList.remove("active"));
        testimonialPanels.forEach((panel) => panel.classList.remove("active"));

        button.classList.add("active");

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });
  }
});
