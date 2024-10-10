<?php
include_once("../model/player.php");
$jogador = new Player;
if (isset($_REQUEST["acao"])){
	switch ($_REQUEST["acao"]) {

		case 'cadastrar':
		$jogador->setNome($_POST['nome']);
		$jogador->setScore($_POST['score']);
		$jogador->setNumero($_POST['num']);
		//chamando o método cadastrar
		$jogador->cadastrar();
			//mensagem de confirmação 
		//echo "ok";
		break;

		case 'consultar_json':
			echo json_encode($jogador->consultar());
			break;
		
	
			
	}
}
?>
