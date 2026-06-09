
//ADICIONAR UMA FUNÇÃO PARA QUE AO PASSAR O MOUSE SOBRE O PROJETO, APREÇA UM BOTÃO ANIMADO NA PARTE SUPERIOR DO BANNER DO 
// CARD ( DO LADO DE DENTRO), PARA VER UM PREVIEW DAS CARACTERISTICAS DO PROJETO, SKILLS USADAS, LINK PARA O PROJETO ETC... (SOMENTE DESKTOP)

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




//SCROLL SUAVE PARA LINKS ÂNCORA

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

// FUNÇÃO scrollToSection()
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerHeight = 70;

  window.scrollTo({
    top: section.offsetTop - headerHeight,
    behavior: "smooth"
  });
}



//SIDEBAR
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


//PROJETOS — DADOS
const projects = [
  {
    title: "CALCULADORAS ONLINE",
    image: "assets/telacalc.png",
    description: "Calculadora de IMC, Conversão de bases, financeira e científica",
    tags: ["JavaScript", "CSS", "HTML"],
    link: "https://adrianuuuu.github.io/Calculadoras/",
    details: `
          <h2>🧮 Calculadoras Online</h2>

          <p><strong>Fala devs! 👨‍💻🌐</strong></p>

          <p>Este projeto é uma aplicação web que reúne diversas calculadoras úteis em um único ambiente, com foco em praticidade, organização e facilidade de uso no dia a dia.</p>

          <p>A proposta foi criar uma ferramenta simples, rápida e acessível, permitindo que qualquer usuário realize cálculos importantes sem precisar recorrer a múltiplos sites ou ferramentas externas.</p>

          <h3>💡 Sobre o Projeto</h3>
          <p>O sistema centraliza diferentes tipos de cálculos em uma interface única, intuitiva e responsiva, garantindo uma boa experiência tanto em desktop quanto em dispositivos móveis.</p>

          <h3>🧩 Funcionalidades</h3>
          <ul>
          <li><strong>📌 Calculadora de IMC:</strong> Permite calcular o Índice de Massa Corporal com base em peso e altura, exibindo também a classificação (baixo peso, normal, sobrepeso, obesidade).</li>

          <li><strong>🔢 Conversão de Bases Numéricas:</strong> Converte números entre diferentes bases (binário, decimal, hexadecimal), sendo útil para estudantes e desenvolvedores.</li>

          <li><strong>💰 Calculadora Financeira:</strong> Realiza cálculos como juros simples e compostos, ajudando no planejamento financeiro e análise de investimentos.</li>

          <li><strong>🧠 Calculadora Científica:</strong> Executa operações matemáticas mais avançadas, incluindo funções trigonométricas, exponenciais e cálculos complexos.</li>
          </ul>

          <h3>🛠️ Tecnologias Utilizadas</h3>
          <p>HTML5, CSS3 e JavaScript (Vanilla JS)</p>

          <h3>💻 Skills Demonstradas</h3>
          <ul>
          <li>Manipulação de DOM</li>
          <li>Criação de interfaces interativas</li>
          <li>Lógica de programação aplicada a cálculos</li>
          <li>Organização de múltiplos módulos em um único sistema</li>
          <li>Responsividade (mobile + desktop)</li>
          <li>Boas práticas de UI/UX</li>
          </ul>

          <h3>🎯 Problemas que o Projeto Resolve</h3>
          <ul>
          <li>Evita o uso de múltiplas ferramentas separadas</li>
          <li>Facilita cálculos do dia a dia</li>
          <li>Centraliza funcionalidades em um único sistema</li>
          <li>Melhora a produtividade do usuário</li>
          </ul>

          <h3>📈 Aplicações Práticas</h3>
          <p>Este projeto pode ser utilizado por estudantes, profissionais de tecnologia, pessoas que desejam controlar finanças ou qualquer usuário que precise realizar cálos rápidos com praticidade.</p>

          <h3>🚀 Conclusão</h3>
          <p>Um projeto focado em utilidade real, organização e experiência do usuário, demonstrando habilidades em desenvolvimento front-end e construção de aplicações interativas.</p>
          `
  },
  {
    title: "SISTEMA DE GESTÃO | TI",
    image: "assets/teladashboard.png",
    description: "Registro de chamados, equipamentos, estoque, usuários e status de rede",
    tags: ["Node.js", "API", "PostgreSQL"],
    link: "https://adrianuuuu.github.io/demonstracao-sistema-ti/index.html",
    details: `
          <h2>🚀 Sistema de Gestão de Chamados e Inventário de TI</h2>

          <p><strong>Fala devs! 👨‍💻🌐</strong></p>

          <p>Este projeto é uma versão demonstrativa (MVP) de um sistema criado para resolver problemas reais na área de TI, focado em organização, controle e agilidade no suporte técnico.</p>

          <h3>⚠️ Importante</h3>
          <p>Esta versão contém apenas frontend + mock. A versão real possui backend completo, autenticação e banco de dados.</p>

          <h3>💡 Funcionalidades</h3>
          <ul>
          <li>Abertura e acompanhamento de chamados</li>
          <li>Controle de status</li>
          <li>Gestão de inventário</li>
          <li>Dashboard com indicadores</li>
          <li>Administração de usuários</li>
          </ul>

          <h3>🛠️ Tecnologias</h3>
          <p>HTML5, CSS3, JavaScript, Node.js, Express, JWT</p>

          <h3>🎯 Problemas resolvidos</h3>
          <ul>
          <li>Falta de organização no suporte</li>
          <li>Dificuldade de rastreamento</li>
          <li>Controle ineficiente de equipamentos</li>
          <li>Falta de visão gerencial</li>
          </ul>

          <h3>📈 Aplicação</h3>
          <p>Empresas, órgãos públicos, técnicos e equipes de suporte.</p>

          <h3>🚀 Conclusão</h3>
          <p>Projeto focado em resolver problemas reais, com arquitetura escalável e visão de produto.</p>
          `,
  },
  {
    title: "ATLAS | AGENTE DE IA",
    image: "assets/logoAtlas.png",
    description: "Abertura e acompanhamento de chamados via WhatsApp",
    tags: ["N8N", "PostgreSQL", "OpenRouter"],
    link: "https://adrianuuuu.github.io/atlas-demo/",
    details: "assets/ATLAS APRESENTAÇÃO.pdf"
  }
];


