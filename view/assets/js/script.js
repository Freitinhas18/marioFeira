const botao = document.querySelector("#chamaPHP");
("use strict");

const mario = document.querySelector(".mario");
const marioStart = document.querySelector(".marioStart");
const gameOverText = document.querySelector(".game-over-text");
let groundImage;

// Importação de áudios
const audioJump = new Audio("./assets/sounds/audioJump.mp3");
const audioDeath = new Audio("./assets/sounds/death.mp3");
const audioStart = new Audio("./assets/sounds/its-me-mario.mp3");
const audioBackground = new Audio("./assets/sounds/background.mp3");
// Variáveis de controle
let jumping = false;
let loop;
let aumentaVel;
let vidas = 0;
let gameOverFlag = false;
let podeReiniciar = false;

// Variáveis de pontuação
let score;
let aumentaScore;
const scoreHTML = document.querySelector(".score");
let started = false; // Verifica se o jogo foi iniciado

// Definições do Jogo
audioBackground.loop = true;
audioBackground.volume = 0.7;
audioJump.volume = 0.5;
let velocidade = 1.5;
const minDelay = 500; // tempo mínimo entre pipes em ms
let maxDelay = 2000; // tempo máximo entre pipes em ms
const minHeight = 4;
const maxHeight = 60;

const pipeCreationTimeouts = [];

const gameOver = () => {
  // Função que termina o jogo
  podeReiniciar = false;
  console.log("Jogo acabou !");
  document.getElementById("score").value = score;
  botao.click();
};

const jump = () => {
  if (!jumping) {
    jumping = true;
    audioJump.play();
    mario.classList.add("jump");

    setTimeout(() => {
      mario.classList.remove("jump");
      jumping = false;
    }, 500);
  }
};

const adicionaVida = (qntvidas) => {
  vidas += qntvidas;

  let heart = "";
  for (let j = 1; j <= vidas; j++) {
    heart += `<img src='./assets/images/heart.png' class='heart n${j}' alt='Coração'>`;
  }

  // Atualiza a exibição de vidas
  $(".hearts").html(heart); // .html() vs .append() - Diferença está na adição, enquanto append adiciona, html substitui a div inteira
};

const tiraVida = () => {
  if (vidas > 0) {
    vidas -= 1;
    adicionaVida(0);
    $(".hearts").append(
      `<img src='./assets/images/heart-broken.png' class='heart' alt='Coração Quebrado'>`,
    );
  }
};

const createPipe = () => {
  const pipe = document.createElement("img");
  pipe.src = "./assets/images/pipe.png";
  pipe.classList.add("pipe");

  // Randomiza a altura da pipe

  const pipeHeight =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  pipe.style.bottom = `${pipeHeight}px`;

  const gameBoard = document.querySelector(".game-board");
  gameBoard.appendChild(pipe);

  pipe.style.animation = `pipe-animation ${velocidade}s linear forwards`;

  pipe.addEventListener("animationend", () => {
    pipe.remove();
  });
};

const scheduleNextPipe = () => {
  if (gameOverFlag) return; // Não agenda mais pipes se o jogo acabou

  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  const timeoutID = setTimeout(() => {
    createPipe();
    scheduleNextPipe();
  }, delay);
  pipeCreationTimeouts.push(timeoutID);
};

const clearPipeCreationTimeouts = () => {
  pipeCreationTimeouts.forEach((timeoutID) => clearTimeout(timeoutID));
  pipeCreationTimeouts.length = 0;
};

const removeAllPipes = () => {
  const pipes = document.querySelectorAll(".pipe");
  pipes.forEach((pipe) => pipe.remove());
};

const acelerar = () => {
  aumentaVel = setInterval(() => {
    if (maxDelay > 1000) {
      velocidade -= 0.0005;
      maxDelay -= 2;
    } else {
      clearInterval(aumentaVel);
    }
  }, 100);
};

const iniciarJogo = () => {
  podeReiniciar = false;
  gameOverFlag = false;
  score = 0;
  velocidade = 1.5;
  acelerar();

  scoreHTML.textContent = `Pontuação: ${score}`;

  // Áudio
  audioBackground.play();
  audioJump.muted = false;

  mario.src = "./assets/images/mario.gif";
  mario.style.marginLeft = "0px";

  aumentaScore = setInterval(() => {
    score += 1;
    scoreHTML.textContent = `Pontuação: ${score}`;
  }, 100);

  scheduleNextPipe();

  loop = setInterval(() => {
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    const pipes = document.querySelectorAll(".pipe");
    pipes.forEach((pipe) => {
      const pipePosition = pipe.offsetLeft;

      if (
        pipePosition <= 170 &&
        pipePosition > 0 &&
        marioPosition < parseInt(pipe.style.bottom) + 50 // Ajuste a altura do Mario conforme necessário
      ) {
        const allPipes = document.querySelectorAll(".pipe");
        allPipes.forEach((p) => {
          const pPosition = p.offsetLeft;
          p.style.animation = "none";
          p.style.left = `${pPosition}px`;
        });

        // Para a animação do Mario
        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "./assets/images/game-over.png";
        mario.style.marginLeft = "50px";
        gameOverText.style.opacity = "100%";

        audioBackground.pause();
        audioJump.muted = true;
        audioDeath.play();
        podeReiniciar = true;

        mario.style.width = "150px";
        tiraVida();
        gameOverFlag = true;
        clearInterval(loop);
        clearInterval(aumentaScore);
        clearInterval(aumentaVel);
        clearPipeCreationTimeouts();
      }
    });
  }, 10);
};

// Função para gerar o chão contínuo
function gerarChao(groundElement) {
  const groundImgWidth = 64;
  const screenWidth = window.innerWidth;
  const numImgs = Math.ceil(screenWidth / groundImgWidth) + 35;

  let groundImage = "";
  for (let i = 0; i < numImgs; i++) {
    groundImage +=
      "<img src='./assets/images/ground.jpg' class='ground-img' />";
  }
  $(groundElement).html(groundImage);
}

const reiniciar = () => {
  if (vidas != 0) {
    gameOverText.style.opacity = "0%";
    mario.src = "./assets/images/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0px";
    mario.style.bottom = "50px";
    mario.style.animation = "";
    maxDelay = 2000;
    removeAllPipes();
    iniciarJogo();
  } else {
    gameOver(ranking);
  }
};

// Chamada de funções
$(document).ready(function () {
  gerarChao(".game-board-ground"); // Gera o chão do jogo
});

// Recalcular o chão quando a tela for redimensionada
window.addEventListener("resize", function () {
  gerarChao(".game-board-ground");
});

document.addEventListener("keydown", (event) => {
  if (!started) {
    const startScreen = document.querySelector(".start");
    startScreen.style.display = "none";
    audioStart.play();

    iniciarJogo();
    started = true;
    adicionaVida(3);
    console.log("Quantidade de vidas atual: " + vidas);
  } else {
    if (event.code === "Enter") {
      jump();
    }
    if (event.code === "Enter" && podeReiniciar) {
      reiniciar();
    }
  }
});
