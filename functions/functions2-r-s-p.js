
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();



document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    playGame('rock');
  } else if (e.key === "p") {
    playGame('paper');
  } else if (e.key === "s") {
    playGame('scissors');
  }
  });
  /*
  Add an event listener
  if the user presses the key r => play rock
  if the user presses the key p => play paper
  if the user presses the key s => play scissors
  */
let autoclick = false;
function autoClick() {
  if (autoclick == false) {
    autoplay(autoclick)
    autoclick = true
  }
  else {
    autoplay(autoclick)
    autoclick = false
  }
}
function autoplay(auto) {
  if (auto == false) {
    playGame(pickComputerMove());
    setTimeout(autoplay(false), 1000)
    
  }
  else {
    clearTimeout(autoplay)
    auto=false
  }
}
let autoClick = false;
let autoPlayInterval; // variable pour stocker l'intervalle

function autoClickToggle() {
  if (!autoClick) {
    autoClick = true;
    autoplay();
  } else {
    autoClick = false;
    clearInterval(autoPlayInterval);
  }
}

function autoplay() {
  autoPlayInterval = setInterval(() => {
    playGame(pickComputerMove());
  }, 1000); 
}

function playGame(playerMove) {
  let result = '';
  const computerMove = pickComputerMove();
  if (playerMove == 'rock' ) {
        if (computerMove == 'scissors' ) {
          result = 'win';
          score.wins ++;
        }
        else if (computerMove == 'paper' ) {
          result = 'lose';
          score.losses ++;
        }
    
  }
  else if (playerMove == 'scissors' ) {
        if (computerMove == 'rock' ) {
          result = 'lose';
           score.losses ++;
    }
        else if (computerMove == 'paper' ) {
          result = 'win';
          score.wins ++;
    }
  }
  else if (playerMove == 'paper' ) {
        if (computerMove == 'rock' ) {
          result = 'win';
           score.losses ++;
    }
        else if (computerMove == 'scissors' ) {
          result = 'lose';
          score.wins ++;
    }
  }
   else if (playerMove === computerMove ) {
         result = 'equal';
        score.ties ++;
    }
  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = `you ${result}`;
  document.querySelector('.js-moves').innerHTML = `you : <img src="images/${playerMove}-emoji.png" class="move-icon">,computer : <img src="images/${computerMove}-emoji.png" class="move-icon">
  `;
  

  // calculate result
  // update the score and store it using localStorage.setItem
  // show the new score and the updated images using "document.querySelector"

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}