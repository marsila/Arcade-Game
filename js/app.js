//choose the player character

const playersCards = document.querySelectorAll(".card");
const start = document.querySelector(".start-game");
let playerChar;
let allGem = [];


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
  document.querySelector(".score-panel").style.display = "block";
  allEnemies = [];
  allGem = [];
  player = null;
  player = new Player(playerChar, 205, 446);
  genrateEnemies();
  genrateGems();
  document.body.appendChild(canvas);


}
// Enemies our player must avoid
let allEnemies = [];
//Enemy Class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
  }
  update(dt) {
    let speed = 3 * dt;
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
      setTimeout(() => {
        light.x = -200;
        light.y = -200;
        player.x = 205;
        player.y = 445;
      }, 500);
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
  update() {}

};
//heart class
/*
 *** When the  player collect a gem,
 *** a heart will appaear and the player will got an extra chance.
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

  // TODO: **Choose a character///Done! .
  ////     **Add Score.
  ////     **Win the Game.
  /////    **Game Over.
  ///////////

});