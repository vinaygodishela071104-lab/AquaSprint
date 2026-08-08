document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword",
  );
  const themeBtn = document.getElementById("themeToggle");
  const rtlBtn = document.getElementById("rtlToggle");

  function setLucideIcon(button, iconName) {
    if (!button) return;
    button.innerHTML = `<i data-lucide="${iconName}"></i>`;
    lucide.createIcons({ root: button });
  }

  function setupPasswordToggle(
    button,
    input,
    showLabel = "Show password",
    hideLabel = "Hide password",
  ) {
    if (!button || !input) return;

    setLucideIcon(button, "eye");

    button.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";

      setLucideIcon(button, isHidden ? "eye-off" : "eye");
      button.setAttribute("aria-label", isHidden ? hideLabel : showLabel);
    });
  }

  function updateLogo() {
    const logos = document.querySelectorAll("[data-theme-logo]");
    const dark = document.body.classList.contains("dark-mode");

    logos.forEach((logo) => {
      const darkSrc = logo.dataset.logoDark || "/images/logo-dark.png";
      const lightSrc = logo.dataset.logoLight || "/images/logo-white.png";
      logo.src = dark ? darkSrc : lightSrc;
    });
  }

  function applySavedPreferences() {
    const savedTheme = localStorage.getItem("theme");
    const savedDir = localStorage.getItem("dir");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    document.documentElement.dir = savedDir === "rtl" ? "rtl" : "ltr";

    updateLogo();

    if (themeBtn) {
      setLucideIcon(
        themeBtn,
        document.body.classList.contains("dark-mode") ? "sun" : "moon",
      );
    }

    if (rtlBtn) {
      setLucideIcon(rtlBtn, "arrow-left-right");
    }
  }

  applySavedPreferences();

  setupPasswordToggle(
    togglePassword,
    passwordInput,
    "Show password",
    "Hide password",
  );
  setupPasswordToggle(
    toggleConfirmPassword,
    confirmPasswordInput,
    "Show confirm password",
    "Hide confirm password",
  );

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(progress * target);

      if (target === 49) {
        el.textContent = progress < 1 ? value : "4.9★";
      } else if (target >= 1000) {
        el.textContent = value.toLocaleString("en-IN");
      } else {
        el.textContent = value;
      }

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });

  function createParticles() {
    const layer = document.getElementById("particleLayer");
    if (!layer) return;

    const count = 18;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";

      const size = `${8 + Math.random() * 14}px`;
      particle.style.setProperty("--x", `${Math.random() * 100}%`);
      particle.style.setProperty("--s", size);
      particle.style.setProperty(
        "--o",
        (0.18 + Math.random() * 0.35).toFixed(2),
      );
      particle.style.setProperty("--d", `${10 + Math.random() * 10}s`);
      particle.style.setProperty("--delay", `${Math.random() * -12}s`);

      layer.appendChild(particle);
    }
  }

  createParticles();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const dark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", dark ? "dark" : "light");

      setLucideIcon(themeBtn, dark ? "sun" : "moon");
      updateLogo();
    });
  }

  if (rtlBtn) {
    rtlBtn.addEventListener("click", () => {
      const isRtl = document.documentElement.dir === "rtl";
      const newDir = isRtl ? "ltr" : "rtl";

      document.documentElement.dir = newDir;
      localStorage.setItem("dir", newDir);

      setLucideIcon(rtlBtn, "arrow-left-right");
    });
  }
});
