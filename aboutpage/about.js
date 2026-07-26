  document.querySelectorAll(".value-card__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".value-card");
      card.classList.toggle("is-open");
      btn.textContent = card.classList.contains("is-open") ? "Show Less" : "Learn More";
    });
  });
    document.querySelectorAll(".about-why__card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-open");
    });
  });