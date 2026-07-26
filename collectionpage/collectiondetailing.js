document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".collection-tab");
  const cards = document.querySelectorAll(".collection-card");
  const ageFilter = document.getElementById("kidsAgeFilter");
  const ageTabs = document.querySelectorAll(".age-tab");

  let currentCategory = "all";
  let currentAge = "all";

  function applyFilters() {
    cards.forEach((card) => {
      const categoryMatch =
        currentCategory === "all" || card.dataset.category === currentCategory;

      const ageMatch =
        currentCategory !== "kids" ||
        currentAge === "all" ||
        card.dataset.age === currentAge;

      const show =
        currentCategory === "all"
          ? true
          : currentCategory === "kids"
            ? categoryMatch && ageMatch
            : categoryMatch;

      card.classList.toggle("show", show);
    });
  }

  function toggleAgeFilter() {
    if (!ageFilter) return;
    ageFilter.style.display = currentCategory === "kids" ? "flex" : "none";
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");

      currentCategory = tab.dataset.filter;
      currentAge = "all";

      ageTabs.forEach((btn) => btn.classList.remove("active"));
      if (ageTabs[0]) ageTabs[0].classList.add("active");

      toggleAgeFilter();
      applyFilters();
    });
  });

  ageTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      ageTabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");
      currentAge = tab.dataset.age;
      applyFilters();
    });
  });

  toggleAgeFilter();
  if (tabs[0]) tabs[0].click();
});
