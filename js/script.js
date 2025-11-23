/* =========================================================
   ANIMAÇÕES COM INTERSECTION OBSERVER — DESKTOP ONLY
========================================================= */

function enableAnimations() {
  return window.innerWidth > 1000;
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .fade-up, .fade-down"
  );

  if (!enableAnimations()) {
    // MOBILE → remove transform/opacity imediatamente
    elements.forEach(el => el.classList.add("show"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach(el => revealObserver.observe(el));
}

initRevealAnimations();

// Reaplica ao rotacionar a tela
window.addEventListener("resize", () => {
  initRevealAnimations();
});



/* =========================================================
   SCROLL SUAVE PARA LINKS ÂNCORA
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();

    const headerHeight = 70;

    window.scrollTo({
      top: target.offsetTop - headerHeight,
      behavior: "smooth"
    });
  });
});


// =========================================================
// FUNÇÃO scrollToSection()
// =========================================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerHeight = 70;

  window.scrollTo({
    top: section.offsetTop - headerHeight,
    behavior: "smooth"
  });
}


/* =========================================================
   SIDEBAR
========================================================= */

const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  toggleBtn.innerHTML = sidebar.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

document.querySelectorAll(".sidebar-menu a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});


/* =========================================================
   PROJETOS — DADOS
========================================================= */

const projects = [
  {
    title: "PROJETO I",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    description: "Calculadora moderna e interativa",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://adrianuuuu.github.io/Calculadoras/"
  },
  {
    title: "PROJETO II",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    description: "Plataforma de receitas culinárias",
    tags: ["React", "API", "Design"],
    link: "/projetos/portfolio/paginas/coding.html"
  },
  {
    title: "PROJETO III",
    image: "https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=800&h=600&fit=crop",
    description: "Jogo de xadrez interativo",
    tags: ["Game Dev", "Logic", "UI"],
    link: "/projetos/portfolio/paginas/coding.html"
  }
];


/* =========================================================
   CRIAÇÃO DO CARROSSEL (DESKTOP)
========================================================= */

const carousel = document.getElementById("carousel");
const mobileGrid = document.getElementById("mobileGrid");

let currentIndex = 1;

// DESKTOP CARDS
projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.index = index;

  card.innerHTML = `
    <div class="card-inner">
      <img src="${project.image}" alt="${project.title}">
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (window.innerWidth < 930) return; // ignora clique em mobile
    if (index !== currentIndex) {
      currentIndex = index;
      updatePositions();
    }
  });

  carousel.appendChild(card);
});


// =========================================================
// GRID MOBILE (COM BOTÃO SEMPRE ATIVO)
// =========================================================

projects.forEach(project => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card-inner">
      <img src="${project.image}">
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">
          ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="view-btn" data-link="${project.link}">
          Ver Projeto →
        </div>
      </div>
    </div>
  `;
  mobileGrid.appendChild(div);
});


// CLIQUE GLOBAL EM QUALQUER BOTÃO "VER PROJETO"
document.addEventListener("click", e => {
  if (e.target.classList.contains("view-btn")) {
    const link = e.target.dataset.link;
    if (link) window.location.href = link;
  }
});


/* =========================================================
   LÓGICA DO CARROSSEL — POSICIONAMENTO
========================================================= */

function isDesktop() {
  return window.innerWidth > 930;
}

function clearCarouselInline() {
  document.querySelectorAll(".card").forEach(card => {
    card.style.transform = "";
    card.style.opacity = "";
    card.style.zIndex = "";
  });
}

function getCardPosition(i) {
  const diff = i - currentIndex;

  if (diff === 0) return { x: 0, scale: 1, opacity: 1, z: 3 };
  if (diff === -1) return { x: -300, scale: 0.85, opacity: 0.6, z: 2 };
  if (diff === 1) return { x: 300, scale: 0.85, opacity: 0.6, z: 2 };

  return { x: diff < 0 ? -600 : 600, scale: 0.7, opacity: 0 };
}

function updatePositions() {
  if (!isDesktop()) {
    clearCarouselInline();
    return;
  }

  document.querySelectorAll(".card").forEach(card => {
    const i = Number(card.dataset.index);
    const pos = getCardPosition(i);

    card.style.transform = `translateX(${pos.x}px) scale(${pos.scale})`;
    card.style.opacity = pos.opacity;
    card.style.zIndex = pos.z;
  });

  updateViewButton();
}


/* =========================================================
   BOTÃO "VER PROJETO" (SOMENTE CARROSSEL DESKTOP)
========================================================= */

function updateViewButton() {
  // 🔥 AGORA: remove APENAS os botões dentro do carrossel
  document.querySelectorAll(".carousel .view-btn").forEach(b => b.remove());

  const card = document.querySelector(`.carousel .card[data-index="${currentIndex}"]`);
  if (!card) return;

  const project = projects[currentIndex];

  const btn = document.createElement("div");
  btn.className = "view-btn";
  btn.textContent = "Ver Projeto →";
  btn.dataset.link = project.link;

  card.querySelector(".card-content").appendChild(btn);
}


/* =========================================================
   BOTÕES DE NAVEGAÇÃO DO CARROSSEL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  updatePositions();
  updateViewButton();
});

window.addEventListener("resize", updatePositions);

document.querySelector(".left-btn")?.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  updatePositions();
});

document.querySelector(".right-btn")?.addEventListener("click", () => {
  currentIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
  updatePositions();
});


/* =========================================================
   NAVEGAÇÃO LATERAL (DOTS)
========================================================= */

const dots = document.querySelectorAll(".side-nav .dot");
const sections = [
  document.querySelector(".hero"),
  document.querySelector(".sobre-mim"),
  document.querySelector("#portfolio"),
  document.querySelector(".contato")
];

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    const target = sections[i];
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

const dotObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dots.forEach(dot => dot.classList.remove("active"));
      const index = sections.indexOf(entry.target);
      if (index !== -1) dots[index].classList.add("active");
    }
  });
}, { threshold: 0.6 });

sections.forEach(sec => sec && dotObserver.observe(sec));


/* =========================================================
   MOBILE SCROLL PROGRESS BAR
========================================================= */

window.addEventListener("scroll", () => {
  if (window.innerWidth > 1000) return; // só mobile

  const progress = document.getElementById("progress-bar");
  if (!progress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progress.style.width = percent + "%";
});
