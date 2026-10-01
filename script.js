// Pesan via WhatsApp (nomor format internasional tanpa + atau 0 di depan)
const NOMOR_WA = "6283143968353";

function pesanWA(namaBurger, harga) {
  const pesan = `Halo burgerfiza, saya ingin memesan:\n\n- *Menu:* ${namaBurger}\n- *Harga:* Rp ${harga}\n- *Jumlah:* 1 Porsi\n\nMohon info total biaya dan ongkos kirimnya. Terima kasih!`;
  window.open(
    `https://web.whatsapp.com/send?phone=${NOMOR_WA}&text=${encodeURIComponent(pesan)}`,
    "_blank",
  );
}

// Hamburger menu
const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));
links
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open")),
  );

// HERO SLIDER
const slides = document.querySelectorAll(".slide");
const track = document.getElementById("track");
const dotsBox = document.getElementById("dots");
let cur = 0,
  timer;
slides.forEach((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", "Slide " + (i + 1));
  b.addEventListener("click", () => {
    go(i);
    restart();
  });
  dotsBox.appendChild(b);
});
const dots = dotsBox.querySelectorAll("button");
function go(n) {
  slides[cur].classList.remove("active");
  dots[cur].classList.remove("on");
  cur = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${cur * 100}%)`;
  slides[cur].classList.add("active");
  dots[cur].classList.add("on");
}
function restart() {
  clearInterval(timer);
  timer = setInterval(() => go(cur + 1), 4000);
}
document.getElementById("nextBtn").addEventListener("click", () => {
  go(cur + 1);
  restart();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  go(cur - 1);
  restart();
});
const home = document.getElementById("home");
home.addEventListener("mouseenter", () => clearInterval(timer));
home.addEventListener("mouseleave", restart);
let sx = 0;
home.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), {
  passive: true,
});
home.addEventListener("touchend", (e) => {
  const d = e.changedTouches[0].clientX - sx;
  if (Math.abs(d) > 50) {
    go(cur + (d < 0 ? 1 : -1));
    restart();
  }
});
go(0);
restart();

// SCROLL REVEAL (arah berbeda-beda)
const setReveal = (sel, type, step = 0) =>
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add("reveal", type);
    el.style.transitionDelay = i * step + "s";
  });
setReveal(".eyebrow.center, .section-title, .section-sub", "r-up", 0.12);
setReveal(".menu-card", "r-zoom", 0.12);
setReveal(".about-img", "r-left");
setReveal(".about-text", "r-right");
setReveal(".footer-brand", "r-left");
setReveal(".footer-contact", "r-up");
setReveal(".footer-right", "r-right");
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// PROGRESS BAR + TOMBOL KE ATAS
const bar = document.createElement("div");
bar.className = "scroll-progress";
document.body.appendChild(bar);
const topBtn = document.createElement("button");
topBtn.className = "to-top";
topBtn.setAttribute("aria-label", "Kembali ke atas");
topBtn.textContent = "↑";
topBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
document.body.appendChild(topBtn);

// SCROLLSPY: menu aktif mengikuti posisi scroll
const navAs = document.querySelectorAll(".nav-links a");
const spy = ["home", "menu", "about", "contact"].map((id) =>
  document.getElementById(id),
);
const header = document.querySelector("header");
function onScroll() {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  header.classList.toggle("scrolled", y > 40);
  topBtn.classList.toggle("show", y > 500);
  let idx = 0;
  spy.forEach((s, i) => {
    if (s && s.getBoundingClientRect().top <= 120) idx = i;
  });
  if (window.innerHeight + y >= document.documentElement.scrollHeight - 5)
    idx = spy.length - 1;
  navAs.forEach((a, i) => a.classList.toggle("active", i === idx));
  // parallax halus pada gambar About
  const ai = document.querySelector(".about-img img");
  if (ai) {
    const r = ai.getBoundingClientRect();
    ai.style.transform = `translateY(${(r.top - window.innerHeight / 2) * -0.06}px) scale(1.12)`;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// LOADING SCREEN
const loader = document.getElementById("loader");
const loadStart = Date.now();
function hideLoader() {
  if (!loader || loader.classList.contains("hide")) return;
  loader.classList.add("hide");
  document.body.classList.remove("loading");
  setTimeout(() => loader.remove(), 1000);
}
window.addEventListener("load", () =>
  setTimeout(hideLoader, Math.max(0, 2800 - (Date.now() - loadStart))),
);
setTimeout(hideLoader, 7000); // cadangan kalau ada gambar yang lambat
