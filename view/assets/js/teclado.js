let inputNomeValue = "";
let inputFoneValue = "";

function initializeKeyboard(
  modalSelector,
  inputFieldSelector,
  nextModalSelector,
) {
  const modal = document.querySelector(modalSelector);
  const inputField = modal.querySelector(inputFieldSelector);
  const keys = modal.querySelectorAll(".key");
  let selectedIndex = 0;

  function updateSelection() {
    keys.forEach((key, index) => {
      key.classList.toggle("selected", index === selectedIndex);
    });
  }

  function handleKeydown(event) {
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
        handleEnter();
        break;
    }

    updateSelection();
  }

  function handleEnter() {
    const selectedKey = keys[selectedIndex];

    if (selectedKey.classList.contains("backspace-button")) {
      inputField.value = inputField.value.slice(0, -1);
    } else if (selectedKey.classList.contains("send-button")) {
      if (modalSelector === "#inputNomeModal") {
        inputNomeValue = inputField.value; 
      } else if (modalSelector === "#inputFoneModal") {
        inputFoneValue = inputField.value; 
      } else if (modalSelector === "#inputInstagramModal") {
        document.querySelector("form").submit(); 
      }
      $(modalSelector).modal("hide");
      if (nextModalSelector) {
        $(nextModalSelector).modal("show");
        setTimeout(() => {
          const nextInputField = document.querySelector(
            nextModalSelector + " input",
          );
          nextInputField.focus(); 
        }, 200);
      }
      console.log("Input submitted:", inputField.value);
    } else {
      inputField.value += selectedKey.textContent.trim();
    }

    inputField.blur();
  }

  document.addEventListener("keydown", (event) => {
    if ($(".modal.show").length) {
      handleKeydown(event);
    }
  });

  keys.forEach((key, index) => {
    key.addEventListener("click", () => {
      if (key.classList.contains("backspace-button")) {
        inputField.value = inputField.value.slice(0, -1);
      } else if (key.classList.contains("send-button")) {
        if (modalSelector === "#inputNomeModal") {
          inputNomeValue = inputField.value; 
        } else if (modalSelector === "#inputFoneModal") {
          inputFoneValue = inputField.value;
        }
        $(modalSelector).modal("hide");
        if (nextModalSelector) {
          $(nextModalSelector).modal("show");
          setTimeout(() => {
            const nextInputField = document.querySelector(
              nextModalSelector + " input",
            );
            nextInputField.focus(); 
          }, 200);
        }
        console.log("Valores enviados pelo form:", inputField.value);
      } else {
        inputField.value += key.textContent.trim();
      }

      selectedIndex = index;
      updateSelection();
    });
  });

  updateSelection();

  return function cleanup() {
    document.removeEventListener("keydown", handleKeydown);
  };
}

document.addEventListener("DOMContentLoaded", function () {
  let cleanupFunc;

  $("#inputNomeModal").on("shown.bs.modal", function () {
    if (cleanupFunc) cleanupFunc();
    cleanupFunc = initializeKeyboard(
      "#inputNomeModal",
      "#inputNomeField",
      "#inputFoneModal",
    );
  });

  $("#inputFoneModal").on("shown.bs.modal", function () {
    if (cleanupFunc) cleanupFunc();
    cleanupFunc = initializeKeyboard(
      "#inputFoneModal",
      "#inputFoneField",
      "#inputInstagramModal",
    );
  });

  $("#inputInstagramModal").on("shown.bs.modal", function () {
    if (cleanupFunc) cleanupFunc();
    cleanupFunc = initializeKeyboard(
      "#inputInstagramModal",
      "#inputInstagramField",
    );
    document.getElementById("inputNomeFieldHidden").value = inputNomeValue;
    document.getElementById("inputFoneFieldHidden").value = inputFoneValue;
  });
});
