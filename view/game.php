<?php 
    include_once("../controller/playercontroller.php");
    $nome = $_POST["nome"] ?? ''; // Usa ?? para evitar erro caso não tenha valor
    $num = $_POST["num"] ?? ''; 
?>
<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./assets/css/style.css" />
        <title>Mario</title>
        <script src="./assets/js/jquery-3.7.1.min.js"></script>
    </head>
    <body>
        <form action="?acao=cadastrar" class="formGame" method="POST">
        <button id="chamaPHP" type="submit" style="display:none;"></button>

        <input type="hidden" name="score" id="score" value="123">
        <input type="hidden" name="nome" id="nome" value="<?php echo htmlspecialchars($nome); ?>"> 
        <input type="hidden" name="num" id="num" value="<?php echo htmlspecialchars($num); ?>">

            <div class="start">
                <div class="logo-board">
                    <h1 class="mb-4">Super Mario Runner</h1>
                    <img src="./assets/images/logopng.png" class="logo" />
                </div>

                <p class="subtitle">Pressione qualquer tecla para continuar...</p>
                <img
                    src="./assets/images/mario.gif"
                    class="marioStart"
                    alt="Mario correndo"
                />
                <div class="start-ground"></div>
            </div>

            <div class="game-board">
                <img src="./assets/images/clouds.png" class="clouds" />
                <img src="./assets/images/mario.gif" class="mario" />
                <img
                    src="./assets/images/game-over-text.png"
                    class="game-over-text"
                />
                <div class="game-board-ground"></div>
                <div class="score">Pontuação: 0</div>
                <div class="hearts"></div>
            </div>
    </form>
        <script defer src="./assets/js/script.js"></script>
    </body>
</html>
