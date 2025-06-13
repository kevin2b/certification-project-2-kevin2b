const helpInfo = document.querySelector("#help-info");
const helpButton = document.querySelector("#help-button");
const helpClose = document.querySelector("#help-close");

helpButton.addEventListener("click", ()=>{
  helpInfo.classList.toggle("js-hidden");
});

helpClose.addEventListener("click", ()=>{
  closeHelp();
});

helpClose.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    closeHelp();
  }
});

window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeHelp();
  }
});

function closeHelp(){
  helpInfo.classList.add("js-hidden");
}