<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe o valor do input 'selectedLetter'
    $nome = htmlspecialchars($_POST['selectedLetter']);
    
    // Exibe uma mensagem perguntando se o nome inserido está correto
    echo "<h1>O nome inserido foi: $nome</h1>";
    echo "<p>Este é o nome correto?</p>";

    // Botão para iniciar o jogo, que redireciona para 'game.html'
    echo "<form action='../game.html' method='GET'>
            <button type='submit'>Sim, iniciar o jogo!</button>
          </form>";
    
    // Se o nome estiver errado, pode incluir outro botão para voltar à página inicial, por exemplo
    echo "<form action='../index.html' method='GET'>
            <button type='submit'>Não, voltar</button>
          </form>";
}
?>
