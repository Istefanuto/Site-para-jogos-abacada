/* ══════════════════════════════════════════
   DADOS DOS 16 JOGOS
   Substitua name, subtitle, bgColor, image e cardImage
   com os dados reais de cada jogo.
══════════════════════════════════════════ */
const games = [
  {
    id: 1,
    name: "PISCINA MALUCA",
    subtitle: "AVENTURA AQUÁTICA",
    bgColor: "#00D4FF",
    image: "../assets/imagemDeFundoPiscinaMaluca.png",          // URL da imagem de fundo da section
    cardImage: "../assets/cardPiscinaMaluca.png",      // URL da capa do card
  },
  {
    id: 2,
    name: "NADADOR DE OURO",
    subtitle: "HABILIDADE: SUPER-ESTRELA",
    bgColor: "#FFD700",
    image: "",
    cardImage: "",
  },
  {
    id: 3,
    name: "ESTRELA AQUÁTICA",
    subtitle: "HABILIDADE: NADO SINCRO",
    bgColor: "#FF6B6B",
    image: "",
    cardImage: "",
  },
  {
    id: 4,
    name: "ROBÔ AVENTUREIRO",
    subtitle: "MISSÃO: EXPLORAÇÃO",
    bgColor: "#6BCB77",
    image: "",
    cardImage: "",
  },
  {
    id: 5,
    name: "CORRIDA DOS BICHOS",
    subtitle: "VELOCIDADE MÁXIMA",
    bgColor: "#FF6B6B",
    image: "",
    cardImage: "",
  },
  {
    id: 6,
    name: "CASTELO DE BLOCOS",
    subtitle: "CONSTRUÇÃO ÉPICA",
    bgColor: "#FFD700",
    image: "",
    cardImage: "",
  },
  {
    id: 7,
    name: "FLORESTA MÁGICA",
    subtitle: "AVENTURA VEGETAL",
    bgColor: "#6BCB77",
    image: "",
    cardImage: "",
  },
  {
    id: 8,
    name: "CAÇA AO TESOURO",
    subtitle: "MAPA DO MISTÉRIO",
    bgColor: "#FF9F1C",
    image: "",
    cardImage: "",
  },
  {
    id: 9,
    name: "DANÇA DAS FRUTAS",
    subtitle: "RITMO E SABOR",
    bgColor: "#FF6B6B",
    image: "",
    cardImage: "",
  },
  {
    id: 10,
    name: "ESPAÇO SIDERAL",
    subtitle: "VIAGEM INTERGALÁCTICA",
    bgColor: "#445599",
    image: "",
    cardImage: "",
  },
  {
    id: 11,
    name: "FAZENDA DIVERTIDA",
    subtitle: "COLHEITA FELIZ",
    bgColor: "#6BCB77",
    image: "",
    cardImage: "",
  },
  {
    id: 12,
    name: "CIRCO DO ABACADÁ",
    subtitle: "SHOW INCRÍVEL",
    bgColor: "#FF6B6B",
    image: "",
    cardImage: "",
  },
  {
    id: 13,
    name: "FUNDO DO MAR",
    subtitle: "MERGULHO PROFUNDO",
    bgColor: "#00D4FF",
    image: "",
    cardImage: "",
  },
  {
    id: 14,
    name: "QUIZ DAS LETRAS",
    subtitle: "APRENDA E DIVIRTA",
    bgColor: "#FFD700",
    image: "",
    cardImage: "",
  },
  {
    id: 15,
    name: "MONTANHA RUSSA",
    subtitle: "ADRENALINA TOTAL",
    bgColor: "#FF9F1C",
    image: "",
    cardImage: "",
  },
  {
    id: 16,
    name: "MUNDO DOS SONHOS",
    subtitle: "FANTASIA INFINITA",
    bgColor: "#9B5DE5",
    image: "",
    cardImage: "",
  },
];

/* ══════════════════════════════════════════
   ESTADO
══════════════════════════════════════════ */
let activeIndex   = 0;   // índice do jogo selecionado
let carouselOffset = 0;  // posição atual do track (em px)

