const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

const sprites = [];
const assetsToLoad = [];
const missiles = [];
const aliens = [];
const messages = [];

const background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
background.sourceHeight = 320;
background.width = 480;
background.height = 320;
sprites.push(background);

const cannon = Object.create(spriteObject);
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = 280;
sprites.push(cannon);

const scoreDisplay = Object.create(messageObject);
scoreDisplay.font = 'normal bold 30px emulogic';
scoreDisplay.fillStyle = '#00FF00';
scoreDisplay.x = 400;
scoreDisplay.y = 10;
messages.push(scoreDisplay);

const gameOverMessage = Object.create(messageObject);
gameOverMessage.font = 'normal bold 20px emulogic';
gameOverMessage.fillStyle = '#00FF00';
gameOverMessage.x = 70;
gameOverMessage.y = 120;
gameOverMessage.visible = false;
messages.push(gameOverMessage);

const image = new Image();
image.addEventListener('load', loadHandler, false);
image.src = '../images/alienArmada.png';
assetsToLoad.push(image);

// Load sounds
const music = document.getElementById('music');
music.addEventListener('canplaythrough', loadHandler, false);
music.load();
assetsToLoad.push(music);

const shootSound = document.getElementById('shootSound');
shootSound.addEventListener('canplaythrough', loadHandler, false);
shootSound.load();
assetsToLoad.push(shootSound);

const explosionSound = document.getElementById('explosionSound');
explosionSound.addEventListener('canplaythrough', loadHandler, false);
explosionSound.load();
assetsToLoad.push(explosionSound);

let assetsLoaded = 0;

const LOADING = 0;
const PLAYING = 1;
const OVER = 2;

let gameState = LOADING;

const RIGHT = 'ArrowRight';
const LEFT = 'ArrowLeft';
const SPACE = 'Space';

//Directions
let moveRight = false;
let moveLeft = false;

//Variables to help fire missiles
let shoot = false;
let spaceKeyIsDown = false;

// Game Variables
let score = 0;
let scoreNeededToWin = 60;
let alienFrequency = 100;
let alienTimer = 0;

window.addEventListener(
  'keydown',
  function (event) {
    const key = event.code;

    switch (key) {
      case LEFT:
        moveLeft = true;
        break;

      case RIGHT:
        moveRight = true;
        break;

      case SPACE:
        if (!spaceKeyIsDown) {
          shoot = true;
          spaceKeyIsDown = true;
        }
        break;

      default:
        break;
    }
  },
  false,
);

window.addEventListener(
  'keyup',
  function (event) {
    const key = event.code;

    switch (key) {
      case LEFT:
        moveLeft = false;
        break;

      case RIGHT:
        moveRight = false;
        break;

      case SPACE:
        spaceKeyIsDown = false;
        break;

      default:
        break;
    }
  },
  false,
);
update();

function update() {
  requestAnimationFrame(update, canvas);

  switch (gameState) {
    case LOADING:
      console.log('LOADING');
      break;

    case PLAYING:
      playGame();
      break;

    case OVER:
      endGame();
      break;

    default:
      break;
  }

  render();
}

function loadHandler() {
  assetsLoaded++;
  if (assetsLoaded === assetsToLoad.length) {
    image.removeEventListener('load', loadHandler, false);
    music.removeEventListener('canplaythrough', loadHandler, false);
    shootSound.removeEventListener('canplaythrough', loadHandler, false);
    explosionSound.removeEventListener('canplaythrough', loadHandler, false);
    console.log(assetsLoaded);

    music.play();
    music.volume = 0.3;
    gameState = PLAYING;
  }
}

function playGame() {
  if (moveLeft && !moveRight) {
    cannon.vx = -6;
  }

  if (!moveLeft && moveRight) {
    cannon.vx = 6;
  }

  if (!moveLeft && !moveRight) {
    cannon.vx = 0;
  }

  if (shoot) {
    fireMissile();
    shoot = false;
  }

  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));

  for (let i = 0; i < missiles.length; i++) {
    const missile = missiles[i];

    missile.y += missile.vy;

    //Remove the missile if it crosses the top of the screen
    if (missile.y < 0 - missile.height) {
      removeObject(missile, missiles);

      removeObject(missile, sprites);

      i--;
    }
  }

  // Make aliens

  alienTimer++;

  if (alienTimer === alienFrequency) {
    makeAlien();
    alienTimer = 0;

    if (alienFrequency > 2) {
      alienFrequency--;
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    const alien = aliens[i];

    if (alien.state === alien.NORMAL) {
      alien.y += alien.vy;
    }

    //Check if the alien has crossed the bottom of the screen
    if (alien.y > canvas.height + alien.height) {
      gameState = OVER;
    }
  }

  for (let i = 0; i < aliens.length; i++) {
    const alien = aliens[i];

    for (let j = 0; j < missiles.length; j++) {
      const missile = missiles[j];

      if (hitTestRectangle(missile, alien) && alien.state === alien.NORMAL) {
        destroyAlien(alien);
        score++;

        removeObject(missile, missiles);
        removeObject(missile, sprites);

        j--;
      }
    }
  }

  scoreDisplay.text = score;

  if (score === scoreNeededToWin) {
    gameState = OVER;
  }
}

function destroyAlien(alien) {
  alien.state = alien.EXPLODED;
  alien.update();

  setTimeout(removeAlien, 1000);

  explosionSound.currentTime = 0;
  explosionSound.play();

  function removeAlien() {
    removeObject(alien, aliens);
    removeObject(alien, sprites);
  }
}

function makeAlien() {
  const alien = Object.create(alienObject);
  alien.sourceX = 32;

  // Sets its position above the screen boundary
  alien.y = 0 - alien.height;

  const randomPosition = Math.floor(Math.random() * 15);
  // const randomPosition = Math.floor(Math.random() * (canvas.width / alien.width))
  alien.x = randomPosition * alien.width;

  alien.vy = 0.5;

  sprites.push(alien);
  aliens.push(alien);
}

function fireMissile() {
  const missile = Object.create(spriteObject);
  missile.sourceX = 96;
  missile.sourceWidth = 16;
  missile.sourceHeight = 16;
  missile.width = 16;
  missile.height = 16;

  missile.x = cannon.centerX() - missile.halfWidth();
  missile.y = cannon.y - missile.height;

  missile.vy = -8;
  sprites.push(missile);
  missiles.push(missile);

  shootSound.currentTime = 0;
  shootSound.play();
}

function removeObject(objectToRemove, array) {
  const i = array.indexOf(objectToRemove);
  if (i > -1) {
    array.splice(i, 1);
  }
}

function endGame() {
  gameOverMessage.visible = true;
  if (score < scoreNeededToWin) {
    gameOverMessage.text = 'EARTH DESTROYED';
  } else {
    gameOverMessage.x = 120;
    gameOverMessage.text = 'EARTH SAVED';
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (sprites.length !== 0) {
    for (let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i];

      context.drawImage(
        image,
        sprite.sourceX,
        sprite.sourceY,
        sprite.sourceWidth,
        sprite.sourceHeight,
        Math.floor(sprite.x),
        Math.floor(sprite.y),
        sprite.width,
        sprite.height,
      );
    }
  }

  if (messages.length) {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.visible) {
        context.font = message.font;
        context.fillStyle = message.fillStyle;
        context.textBaseline = message.textBaseline;
        context.fillText(message.text, message.x, message.y);
      }
    }
  }
}
