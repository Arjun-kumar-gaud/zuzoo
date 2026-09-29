// =====================================================
// SUPABASE CONFIG
// =====================================================
const SUPABASE_URL = "https://wnqlbppkuqathlazubvu.supabase.co";
const SUPABASE_KEY = "sb_publishable_FR6ESJgcnlMJiAN0Fe2fig_6yZbjc9K";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================================================
// SHARED HELPERS
// =====================================================

function formatPrice(price) {
  return Number(price || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function toast(msg, type = "success") {
  const t = document.createElement("div");
  t.className = `position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-${type} shadow`;
  t.style.zIndex = 9999;
  t.style.minWidth = "260px";
  t.style.textAlign = "center";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// =====================================================
// CART (localStorage based)
// =====================================================
const CART_KEY = "zuzoo_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadges();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx > -1) {
    cart[idx].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.salePrice ?? product.price) || 0,
      image: product.imageUrl || "",
      quantity: qty,
      stock: Number(product.stock || 0)
    });
  }
  saveCart(cart);
  toast("Added to cart ✓");
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.quantity = Math.max(1, qty);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadges();
}

function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.quantity, 0);
}

function cartCount() {
  return getCart().reduce((s, i) => s + i.quantity, 0);
}

function updateCartBadges() {
  const n = cartCount();
  document.querySelectorAll(".cart-count-badge").forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? "" : "none";
  });
}