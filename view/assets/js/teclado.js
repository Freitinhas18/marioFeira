// Seleciona todos os elementos com a classe 'key' (inclui letras, Backspace e Enviar)
const keys = document.querySelectorAll('.key');
const inputField = document.getElementById('selectedLetter'); // Campo de texto
let selectedIndex = 0; // Índice da tecla selecionada

// Função que atualiza a aparência das teclas para destacar a tecla selecionada
function updateSelection() {
    keys.forEach((key, index) => {
        key.classList.toggle('selected', index === selectedIndex);
    });
}

// Função que lida com o pressionamento de teclas
function handleKeydown(event) {
    const cols = 10; // Número de teclas por linha

    if (event.key === 'ArrowRight') {
        selectedIndex = (selectedIndex + 1) % keys.length; // Move para a direita
    } else if (event.key === 'ArrowLeft') {
        selectedIndex = (selectedIndex - 1 + keys.length) % keys.length; // Move para a esquerda
    } else if (event.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + cols) % keys.length; // Move para baixo
    } else if (event.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - cols + keys.length) % keys.length; // Move para cima
    } else if (event.key === 'Enter') {
        handleEnter(); // Chama a função para lidar com a tecla Enter
    }

    updateSelection(); // Atualiza a seleção visual
}

// Função para adicionar a letra ou executar ação de backspace ou enviar
function handleEnter() {
    const selectedKey = keys[selectedIndex];

    // Verifica se a tecla selecionada é o botão Backspace ou Enviar
    if (selectedKey.classList.contains('backspace-button')) {
        // Remove a última letra do campo de texto
        inputField.value = inputField.value.slice(0, -1); 
    } else if (selectedKey.classList.contains('send-button')) {
        // Submete o formulário (simula o envio)
        document.querySelector('form').submit(); 
    } else {
        // Adiciona a letra ao campo de texto
        inputField.value += selectedKey.textContent.trim();
    }
}

// Adiciona um listener para detectar pressionamento de teclas
document.addEventListener('keydown', handleKeydown);

// Evento de clique para cada tecla
keys.forEach((key, index) => {
    key.addEventListener('click', () => {
        // Verifica se a tecla clicada é o botão Backspace ou Enviar
        if (key.classList.contains('backspace-button')) {
            // Remove a última letra do campo de texto
            inputField.value = inputField.value.slice(0, -1);
        } else if (key.classList.contains('send-button')) {
            // Submete o formulário (simula o envio)
            document.querySelector('form').submit();
        } else {
            // Adiciona a letra ao campo
            inputField.value += key.textContent.trim();
        }

        selectedIndex = index; // Atualiza a seleção
        updateSelection(); // Atualiza a seleção visual
    });
});

// Seleção inicial
updateSelection();
