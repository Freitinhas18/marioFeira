<?php
class Player implements JsonSerializable {
    private $idPlayer;
    private $nome;
    private $score;
    private $numero;
    private $con;

    // Método para gerar o JSON
    function jsonSerialize(): mixed {
        return [
            'nome' => $this->nome,
            'idPlayer' => $this->idPlayer,
            'numero' => $this->numero,
            'score' => $this->score
        ];
    }

    // Métodos Get e Set
    function setNome($nome) {
        $this->nome = $nome;
    }
    function getNome() {
        return $this->nome;
    }
    function setNumero($numero) {
        $this->numero = $numero;
    }
    function getNumero() {
        return $this->numero;
    }
    function setScore($score) {
        $this->score = $score;
    }
    function getScore() {
        return $this->score;
    }

    // Construtor
    function __construct() {
        include_once("conexao.php");
        $classe_con = new Conexao();
        $this->con = $classe_con->conectar();
    }

    // Verificar se o jogador já existe
    private function jogadorExiste($nome) {
        $comandoSql = "SELECT COUNT(*) FROM player WHERE nome = ?";
        $exec = $this->con->prepare($comandoSql);
        $exec->execute([$nome]);
        return $exec->fetchColumn() > 0; // Retorna true se existir
    }

    // Cadastrar jogador
    function cadastrar() {
        // Verifica se o jogador já existe
        //if ($this->jogadorExiste($this->nome)) {
        //    echo "Jogador já cadastrado.";
        //    return false; // Retorna falso se o jogador já estiver cadastrado
        //}

        $comandoSql = "INSERT INTO player (nome, score, numero) VALUES (?, ?, ?)";
        $valores = array($this->nome, $this->score, $this->numero);
        $exec = $this->con->prepare($comandoSql);
        
        try {
            $resultado = $exec->execute($valores);
            header("location: gameover.php");
            return $resultado;

        } catch (PDOException $e) {
            echo "Erro ao cadastrar: " . $e->getMessage();
            return false; // Retorna falso se ocorrer erro
        }
    }

    // Consultar jogadores
    function consultar() {
        $comandoSql = "SELECT * FROM player";
        $exec = $this->con->prepare($comandoSql);
        $exec->execute();
        
        $dados = array();
        foreach ($exec->fetchAll(PDO::FETCH_ASSOC) as $value) {
            $jogador = new Player;
            $jogador->setNome($value["nome"]);
            $jogador->setScore($value["score"]);
            $jogador->idPlayer = $value["idPlayer"];
            $jogador->setNumero($value["numero"]); // Certifique-se de que 'numero' existe na tabela
            $dados[] = $jogador;
        }
        return $dados;
    }
    
    // Outros métodos (atualizar, excluir, etc.) seguem o mesmo padrão
}
?>
