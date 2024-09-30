const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOverText = document.querySelector(".game-over-text");
let jumping = false; // Variável Booleana
let loop;
let velocidade = 1.5;
let aumentaVel;

const jump = () => {
  if (jumping == false) {
    jumping = true;
    mario.classList.add("jump"); // Adição classe de Pulo, durante salto

    setTimeout(() => {
      mario.classList.remove("jump"); // Remoção classe de Pulo, pós salto
      jumping = false; // Desbloqueia o pulo do Mario
    }, 400);
  }
};

const iniciarJogo = () => {
  console.log("Iniciado");
  pipe.style.animation = `pipe-animation ${velocidade}s infinite linear`; // Movimento da PIPE
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";

  aumentaVel = setInterval(() => {
    // Intervalo de tempo p/ alt. de VELOCIDADE
    if (velocidade >= 0.4) {
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

      clearInterval(loop);
      clearInterval(aumentaVel);
    }
  }, 10);
};

const reiniciar = () => {
  clearInterval(loop);
  clearInterval(aumentaVel);
  velocidade = 1.5;
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

document.addEventListener("keydown", (evento) => {
  if (event.code === "Space") {
    jump();
  }
});
