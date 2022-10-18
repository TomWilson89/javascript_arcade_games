const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

const sprites = [];
const assetsToLoad = [];

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

const image = new Image();
image.addEventListener('load', loadHandler, false);
image.src = '../images/alienArmada.png';
assetsToLoad.push(image);

let assetsLoaded = 0;

const LOADING = 0;
const PLAYING = 1;
const OVER = 2;

let gameState = LOADING;

const RIGHT = 'ArrowRight';
const LEFT = 'ArrowLeft';

let moveRight = false;
let moveLeft = false;

window.addEventListener(
  'keydown',
  function (event) {
    const key = event.key;

    switch (key) {
      case LEFT:
        moveLeft = true;
        break;

      case RIGHT:
        moveRight = true;
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
    const key = event.key;

    switch (key) {
      case LEFT:
        moveLeft = false;
        break;

      case RIGHT:
        moveRight = false;
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
    gameState = PLAYING;
  }
}

function playGame() {
  if (moveLeft && !moveRight) {
    cannon.vx = -8;
  }

  if (!moveLeft && moveRight) {
    cannon.vx = 8;
  }

  if (!moveLeft && !moveRight) {
    cannon.vx = 0;
  }

  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));
}

function endGame() {}

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
}
