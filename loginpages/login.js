const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {
  const icon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
    togglePassword.setAttribute(
      "aria-label",
      isHidden ? "Hide password" : "Show password",
    );
  });
}

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
    if (i % 4 === 0) particle.classList.add("glow");

    const size = `${8 + Math.random() * 14}px`;
    particle.style.setProperty("--x", `${Math.random() * 100}%`);
    particle.style.setProperty("--s", size);
    particle.style.setProperty("--o", (0.18 + Math.random() * 0.35).toFixed(2));
    particle.style.setProperty("--d", `${10 + Math.random() * 10}s`);
    particle.style.setProperty("--delay", `${Math.random() * -12}s`);
    layer.appendChild(particle);
  }
}

createParticles();

function updateLogo() {
  const logos = document.querySelectorAll("[data-theme-logo]");
  const dark = document.body.classList.contains("dark-mode");

  logos.forEach((logo) => {
    logo.src = dark ? "/images/logo-dark.png" : "/images/logo-white.png";
  });
}

const themeBtn = document.getElementById("themeToggle");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

if (themeBtn && themeIcon) {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  updateLogo();

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");

    if (dark) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "light");
    }

    updateLogo();
  });
}

const rtlBtn = document.getElementById("rtlToggle");

if (rtlBtn) {
  if (localStorage.getItem("direction") === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
    rtlBtn.textContent = "LTR";
  }

  rtlBtn.addEventListener("click", () => {
    const rtl = document.documentElement.getAttribute("dir") === "rtl";

    if (rtl) {
      document.documentElement.setAttribute("dir", "ltr");
      rtlBtn.textContent = "RTL";
      localStorage.setItem("direction", "ltr");
    } else {
      document.documentElement.setAttribute("dir", "rtl");
      rtlBtn.textContent = "LTR";
      localStorage.setItem("direction", "rtl");
    }
  });
}
