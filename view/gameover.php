<?php
include_once("../controller/playercontroller.php");
require_once('../model/conexao.php');

// Conectando ao banco usando PDO
$conexao = new Conexao();
$con = $conexao->Conectar();

// Query para selecionar os dados dos jogadores, ordenando por score e limitando a 12 resultados
$query = "SELECT * FROM player ORDER BY score DESC LIMIT 12"; // Modificado
$stmt = $con->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Dados recebidos via POST
$score = $_POST["score"] ?? ''; 
?>
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

        <div class="container">
            <div class="menu-screen">
                <span class="game-over">game over</span>
                <button type="submit" class="btn-play">
                    <span class="material-symbols-outlined">play_circle</span>
                    Jogar novamente
                </button>
            </div>

            
        </div>
        <div class="tabela"> 
                <table>
                    <tr>
                    <td class="titulo">RANKING</td>    
                    <td class="titulo">NOME</td>
                        <td class="titulo">SCORE</td>
                    </tr>

                    <?php
                    // Exibindo os dados do banco de dados
                    $x=1;
                    if ($result) {
                        foreach ($result as $row) {
                            echo "<tr>";
                            echo "<td>" . htmlspecialchars($x) ."º". "</td>";
                            echo "<td>" . htmlspecialchars($row['nome']) . "</td>";
                            echo "<td>" . htmlspecialchars($row['score']) . "</td>";
                            echo "</tr>";
                            $x=$x+1;
                        }
                    } else {
                        echo "<tr><td colspan='2'>Nenhum dado encontrado</td></tr>";
                    }
                    ?>
                </table>
            </div>
    </form> 

    <script defer src="scriptgameover.js"></script>
</body>
</html>
