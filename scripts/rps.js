 export class RPS {
  static TOTAL_ROUNDS = 3;
  #game = 1;
  #round = 1;
  #playerGameScore = 0;
  #CPUGameScore = 0;
  #playerRoundScore = 0;
  #CPURoundScore = 0;
  #message = "Choose wisely";
  #metaMessage = `Game:${this.#game} Round:${this.#round}`;
  
  /**
   * Play a rock, paper, scissor round. Game message for current round is stored in #message. If current round is same as TOTAL_ROUNDS,
   * a new game begins and the previous game score is recorded accordingly based on the results of rounds of that game (+1 for overall 
   * win, +0.5 for both player and CPU for draw)
   * @param {Number} playerChoiceNum Integer 0, 1, or 2 representing Rock, Paper or Scissor respectively. Rock is used if invalid input.
   * @param {Number} CPUChoiceNum Integer 0, 1, or 2 representing Rock, Paper or Scissor respectively. Rock is used if invalid input.
   */
  playRound(playerChoiceNum, CPUChoiceNum){
    
    const playerChoice = this.convertChoice(playerChoiceNum);
    const CPUChoice = this.convertChoice(CPUChoiceNum);

    if (this.#round > RPS.TOTAL_ROUNDS){
      this.newGame();
    }

    if (playerChoice === CPUChoice){
      this.#playerRoundScore += 0.5;
      this.#CPURoundScore += 0.5;
      this.#setMessage(`${playerChoice} ties with ${CPUChoice}.`);
    }
    else if (playerChoice === "Rock" && CPUChoice === "Scissor" || playerChoice === "Paper" && CPUChoice === "Rock" ||
      playerChoice === "Scissor" && CPUChoice === "Paper"){
        this.#playerRoundScore += 1;
        this.#setMessage(`${playerChoice} beats ${CPUChoice}.`);
    }
    else{
      this.#CPURoundScore += 1;
      this.#setMessage(`${playerChoice} loses to ${CPUChoice}.`);
    }  
    this.#appendMessage(` ${this.#playerRoundScore}:${this.#CPURoundScore}`);
    this.#metaMessage = `Game:${this.#game} Round:${this.#round}`;

    if (this.#round === RPS.TOTAL_ROUNDS){
      this.#updateGameResult();
    }
    this.#round++;
  }

  reset(){
    this.#game = 1;
    this.#round = 1;
    this.#playerGameScore = 0;
    this.#CPUGameScore = 0;
    this.#playerRoundScore = 0;
    this.#CPURoundScore = 0;
    this.#message = "Choose wisely";
    this.#metaMessage = `Game: ${this.#game}. Round: ${this.#round}`;
  }

  /**
   * Generate randomly 0, 1, or 2
   * @returns Random integer from 0 to 2 inclusive
   */
  generateCPUChoice(){
    return Math.floor(Math.random() * 3);
  }

  /**
   * Convert integer 0, 1, or 2 to Rock, Paper or Scissor respectively. Rock is used if invalid input.
   * @param {Number} choiceNum Integer 0, 1, or 2 representing Rock, Paper or Scissor respectively
   * @returns String representation of choice
   */
  convertChoice(choiceNum){
    const DICTIONARY = {0: "Rock", 1: "Paper", 2: "Scissor"};
    return DICTIONARY?.[choiceNum] || "Rock";;
  }

  getMessages(){
    return(
      {
        message: this.#message,
        metaMessage: this.#metaMessage
      }
    );
  }

  getGameScores(){
    return(
      {
        playerGameScore: this.#playerGameScore,
        CPUGameScore: this.#CPUGameScore
      }
    )
  }

  /**
   * Return true if current game is over.
   * @returns true if current game is over
   */
  isGameOver(){
    return this.#round > RPS.TOTAL_ROUNDS;
  }


  newGame(){
    const saveGame = this.#game + 1;
    const saveCPUGameScore = this.#CPUGameScore;
    const saveplayerGameScore = this.#playerGameScore;
    this.reset();
    this.#game = saveGame;
    this.#CPUGameScore = saveCPUGameScore;
    this.#playerGameScore = saveplayerGameScore;
    this.#metaMessage = `Game: ${this.#game}. Round: ${this.#round}`;
  }

  /**
   * Update game result based on overall round score. +1 for win, +0.5 for draw.
   */
  #updateGameResult() {
    this.#metaMessage = `Game:${this.#game}`;
    if (this.#playerRoundScore > this.#CPURoundScore) {
      this.#playerGameScore++;
      this.#metaMessage += ` You Win! ${this.#playerRoundScore}:${this.#CPURoundScore}`;
    }
    else if (this.#CPURoundScore > this.#playerRoundScore) {
      this.#CPUGameScore++;
      this.#metaMessage += ` You Lose! ${this.#playerRoundScore}:${this.#CPURoundScore}`;
    }
    else {
      this.#playerGameScore += 0.5;
      this.#CPUGameScore += 0.5;
      this.#metaMessage += ` Game Draw! ${this.#playerRoundScore}:${this.#CPURoundScore}`
    }
  }

  #setMessage(message){
    this.#message = message;
  }

  #appendMessage(message){
    this.#message += message;
  }

}