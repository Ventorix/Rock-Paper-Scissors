import './index.html';
import './index.scss';
import languages from './modules/languages';

const gameItem = document.querySelectorAll('.game-choice__item');
const opponentChoice = document.querySelector('.opponent-img');
const playerChoice = document.querySelector('.player-img');
const language = document.querySelectorAll('.language');
const gameText = document.querySelector('.game-notification');
const roundCounter = document.querySelector('.header-round');
const scoreValues = document.querySelector('.score-points__values');
const replayButton = document.querySelector('.modal-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const finalResult = document.querySelector('.modal-result');
const clickSound = document.querySelector('.click-sound');
const buttons = document.querySelectorAll('button');
const startButton = document.querySelector('.start-button');
const startModal = document.querySelector('.start-modal');
const eng = document.querySelector('.english');
const rus = document.querySelector('.russian');

const rock = 'url(assets/rock.png)';
const paper = 'url(assets/paper.png)';
const scissors = 'url(assets/scissors.png)';

let roundCount = 0;

let playerScore = 0;
let opponentScore = 0;

let playerValue = 0;
let opponentValue = 0;

let activeLanguage;

function playClickSound() {
  clickSound.play();
}

const setTexts = () => {
  const lang = localStorage.getItem('lang') || 'en';
  if (lang === 'en') {
    activeLanguage = eng;
    eng.classList.add('active-language');
  }
  if (lang === 'ru') {
    activeLanguage = rus;
    rus.classList.add('active-language');
  }

  const content = languages[lang];

  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll(`[data-text="${key}"]`);
    items.forEach((item) => (item.innerText = value));
  });

  return activeLanguage;
};

const toggleLanguage = ({ target }) => {
  const { lang } = target.dataset;

  if (!lang) return;

  localStorage.setItem('lang', lang);
  setTexts();
};

const makeActive = (e) => {
  activeLanguage = e.target;

  e.target.classList.add('active-language');
  if (e.target === rus) {
    eng.classList.remove('active-language');
  }
  if (e.target === eng) {
    rus.classList.remove('active-language');
  }
  return activeLanguage;
};

function roundCountPlus() {
  roundCount++;
  if (activeLanguage === rus) {
    roundCounter.innerText = `Раунд: ${roundCount}`;
  } else {
    roundCounter.innerText = `Round: ${roundCount}`;
  }
  return roundCount;
}

function scoreValueUpdate() {
  scoreValues.innerText = `${playerScore}|${opponentScore}`;
}

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  if (randomNumber === 1) {
    opponentChoice.style.backgroundImage = rock;
    opponentValue = 1;
  }
  if (randomNumber === 2) {
    opponentChoice.style.backgroundImage = paper;
    opponentValue = 2;
  }
  if (randomNumber === 3) {
    opponentChoice.style.backgroundImage = scissors;
    opponentValue = 3;
  }

  return opponentValue;
}

function getPlayerChoice(e) {
  if (e.target === document.querySelector('.rock')) {
    playerChoice.style.backgroundImage = rock;
    playerValue = 1;
  }
  if (e.target === document.querySelector('.paper')) {
    playerChoice.style.backgroundImage = paper;
    playerValue = 2;
  }
  if (e.target === document.querySelector('.scissors')) {
    playerChoice.style.backgroundImage = scissors;
    playerValue = 3;
  }
  playClickSound();
  return playerValue;
}

