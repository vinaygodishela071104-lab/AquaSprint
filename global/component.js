// ==============================
// Load Navbar
// ==============================
fetch("../components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    applySavedPreferences();
    lucide.createIcons();
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
    lucide.createIcons();
    initializeBackToTop();
    updateLogo();
  })
  .catch((error) => console.error("Footer failed to load:", error));

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

  if (darkToggle) {
    darkToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
  }

  lucide.createIcons();
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

  document.querySelectorAll(".nav-links > li > a").forEach((link) => {
    const linkPath = new URL(
      link.href,
      window.location.origin,
    ).pathname.replace(/\/$/, "");

    if (currentPath === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

// ==============================
// Logo Switch
// ==============================
function updateLogo() {
  const logos = document.querySelectorAll("[data-theme-logo]");

  logos.forEach((logo) => {
    logo.src = document.body.classList.contains("dark-mode")
      ? "/images/logo-dark.png"
      : "/images/logo-white.png";
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

    menuToggle.innerHTML = isActive
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
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

      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
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
