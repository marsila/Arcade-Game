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
    let speed = 30 * dt;
    this.x += speed;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
const enemy1 = new Enemy(0, 55);
const enemy2 = new Enemy(315, 85);
const enemy3 = new Enemy(400, 130);
const enemy4 = new Enemy(100, 175);
allEnemies = [enemy1, enemy2, enemy3, enemy4];

// player class
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
  }
  update() {}
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(keyPress) {
    switch (keyPress) {
      case 'left':
        (this.x <= -25) ? this.x = -25: this.x -= 25;
        this.render();
        break;
      case 'right':
        (this.x >= 420) ? this.x = 420: this.x += 25;
        this.render();
        break;
      case 'up':
        (this.y <= -5) ? this.y = -5: this.y -= 50;
        this.render();
        break;
      case 'down':
        (this.y >= 445) ? this.y = 445: this.y += 50;
        this.render();
        break;
    }
  }
}
const player = new Player(205, 445);

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
});