//CRIAÇÃO DO CARROSSEL (DESKTOP)
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


//GRID MOBILE (COM BOTÃO SEMPRE ATIVO)
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


//LÓGICA DO CARROSSEL — POSICIONAMENTO

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
    updatePreviewButton();
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
  updatePreviewButton();
}

function updatePreviewButton() {
  document.querySelectorAll(".preview-btn").forEach(b => b.remove());

  if (!isDesktop()) return;

  const card = document.querySelector(`.card[data-index="${currentIndex}"]`);
  if (!card) return;

  const project = projects[currentIndex];

  const btn = document.createElement("div");
  btn.className = "preview-btn";
  btn.innerText = "Preview";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openModal(project);
  });

  card.appendChild(btn);
}


//BOTÃO "VER PROJETO" (SOMENTE CARROSSEL DESKTOP)

function updateViewButton() {
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

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

function openModal(project) {
  modal.classList.add("active");
  modalBody.innerHTML = project.details || "<p>Sem detalhes disponíveis</p>";
}

document.querySelector(".close-modal").onclick = () => {
  modal.classList.remove("active");
};

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});


//BOTÕES DE NAVEGAÇÃO DO CARROSSEL
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


//NAVEGAÇÃO LATERAL (DOTS)

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

//MOBILE SCROLL PROGRESS BAR
window.addEventListener("scroll", () => {
  if (window.innerWidth > 1000) return; // só mobile

  const progress = document.getElementById("progress-bar");
  if (!progress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  progress.style.width = percent + "%";
});






