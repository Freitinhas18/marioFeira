const buttonPlay = document.querySelector(".btn-play");

// Detectar a tecla Enter e disparar o clique no botão de jogar novamente
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buttonPlay.click();
    }
});

// Adicionar o evento de clique ao botão
buttonPlay.addEventListener("click", (event) => {
    event.preventDefault();  // Previne que o redirecionamento aconteça imediatamente

    window.location.href = "cadastro.php";
});