function comparisonValues() {
  if (playerValue === opponentValue) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ничья!';
    } else gameText.innerText = 'It`s a draw!';
  }
  if (playerValue === 1 && opponentValue === 2) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты проиграл этот раунд. Бумага бьет Камень';
    } else gameText.innerText = 'You lost this round. Paper beats Rock';

    ++opponentScore;
  }
  if (playerValue === 2 && opponentValue === 1) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты выйграл в этом раунде. Бумага бьет Камень';
    } else gameText.innerText = 'You win this round. Paper beats Rock';

    ++playerScore;
  }
  if (playerValue === 2 && opponentValue === 3) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты проиграл этот раунд. Ножницы бьют Бумагу';
    } else gameText.innerText = 'You lost this round. Scissors beats Paper';

    ++opponentScore;
  }
  if (playerValue === 3 && opponentValue === 2) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты выйграл в этом раунде. Ножницы бьют Бумагу';
    } else gameText.innerText = 'You win this round. Scissors beats Paper';
    ++playerScore;
  }
  if (playerValue === 3 && opponentValue === 1) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты проиграл этот раунд. Камень бьет Ножницы';
    } else gameText.innerText = 'You lost this round. Rock beats Scissors';
    ++opponentScore;
  }
  if (playerValue === 1 && opponentValue === 3) {
    if (activeLanguage === rus) {
      gameText.innerText = 'Ты выйграл в этом раунде. Камень бьет Ножницы';
    } else gameText.innerText = 'You win this round. Rock beats Scissors';
    ++playerScore;
  }
}

const showModal = () => {
  modal.classList.add('opened');
  overlay.classList.add('opened');
};

const hideModal = () => {
  modal.classList.remove('opened');
  startModal.classList.remove('opened');
  overlay.classList.remove('opened');
};

const detectWinner = () => {
  if (playerScore === 5) {
    if (activeLanguage === rus) {
      finalResult.innerText = 'Победа. Неплохо сыграно';
      replayButton.innerText = 'Еще разок?';
    } else {
      finalResult.innerText = 'You win. Well played';
      replayButton.innerText = 'Play Again?';
    }
    showModal();
  }

  if (opponentScore === 5) {
    if (activeLanguage === rus) {
      finalResult.innerText = 'Ты проиграл. Попробуй снова';
      replayButton.innerText = 'Еще раз?';
    } else {
      finalResult.innerText = 'You lost. Try again';
      replayButton.innerText = 'Another try?';
    }

    showModal();
  }
};

const playGameRound = (e) => {
  getPlayerChoice(e);
  getComputerChoice();
  comparisonValues();
  roundCountPlus();
  scoreValueUpdate();
  detectWinner();
};

function replayGame() {
  playerScore = 0;
  opponentScore = 0;
  roundCount = 0;
  scoreValues.innerText = `${playerScore}|${opponentScore}`;
  if (activeLanguage === rus) {
    roundCounter.innerText = `Раунд: ${roundCount}`;
    gameText.innerText = 'Выбирай';
  } else {
    roundCounter.innerText = `Round: ${roundCount}`;
    gameText.innerText = 'Make a choice';
  }

  playerChoice.style.backgroundImage = rock;
  opponentChoice.style.backgroundImage = rock;
  playClickSound();
  hideModal();
}

function removeAnimation(e) {
  // Remove animation classes

  if (e.target.classList.contains('item-animate')) {
    e.target.classList.remove('item-animate');
  }

  if (playerChoice.classList.contains('player-animate')) {
    playerChoice.classList.remove('player-animate');
  }

  if (opponentChoice.classList.contains('opponent-animate')) {
    opponentChoice.classList.remove('opponent-animate');
  }
}

setTexts();
rus.addEventListener('click', makeActive);
eng.addEventListener('click', makeActive);
startButton.addEventListener('click', hideModal);
replayButton.addEventListener('click', replayGame);
language.forEach((lang) => lang.addEventListener('click', toggleLanguage));

buttons.forEach((element) => element.addEventListener('click', playClickSound));

gameItem.forEach((element) => {
  element.addEventListener('click', playGameRound);

  element.addEventListener('click', () => playerChoice.classList.add('player-animate'));
  element.addEventListener('animationend', () => removeAnimation());

  element.addEventListener('click', () => opponentChoice.classList.add('opponent-animate'));
  element.addEventListener('animationend', () => removeAnimation());

  element.addEventListener('click', (e) => e.target.classList.add('item-animate'));
  element.addEventListener('animationend', (e) => removeAnimation(e));
});

/* element.addEventListener('click', (e) => {
    animate(e, {
      duration: 1000,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        console.log(progress);
        e.target.style.transform = `scaleX(${progress * -1})`;
      },
    });
  }); */

/* function animate(e, { timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
} */
