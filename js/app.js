const playersCards = document.querySelectorAll(".card"),
  startPage = document.querySelector(".start-game"),
  scorePanel = document.querySelector(".score-panel"),
  playAgainButton = document.querySelector(".play-again"),
  finishGame = document.querySelector(".finish-game"),
  wonStars = document.querySelector(".stars-result"),
  canv = document.querySelector(".canvas"),
  hearts = document.querySelector(".hearts"),
  stars = document.querySelector(".stars"),
  speed = 1.1;

let allEnemies = [],
  allGem = [],
  heartsCount = 0,
  starsCount = 3;
let playerChar = getDefaultPlayer();

function getDefaultPlayer() {
  playersCards[0].className = "card choose";
  return playersCards[0].id;
}

/*
  increase the number of red hearts every time a player collects a Gem.
*/
function winHeart() {
  heartsCount++;
  for (var i = 0; i < heartsCount; i++) {
    hearts.children[i].style.color = "red";
  }
}

/*
  Decrease the number of red hearts every time a player hits a bug.
*/
function loseHeart() {
  hearts.children[heartsCount - 1].style.color = "#888788";
  heartsCount--;
}

/*
  decrease the number of stars and end the game if there is no hearts or stars.
*/
function loseStar() {
  if (starsCount > 0) {
    stars.children[starsCount - 1].style.color = "#888788";
  }
  starsCount--;
  if (starsCount === 0 && heartsCount === 0) {
    gameOver();
  }
}

function gameOver() {
  ctx.fillStyle = "#341f84";
  ctx.font = "700 50px Coda";
  playAgainButton.classList.add('show');
  allEnemies = [];
  allGem = [];

}
//Choose player character on the start  page
for (let i = 0; i < playersCards.length; i++) {
  playersCards[i].addEventListener("click", function(e) {
    if (playerChar != playersCards[i].id) {
      document.getElementById(playerChar).className = "card";
      playersCards[i].classList.add("choose");
      playerChar = playersCards[i].id;
    }
  });
}

//Start the game
function startGame() {
  startPage.classList.remove('show');
  startPage.classList.add('hide');
  finishGame.classList.remove('show');
  finishGame.classList.add('hide');
  scorePanel.classList.add('show');
  resetCanvas();
  resetHearts();
  resetStars();
}

function resetCanvas() {
  player = new Player(playerChar, 205, 446);
  generateEnemies();
  generateGems();
  canv.classList.remove('hide');
  canv.classList.add('show');
  canv.appendChild(canvas);
}

function winTheGame() {
  hideCanvas();
  finishGame.classList.remove('hide');
  finishGame.classList.add('show');
  playAgainButton.classList.remove('show');
  setWonStars();
}

function setWonStars() {
  if (starsCount < 3) {
    if (heartsCount === 3)
      starsCount++;
  }
  for (var i = 0; i < starsCount; i++) {
    wonStars.children[i].className = "won-stars";
    wonStars.children[i].style.color = "gold";
  }
}

function playAgain() {
  finishGame.classList.remove('show');
  finishGame.classList.add('hide');
  startPage.classList.remove('hide');
  startPage.classList.add('show');
  playAgainButton.classList.remove('show');
  resetHearts();
  resetStars();
  resetWonStars();
}

function resetHearts() {
  if (heartsCount > 0) {
    for (var i = 0; i < heartsCount; i++) {
      hearts.children[i].style.color = "#888788";
    }
    heartsCount = 0;
  }
}

function resetStars() {
  starsCount = 3;
  for (var i = 0; i < starsCount; i++) {
    stars.children[i].style.color = "gold";
  }
}

function resetWonStars() {
  for (var i = 0; i < 3; i++) {
    wonStars.children[i].classList.remove("won-stars");
    wonStars.children[i].style.color = "#888788";
  }
}

function hideCanvas() {
  scorePanel.classList.remove('show');;
  canv.classList.remove('show');
  canv.classList.add('hide');
}

