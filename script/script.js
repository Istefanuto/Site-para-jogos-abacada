/* ══════════════════════════════════════════
   DADOS DOS JOGOS
══════════════════════════════════════════ */
const games = [
  {
    id: 1, name: "PISCINA MALUCA", bgColor: "#00D4FF",
    image: "./assets/piscina/imagemDeFundoPiscinaMaluca.png",
    cardImage: "./assets/piscina/cardPiscinaMaluca1.png",
    url: "https://istefanuto.github.io/jogoAbacada/",
  },
  {
    id: 2, name: "Ligue as Sílabas", bgColor: "#FFD700",
    image: "./assets/ligueSilaba/fundo.png",
    cardImage: "/assets/ligueSilaba/cardLigueAsSilabas.png",
    url: "https://rafaeltomazgraciano.github.io/ligue-as-silabas/",
  },
  {
    id: 3, name: "O Monstrinho Faminto", bgColor: "#FF6B6B",
    image: "./assets/monstrinhoFaminto/fundo.png",
    cardImage: "/assets/monstrinhoFaminto/cardMonstrinhoFaminto.png",
    url: "https://gabrielwitor.github.io/Monstrinho-Faminto/",
  },
  {
    id: 4, name: "Caça ao Tesouro", bgColor: "#6BCB77",
    image: "./assets/cacaTesouro/fundo.png",
    cardImage: "./assets/cacaTesouro/card.png",
    url: "https://hedropedro.github.io/CacaAoAbacada/",
  },
  {
    id: 5, name: "Salão das Sílabas", bgColor: "#FF6B6B",
    image: "./assets/salaoSilabas/fundo.png",
    cardImage: "/assets/salaoSilabas/cardSalao.png",
    url: "https://juuhgb.github.io/salao-das-silabas/",
  },
  {
    id: 6, name: "Trem de Sílabas", bgColor: "#FFD700",
    image: "./assets/tremSilabas/fundo.png",
    cardImage: "/assets/tremSilabas/cardTremSilabas.png",
    url: "https://giovanariber.github.io/trem-de-silabas-html/",
  },
  {
    id: 7, name: "Robo Montador", bgColor: "#6BCB77",
    image: "./assets/roboMontador/fundo.png",
    cardImage: "/assets/roboMontador/cardRoboMontador.png",
    url: "https://pauloluzkk.github.io/Game-ABACADA/",
  },
  {
    id: 8, name: "Corrida das Sílabas", bgColor: "#FF9F1C",
    image: "./assets/corridaSilabas/fundo.png",
    cardImage: "./assets/corridaSilabas/card.png",
    url: "https://educalza.github.io/Corrida-das-Silabas/",
  },
  {
    id: 9, name: "Bingo de Sílabas", bgColor: "#FF6B6B",
    image: "./assets/bingoSilabas/fundo.png",
    cardImage: "./assets/bingoSilabas/card.png",
    url: "https://vieiranaju.github.io/bingo-de-silabas-HTML/",
  },
  {
    id: 10, name: "Escova Escova", bgColor: "#445599",
    image: "./assets/escovaEscova/fundo.png",
    cardImage: "./assets/escovaEscova/card.png",
    url: "https://vitorhhiguchi.github.io/escova-escova-uenp/",
  },
  {
    id: 11, name: "Cobrinha das Sílabas", bgColor: "#6BCB77",
    image: "./assets/cobrinhaSilabas/fundo.png",
    cardImage: "./assets/cobrinhaSilabas/card.png",
    url: "https://dieegovieira.github.io/cobra-das-silabas/",
  },
  {
    id: 12, name: "Pesca Sílabas", bgColor: "#FF6B6B",
    image: "./assets/pescaSilabas/fundo.png",
    cardImage: "/assets/pescaSilabas/image.png",
    url: "https://m-valentim.github.io/pesca-silabas/",
  },
  {
    id: 13, name: "Enigma da Esfinge", bgColor: "#00D4FF",
    image: "./assets/enigmaEsfinge/fundo.png",
    cardImage: "./assets/enigmaEsfinge/card.png",
    url: "https://ilhayoshida.github.io/Enigma_da_Esfinge/",
  },
  {
    id: 14, name: "Indicabla", bgColor: "#FFD700",
    image: "./assets/indicabla/fundo.png",
    cardImage: "./assets/indicabla/card.png",
    url: "https://gustavkeller-23.github.io/DiscoGame/",
  }
];

