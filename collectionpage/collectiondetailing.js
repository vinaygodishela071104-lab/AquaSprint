document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".collection-tab");
  const cards = document.querySelectorAll(".collection-card");
  const ageFilter = document.getElementById("kidsAgeFilter");
  const ageTabs = document.querySelectorAll(".age-tab");

  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const cartPanel = document.getElementById("cartPanel");
  const cartBadge = document.getElementById("cartBadge");

  const cartMen = document.getElementById("cartMen");
  const cartWomen = document.getElementById("cartWomen");
  const cartKids = document.getElementById("cartKids");

  const menCount = document.getElementById("menCount");
  const womenCount = document.getElementById("womenCount");
  const kidsCount = document.getElementById("kidsCount");

  const billItems = document.getElementById("billItems");
  const billSubtotal = document.getElementById("billSubtotal");
  const billDelivery = document.getElementById("billDelivery");
  const billTotal = document.getElementById("billTotal");
  const cartOrderBtn = document.getElementById("cartOrderBtn");

  let currentCategory = "all";
  let currentAge = "all";
  let cart = [];

  function formatPrice(price) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

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

  function getContainer(category) {
    if (category === "men") return cartMen;
    if (category === "women") return cartWomen;
    return cartKids;
  }

  function updateCounts() {
    const grouped = {
      men: 0,
      women: 0,
      kids: 0,
    };

    cart.forEach((item) => {
      grouped[item.category] += item.qty;
    });

    menCount.textContent = grouped.men;
    womenCount.textContent = grouped.women;
    kidsCount.textContent = grouped.kids;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalQty;
  }

  function updateBill() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const deliveryCharge = totalItems > 0 ? 99 : 0;
    const total = subtotal + deliveryCharge;

    billItems.textContent = totalItems;
    billSubtotal.textContent = formatPrice(subtotal);
    billDelivery.textContent = formatPrice(deliveryCharge);
    billTotal.textContent = formatPrice(total);

    cartOrderBtn.disabled = totalItems === 0;
  }

  function renderCart() {
    cartMen.innerHTML = "";
    cartWomen.innerHTML = "";
    cartKids.innerHTML = "";

    const grouped = {
      men: [],
      women: [],
      kids: [],
    };

    cart.forEach((item) => grouped[item.category].push(item));

    Object.entries(grouped).forEach(([category, items]) => {
      const container = getContainer(category);

      if (!items.length) {
        container.innerHTML = `<div class="empty-cart">No items selected.</div>`;
        return;
      }

      items.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
          <div class="cart-item__top">
            <div>
              <p class="cart-item__name">${item.name}</p>
              <p class="cart-item__price">${formatPrice(item.price)} x ${item.qty} = ${formatPrice(item.price * item.qty)}</p>
            </div>
          </div>

          <div class="cart-item__controls">
            <button class="qty-minus" data-id="${item.id}" type="button">-</button>
            <span class="cart-item__qty">${item.qty}</span>
            <button class="qty-plus" data-id="${item.id}" type="button">+</button>
            <button class="remove-btn" data-id="${item.id}" type="button">Remove</button>
          </div>
        `;
        container.appendChild(row);
      });
    });

    updateCounts();
    updateBill();

    document.querySelectorAll(".qty-plus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = cart.find((p) => p.id === btn.dataset.id);
        if (item) item.qty += 1;
        renderCart();
      });
    });

    document.querySelectorAll(".qty-minus").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = cart.find((p) => p.id === btn.dataset.id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) cart = cart.filter((p) => p.id !== item.id);
        }
        renderCart();
      });
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        cart = cart.filter((p) => p.id !== btn.dataset.id);
        renderCart();
      });
    });
  }

  cards.forEach((card) => {
    const button = card.querySelector(".add-to-cart-btn");
    button.addEventListener("click", () => {
      const id = `${card.dataset.category}-${card.dataset.name}`;
      const existing = cart.find((item) => item.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id,
          category: card.dataset.category,
          name: card.dataset.name,
          price: Number(card.dataset.price),
          qty: 1,
        });
      }

      cartPanel.hidden = false;
      cartToggleBtn.setAttribute("aria-expanded", "true");
      renderCart();
    });
  });

  cartToggleBtn.addEventListener("click", () => {
    const isOpen = cartToggleBtn.getAttribute("aria-expanded") === "true";
    cartToggleBtn.setAttribute("aria-expanded", String(!isOpen));
    cartPanel.hidden = isOpen;
  });

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

  cartOrderBtn.addEventListener("click", () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    if (!totalItems) {
      alert("Your cart is empty.");
      return;
    }

    alert(`Order placed successfully! Total bill: ${billTotal.textContent}`);
  });

  toggleAgeFilter();
  if (tabs[0]) tabs[0].click();
  cartPanel.hidden = true;
  renderCart();

  if (window.lucide) {
    lucide.createIcons();
  }
});