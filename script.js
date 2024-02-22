'use strict';

// Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');

const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnMode = document.querySelector('.btn--mode');

const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let mode = false;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  if (!player0EL.classList.contains('player--active')) {
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
  }
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  // Generate a random roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display Dice
  diceEl.classList.remove('hidden');
  console.log(dice);
  diceEl.src = `dice-${dice}.png`;

  // Check if rolled 1
  if (dice != 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //current0el.textContent = currentScore;
  } else {
    if (mode) {
      score[activePlayer] = 0;
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
    //score[activePlayer] = 0;
    //document.getElementById(`score--${activePlayer}`).textContent = 0;
    else switchPlayer();
  }
});

// Hold Score
btnHold.addEventListener('click', function () {
  // Add Score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  //Game Win
  if (score[activePlayer] >= 100) {
    document
      .getElementById(`current--${activePlayer}`)
      .classList.add('player--winner');
    document
      .getElementById(`current--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});

// New Game
btnNew.addEventListener('click', function () {
  newGame();
});

//Hard Mode
btnMode.addEventListener('click', function () {
  mode = mode == false ? true : false;
  newGame();
  document.querySelector('.hard').classList.add('hidden');
  document.querySelector('body').classList.add('hardMode');
  document.querySelector('.easy').classList.remove('hidden');
});

//Easy Mode
document.querySelector('.easy').addEventListener('click', function () {
  mode = mode == false ? true : false;
  newGame();
  document.querySelector('.hard').classList.remove('hidden');
  document.querySelector('.easy').classList.add('hidden');
  document.querySelector('body').classList.remove('hardMode');
});
