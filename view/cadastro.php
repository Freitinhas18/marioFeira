<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="styleteclado.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title>Document</title>
</head>
<body>
    <form method="POST" action="game.php">    
    <div class="info">
        <h1 id="pergunta" >DIGITE SEU NOME:</h1>
        <input type="text" id="texto" name="texto">

        <input type="hidden" name="num" id="num" >
        <input type="hidden" name="nome" id="nome">
        <button id="chamaPHP" type="submit" style="display:none;"></button>
        <div id="teclado">
        </div>
    </div>  
    </form>
    <script src="scriptteclado.js"></script>

</body>
</html>