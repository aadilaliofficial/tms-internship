document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // Init AOS (Animate On Scroll)
  // -------------------------------
  if (window.AOS) AOS.init({ duration: 800, once: true });

  // -------------------------------
  // GSAP Hero Animation
  // -------------------------------
  if (window.gsap) {
    gsap.from(".hero .display-5", { y: 24, opacity: 0, duration: 0.8 });
    gsap.from(".hero .lead", { y: 24, opacity: 0, duration: 0.8, delay: 0.15 });
  }

  // -------------------------------
  // Three.js Hero Corner Effect
  // -------------------------------
  const cnv = document.getElementById("three-corner");
  if (cnv && window.THREE) {
    const renderer = new THREE.WebGLRenderer({ canvas: cnv, alpha: true, antialias: true });
    renderer.setSize(cnv.clientWidth, cnv.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, cnv.clientWidth / cnv.clientHeight, 0.1, 100);
    camera.position.z = 2.8;

    const geo = new THREE.TorusKnotGeometry(0.8, 0.24, 120, 16);
    const mat = new THREE.MeshBasicMaterial({ color: 0xdc3545, wireframe: true });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    function tick() {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();

    window.addEventListener("resize", () => {
      const w = cnv.clientWidth, h = cnv.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
  }

  // -------------------------------
  // Featured Stones Swiper
  // -------------------------------
  const featuredWrap = document.getElementById("featured-slides");
  if (featuredWrap && window.PRODUCTS) {
    PRODUCTS.forEach(p => {
      featuredWrap.insertAdjacentHTML("beforeend", `
        <div class="swiper-slide">
          <div class="card shadow-lg border-0 h-100">
            <img src="${p.image}" alt="${p.name}" class="card-img-top" style="height:250px;object-fit:cover;">
            <div class="card-body text-center">
              <h5 class="card-title">${p.name}</h5>
              <p class="text-muted small mb-2">${p.title}</p>
              <span class="badge bg-danger mb-2">${p.price}</span>
              <div class="d-flex justify-content-center gap-2">
                <a class="btn btn-sm btn-danger" href="product.html?id=${p.id}">View</a>
                <a class="btn btn-sm btn-outline-danger" target="_blank"
                   href="https://wa.me/919999999999?text=${encodeURIComponent('I am interested in ' + p.name)}">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      `);
    });

    new Swiper(".featured-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: { el: ".featured-swiper .swiper-pagination", clickable: true },
      navigation: { nextEl: ".featured-swiper .swiper-button-next", prevEl: ".featured-swiper .swiper-button-prev" },
      autoplay: { delay: 2800, disableOnInteraction: false },
      breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
    });
  }

  // -------------------------------
  // Testimonials Swiper
  // -------------------------------
  const testi = document.querySelector(".testi-swiper");
  if (testi) {
    new Swiper(testi, {
      effect: "fade",
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: ".testi-swiper .swiper-pagination", clickable: true },
      fadeEffect: { crossFade: true }
    });
  }

  // -------------------------------
  // Products Grid Page
  // -------------------------------
  const grid = document.getElementById("product-grid");
  if (grid && window.PRODUCTS) {
    grid.innerHTML = ""; // Clear existing
    PRODUCTS.forEach(p => {
      grid.insertAdjacentHTML("beforeend", `
        <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up">
          <div class="card shadow-sm h-100">
            <img src="${p.image}" alt="${p.name}" class="card-img-top" style="height:250px;object-fit:cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.name}</h5>
              <p class="text-muted small mb-2">${p.title}</p>
              <span class="badge bg-danger mb-2">${p.price}</span>
              <div class="mt-auto d-flex justify-content-between">
                <a href="product.html?id=${p.id}" class="btn btn-sm btn-danger">Details</a>
                <a target="_blank" class="btn btn-sm btn-outline-danger"
                   href="https://wa.me/919999999999?text=${encodeURIComponent('Enquiry: ' + p.name)}">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      `);
    });
    if (window.AOS) AOS.refresh();
  }

  // -------------------------------
  // Product Detail Page
  // -------------------------------
  const detail = document.getElementById("product-detail");
  if (detail && window.PRODUCTS) {
    const q = new URLSearchParams(location.search);
    const id = Number(q.get("id")) || 1;
    const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];

    detail.innerHTML = `
      <div class="row g-4 align-items-start">
        <div class="col-lg-7">
          <img src="${p.image}" alt="${p.name}" class="img-fluid rounded shadow-sm">
        </div>
        <div class="col-lg-5 d-flex flex-column">
          <h1 class="h3 mb-2">${p.name}</h1>
          <div class="text-muted mb-3">${p.title}</div>
          <span class="badge bg-danger mb-3">${p.price}</span>
          <p class="mb-4">${p.description}</p>
          <div class="mt-auto d-flex gap-3">
            <a href="products.html" class="btn btn-outline-danger">Back to Products</a>
            <a target="_blank" class="btn btn-danger"
               href="https://wa.me/919999999999?text=${encodeURIComponent('Interested in ' + p.name + ' (' + p.price + ')')}">
               Contact Now
            </a>
          </div>
        </div>
      </div>
    `;
    if (window.AOS) AOS.refresh();
  }
});
