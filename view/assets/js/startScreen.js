let easterEgg;
let contador = 0;
let marioSize = 0;
const marioStart = document.querySelector(".marioStart");

easterEgg = setInterval(() => {
  contador += 1;
  console.log(contador + " Tamanho do mario: " + marioSize);
  marioSize = Math.floor(Math.random() * 600) + 10;
  marioStart.style.width = `${marioSize}px`;
}, 5090);

function gerarChao(groundElement) {
  const groundImgWidth = 64;
  const screenWidth = window.innerWidth;

  let groundImage = "";
  for (let i = 0; i < 23; i++) {
    groundImage +=
      "<img src='./assets/images/ground.jpg' class='ground-img' />";
  }
  $(groundElement).html(groundImage);
}

$(document).ready(function () {
  gerarChao(".start-ground"); // Gera o chão do jogo
});