function resetGame() {
  startPage.classList.remove('hide');
  startPage.classList.add('show');
  playAgainButton.classList.remove('show');
  //canv.removeChild(canvas);
  hideCanvas();
  resetStars();
}
//Enemy
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    this.dt = speed;
    this.x += speed * this.dt;
    if (this.x >= 480) {
      this.x = 25;
    }
    this.checkCollisions();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  checkCollisions() {
    if (
      player.x <= (this.x + 40) &&
      this.x <= (player.x + 40) &&
      player.y <= (this.y + 40) &&
      this.y <= (player.y + 40)
    ) {
      light.x = player.x;
      light.y = player.y;
      this.x += 100;
      player.x = 205;
      player.y = 445;
      setTimeout(() => {
        light.x = -200;
        light.y = -200;
      }, 600);
      if (heartsCount > 0) {
        loseHeart();
      } else {
        if (starsCount === 0 && heartsCount === 0) {
          gameOver();
        }
        loseStar();
      }
    }
  }
}

class Player {
  constructor(char = 'char-boy', x, y) {
    switch (char) {
      case 'char-boy':
        this.sprite = 'images/char-boy.png';
        break;
      case 'char-cat-girl':
        this.sprite = 'images/char-cat-girl.png';
        break;
      case 'char-horn-girl':
        this.sprite = 'images/char-horn-girl.png';
        break;
      case 'char-pink-girl':
        this.sprite = 'images/char-pink-girl.png';
        break;
      case 'char-princess-girl':
        this.sprite = 'images/char-princess-girl.png';
        break;
    }
    this.x = x;
    this.y = y;
  }
  update() {
    if (this.y > -6 && this.y < 10) {
      this.y = -6;
      setTimeout(winTheGame(), 500);
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(keyPress) {
    switch (keyPress) {
      case 'left':
        (this.x <= -25) ? this.x = -25: this.x -= 25;
        break;
      case 'right':
        (this.x >= 420) ? this.x = 420: this.x += 25;
        break;
      case 'up':
        (this.y <= -5) ? this.y = -5: this.y -= 25;
        break;
      case 'down':
        (this.y >= 445) ? this.y = 445: this.y += 25;
        break;
    }
  }
}

/*
 Gems to be collected by the player.
  */
class Gem {
  constructor(color, x, y) {
    switch (color) {
      case 'blue':
        this.sprite = 'images/Gem-Blue.png';
        break;
      case 'green':
        this.sprite = 'images/Gem Green.png';
        break;
      case 'orange':
        this.sprite = 'images/Gem Orange.png';
        break;
    }
    this.x = x;
    this.y = y;
  }
  update(dt) {
    this.dt = 3.5 * speed;
    this.y += this.dt * speed;
    this.checkCollisions();
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  checkCollisions() {
    if (
      player.x <= (this.x + 40) &&
      this.x <= (player.x + 40) &&
      player.y <= (this.y + 40) &&
      this.y <= (player.y + 40)
    ) {
      heart.x = player.x;
      heart.y = player.y - 20;
      this.x = -500;
      this.y = -200;
      setTimeout(() => {
        heart.x = -200;
        heart.y = -200;
      }, 600);
      winHeart();

    }
  }
};

/*
  When the  player collect a gem,
  a red heart will appaear and the player will got an extra chance.
 */
class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
/*
 When the collision happens between the enemy and the player,
 light will appear and the player will go back to start point.
 */
class Light {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/light.png';
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
let player = new Player(playerChar, 205, 445);
let light = new Light(-200, -200);
let heart = new Heart(-200, -200);

function generateEnemies() {
  allEnemies[0] = new Enemy(0, 60);
  allEnemies[1] = new Enemy(200, 100);
  allEnemies[2] = new Enemy(400, 170);
  allEnemies[3] = new Enemy(100, 200);
  allEnemies[4] = new Enemy(300, 250);
}
//Gems player have to collect in order to win a new chance after being hit by a bug.
function generateGems() {
  const gemBlue = new Gem('blue', Math.floor(Math.random() * 450), -200);
  const gemGreen = new Gem('green', Math.floor(Math.random() * 450), -2000);
  const gemOrange = new Gem('orange', Math.floor(Math.random() * 450), -3000);
  allGem = [gemBlue, gemGreen, gemOrange];
}

// listen for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//listen for mouse clicks on play again buttons
document.getElementById('play-again').addEventListener('click', (e) => {
  playAgain();
});
document.getElementById('reset-game').addEventListener('click', (e) => {
  resetGame();
});