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
    nome: "Murilao",
    telefone: "(11) 99999-9999",
    instagram: "murilo",
    pontuacao: 9999,
  },
];
// FIM DO OBJETO DE EXEMPLO

const mario = document.querySelector(".mario");
const marioStart = document.querySelector(".marioStart");
const pipe = document.querySelector(".pipe");
const caixa = document.querySelector(".caixa");
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
    if (velocidade > 0.95) {
      velocidade -= 0.0005; // Movimento Acelerado
    } else {
      clearInterval(aumentaVel);
      //retardar();
    }
  }, 100);
};

/*const retardar = () => {
  diminuiVel = setInterval(() => {
    if (!(velocidade > 1.4)) {
      velocidade += 0.0005; // Movimento Retardado
    } else {
      clearInterval(diminuiVel);
      acelerar();
    }
  }, 10);
};
*/

const adicionaVida = (qntvidas) => {
  vidas = vidas + qntvidas;

  let heart = "";
  for (let j = 1; j <= vidas; j++) {
    heart += `<img src='./assets/images/heart.png' class='heart n${j}' alt='Coração'>`;
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
      `<img src='./assets/images/heart-broken.png' class='heart' alt='Coração Quebrado'>`,
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

  mario.src = "./assets/images/mario.gif";

  posicionarCaixaAleatoria();

  mario.style.marginLeft = "0px";

  aumentaScore = setInterval(() => {
    score += 1;
    scoreHTML.textContent = `Pontuação: ${score}`;
  }, 100);

  loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const caixaPosition = caixa.offsetLeft;
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");

    pipe.style.animation = `pipe-animation ${velocidade}s infinite linear`;
    caixa.style.animation = `caixa-animation ${velocidade}s infinite linear`;
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 && caixaPosition <= 120
      && pipePosition >0) {
      console.log("Quantidade de vidas atual: " + vidas);

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;
      caixa.style.animation = "none";
      caixa.style.left = `${pipePosition}px`;
      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      mario.src = "./assets/images/game-over.png";
      mario.style.marginLeft = "50px";
      gameOverText.style.opacity = "100%";

      audioBackground.pause();
      audioJump.muted = true;
      audioDeath.play();
      podeReiniciar = true;

      mario.style.width = "75px";
      tiraVida(1);
      clearInterval(loop);
      clearInterval(aumentaScore);
      clearInterval(acelerar);
      //clearInterval(retardar);
      console.log(velocidade);
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
    groundImage +=
      "<img src='./assets/images/ground.jpg' class='ground-img' />";
  }
  $(groundElement).html(groundImage); // Adiciona as imagens no elemento do chão
}


const posicionarCaixaAleatoria = () => {
  // Intervalo de tempo aleatório entre 2 e 5 segundos para o surgimento da caixa
  const randomTime = Math.random() * (1000 - 1000) + 2000;

  setTimeout(() => {
    // Posição inicial da caixa fora da tela (à direita)
    caixa.style.left = `${window.innerWidth}px`;
    caixa.style.display = "block"; // Mostra a caixa

    // Define uma altura aleatória entre 52px (mínimo) e 150px (máximo) acima do solo

    // Inicia o movimento da caixa para a esquerda
    const caixaMovement = setInterval(() => {
      const caixaPosition = caixa.offsetLeft;

      // Faz a caixa se mover para a esquerda em cada intervalo
      caixa.style.left = `${caixaPosition - 4}px`; // Ajuste a velocidade conforme necessário

      // Se a caixa sair da tela (caixaPosition < -80), reinicia o processo
      if (caixaPosition < -80) {
        clearInterval(caixaMovement); // Para o movimento
        caixa.style.display = "none"; // Esconde a caixa
        posicionarCaixaAleatoria(); // Recomeça o ciclo
      }
    }, 16); // Ajuste de acordo com a fluidez desejada (60fps = 16ms por quadro)
  }, randomTime); // Tempo aleatório para reiniciar o processo
};



const reiniciar = () => {
  if (vidas != 0) {
    gameOverText.style.opacity = "0%";
    mario.src = "./assets/images/mario.gif";
    mario.style.width = "150px";
    mario.style.marginLeft = "0px";
    mario.style.bottom = "50px";
    mario.style.animation = "";
    pipe.style.left = "unset";
    caixa.style.left = "unset";
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
  gerarChao(".game-board-ground"); // Gera o chão do jogo
});

// Recalcular o chão quando a tela for redimensionada
window.addEventListener("resize", function () {
  gerarChao(".game-board-ground");
});

$(document).ready(function () {
  // Para o chão do jogo
  $(".game-board-ground").append(groundImage);
});

document.addEventListener("keydown", (event) => {
  if (!started) {
    const startScreen = document.querySelector(".start");
    startScreen.style.display = "none";
    audioStart.play();

    $(document).ready(function () {
      $(".start").empty();
      $(".game-board-ground").append(groundImage);
    });
    iniciarJogo();
    started = true;
    adicionaVida(3);
    console.log("Quantidade de vidas atual: " + vidas);
  } else {
    // senão -> reiniciar

    if (event.code === "Space") {
      jump();
    } else if (event.code === "Enter" && podeReiniciar) {
      reiniciar();
    }
  }
});
