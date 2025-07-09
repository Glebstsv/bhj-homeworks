document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementById("editor");
  const clearButton = document.createElement("button");

  const savedText = localStorage.getItem("editorText");
  if (savedText) {
    editor.value = savedText;
  }

  editor.addEventListener("input", function () {
    localStorage.setItem("editorText", editor.value);
  });

  clearButton.textContent = "Очистить содержимое";
  clearButton.style.marginTop = "10px";
  clearButton.addEventListener("click", function () {
    editor.value = "";
    localStorage.setItem("editorText", "");
  });

  editor.insertAdjacentElement("afterend", clearButton);
});
