"use strict";
/* Segue abaixo modelo de objeto para exibir ao final no ranking */
const ranking = [
  {
    id: 1,
    nome: "Pedro Camilo",
    telefone: "(11) 99999-9999",
    instagram: "@pedro",
    pontuacao: 99999,
  },
  {
    id: 2,
    nome: "Rebello",
    telefone: "(11) 99999-9999",
    instagram: "@rebello",
    pontuacao: 99999,
  },
  {
    id: 3,
    nome: "Duds",
    telefone: "(11) 99999-9999",
    instagram: "@doodis",
    pontuacao: 99999,
  },
  {
    id: 4,
    nome: "Iguin",
    telefone: "(11) 99999-9999",
    instagram: "@igin",
    pontuacao: 99999,
  },
];
// FIM DO OBJETO DE EXEMPLO

const mario = document.querySelector(".mario");
const marioStart = document.querySelector(".marioStart");
const pipe = document.querySelector(".pipe");
const gameOverText = document.querySelector(".game-over-text");
let groundImage;

// Importação de áudios
const audioJump = new Audio("sounds/audioJump.mp3");
const audioDeath = new Audio("sounds/death.mp3");
const audioStart = new Audio("sounds/its-me-mario.mp3");
const audioBackground = new Audio("sounds/background.mp3");
// Variáveis de controle
let jumping = false;
let loop;
let aumentaVel;
let diminuiVel;
let vidas = 0;
// basicamente uma variável para impedir que o jogador pressione "Enter" múltiplas vezes
let podeReiniciar = false;

// Variáveis de pontuação
let score;
let aumentaScore;
const scoreHTML = document.querySelector(".score");
let started = false; // Funcao p/ verificar se jogo foi iniciado

// Definições do Jogo
audioBackground.loop = true;
audioBackground.volume = 0.7;
audioJump.volume = 0.5;
let velocidade = 1.5;

const gameOver = (ranking) => {
  podeReiniciar = false;
  $(".ranking").modal("show");
  const tbody = $("#tbody");
  tbody.empty();
  ranking.forEach((item, index) => {
    tbody.append(`
                  <tr>
                      <th scope="row">${index + 1}</th>
                      <td>${item.nome}</td>
                      <td>${item.telefone}</td>
                      <td>${item.instagram}</td>
                      <td>${item.pontuacao}</td>
                  </tr>
              `);
  });
};

const jump = () => {
  if (jumping == false) {
    jumping = true;
    audioJump.play();
    mario.classList.add("jump"); // Adição classe de Pulo, durante salto

    setTimeout(() => {
      mario.classList.remove("jump"); // Remoção classe de Pulo, pós salto
      jumping = false; // Desbloqueia o pulo do Mario
    }, 500);
  }
};

const acelerar = () => {
  aumentaVel = setInterval(() => {
    if (velocidade > 1.1) {
      velocidade -= 0.0005; // Movimento Acelerado
    } else {
      clearInterval(aumentaVel);
      retardar();
    }
  }, 10);
};

const retardar = () => {
  diminuiVel = setInterval(() => {
    if (!(velocidade > 1.4)) {
      velocidade += 0.0005; // Movimento Retardado
    } else {
      clearInterval(diminuiVel);
      acelerar();
    }
  }, 10);
};

const adicionaVida = (qntvidas) => {
  vidas = vidas + qntvidas;

  let heart = "";
  for (let j = 1; j <= vidas; j++) {
    heart += `<img src='./images/heart.png' class='heart n${j}' alt='Coração'>`;
  }

  // Atualiza a exibição de vidas
  $(".hearts").html(heart);
};

const tiraVida = () => {
  if (vidas > 0) {
    // Garante que não subtraia vidas abaixo de zero
    vidas -= 1;
    adicionaVida(0); // Atualiza a exibição após perder uma vida
    $(".hearts").append(
      `<img src='./images/heart-broken.png' class='heart' alt='Coração Quebrado'>`,
    );
  }
};

const iniciarJogo = () => {
  // Definições de controle
  podeReiniciar = false;
  score = 0;
  velocidade = 1.5;
  acelerar();

  scoreHTML.textContent = `Pontuação: ${score}`;

  // Definições de áudio pré início
  audioBackground.play();
  audioJump.muted = false;

  pipe.style.animation = `pipe-animation ${velocidade}s infinite linear`; // Movimento da PIPE
  mario.src = "./images/mario.gif";

  mario.style.marginLeft = "0px";

  aumentaScore = setInterval(() => {
    score += 1;
    scoreHTML.textContent = `Pontuação: ${score}`;
  }, 100);

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    pipe.style.animation = `pipe-animation ${velocidade}s infinite linear`;
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      console.log("Quantidade de vidas atual: " + vidas);

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;
      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      mario.src = "./images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";
      gameOverText.style.opacity = "100%";

      audioBackground.pause();
      audioJump.muted = true;
      audioDeath.play();
      podeReiniciar = true;

      tiraVida(1);
      clearInterval(loop);
      clearInterval(aumentaScore);
      clearInterval(acelerar);
      clearInterval(retardar);
    }
  }, 10);
};

// Função para gerar o chão contínuo
function gerarChao(groundElement) {
  const groundImgWidth = 64; // Largura da imagem do chão (em pixels) - Ajuste conforme necessário
  const screenWidth = window.innerWidth; // Largura da tela
  const numImgs = Math.ceil(screenWidth / groundImgWidth) + 35; // Calcula quantas imagens são necessárias

  let groundImage = "";
  for (let i = 0; i < numImgs; i++) {
    groundImage += "<img src='./images/ground.jpg' class='ground-img' />";
  }
  $(groundElement).html(groundImage); // Adiciona as imagens no elemento do chão
}

const reiniciar = () => {
  if (vidas != 0) {
    gameOverText.style.opacity = "0%";
    mario.src = "./images/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0px";
    mario.style.bottom = "50px";
    mario.style.animation = "";
    pipe.style.left = "unset";
    iniciarJogo();
    acelerar();
  } else {
    // chamada de função de game over, que recebe como parâmetros o ranking
    // do banco de dados para então exibi-los
    gameOver(ranking);
  }
};
// Chamada de funções
// Quando o documento estiver pronto, gera o chão nas telas de início e do jogo
$(document).ready(function () {
  gerarChao(".start-ground"); // Gera o chão da tela inicial
  gerarChao(".game-board-ground"); // Gera o chão do jogo
});

// Recalcular o chão quando a tela for redimensionada
window.addEventListener("resize", function () {
  gerarChao(".start-ground");
  gerarChao(".game-board-ground");
});
let easterEgg;
let contador = 0;
let marioSize = 0;

easterEgg = setInterval(() => {
  contador += 1;
  console.log(contador + " Tamanho do mario: " + marioSize);
  marioSize = Math.floor(Math.random() * 600) + 10;
  marioStart.style.width = `${marioSize}px`;
}, 5090);

$(document).ready(function () {
  // Para o chão da tela de início
  $(".start-ground").append(groundImage);

  // Para o chão do jogo
  $(".game-board-ground").append(groundImage);
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
    adicionaVida(50);
    console.log("Quantidade de vidas atual: " + vidas);
  } else {
    // senão -> reiniciar

    if (event.code === "Enter" && podeReiniciar) {
      reiniciar();
    } else if (event.code === "Space") {
      jump();
    }
  }
});
