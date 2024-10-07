<?php
include "../view/index.html"; ?>
<style>
<?php include "../view/assets/css/teclado.css"; ?>
</style>
<?php if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe o valor do input 'selectedLetter'
    $nome = htmlspecialchars($_POST["inputNome"]);
    $telefone = htmlspecialchars($_POST["inputFone"]);
    $instagram = htmlspecialchars($_POST["inputInstagram"]);

    // Exibe uma mensagem perguntando se o nome inserido está correto
    echo "
    <div class='modal resultados' data-bs-theme='dark' tabindex='-1'>
      <div class='modal-dialog'>
      <div class='modal-content'>
      <div class='modal-header'>
      <h5 class='modal-title text-warning'>Deseja confirmar alterações ?</h5>
      <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body text-white'>
            <p class='text-nowrap'>Nome: $nome</p>
            <p class='text-nowrap'>Telefone: $telefone</p>
            <p class='text-nowrap'>Instagram: $instagram</p>
          </div>
          <div class='modal-footer'>
            <form action='../view/index.html' method='GET'>
                <button type='submit' class='btn btn-danger' data-bs-dismiss='modal'>Fechar</button>
            </form>
            <form action='../view/game.html' method='GET'>
                <button type='submit' class='btn btn-success'>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    ";
} ?>
<script>
  $(document).ready(function(){
    $(".resultados").modal("show");
  })

</script>
