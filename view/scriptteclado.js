const teclado = document.getElementById("teclado");
const texto = document.getElementById("texto");
const info = document.querySelector(".info");
const titulo = document.querySelector("#pergunta");
const botao = document.querySelector("#chamaPHP");

// Array com as letras do teclado alfabético
const letras = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X", "Y", "Z", "<"],
  ["Enviar"], // Tecla "Enviar"
];

// Array para o teclado numérico
const numeros = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["0", "<", "Enviar"],
];

let nome, numero;
let perguntaNome = true; // Estado inicial para saber se estamos perguntando o nome ou número

// Variáveis para controlar a posição da tecla selecionada
let linhaSelecionada = 0;
let colunaSelecionada = 0;

// Teclado atual (alfabético ou numérico)
let tecladoAtual = letras;

// Função para criar as divs das teclas
function criarTeclado(arrayTeclado) {
  teclado.innerHTML = ""; // Limpa o teclado anterior
  arrayTeclado.forEach((linha) => {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha-teclado");

    linha.forEach((tecla) => {
      const divTecla = document.createElement("div");
      divTecla.classList.add("tecla");
      if (tecla === "Enviar") {
        divTecla.classList.add("tecla-enviar"); // Classe especial para "Enviar"
      }
      divTecla.textContent = tecla;
      divLinha.appendChild(divTecla);
    });

    teclado.appendChild(divLinha);
  });

  tecladoAtual = arrayTeclado;
  selecionarTecla(0, 0);
}

function selecionarTecla(linha, coluna) {
  const teclas = document.querySelectorAll(".tecla");
  teclas.forEach((tecla) => tecla.classList.remove("selecionada"));

  linhaSelecionada = Math.max(0, Math.min(linha, tecladoAtual.length - 1));
  colunaSelecionada = Math.max(
    0,
    Math.min(coluna, tecladoAtual[linhaSelecionada].length - 1),
  );

  let indice = 0;
  for (let i = 0; i < linhaSelecionada; i++) {
    indice += tecladoAtual[i].length;
  }

  indice += colunaSelecionada;

  const teclaSelecionada = teclas[indice];
  if (teclaSelecionada) {
    teclaSelecionada.classList.add("selecionada");
    teclaSelecionada.focus();
  }
}

function moverSelecao(direcao) {
  switch (direcao) {
    case "esquerda":
      if (colunaSelecionada > 0) {
        colunaSelecionada--;
      }
      break;
    case "direita":
      if (colunaSelecionada < tecladoAtual[linhaSelecionada].length - 1) {
        colunaSelecionada++;
      }
      break;
    case "cima":
      if (linhaSelecionada > 0) {
        linhaSelecionada--;
        colunaSelecionada = Math.min(
          colunaSelecionada,
          tecladoAtual[linhaSelecionada].length - 1,
        );
      }
      break;
    case "baixo":
      if (linhaSelecionada < tecladoAtual.length - 1) {
        linhaSelecionada++;
        colunaSelecionada = Math.min(
          colunaSelecionada,
          tecladoAtual[linhaSelecionada].length - 1,
        );
      }
      break;
  }
  selecionarTecla(linhaSelecionada, colunaSelecionada);
}

function inserirCaractere() {
  const teclas = document.querySelectorAll(".tecla");
  let indice = 0;
  for (let i = 0; i < linhaSelecionada; i++) {
    indice += tecladoAtual[i].length;
  }
  indice += colunaSelecionada;

  const tecla = teclas[indice];
  const caractere = tecla.textContent;

  if (caractere === "<") {
    texto.value = texto.value.slice(0, -1);
  } else if (caractere === "Enviar") {
    if (perguntaNome) {
      nome = texto.value;
      texto.value = "";
      document.getElementById("nome").value = nome;
      perguntaNome = false;
      criarTeclado(numeros); // Muda para o teclado numérico
      titulo.textContent = "DIGITE SEU NUMERO"; // Muda o texto do título
      linhaSelecionada = 0; // Reinicializa a seleção para a primeira linha
      colunaSelecionada = 0; // Reinicializa a seleção para a primeira coluna
    } else {
      numero = texto.value; // Armazena o número
      document.getElementById("num").value = numero;
      info.style.display = "none"; // Esconde o teclado
      window.location.href = "jogo.html";
      botao.click();
    }
  } else {
    texto.value += caractere; // Insere o caractere no campo de texto
  }
  // Mantenha a seleção correta após inserir o caractere
  selecionarTecla(linhaSelecionada, colunaSelecionada);
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      moverSelecao("esquerda");
      break;
    case "ArrowRight":
      moverSelecao("direita");
      break;
    case "ArrowUp":
      moverSelecao("cima");
      break;
    case "ArrowDown":
      moverSelecao("baixo");
      break;
    case "Enter":
      inserirCaractere();
      break;
  }
});

criarTeclado(letras);
