<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and get POST data
    $nome = htmlspecialchars($_POST["inputNome"]);
    $telefone = htmlspecialchars($_POST["inputFone"]);
    $instagram = htmlspecialchars($_POST["inputInstagram"]);
} else {
    // Redirect back to index.html if accessed directly
    header("Location: ../view/index.html");
    exit();
} ?>
<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <title>Ranking</title>
    <link rel="stylesheet" href="../view/assets/css/style.css" />
    <link rel="stylesheet" href="../view/assets/css/teclado.css" />
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
    />
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
</head>
<body>
    <!-- Modal to confirm data -->
    <div class="modal fade resultados" data-bs-theme="dark" tabindex="-1" id="resultadosModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-warning">Deseja confirmar as informações?</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body text-white">
                    <p class="text-nowrap">Nome XD: <?php echo $nome; ?></p>
                    <p class="text-nowrap">Telefone: <?php echo $telefone; ?></p>
                    <p class="text-nowrap">Instagram: <?php echo $instagram; ?></p>
                </div>
                <div class="modal-footer">
                    <form action="../view/index.html" method="GET">
                        <button type="submit" class="btn btn-danger">Fechar</button>
                    </form>
                    <form action="../view/game.html" method="GET">
                        <button type="submit" class="btn btn-success">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script>
        $(document).ready(function(){
            $("#resultadosModal").modal("show");
        });
    </script>
</body>
</html>