/* ══════════════════════════════════════════
   CONSTANTES
   N  = total de jogos
   O carrossel tem 3×N cards: [clones-início | reais | clones-fim]
   "posição virtual" = índice no array de 3×N cards
   posição real      = CLONE_COUNT + activeIndex
══════════════════════════════════════════ */
const N                  = games.length;
const CLONE_COUNT        = N;           // 1 conjunto de clones em cada ponta
const CARD_TRANSITION_MS = 350;         // deve bater com a transition CSS do card
const TRACK_ANIM_MS      = 450;         // duração da transition do translateX

/* ══════════════════════════════════════════
   ESTADO
══════════════════════════════════════════ */
let activeIndex  = 0;   // 0..N-1, índice do jogo real
let virtualPos   = 0;   // posição atual no array 3×N (começa no meio)
let isAnimating  = false;
let centerTimer  = null;

/* ══════════════════════════════════════════
   REFERÊNCIAS DOM
══════════════════════════════════════════ */
const track       = document.getElementById("carouselTrack");
const arrowLeft   = document.getElementById("arrowLeft");
const arrowRight  = document.getElementById("arrowRight");
const gameBgImage = document.getElementById("gameBgImage");
const btnJogar    = document.getElementById("btnJogar");

/* ══════════════════════════════════════════
   UTILITÁRIOS
══════════════════════════════════════════ */
function mod(n, m) { return ((n % m) + m) % m; }

function getCards() { return Array.from(track.querySelectorAll(".mini-card")); }

/* ══════════════════════════════════════════
   FUNDO DINÂMICO
══════════════════════════════════════════ */
function updateBackground(game) {
  if (game.image) {
    gameBgImage.style.backgroundImage    = `url('${game.image}')`;
    gameBgImage.style.backgroundSize     = "cover";
    gameBgImage.style.backgroundPosition = "center";
  } else {
    gameBgImage.style.backgroundImage = "none";
    gameBgImage.style.backgroundColor = game.bgColor;
  }
}

/* ══════════════════════════════════════════
   CONSTRUIR CARROSSEL  (clones | reais | clones)
══════════════════════════════════════════ */
function buildCarousel() {
  track.innerHTML = "";

  // 3 cópias: antes, meio (reais), depois
  for (let copy = 0; copy < 3; copy++) {
    games.forEach((game, realIndex) => {
      const card = document.createElement("div");
      card.className = "mini-card";
      card.dataset.realIndex = realIndex;

      if (game.cardImage) {
        card.style.backgroundImage    = `url('${game.cardImage}')`;
        card.style.backgroundSize     = "cover";
        card.style.backgroundPosition = "center";
      } else {
        card.style.background = game.bgColor;
      }

      const label = document.createElement("div");
      label.className = "mini-card-label";
      label.textContent = game.name;
      card.appendChild(label);

      card.addEventListener("click", () => {
        if (!isAnimating) selectGame(realIndex);
      });

      track.appendChild(card);
    });
  }
}

/* ══════════════════════════════════════════
   HIGHLIGHT DO CARD ATIVO
══════════════════════════════════════════ */
function refreshActiveClass() {
  getCards().forEach(c => {
    c.classList.toggle("active", Number(c.dataset.realIndex) === activeIndex);
  });
}

/* ══════════════════════════════════════════
   CALCULAR TRANSLATEX PARA UM virtualPos
══════════════════════════════════════════ */
function getTranslateForPos(vPos) {
  const cards        = getCards();
  const targetCard   = cards[vPos];
  if (!targetCard) return 0;
  const wrapperWidth = track.parentElement.offsetWidth;
  return targetCard.offsetLeft - wrapperWidth / 2 + targetCard.offsetWidth / 2;
}

