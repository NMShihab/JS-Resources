"use strict";

// Select elements
const scorePlayer0 = document.getElementById("score--0");
const scorePlayer1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");
const playerSection0 = document.querySelector(".player--0");
const playerSection1 = document.querySelector(".player--1");
const player = document.querySelector(".player");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// scorePlayer0.textContent = 0;
// scorePlayer1.textContent = 0;
let currentScore;
let totalScore;
let activePlayer;
let isPlaying;

const reset = () => {
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  // hide dice
  diceEl.classList.add("hidden");
  isPlaying = true;
  activePlayer = 0;
  currentScore = 0;
  totalScore = [0, 0];
  document.querySelector(".player--1").classList.remove("player--active");
  playerSection0.classList.remove("player--winner");
  playerSection1.classList.remove("player--winner");
};

// initialize game first
reset();

function togglePlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle("player--active");
}

function setCurrentScore() {
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
}

function switchPlayer() {
  // Make current player score 0
  currentScore = 0;
  setCurrentScore();
  // Make active player in active
  togglePlayer();
  // Change the player
  activePlayer = activePlayer == 0 ? 1 : 0;
  // Make inactive player active
  togglePlayer();
}

// Dice funtionality
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // Create random dice number
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // Show the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceNum}.png`;

    /*
  if (diceNum !== 1) {
    // Add current score
    currenScore += diceNum;
    // Set current Score for active player
    playerSection0.classList.contains("player--active")
      ? (currentScore0.textContent = currentScore)
      : (currentScore1.textContent = currentScore);

    console.log(diceNum);
  } else {
    console.log(diceNum);
    // Set current score 0
    currenScore = 0;

    // Swich player
    if (playerSection0.classList.contains("player--active")) {
      currentScore0.textContent = currentScore;
      playerSection0.classList.remove("player--active");
      playerSection1.classList.add("player--active");
    } else {
      currentScore1.textContent = currentScore;
      playerSection1.classList.remove("player--active");
      playerSection0.classList.add("player--active");
    }
  } */

    if (diceNum !== 1) {
      // Add current score
      currentScore += diceNum;
      console.log(currentScore);

      // Show current Score
      setCurrentScore();
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    activePlayer == 0
      ? (scorePlayer0.textContent = totalScore[activePlayer])
      : (scorePlayer1.textContent = totalScore[activePlayer]);

    if (totalScore[activePlayer] >= 20) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    }

    switchPlayer();
  }
});

// Reset match
btnNew.addEventListener("click", reset);
