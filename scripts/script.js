import {RPS} from "./rps.js";

const rps = new RPS();
const playButton = document.querySelector("#play");
const metaInfo = document.querySelector("#meta-info");
const roundInfo = document.querySelector("#round-info");
const HIDDEN_CLASS = "js-hidden";
const playerOptions = document.querySelector("#player-options");
const CPUOption = document.querySelectorAll(".js-enemy-option");
const playerOption = document.querySelectorAll(".js-player-option");
const gameOverButtons = document.querySelector("#game-over");
const playAgainButton = document.querySelector("#play-again");
const resetButton = document.querySelector("#reset");


window.addEventListener("pageshow", () =>{
  togglePlayerButtons(false);
});

//Activate the game on play
playButton.addEventListener("click", ()=>{
  metaInfo.classList.remove(HIDDEN_CLASS);
  roundInfo.classList.remove(HIDDEN_CLASS);
  playButton.classList.add(HIDDEN_CLASS);
  synchronizeGameState();
  togglePlayerButtons(true);
});

//Handle player selection of rock, paper, scissor
playerOptions.addEventListener("click", (e) => {
  const playerChoice = e.target.closest("button");
  var playerChoiceNum = 0;

  //If what user clicked is not a button or disabled, do nothing
  if (playerChoice === null || playerChoice.disabled){
    return;
  }

  if (playerChoice.id === "player-rock"){
    playerChoiceNum = 0;
  }
  if (playerChoice.id === "player-paper"){
    playerChoiceNum = 1;
  }
  if (playerChoice.id === "player-scissor"){
    playerChoiceNum = 2;
  }

  const CPUChoiceNum = rps.generateCPUChoice();
  rps.playRound(playerChoiceNum, CPUChoiceNum);
  synchronizeGameState();
  outlineOptionChoices(playerChoiceNum, CPUChoiceNum);
  showSelectedChoices(playerChoiceNum, CPUChoiceNum);

  if (rps.isGameOver()){
    displayGameOverState();
  }
});

playAgainButton.addEventListener("click", () =>{
  metaInfo.classList.remove(HIDDEN_CLASS);
  roundInfo.classList.remove(HIDDEN_CLASS);
  gameOverButtons.classList.add(HIDDEN_CLASS);
  resetOptionChoices();
  resetSelectedChoices();
  rps.newGame();
  synchronizeGameState();
  togglePlayerButtons(true);
});

resetButton.addEventListener("click", () => {
  metaInfo.classList.add(HIDDEN_CLASS);
  roundInfo.classList.add(HIDDEN_CLASS);
  gameOverButtons.classList.add(HIDDEN_CLASS);
  playButton.classList.remove(HIDDEN_CLASS);
  resetOptionChoices();
  resetSelectedChoices();
  rps.reset();
  synchronizeGameState();
  togglePlayerButtons(false);
});


/**
 * Make the DOM state reflect current game state
 */
function synchronizeGameState() {
  const CPUGameScore = document.querySelector("#enemy-score");
  const playerGameScore = document.querySelector("#player-score");
  const messages = rps.getMessages();
  const gameScores = rps.getGameScores();
  CPUGameScore.textContent = gameScores.CPUGameScore;
  playerGameScore.textContent = gameScores.playerGameScore;
  metaInfo.textContent = messages.metaMessage;
  roundInfo.textContent = messages.message;
  return;
}

/**
 * Enable player choices in DOM if enable is true, disable if false
 * @param {boolean} enable enable player choice buttons if true, disable if false
 */
function togglePlayerButtons(enable){
  const playerButtons = document.querySelectorAll(".player__option");
  playerButtons.forEach((playerButton) => {
    playerButton.disabled = !enable;
  })
}

function outlineOptionChoices(playerChoiceNum, CPUChoiceNum){
  resetOptionChoices();
  CPUOption.forEach((selected, index) => {
    if (index === CPUChoiceNum){
      selected.classList.add("js-enemy-outline");
    }
  });
  playerOption.forEach((selected, index) => {
    if (index === playerChoiceNum){
      selected.classList.add("js-player-outline");
    }
  });
}

function resetOptionChoices(){
  CPUOption.forEach((selected) => {
    selected.classList.remove("js-enemy-outline");
  });
  playerOption.forEach((selected) => {
    selected.classList.remove("js-player-outline");
  });
}

function showSelectedChoices(playerChoiceNum, CPUChoiceNum){
  const enemySelected = document.querySelectorAll(".js-enemy-selected");
  const playerSelected = document.querySelectorAll(".js-player-selected");
  enemySelected.forEach((option, index) => {
    if (index === CPUChoiceNum) {
      option.classList.remove(HIDDEN_CLASS);
      void option.offsetWidth;
      option.classList.add("js-show");
    } else {
      option.classList.remove("js-show");
      option.classList.add(HIDDEN_CLASS);
    }
  });
  playerSelected.forEach((option, index) => {
    if (index === playerChoiceNum) {
      option.classList.remove(HIDDEN_CLASS);
      void option.offsetWidth;
      option.classList.add("js-show");
    } else {
      option.classList.remove("js-show");
      option.classList.add(HIDDEN_CLASS);
    }
  });
}

function resetSelectedChoices(){
  const enemySelected = document.querySelectorAll(".js-enemy-selected");
  const playerSelected = document.querySelectorAll(".js-player-selected");
  enemySelected.forEach((option, index) => {
    option.classList.remove("js-show");
    option.classList.add(HIDDEN_CLASS);
  });
  playerSelected.forEach((option, index) => {
    option.classList.remove("js-show");
    option.classList.add(HIDDEN_CLASS);
  });
}

function displayGameOverState(){
  roundInfo.classList.add(HIDDEN_CLASS);
  gameOverButtons.classList.remove(HIDDEN_CLASS);
  togglePlayerButtons(false);
}
