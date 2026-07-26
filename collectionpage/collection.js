const tabs = document.querySelectorAll(".arrival-tab");
const items = document.querySelectorAll(".arrival-item");

function showCategory(category) {
  items.forEach((item) => {
    item.classList.toggle("is-hidden", item.dataset.category !== category);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.filter;

    tabs.forEach((btn) => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    showCategory(category);
  });
});

const defaultTab = document.querySelector('.arrival-tab[data-filter="men"]');
if (defaultTab) defaultTab.click();
const statSection = document.querySelector("#collection-stats");
const statNumbers = document.querySelectorAll(".stat-item__number");
let hasAnimated = false;

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1800;
  const start = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(animateCounter);
      }
    });
  },
  {
    threshold: 0.35,
  },
);

if (statSection) {
  observer.observe(statSection);
}
