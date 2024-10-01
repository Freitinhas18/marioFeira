const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOverText = document.querySelector(".game-over-text");
const audio = new Audio("audioJump.mp3");
const scoreDisplay = document.querySelector(".score"); // Seleciona o elemento de pontuação

let jumping = false; // Variável Booleana
let loop;
let score = 0; // Inicia a pontuação em 0

const jump = () => {
  if (jumping == false) {
    console.log("pulo");
    jumping = true;
    audio.play();
    mario.classList.add("jump"); // Adição classe de Pulo, durante salto

    // Incrementa a pontuação a cada pulo
    score += 10;
    scoreDisplay.textContent = `Pontuação: ${score}`;

    setTimeout(() => {
      mario.classList.remove("jump"); // Remoção classe de Pulo, pós salto
      jumping = false; // Desbloqueia o pulo do Mario
    }, 500);
  }
};

const iniciarJogo = () => {
  console.log("Iniciado");
  pipe.style.animation = "pipe-animation 1.5s infinite linear";
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";

  aumentaVel = setInterval(() => {
    // Intervalo de tempo p/ alt. de VELOCIDADE
    if (velocidade >= 0.8) {
      velocidade -= 0.0005; // Aceleracao
    }
  }, 10); // cada a = 0.00005 x/ms (Ou seja, a cada 10ms a velocidade é aumentada em 0.0005)
  score = 0; // Reseta a pontuação ao iniciar o jogo
  scoreDisplay.textContent = `Pontuação: ${score}`; // Atualiza a exibição da pontuação

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

      clearInterval(loop);
    }
  }, 10);
};

const reiniciar = () => {
  clearInterval(loop);
  gameOverText.style.opacity = "0%";
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";
  mario.style.bottom = "0px";
  mario.style.animation = "";
  pipe.style.left = "unset";
  iniciarJogo();
};

// Chamada de Funções para Início e Reset do jogo
iniciarJogo(); // Função p/ efetivamente iniciar Jogo

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    reiniciar();
  }
});

document.addEventListener("keydown", jump);
