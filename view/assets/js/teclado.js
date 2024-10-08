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
        handleEnter();
        break;
      default:
        return; // Exit if it's not an arrow key or Enter
    }

    event.preventDefault(); // Prevent default browser actions
    updateSelection();
  }

  function handleEnter() {
    const selectedKey = keys[selectedIndex];

    if (selectedKey.classList.contains("backspace-button")) {
      inputField.value = inputField.value.slice(0, -1);
    } else if (selectedKey.classList.contains("send-button")) {
      $(modalSelector).modal("hide");
      if (nextModalSelector) {
        $(nextModalSelector).modal("show");
      } else {
        // Submit the form if there is no next modal
        document.querySelector("form").submit();
      }
    } else {
      inputField.value += selectedKey.textContent.trim();
    }
  }

  keys.forEach((key, index) => {
    key.addEventListener("click", () => {
      selectedIndex = index;
      if (key.classList.contains("backspace-button")) {
        inputField.value = inputField.value.slice(0, -1);
      } else if (key.classList.contains("send-button")) {
        $(modalSelector).modal("hide");
        if (nextModalSelector) {
          $(nextModalSelector).modal("show");
        } else {
          document.querySelector("form").submit();
        }
      } else {
        inputField.value += key.textContent.trim();
      }
      updateSelection();
    });
  });

  // Attach keydown listener to document when modal is shown
  $(modalSelector).on("shown.bs.modal", function () {
    document.addEventListener("keydown", handleKeydown);
    inputField.focus();
    updateSelection();
  });

  // Remove keydown listener from document when modal is hidden
  $(modalSelector).on("hidden.bs.modal", function () {
    document.removeEventListener("keydown", handleKeydown);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeKeyboard("#inputNomeModal", "#inputNomeField", "#inputFoneModal");
  initializeKeyboard(
    "#inputFoneModal",
    "#inputFoneField",
    "#inputInstagramModal",
  );
  initializeKeyboard("#inputInstagramModal", "#inputInstagramField", null);
});
