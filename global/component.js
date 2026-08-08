// ==============================
// Load Navbar
// ==============================
fetch("../components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    applySavedPreferences();
    lucide.createIcons({ root: document.getElementById("navbar") });
    initializeNavbar();
  })
  .catch((error) => console.error("Navbar failed to load:", error));

// ==============================
// Load Footer
// ==============================
fetch("../components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
    applySavedPreferences();
    lucide.createIcons({ root: document.getElementById("footer") });
    initializeBackToTop();
    updateLogo();
  })
  .catch((error) => console.error("Footer failed to load:", error));

// ==============================
// Helpers
// ==============================
function setLucideIcon(element, iconName) {
  if (!element) return;
  element.innerHTML = `<i data-lucide="${iconName}"></i>`;
  lucide.createIcons({ root: element });
}

// ==============================
// Apply Saved Preferences
// ==============================
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
  updateToggleIcons();
}

// ==============================
// Update Toggle Icons
// ==============================
function updateToggleIcons() {
  const darkToggle = document.getElementById("darkToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if (darkToggle) {
    setLucideIcon(
      darkToggle,
      document.body.classList.contains("dark-mode") ? "sun" : "moon",
    );
  }

  if (menuToggle) {
    const isActive = navLinks ? navLinks.classList.contains("active") : false;
    setLucideIcon(menuToggle, isActive ? "x" : "menu");
  }
}

// ==============================
// Navbar Functions
// ==============================
function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileLogin = document.querySelector(".mobile-login");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (!darkToggle || !rtlToggle || !menuToggle || !navLinks) {
    console.error("Navbar elements not found.");
    return;
  }

  setActiveNavLink();
  updateLogo();
  updateToggleIcons();
  setupDarkMode(darkToggle);
  setupRTL(rtlToggle);
  setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns);
  setupMobileDropdowns(dropdowns);
}

// ==============================
// Active Nav Link
// ==============================
function setActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "");
  const allLinks = document.querySelectorAll(".nav-links a");

  allLinks.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");

    const parentLi = link.closest("li");
    if (parentLi) parentLi.classList.remove("active");
  });

  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    dropdown.classList.remove("active");
    const trigger = dropdown.querySelector(":scope > a");
    if (trigger) {
      trigger.classList.remove("active");
      trigger.removeAttribute("aria-current");
    }
  });

  allLinks.forEach((link) => {
    const linkPath = new URL(
      link.href,
      window.location.origin,
    ).pathname.replace(/\/$/, "");

    if (currentPath === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");

      const parentDropdown = link.closest(".dropdown");

      if (parentDropdown) {
        parentDropdown.classList.add("active");

        const parentTrigger = parentDropdown.querySelector(":scope > a");
        if (parentTrigger) {
          parentTrigger.classList.add("active");
          parentTrigger.setAttribute("aria-current", "page");
        }
      } else {
        const parentLi = link.closest("li");
        if (parentLi) parentLi.classList.add("active");
      }
    }
  });
}

// ==============================
// Logo Switch
// ==============================
function updateLogo() {
  const logos = document.querySelectorAll("[data-theme-logo]");
  const isDark = document.body.classList.contains("dark-mode");

  logos.forEach((logo) => {
    const darkSrc = logo.dataset.logoDark || "/images/logo-dark.png";
    const lightSrc = logo.dataset.logoLight || "/images/logo-white.png";
    logo.src = isDark ? darkSrc : lightSrc;
  });
}

// ==============================
// Dark Mode
// ==============================
function setupDarkMode(darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateLogo();
    updateToggleIcons();
  });
}

// ==============================
// RTL Toggle
// ==============================
function setupRTL(rtlToggle) {
  rtlToggle.addEventListener("click", () => {
    const newDir = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
    document.documentElement.dir = newDir;
    localStorage.setItem("dir", newDir);
  });
}

// ==============================
// Mobile Menu
// ==============================
function setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns) {
  menuToggle.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");

    if (mobileLogin) {
      mobileLogin.classList.toggle("active", isActive);
    }

    setLucideIcon(menuToggle, isActive ? "x" : "menu");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove("active");

      if (mobileLogin) {
        mobileLogin.classList.remove("active");
      }

      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

      setLucideIcon(menuToggle, "menu");
    }
  });
}

// ==============================
// Mobile Dropdowns
// ==============================
function setupMobileDropdowns(dropdowns) {
  dropdowns.forEach((dropdown) => {
    const topLink = dropdown.querySelector(":scope > a");
    if (!topLink) return;

    topLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();

        dropdowns.forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove("active");
          }
        });

        dropdown.classList.toggle("active");
      }
    });
  });
}

// ==============================
// Back To Top
// ==============================
function initializeBackToTop() {
  const topBtn = document.querySelector(".top-btn");
  if (!topBtn) return;

  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
