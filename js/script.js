"use strict";
const mario = document.querySelector(".mario");
const marioStart = document.querySelector(".marioStart");
const pipe = document.querySelector(".pipe");
const gameOverText = document.querySelector(".game-over-text");
const audioJump = new Audio("sounds/audioJump.mp3");
const audioDeath = new Audio("sounds/death.mp3");
const audioStart = new Audio("sounds/its-me-mario.mp3");

let jumping = false;
let loop;
let velocidade = 1.5;
let aumentaVel;

let score;
let aumentaScore;
const scoreHTML = document.querySelector(".score");

let started = false; // Funcao p/ verificar se jogo foi iniciado

const jump = () => {
  if (jumping == false) {
    console.log("pulo");
    jumping = true;
    audioJump.play();
    mario.classList.add("jump"); // Adição classe de Pulo, durante salto

    setTimeout(() => {
      mario.classList.remove("jump"); // Remoção classe de Pulo, pós salto
      jumping = false; // Desbloqueia o pulo do Mario
    }, 500);
  }
};

const iniciarJogo = () => {
  console.log("Iniciado");
  pipe.style.animation = `pipe-animation ${velocidade}s infinite linear`; // Movimento da PIPE
  mario.src = "./images/mario.gif";

  mario.style.marginLeft = "0px";

  score = 0;
  scoreHTML.textContent = `Pontuação: ${score}`;

  aumentaScore = setInterval(() => {
    score += 1;
    scoreHTML.textContent = `Pontuação: ${score}`;
  }, 100);

  aumentaVel = setInterval(() => {
    // Intervalo de tempo p/ alt. de VELOCIDADE
    if (velocidade >= 1) {
      velocidade -= 0.0005; // Aceleracao
    }
  }, 10); // cada a = 0.00005 x/ms (Ou seja, a cada 10ms a velocidade é aumentada em 0.0005)

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    let velocidadeTemp = velocidade;
    velocidadeTemp -= 0.1;
    pipe.style.animation = `pipe-animation ${velocidadeTemp}s infinite linear`;
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      gameOverText.style.opacity = "100%";
      audioDeath.play();
      clearInterval(loop);
      clearInterval(aumentaVel);
      clearInterval(aumentaScore);
    }
  }, 10);
};

const reiniciar = () => {
  clearInterval(loop);
  clearInterval(aumentaVel);
  clearInterval(aumentaScore);
  velocidade = 1.5;
  gameOverText.style.opacity = "0%";
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";
  mario.style.bottom = "50px";
  mario.style.animation = "";
  pipe.style.left = "unset";
  iniciarJogo();
};

// Chamada de funções
let easterEgg;
let contador = 0;
let marioSize = 0;
easterEgg = setInterval(() => {
  contador += 1;
  console.log(contador + " Tamanho do mario: " + marioSize);
  marioSize = Math.floor(Math.random() * 600) + 10;
  marioStart.style.width = `${marioSize}px`;
}, 5000);
let groundImage = "";
for (let i = 0; i <= 23; i++) {
  groundImage += "<img src='./images/ground.jpg' class='ground-img' />";
}
$(document).ready(function () {
  $(".ground").append(groundImage);
});
document.addEventListener("keydown", (event) => {
  if (!started) {
    clearInterval(easterEgg);
    // se jogo nao tiver iniciado -> iniciar
    const startScreen = document.querySelector(".start");
    startScreen.style.display = "none";
    audioStart.play();

    $(document).ready(function () {
      $(".start").empty();
      $(".game-board-ground").append(groundImage);
    });
    iniciarJogo();
    started = true;
  } else {
    // senão -> reiniciar
    if (event.code === "Enter") {
      reiniciar();
    } else if (event.code === "Space") {
      jump();
    }
  }
});
