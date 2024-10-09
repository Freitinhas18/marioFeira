<?php
class Conexao{
	function Conectar(){
		// "caminho","usuario","senha"
		$con = new pdo("mysql:host=localhost;dbname=mario","root","");
		$con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		return $con;
	}
}
?>