/* ══════════════════════════════════════════
   REFERÊNCIAS DOM
══════════════════════════════════════════ */
const track          = document.getElementById("carouselTrack");
const arrowLeft      = document.getElementById("arrowLeft");
const arrowRight     = document.getElementById("arrowRight");
const featuredTitle  = document.getElementById("featuredTitle");
const featuredSub    = document.getElementById("featuredSubtitle");
const featuredImg    = document.getElementById("featuredCardImage");
const gameBgImage    = document.getElementById("gameBgImage");
const btnJogar       = document.getElementById("btnJogar");

/* ══════════════════════════════════════════
   CONSTRUIR MINIATURAS
══════════════════════════════════════════ */
function buildCarousel() {
  track.innerHTML = "";

  games.forEach((game, i) => {
    const card = document.createElement("div");
    card.className = "mini-card" + (i === activeIndex ? " active" : "");
    card.dataset.index = i;

    // imagem de fundo do card
    if (game.cardImage) {
      card.style.backgroundImage = `url('${game.cardImage}')`;
    } else {
      // placeholder colorido
      card.style.background = game.bgColor;
    }

    // label com nome curto
    const label = document.createElement("div");
    label.className = "mini-card-label";
    label.textContent = game.name;
    card.appendChild(label);

    card.addEventListener("click", () => selectGame(i));
    track.appendChild(card);
  });
}

/* ══════════════════════════════════════════
   SELECIONAR JOGO
══════════════════════════════════════════ */
function selectGame(index) {
  activeIndex = index;
  const game  = games[index];

  // atualizar card destaque
  featuredTitle.textContent = game.name;
  featuredSub.textContent   = game.subtitle;

  if (game.cardImage) {
    featuredImg.style.backgroundImage = `url('${game.cardImage}')`;
    featuredImg.style.background      = `url('${game.cardImage}') lightgray 50% / cover no-repeat`;
  } else {
    featuredImg.style.background = game.bgColor;
  }

  // atualizar fundo da section
  if (game.image) {
    gameBgImage.style.backgroundImage = `url('${game.image}')`;
    gameBgImage.style.background      = `url('${game.image}') lightgray -31.574px -184.314px / 108.01% 131.879% no-repeat`;
  } else {
    gameBgImage.style.background = game.bgColor;
  }

  // atualizar estado ativo nos cards
  document.querySelectorAll(".mini-card").forEach((c, i) => {
    c.classList.toggle("active", i === index);
  });

  // centralizar card ativo no carrossel
  centerActiveCard();

  // botão jogar
  btnJogar.onclick = () => {
    alert(`Iniciando: ${game.name}`); // substitua pela lógica real
  };
}

/* ══════════════════════════════════════════
   CENTRALIZAR CARD ATIVO
══════════════════════════════════════════ */
function centerActiveCard() {
  const cards = document.querySelectorAll(".mini-card");
  if (!cards.length) return;

  const wrapperWidth = track.parentElement.offsetWidth;
  const activeCard   = cards[activeIndex];
  if (!activeCard) return;

  // calcular offset para centralizar
  const cardLeft  = activeCard.offsetLeft;
  const cardWidth = activeCard.offsetWidth;
  const target    = cardLeft - wrapperWidth / 2 + cardWidth / 2;

  carouselOffset = Math.max(0, target);
  track.style.transform = `translateX(-${carouselOffset}px)`;
}

/* ══════════════════════════════════════════
   SETAS DE NAVEGAÇÃO
══════════════════════════════════════════ */
arrowLeft.addEventListener("click", () => {
  const newIndex = (activeIndex - 1 + games.length) % games.length;
  selectGame(newIndex);
});

arrowRight.addEventListener("click", () => {
  const newIndex = (activeIndex + 1) % games.length;
  selectGame(newIndex);
});

/* ══════════════════════════════════════════
   SUPORTE A TOUCH/SWIPE NO CARROSSEL
══════════════════════════════════════════ */
let touchStartX = null;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener("touchend", (e) => {
  if (touchStartX === null) return;
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 40) {
    if (delta > 0) {
      arrowRight.click();
    } else {
      arrowLeft.click();
    }
  }
  touchStartX = null;
}, { passive: true });

/* ══════════════════════════════════════════
   TECLADO (setas esquerda/direita)
══════════════════════════════════════════ */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft")  arrowLeft.click();
  if (e.key === "ArrowRight") arrowRight.click();
});

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
buildCarousel();
selectGame(0);

// Recalcular ao redimensionar a janela
window.addEventListener("resize", centerActiveCard);