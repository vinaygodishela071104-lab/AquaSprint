const sizeData = {
  speedo: {
    title: "Speedo",
    note: "True to size",
    desc: "Balanced fit for swim training and everyday performance.",
    rows: [
      ["XS", "32–33", "24–26", "35–36"],
      ["S", "33–35", "26–28", "36–38"],
      ["M", "35–37", "28–29", "38–39"],
      ["L", "37–39", "30–31", "40–41"],
      ["XL", "39–41", "31–34", "41–42"],
    ],
  },
  arena: {
    title: "Arena",
    note: "Snug fit",
    desc: "Performance-oriented sizing with a close, competitive feel.",
    rows: [
      ["XS", "31–32", "23–25", "34–35"],
      ["S", "32–34", "25–27", "35–37"],
      ["M", "34–36", "27–29", "37–38"],
      ["L", "36–38", "29–31", "39–40"],
      ["XL", "38–40", "31–33", "40–42"],
    ],
  },
  tyr: {
    title: "TYR",
    note: "Athletic fit",
    desc: "Made for training and racing with a secure, athletic shape.",
    rows: [
      ["XS", "32–34", "24–26", "35–36"],
      ["S", "34–36", "26–28", "36–38"],
      ["M", "36–38", "28–30", "38–40"],
      ["L", "38–40", "30–32", "40–42"],
      ["XL", "40–42", "32–34", "42–44"],
    ],
  },
  nike: {
    title: "Nike",
    note: "Relaxed fit",
    desc: "Comfort-first fit with slightly more room through the body.",
    rows: [
      ["XS", "33–34", "25–27", "36–37"],
      ["S", "34–36", "27–29", "37–39"],
      ["M", "36–38", "29–31", "39–41"],
      ["L", "38–40", "31–33", "41–43"],
      ["XL", "40–42", "33–35", "43–45"],
    ],
  },
  adidas: {
    title: "Adidas",
    note: "Modern fit",
    desc: "Clean, contemporary fit that balances comfort and performance.",
    rows: [
      ["XS", "32–33", "24–26", "35–36"],
      ["S", "33–35", "26–28", "36–38"],
      ["M", "35–37", "28–30", "38–40"],
      ["L", "37–39", "30–32", "40–42"],
      ["XL", "39–41", "32–34", "42–44"],
    ],
  },
  ua: {
    title: "Under Armour",
    note: "Compression fit",
    desc: "Supportive sizing with a tighter performance-focused feel.",
    rows: [
      ["XS", "31–32", "23–25", "34–35"],
      ["S", "32–34", "25–27", "35–37"],
      ["M", "34–36", "27–29", "37–39"],
      ["L", "36–38", "29–31", "39–41"],
      ["XL", "38–40", "31–33", "41–43"],
    ],
  },
};

const brandButtons = document.querySelectorAll(".sizeguide__brand");
const brandTitle = document.getElementById("brandTitle");
const fitNote = document.getElementById("fitNote");
const brandDesc = document.getElementById("brandDesc");
const sizeRows = document.getElementById("sizeRows");

function renderBrand(key) {
  const brand = sizeData[key];
  brandTitle.textContent = brand.title;
  fitNote.textContent = brand.note;
  brandDesc.textContent = brand.desc;
  sizeRows.innerHTML = brand.rows
    .map(
      (row) => `
          <tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
          </tr>
        `,
    )
    .join("");
}

brandButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    brandButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderBrand(btn.dataset.brand);
  });
});

renderBrand("speedo");
const panels = document.querySelectorAll(".teamkit__panel");
const stepButtons = document.querySelectorAll(".teamkit__step");
const nextBtns = document.querySelectorAll("[data-next]");
const backBtns = document.querySelectorAll("[data-back]");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("teamkitForm");
const summaryBox = document.getElementById("summaryBox");

let currentStep = 1;

function getChecked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]`)]
    .filter((el) => el.checked)
    .map((el) => el.value);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function updateSummary() {
  const group =
    document.querySelector('input[name="group"]:checked')?.value || "Club";
  const kits = getChecked("kit");
  const branding =
    document.querySelector('input[name="branding"]:checked')?.value ||
    "Logo Print";
  const fullName = document.getElementById("fullName").value || "—";
  const email = document.getElementById("email").value || "—";
  const qty = document.getElementById("qty").value || "—";
  const deadline = document.getElementById("deadline").value || "—";
  const message = document.getElementById("message").value || "—";

  summaryBox.innerHTML = `
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Group:</strong> ${escapeHtml(group)}</p>
      <p><strong>Kit:</strong> ${kits.length ? escapeHtml(kits.join(", ")) : "None selected"}</p>
      <p><strong>Branding:</strong> ${escapeHtml(branding)}</p>
      <p><strong>Quantity:</strong> ${escapeHtml(qty)}</p>
      <p><strong>Deadline:</strong> ${escapeHtml(deadline)}</p>
      <p><strong>Notes:</strong> ${escapeHtml(message)}</p>
    `;
}

function showStep(step) {
  currentStep = step;
  panels.forEach((panel) =>
    panel.classList.toggle("is-active", Number(panel.dataset.step) === step),
  );
  stepButtons.forEach((btn) =>
    btn.classList.toggle("is-active", Number(btn.dataset.stepBtn) === step),
  );
  progressBar.style.width = `${(step / 3) * 100}%`;
  updateSummary();
}

nextBtns.forEach((btn) =>
  btn.addEventListener("click", () => showStep(Math.min(3, currentStep + 1))),
);
backBtns.forEach((btn) =>
  btn.addEventListener("click", () => showStep(Math.max(1, currentStep - 1))),
);
stepButtons.forEach((btn) =>
  btn.addEventListener("click", () => showStep(Number(btn.dataset.stepBtn))),
);

form.addEventListener("input", updateSummary);
form.addEventListener("change", updateSummary);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Quote request ready to submit.");
});

updateSummary();
showStep(1);
const reviews = document.querySelectorAll(".review-card");
const dots = document.querySelectorAll("#reviewDots button");
const prevBtn = document.getElementById("prevReview");
const nextBtn = document.getElementById("nextReview");
let current = 0;

function showReview(index) {
  reviews.forEach((card, i) => card.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  current = index;
}

prevBtn.addEventListener("click", () => {
  showReview((current - 1 + reviews.length) % reviews.length);
});

nextBtn.addEventListener("click", () => {
  showReview((current + 1) % reviews.length);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showReview(index));
});

setInterval(() => {
  showReview((current + 1) % reviews.length);
}, 5000);

showReview(0);