/* ══════════════════════════════════════════
   MOVER TRACK (com ou sem animação)
══════════════════════════════════════════ */
function moveTrack(translateX, animated) {
  if (!animated) {
    track.style.transition = "none";
    track.style.transform  = `translateX(-${translateX}px)`;
    track.getBoundingClientRect(); // força reflow
    track.style.transition = `transform ${TRACK_ANIM_MS}ms cubic-bezier(.4,0,.2,1)`;
  } else {
    track.style.transform = `translateX(-${translateX}px)`;
  }
}

/* ══════════════════════════════════════════
   TELEPORTE SILENCIOSO (loop infinito)
   Após animar para um clone, salta
   instantaneamente para o card real equivalente.
══════════════════════════════════════════ */
function teleportIfNeeded() {
  // virtualPos está nos clones do início?  → salta para o conjunto real
  if (virtualPos < CLONE_COUNT) {
    virtualPos += N;
    moveTrack(getTranslateForPos(virtualPos), false);
  }
  // virtualPos está nos clones do fim?
  if (virtualPos >= CLONE_COUNT + N) {
    virtualPos -= N;
    moveTrack(getTranslateForPos(virtualPos), false);
  }
}

/* ══════════════════════════════════════════
   BOTÃO JOGAR
══════════════════════════════════════════ */
function bindJogar(game) {
  btnJogar.onclick = () => {
    if (game.url && game.url.startsWith("http")) {
      window.open(game.url, "_blank");
    } else {
      alert(`URL não disponível para: ${game.name}`);
    }
  };
}

/* ══════════════════════════════════════════
   SELECIONAR JOGO  (por realIndex)
══════════════════════════════════════════ */
function selectGame(realIndex) {
  activeIndex = mod(realIndex, N);
  // virtualPos já aponta para o card correto (atualizado pela navegação)
  // mas se veio de um clique direto, reajusta para o conjunto do meio
  virtualPos = CLONE_COUNT + activeIndex;

  const game = games[activeIndex];
  updateBackground(game);
  refreshActiveClass();
  bindJogar(game);

  // Aguarda o card crescer (CSS transition), depois centraliza
  if (centerTimer) clearTimeout(centerTimer);
  centerTimer = setTimeout(() => {
    moveTrack(getTranslateForPos(virtualPos), true);
    centerTimer = null;
  }, CARD_TRANSITION_MS);
}

/* ══════════════════════════════════════════
   NAVEGAR (setas / teclado / swipe)
   Anima para o próximo virtualPos, depois
   verifica se precisa teleportar.
══════════════════════════════════════════ */
function navigate(direction) {
  if (isAnimating) return;
  isAnimating = true;

  // Atualiza estado
  virtualPos  += direction;
  activeIndex  = mod(virtualPos - CLONE_COUNT, N);

  const game = games[activeIndex];
  updateBackground(game);
  refreshActiveClass();
  bindJogar(game);

  // Aguarda crescimento do card ativo, depois anima track
  if (centerTimer) clearTimeout(centerTimer);
  centerTimer = setTimeout(() => {
    const tx = getTranslateForPos(virtualPos);
    moveTrack(tx, true);
    centerTimer = null;

    // Após a animação do track, teleporta se necessário
    setTimeout(() => {
      teleportIfNeeded();
      isAnimating = false;
    }, TRACK_ANIM_MS);
  }, CARD_TRANSITION_MS);
}

arrowLeft.addEventListener("click",  () => navigate(-1));
arrowRight.addEventListener("click", () => navigate(1));

/* ══════════════════════════════════════════
   TOUCH / SWIPE
══════════════════════════════════════════ */
let touchStartX = null;

track.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

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
══════════════════════════════════════════ */
buildCarousel();

// virtualPos começa apontando para o primeiro card real (índice CLONE_COUNT)
virtualPos  = CLONE_COUNT + activeIndex;
activeIndex = 0;

refreshActiveClass();

// Aguarda o browser pintar antes de posicionar (sem animação)
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    moveTrack(getTranslateForPos(virtualPos), false);

    const game = games[activeIndex];
    updateBackground(game);
    bindJogar(game);
  });
});

window.addEventListener("resize", () => {
  moveTrack(getTranslateForPos(virtualPos), false);
});