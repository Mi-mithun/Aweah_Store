/* ── DEFAULT PRODUCTS ── */
let products = [
  {
    id: 1,
    name: "Pro Wireless Headphones",
    price: "$249",
    category: "Audio",
    desc: "Studio-grade wireless headphones with 40hr battery, active noise cancellation, and premium leather ear cups. Crafted for audiophiles and professionals who demand clarity.",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=420&fit=crop",
    tags: ["Wireless","Noise Cancelling","40hr Battery"]
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    price: "$199",
    category: "Wearables",
    desc: "Slim and precise. Tracks your health metrics, sleep patterns, and notifications while looking great on any wrist. Sapphire glass, 7-day battery life.",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=420&fit=crop",
    tags: ["Smartwatch","Health Tracking","Sapphire Glass"]
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: "$159",
    category: "Peripherals",
    desc: "TKL layout with Cherry MX switches, PBT double-shot keycaps, and RGB per-key illumination. Built for coders, writers, and anyone who types a lot.",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=420&fit=crop",
    tags: ["Mechanical","RGB","Cherry MX"]
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: "$129",
    category: "Audio",
    desc: "360° immersive sound with deep bass. Waterproof, shockproof, and dustproof — perfect for outdoor adventures. 24-hour playtime.",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=420&fit=crop",
    tags: ["Bluetooth","Waterproof","360° Sound"]
  },
  {
    id: 5,
    name: "Ergonomic Desk Lamp",
    price: "$79",
    category: "Home Office",
    desc: "Adjustable color temperature from 2700K warm to 6500K cool. USB-C charging port built-in. Memory function remembers your last setting.",
    img: "https://cdn.thewirecutter.com/wp-content/media/2022/04/desk-lamp-2048px-4856-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp",
    tags: ["LED","Adjustable","USB-C Port"]
  },
  {
    id: 6,
    name: "Carbon Fiber Wallet",
    price: "$59",
    category: "Accessories",
    desc: "Ultra-slim genuine carbon fiber wallet with RFID blocking. Holds 8–12 cards and bills. Weighs just 28g — you'll forget it's there.",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=420&fit=crop",
    tags: ["Carbon Fiber","RFID Block","Slim"]
  }
];

let nextId = 10;
const modal = new bootstrap.Modal(document.getElementById('productModal'));

/* ── RENDER ── */
function renderProducts(list) {
  const grid = document.getElementById('product-grid');
  if (!list.length) {
    grid.innerHTML = '<div class="no-results"><i class="bi bi-search" style="font-size:2rem;display:block;margin-bottom:12px;opacity:.3;"></i>No products found. Try a different keyword.</div>';
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card" id="card-${p.id}">
      <div class="product-img-wrap">
        <img class="product-img" src="${p.img || 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=420&fit=crop'}" alt="${p.name}" loading="lazy"/>
      </div>
      <span class="product-badge-cat">${p.category}</span>
      <span class="remove-btn" onclick="removeProduct(${p.id}, event)" title="Remove product"><i class="bi bi-trash3"></i></span>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <span class="btn-detail" onclick="openModal(${p.id})">View Details</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── OPEN MODAL ── */
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalProductTitle').textContent = p.name;
  document.getElementById('modalImg').src = p.img || 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=420&fit=crop';
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').textContent = p.price;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalTags').innerHTML = (p.tags || []).map(t => `<span>${t}</span>`).join('');
  modal.show();
}

/* ── ADD PRODUCT ── */
function addProduct() {
  const name = document.getElementById('addName').value.trim();
  const price = document.getElementById('addPrice').value.trim();
  const category = document.getElementById('addCategory').value.trim();
  const img = document.getElementById('addImg').value.trim();
  const desc = document.getElementById('addDesc').value.trim();
  
  if (!name || !price) { showToast('⚠️ Name and price are required.'); return; }

  products.push({
    id: nextId++,
    name, price,
    category: category || 'General',
    img: img || 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=420&fit=crop',
    desc: desc || 'No description provided.', 
    tags: [category || 'New']
  });

  document.getElementById('addName').value = '';
  document.getElementById('addPrice').value = '';
  document.getElementById('addCategory').value = '';
  document.getElementById('addImg').value = '';
  document.getElementById('addDesc').value = '';

  renderProducts(products);
  showToast('✅ Product added successfully!');
}

/* ── REMOVE PRODUCT ── */
function removeProduct(id, e) {
  e.stopPropagation();
  products = products.filter(p => p.id !== id);
  const card = document.getElementById('card-' + id);
  if (card) {
    card.style.transition = 'opacity .3s, transform .3s';
    card.style.opacity = '0';
    card.style.transform = 'scale(.92)';
    setTimeout(() => renderProducts(products), 310);
  }
  showToast('🗑️ Product removed.');
}

/* ── SEARCH ── */
document.getElementById('searchInput').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.getElementById('searchClear').style.display = q ? 'block' : 'none';
  const filtered = q
    ? products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    : products;
  renderProducts(filtered);
});

document.getElementById('searchClear').addEventListener('click', function() {
  document.getElementById('searchInput').value = '';
  this.style.display = 'none';
  renderProducts(products);
});

/* ── MODAL ACTIONS ── */
function buyNow() {
  modal.hide();
  showToast('🛍️ Redirecting to checkout...');
}

function addToCart() {
  showToast('🛒 Added to cart!');
}

/* ── CONTACT FORM ── */
function submitForm(e) {
  e.preventDefault();
  showToast('✉️ Message sent! We\'ll get back to you shortly.');
}

/* ── TOAST ── */
function showToast(msg) {
  document.getElementById('toastMsg').textContent = msg;
  const t = new bootstrap.Toast(document.getElementById('liveToast'), { delay: 3000 });
  t.show();
}

/* ── SCROLL EFFECTS ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── INIT ── */
renderProducts(products); 