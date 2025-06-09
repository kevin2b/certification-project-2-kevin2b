const helpInfo = document.querySelector("#help-info");
const helpButton = document.querySelector("#help-button");
const helpClose = document.querySelector("#help-close");

helpButton.addEventListener("click", ()=>{
  helpInfo.classList.toggle("js-hidden");
});

helpClose.addEventListener("click", ()=>{
  helpInfo.classList.add("js-hidden");
});