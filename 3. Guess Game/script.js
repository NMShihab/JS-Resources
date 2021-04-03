"use strict";
// const targetNumber = Math.floor(Math.random() * 20 + 1);
let targetNumber = Math.trunc(Math.random() * 20 + 1);
console.log(targetNumber);
let score = 20;
let highScore = 0;

// Check My guess
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "😒 No Number Guess Yet!";
  }

  if (guess < targetNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "😑 Too low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "😭 you lost!";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".number").textContent = targetNumber;
      document.querySelector("body").style.backgroundColor = "red";
    }
  } else if (guess > targetNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "😑 Too High!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "😭 you lost!";
      document.querySelector(".score").textContent = 0;
      document.querySelector(".number").textContent = targetNumber;
      document.querySelector("body").style.backgroundColor = "red";
    }
  } else {
    document.querySelector(".message").textContent = "😎 You Found it!";
    document.querySelector(".score").textContent = score;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }

    document.querySelector(".number").textContent = targetNumber;
    document.querySelector(".number").style.width = "25rem";
    document.querySelector("body").style.backgroundColor = "#60b347";
  }
});

// Reset the game

document.querySelector(".again").addEventListener("click", function () {
  targetNumber = Math.trunc(Math.random() * 20 + 1);
  score = 20;
  document.querySelector(".message").textContent = "Start guessing....";
  document.querySelector(".score").textContent = score;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = " ";
});
