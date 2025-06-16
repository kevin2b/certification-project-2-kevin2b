const helpInfo = document.querySelector("#help-info");
const helpButton = document.querySelector("#help-button");
const helpClose = document.querySelector("#help-close");
const INVISIBLE_CLASS = "js-invisible";

helpButton.addEventListener("click", () => {
  helpInfo.classList.toggle(INVISIBLE_CLASS);
});

helpClose.addEventListener("click", () => {
  closeHelp();
});

helpClose.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    closeHelp();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeHelp();
  }
});

function closeHelp() {
  helpInfo.classList.add(INVISIBLE_CLASS);
}
