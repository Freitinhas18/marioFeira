let easterEgg;
let contador = 0;
let marioSize = 0;
let groundImage = ""; // Inicializando como uma string vazia
const marioStart = document.querySelector(".marioStart");

easterEgg = setInterval(() => {
  contador += 1;
  console.log(contador + " Tamanho do mario: " + marioSize);
  marioSize = Math.floor(Math.random() * 600) + 10;
  marioStart.style.width = `${marioSize}px`;
}, 5090);

function gerarChao(groundElement) {
  const groundImgWidth = 64;
  const screenWidth = window.innerWidth; // Largura da tela
  const numImgs = Math.ceil(screenWidth / groundImgWidth) + 35; // Calcula quantas imagens são necessárias

  for (let i = 0; i < numImgs; i++) {
    groundImage += "<img src='./assets/images/ground.jpg' class='ground-img' />";
  }
  $(groundElement).html(groundImage); // Adiciona as imagens no elemento do chão
}

$(document).ready(function () {
  gerarChao(".start-ground"); // Chama a função para gerar o chão
});

window.addEventListener("keydown", ()=>{
  window.location.href = "teclado.html"
})
