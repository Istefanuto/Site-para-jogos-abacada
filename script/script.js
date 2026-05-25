
/* ══════════════════════════════════════════
   DADOS DOS 16 JOGOS
══════════════════════════════════════════ */
const games = [
  {
    id: 1, name: "PISCINA MALUCA", bgColor: "#00D4FF",
    image: "./assets/piscina/imagemDeFundoPiscinaMaluca.png",
    cardImage: "./assets/piscina/cardPiscinaMaluca.png",
    url: "https://istefanuto.github.io/jogoAbacada/",
  },
  {
    id: 2,  name: "Ligue as Sílabas",  bgColor: "#FFD700",
    image: "./assets/ligueSilaba/fundo.png",
    cardImage: "",
    url: "https://rafaeltomazgraciano.github.io/ligue-as-silabas/",
  },
  {
    id: 3,  name: "O Monstrinho Faminto",    bgColor: "#FF6B6B",
    image: "./assets/monstrinhoFaminto/fundo.png",
    cardImage: "",
    url: "https://gabrielwitor.github.io/Monstrinho-Faminto/",
  },
  {
    id: 4,  name: "Caça ao Tesouro",         bgColor: "#6BCB77",
    image: "./assets/cacaTesouro/fundo.png",
    cardImage: "./assets/cacaTesouro/card.png",
    url: "https://hedropedro.github.io/CacaAoAbacada/",
  },
  {
    id: 5,  name: "Salão das Sílabas",          bgColor: "#FF6B6B",
    image: "./assets/salaoSilabas/fundo.png",
    cardImage: "",
    url: "https://juuhgb.github.io/salao-das-silabas/",
  },
  {
    id: 6,  name: "Trem de Sílabas",          bgColor: "#FFD700",
    image: "./assets/tremSilabas/fundo.png",
    cardImage: "",
    url: "https://giovanariber.github.io/trem-de-silabas-html/",
  },
  {
    id: 7,  name: "Robo Montador",           bgColor: "#6BCB77",
    image: "./assets/roboMontador/fundo.png",
    cardImage: "",
    url: "https://pauloluzkk.github.io/Game-ABACADA/",
  },
  {
    id: 8,  name: "Corrida das Sílabas",         bgColor: "#FF9F1C",
    image: "./assets/corridaSilabas/fundo.png",
    cardImage: "./assets/corridaSilabas/card.png",
    url: "https://educalza.github.io/Corrida-das-Silabas/",
  },
  {
    id: 9,  name: "Bingo de Sílabas",            bgColor: "#FF6B6B",
    image: "./assets/bingoSilabas/fundo.png",
    cardImage: "./assets/bingoSilabas/card.png",
    url: "https://vieiranaju.github.io/bingo-de-silabas-HTML/",
  },
  {
    id: 10, name: "Escova Escova ",         bgColor: "#445599",
    image: "./assets/escovaEscova/fundo.png",
    cardImage: "./assets/escovaEscova/card.png",
    url: "https://vitorhhiguchi.github.io/escova-escova-uenp/",
  },
  {
    id: 11, name: "Cobrinha das silabas",           bgColor: "#6BCB77",
    image: "./assets/cobrinhaSilabas/fundo.png",
    cardImage: "./assets/cobrinhaSilabas/card.png",
    url: "https://dieegovieira.github.io/cobra-das-silabas/",
  },
  {
    id: 12, name: "Pesca Sílabas",             bgColor: "#FF6B6B",
    image: "./assets/pescaSilabas/fundo.png",
    cardImage: "",
    url: "https://m-valentim.github.io/pesca-silabas/",
  },
  {
    id: 13, name: "Enigma da Esfinge",            bgColor: "#00D4FF",
    image: "./assets/enigmaEsfinge/fundo.png",
    cardImage: "./assets/enigmaEsfinge/card.png",
    url: "https://ilhayoshida.github.io/Enigma_da_Esfinge/",
  },
  {
    id: 14, name: "Indicabla",            bgColor: "#FFD700",
    image: "./assets/indicabla/fundo.png",
    cardImage: "./assets/indicabla/card.png",
    url: "https://gustavkeller-23.github.io/DiscoGame/",
  }
];

/* ══════════════════════════════════════════
   CONSTANTES
══════════════════════════════════════════ */
const CLONE_COUNT    = games.length;
// Deve ser igual à duração da transition de width/height no .mini-card do CSS
const CARD_TRANSITION_MS = 300;

/* ══════════════════════════════════════════
   ESTADO
══════════════════════════════════════════ */
let activeIndex   = 0;
let centerTimer   = null; // guarda o setTimeout para poder cancelar

/* ══════════════════════════════════════════
   REFERÊNCIAS DOM
══════════════════════════════════════════ */
const track         = document.getElementById("carouselTrack");
const arrowLeft     = document.getElementById("arrowLeft");
const arrowRight    = document.getElementById("arrowRight");
const featuredTitle = document.getElementById("featuredTitle");
const featuredImg   = document.getElementById("featuredCardImage");
const gameBgImage   = document.getElementById("gameBgImage");
const btnJogar      = document.getElementById("btnJogar");

