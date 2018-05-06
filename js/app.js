// Enemies our player must avoid
let allEnemies = [];
// the player character
const playersCards = document.querySelectorAll(".card");
const start = document.querySelector(".start-game");
const scorePanel = document.querySelector(".score-panel");
const playAgainButton = document.querySelector(".play-again");
const finishGame = document.querySelector(".finish-game");
const wonStars = document.querySelector(".stars-result");
const canv = document.querySelector(".canvas");
let playerChar;
let allGem = [];
const hearts = document.querySelector(".hearts");
const stars = document.querySelector(".stars");
let heartsCount = 0;
let starsCount = 3;
/*Scores :In the beginning of the game the player has 3 golden stars,
///and he gots a red heart every time he collect a Gem.
///if th bug hits the player , the player loses a heart first,
///if he gots  no hearts  he loses a star.
 //The game over when the player loses all the 3 stars he had.  */
function loseStar() {
  if (starsCount > 0) {
    stars.children[starsCount - 1].style.color = "#888788";
  }
  starsCount--;
  if (starsCount == 0 && heartsCount == 0) {
    gameOver();
  }
}

function gameOver() {
  ctx.fillStyle = "#341f84";
  ctx.font = "700 50px Coda";
  playAgainButton.style.display = "block";
  allEnemies = [];
  allGem = [];

}


function winHeart() {
  for (var i = 0; i < heartsCount; i++) {
    hearts.children[i].style.color = "red";
  }
}

function loseHeart() {
  hearts.children[heartsCount - 1].style.color = "#888788";
  heartsCount--;
}

for (let i = 0; i < playersCards.length; i++) {
  playersCards[i].addEventListener("click", function(e) {
    playersCards[0].className = "card";
    if (playerChar != playersCards[i].id) {
      if (playerChar != undefined) {
        document.getElementById(playerChar).className = "card";
      }
      playersCards[i].classList.add("choose");
      playerChar = playersCards[i].id;
    }
  });
}



//start the game
function startGame() {
  start.style.display = "none";
  scorePanel.style.display = "block";
  allEnemies = [];
  allGem = [];
  player = null;
  player = new Player(playerChar, 205, 446);
  genrateEnemies();
  genrateGems();
  canv.style.display = "block";
  canv.appendChild(canvas);
}


function setWonStars() {
  if (starsCount < 3) {
    console.log(`starsCount1 =${starsCount}`);
    if (heartsCount == 3)
      starsCount++;
  }
  console.log(`starsCount2 =${starsCount}`);
  for (var i = 0; i < starsCount; i++) {
    console.log(`i = ${i} \n stars = wonStars.children[${i}]`);
    wonStars.children[i].className = "won-stars";
    wonStars.children[i].style.color = "gold";
  }
}

function winTheGame() {
  canv.style.display = "none";
  scorePanel.style.display = "none";
  finishGame.style.display = "block";
  console.log(`i'm here in the winThe Game and stars count = ${starsCount}`);
  setWonStars();

}

function onKeyDown(event) {
  event.preventDefault();
}

function playAgain() {
  finishGame.style.display = "none";
  start.style.display = "block";
  canv.removeChild(canvas);
  onKeyDown(event);

  starsCount = 3;
  if (heartsCount > 0) {
    for (var i = 0; i < heartsCount; i++) {
      hearts.children[i].style.color = "#888788";
    }
    heartsCount = 0;
  }
  for (var i = 0; i < starsCount; i++) {
    stars.children[i].style.color = "gold";
  }
  for (var i = 0; i < 3; i++) {
    wonStars.children[i].classList.remove("won-stars");
    wonStars.children[i].style.color = "#888788";
  }
}

function resetGame() {
  start.style.display = "block";
  scorePanel.style.display = "none";
  playAgainButton.style.display = "none";
  onKeyDown(event);
  canv.removeChild(canvas);
  starsCount = 3;
  for (var i = 0; i < starsCount; i++) {
    stars.children[i].style.color = "gold";
  }

}

//Enemy Class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    let speed = 20 * dt;
    this.x += speed;
    if (this.x >= 500) {
      this.x = 0;
    }
    let y1 = player.y;
    let y2 = player.y + 60;
    let ey1 = this.y;
    let ey2 = this.y + 66;
    let x1 = player.x;
    let x2 = player.x + 67;
    let ex1 = this.x;
    let ex2 = this.x + 80;
    if (x1 < ex2 && x2 > ex1 &&
      y1 < ey2 && y2 > ey1) {
      light.x = player.x;
      light.y = player.y;
      this.x = x1 - 101;
      setTimeout(() => {
        light.x = -200;
        light.y = -200;
        player.x = 205;
        player.y = 445;
      }, 300);
      if (heartsCount > 0) {
        loseHeart();
        console.log(`heart = ${heartsCount}`);
      } else {
        if (starsCount == 0 && heartsCount == 0) {
          gameOver();
        }
        loseStar();
        console.log(`stars=${starsCount}`);

      }
    }

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

function genrateEnemies() {
  const enemy1 = new Enemy(0, 60);
  const enemy2 = new Enemy(200, 100);
  const enemy3 = new Enemy(400, 170);
  const enemy4 = new Enemy(100, 230);
  allEnemies = [enemy1, enemy2, enemy3, enemy4];
}

//light class
/*
 *** When the collision happens between the enemy and the player,
 *** a light will appear and the player will go back to start point.
 *******
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
};

//heart class
/*
 *** When the  player collect a gem,
 *** a red heart will appaear and the player will got an extra chance.
 *******
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
  update() {}

};
//Gem class
/*
 **** Gems to be collected by the player.
 ****
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
    let speed = 400 * dt;
    setTimeout(() => {
      this.y += speed;
    }, Math.random() * 8000);
    let y1 = player.y;
    let y2 = player.y + 60;
    let gy1 = this.y;
    let gy2 = this.y + 81;
    let x1 = player.x;
    let x2 = player.x + 67;
    let gx1 = this.x;
    let gx2 = this.x + 85;
    if (x1 < gx2 && x2 > gx1 &&
      y1 < gy2 && y2 > gy1) {
      heart.x = player.x;
      heart.y = player.y - 20;
      this.x = -500;
      this.y = -200;
      setTimeout(() => {
        heart.x = -200;
        heart.y = -200;
      }, 600);
      heartsCount++;
      winHeart();

    }

  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

function genrateGems() {
  const gemBlue = new Gem('blue', Math.floor(Math.random() * 450), -200);
  const gemGreen = new Gem('green', Math.floor(Math.random() * 450), -2900);
  const gemOrange = new Gem('orange', Math.floor(Math.random() * 450), -6000);
  allGem = [gemBlue, gemGreen, gemOrange];
}


// player class
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
      allEnemies = [];
      allGem = [];
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
//const playerImage = document.querySelector(".choose").id;

let player = new Player(playerChar, 205, 445);


const light = new Light(-200, -200);
const heart = new Heart(-200, -200);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);





  // TODO:
  ////     .
  ////     // OPTIMIZE: Javascript code
  /////
  ///////////

});