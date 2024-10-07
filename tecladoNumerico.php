<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teclado Virtual</title>
    <link rel="stylesheet" href="./assets/css/tecladonumerico.css">
</head>

<body>
    <div class="keyboard-container">
        <form action="../controller/ranking.php" method="POST">
            <input type="text" id="selectedLetterN" name="selectedLetterN" readonly placeholder="Digite o número de telefone" />

            <div class="keyboard" id="keyboard">
                <div class="key">1</div>
                <div class="key">2</div>
                <div class="key">3</div>
                <div class="key">4</div>
                <div class="key">5</div>
                <div class="key">6</div>
                <div class="key">7</div>
                <div class="key">8</div>
                <div class="key">9</div>
                <div class="key">0</div>

                <div class="key backspace-button">
                    <img src="./assets/images/x-lg.svg" alt="Backspace">
                </div>
                <button type="submit" class="key send-button">
                    <img src="./assets/images/box-arrow-in-right.svg" alt="Enviar">
                </button>
            </div>
        </form>
    </div>
    <script src="./assets/js/tecladonumerico.js"></script>
</body>
</html>