/* ══════════════════════════════════════════
   CONSTRUIR CARROSSEL (clones + reais + clones)
══════════════════════════════════════════ */
function buildCarousel() {
  track.innerHTML = "";

  const allItems = [
    ...games.map((g, i) => ({ game: g, realIndex: i })), // clones do início
    ...games.map((g, i) => ({ game: g, realIndex: i })), // cards reais
    ...games.map((g, i) => ({ game: g, realIndex: i })), // clones do final
  ];

  allItems.forEach(({ game, realIndex }) => {
    const card = document.createElement("div");
    card.className = "mini-card";
    card.dataset.realIndex = realIndex;

    if (game.cardImage) {
      card.style.backgroundImage = `url('${game.cardImage}')`;
    } else {
      card.style.background = game.bgColor;
    }

    const label = document.createElement("div");
    label.className = "mini-card-label";
    label.textContent = game.name;
    card.appendChild(label);

    card.addEventListener("click", () => selectGame(realIndex));
    track.appendChild(card);
  });
}

/* ══════════════════════════════════════════
   ATUALIZAR CLASSE ACTIVE
══════════════════════════════════════════ */
function refreshActiveClass() {
  document.querySelectorAll(".mini-card").forEach(c => {
    c.classList.toggle("active", Number(c.dataset.realIndex) === activeIndex);
  });
}

/* ══════════════════════════════════════════
   CENTRALIZAR CARD ATIVO
   Lê offsetLeft/offsetWidth do card real
   (posição CLONE_COUNT + activeIndex no DOM).
══════════════════════════════════════════ */
function centerActiveCard(animated = true) {
  const cards = Array.from(document.querySelectorAll(".mini-card"));
  if (!cards.length) return;

  const wrapperWidth  = track.parentElement.offsetWidth;
  const activeCard    = cards[CLONE_COUNT + activeIndex];
  if (!activeCard) return;

  const target = activeCard.offsetLeft - wrapperWidth / 2 + activeCard.offsetWidth / 2;

  if (!animated) {
    track.style.transition = "none";
    track.style.transform  = `translateX(-${target}px)`;
    track.getBoundingClientRect(); // força reflow antes de religar transition
    track.style.transition = "transform .45s cubic-bezier(.4,0,.2,1)";
  } else {
    track.style.transform = `translateX(-${target}px)`;
  }
}

/* ══════════════════════════════════════════
   AGENDAR CENTRALIZAÇÃO APÓS RESIZE DO CARD
   Cancela qualquer agendamento anterior para
   evitar múltiplos disparos em cliques rápidos.
══════════════════════════════════════════ */
function scheduleCenterAfterResize() {
  if (centerTimer) clearTimeout(centerTimer);
  centerTimer = setTimeout(() => {
    centerActiveCard(true);
    centerTimer = null;
  }, CARD_TRANSITION_MS);
}

/* ══════════════════════════════════════════
   SELECIONAR JOGO
══════════════════════════════════════════ */
function selectGame(index) {
  activeIndex = ((index % games.length) + games.length) % games.length;
  const game  = games[activeIndex];

  featuredTitle.textContent = game.name;

  featuredImg.style.background = game.cardImage
      ? `url('${game.cardImage}') lightgray 50% / cover no-repeat`
      : game.bgColor;

  gameBgImage.style.background = game.image
      ? `url('${game.image}') lightgray -31.574px -184.314px / 108.01% 131.879% no-repeat`
      : game.bgColor;

  refreshActiveClass();

  // Aguarda o card terminar de crescer, depois centraliza
  scheduleCenterAfterResize();

  btnJogar.onclick = () => {
    if (game.url && game.url.startsWith('http')) {
      window.open(game.url, '_blank');
    } else {
      alert(`URL não disponível para: ${game.name}`);
    }
  };
}

/* ══════════════════════════════════════════
   NAVEGAÇÃO
══════════════════════════════════════════ */
function navigate(direction) {
  const newIndex = (activeIndex + direction + games.length) % games.length;
  selectGame(newIndex);
}

arrowLeft.addEventListener("click",  () => navigate(-1));
arrowRight.addEventListener("click", () => navigate(1));

/* ══════════════════════════════════════════
   TOUCH / SWIPE
══════════════════════════════════════════ */
let touchStartX = null;

track.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener("touchend", e => {
  if (touchStartX === null) return;
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
  touchStartX = null;
}, { passive: true });

/* ══════════════════════════════════════════
   TECLADO
══════════════════════════════════════════ */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft")  navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

/* ══════════════════════════════════════════
   INIT
   1. Constrói o carrossel
   2. Aplica a classe active sem transition
   3. Espera o browser pintar (2× rAF)
   4. Posiciona o track sem animação
   5. Liga as transitions
══════════════════════════════════════════ */
buildCarousel();
refreshActiveClass();

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    // Posição inicial: sem animação (o card já tem a largura certa desde o início)
    centerActiveCard(false);

    // Atualiza o featured card sem agendar setTimeout (não há resize de card aqui)
    const game = games[activeIndex];
    featuredTitle.textContent = game.name;
    featuredImg.style.background = game.cardImage
        ? `url('${game.cardImage}') lightgray 50% / cover no-repeat`
        : game.bgColor;
    gameBgImage.style.background = game.image
        ? `url('${game.image}') lightgray -31.574px -184.314px / 108.01% 131.879% no-repeat`
        : game.bgColor;
    btnJogar.onclick = () => {
      if (game.url && game.url.startsWith('http')) {
        window.open(game.url, '_blank');
      } else {
        alert(`URL não disponível para: ${game.name}`);
      }
    };
  });
});

window.addEventListener("resize", () => centerActiveCard(false));