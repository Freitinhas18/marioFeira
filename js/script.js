const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOverText = document.querySelector(".game-over-text");
let jumping = false; // Variável Booleana
let loop;

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
  pipe.style.animation = "pipe-animation 1.5s infinite linear";
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

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
