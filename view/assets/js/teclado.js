function createKeyboard(modalSelector, inputFieldSelector, nextModalSelector) {
  const modal = document.querySelector(modalSelector);
  const keyboardContainer = modal.querySelector(".keyboard");
  const inputField = modal.querySelector(inputFieldSelector);
  const keys = [];
  let selectedIndex = 0;

  // Lógica Rebs p/ teclado
  const keyLabels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    { type: "backspace", label: '<i class="bi bi-x-lg"></i>' },
    { type: "send", label: '<i class="bi bi-box-arrow-in-right"></i>' },
  ];

  keyLabels.forEach((key, index) => {
    const keyElement = document.createElement("div");
    keyElement.classList.add("key");
    keys.push(keyElement);

    if (typeof key === "string") {
      keyElement.textContent = key;
    } else {
      keyElement.classList.add(key.type + "-button");
      keyElement.innerHTML = key.label;
    }

    keyElement.addEventListener("click", () => {
      handleKeyClick(key);
    });

    keyboardContainer.appendChild(keyElement);
  });

  function updateSelection() {
    keys.forEach((key, index) => {
      key.classList.toggle("selected", index === selectedIndex);
    });
  }

  function handleKeyClick(key) {
    if (key.type === "backspace") {
      inputField.value = inputField.value.slice(0, -1);
    } else if (key.type === "send") {
      inputField.value = inputField.value.trim(); // remove espaços

      if (modalSelector === "#inputInstagramModal") {
        $(modalSelector).modal("hide"); // fecha a última modal (JQUERY)
        document.querySelector("form").submit(); // Envia o formulário
      } else {
        $(modalSelector).modal("hide");
        if (nextModalSelector) {
          $(nextModalSelector).modal("show");
        }
      }
    } else {
      inputField.value += key;
    }
    updateSelection();
  }

  function handleKeydown(event) {
    if (!$(modalSelector).hasClass("show")) {
      return;
    }

    const cols = 10;

    switch (event.key) {
      case "ArrowRight":
        selectedIndex = (selectedIndex + 1) % keys.length;
        break;
      case "ArrowLeft":
        selectedIndex = (selectedIndex - 1 + keys.length) % keys.length;
        break;
      case "ArrowDown":
        selectedIndex = (selectedIndex + cols) % keys.length;
        break;
      case "ArrowUp":
        selectedIndex = (selectedIndex - cols + keys.length) % keys.length;
        break;
      case "Enter":
        handleKeyClick(keyLabels[selectedIndex]);
        return;
      default:
        return;
    }

    event.preventDefault(); // evita algumas definições do navegador, como a exibição de inputs anteriores
    updateSelection();
  }

  // deixa o teclado em foco, para cada modal
  $(modalSelector).on("shown.bs.modal", function () {
    document.addEventListener("keydown", handleKeydown);
    inputField.focus();
    updateSelection();
  });

  $(modalSelector).on("hidden.bs.modal", function () {
    document.removeEventListener("keydown", handleKeydown);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createKeyboard("#inputNomeModal", "#inputNomeField", "#inputFoneModal");
  createKeyboard("#inputFoneModal", "#inputFoneField", "#inputInstagramModal");
  createKeyboard("#inputInstagramModal", "#inputInstagramField", null);
});
