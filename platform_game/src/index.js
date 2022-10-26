const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//The game map
var map = [
  [7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 7],
  [8, 9, 7, 7, 4, 9, 7, 7, 7, 8, 9, 7, 7, 7, 8, 5],
  [4, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 4, 4],
  [7, 7, 4, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7],
  [8, 9, 4, 7, 7, 7, 7, 8, 9, 7, 7, 4, 8, 9, 7, 7],
  [7, 4, 4, 4, 7, 8, 9, 7, 7, 7, 4, 4, 7, 7, 4, 8],
  [9, 7, 8, 9, 7, 7, 7, 8, 9, 4, 7, 4, 9, 7, 7, 7],
  [7, 7, 7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 4, 4, 7],
  [8, 9, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 8, 9, 7],
  [7, 7, 4, 4, 4, 4, 7, 7, 4, 7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 7],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

//The game objects map

var gameObjects = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
];

const EMPTY = 0;
const CAT = 1;
const HEDGEHOG = 2;
const BOX = 4;
const DOOR = 5;

// The size of each tiel size
const SIZE = 64;

// Sprites that need to be access by name
let cat = null;
let door = null;
let gameOverDisplay = null;
let gameOverMessage = null;

// The number of rows and columns
const ROWS = map.length;
const COLUMNS = map[0].length;

// the number of columns on the tilesheet
const tilesheetColumns = 3;

const sprites = [];
const boxes = [];
const hedgehogs = [];
const messages = [];

const assetsToLoad = [];
let assetsLoaded = 0;

const image = new Image();
image.addEventListener('load', loadHandler, false);
image.src = '../images/hedgehogApocalypse.png';
assetsToLoad.push(image);

// game variables
let hedgehogsSquashed = 0;

// game states
const LOADING = 0;
const BUILD_MAP = 1;
const PLAYING = 2;
const OVER = 3;

let gameState = LOADING;

const RIGHT = 'ArrowRight';
const LEFT = 'ArrowLeft';
const SPACE = 'Space';

// Direction
let jump = false;
let moveLeft = false;
let moveRight = false;

window.addEventListener('keydown', function (e) {
  switch (e.code) {
    case SPACE:
      jump = true;
      break;
    case LEFT:
      moveLeft = true;
      break;
    case RIGHT:
      moveRight = true;
      break;

    default:
      break;
  }
});

window.addEventListener('keyup', function (e) {
  switch (e.code) {
    case SPACE:
      jump = false;
      break;
    case LEFT:
      moveLeft = false;
      break;
    case RIGHT:
      moveRight = false;
      break;

    default:
      break;
  }
});

update();
function update() {
  requestAnimationFrame(update, canvas);

  switch (gameState) {
    case LOADING:
      console.log('Loading');
      break;

    case PLAYING:
      playGame();
      break;

    case BUILD_MAP:
      buildMap(map);
      buildMap(gameObjects);
      createOtherObjects();
      gameState = PLAYING;
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
    gameState = BUILD_MAP;
  }
}

function buildMap(levelMap) {
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const currentTile = levelMap[row][column];
      if (currentTile !== EMPTY) {
        const tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE;
        const tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;

        switch (currentTile) {
          case CAT:
            cat = Object.create(spriteObject);
            cat.sourceX = tilesheetX;
            cat.sourceY = tilesheetY;
            cat.x = column * SIZE;
            cat.y = row * SIZE;
            sprites.push(cat);
            break;

          case HEDGEHOG:
            const hedgehog = Object.create(hedgehogObject);
            hedgehog.sourceX = tilesheetX;
            hedgehog.sourceY = tilesheetY;
            hedgehog.x = column * SIZE;
            hedgehog.y = row * SIZE;
            hedgehog.vx = hedgehog.speed;
            sprites.push(hedgehog);
            hedgehogs.push(hedgehog);
            break;

          case BOX:
            const box = Object.create(spriteObject);
            box.sourceX = tilesheetX;
            box.sourceY = tilesheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;

          case DOOR:
            door = Object.create(spriteObject);
            door.sourceX = tilesheetX;
            door.sourceY = tilesheetY;
            door.x = column * SIZE;
            door.y = row * SIZE;
            sprites.push(door);
            break;

          default:
            const sprite = Object.create(spriteObject);
            sprite.sourceX = tilesheetX;
            sprite.sourceY = tilesheetY;
            sprite.x = column * SIZE;
            sprite.y = row * SIZE;
            sprites.push(sprite);
            break;
        }
      }
    }
  }
}

function createOtherObjects() {
  gameOverDisplay = Object.create(spriteObject);
  gameOverDisplay.sourceX = 0;
  gameOverDisplay.sourceY = 192;
  gameOverDisplay.sourceWidth = 192;
  gameOverDisplay.sourceHeight = 128;
  gameOverDisplay.width = 192;
  gameOverDisplay.height = 128;
  gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
  gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
  gameOverDisplay.visible = false;
  sprites.push(gameOverDisplay);

  gameOverMessage = Object.create(messageObject);
  gameOverMessage.x = gameOverDisplay.x + 20;
  gameOverMessage.y = gameOverDisplay.y + 34;
  gameOverMessage.font = 'bold 30px Helvetica';
  gameOverMessage.fillStyle = 'black';
  gameOverMessage.text = '';
  gameOverMessage.visible = false;
  messages.push(gameOverMessage);
}

function playGame() {
  if (moveLeft && !moveRight) {
    cat.accelerationX = -0.2;
    cat.friction = 1;
  }

  if (!moveLeft && moveRight) {
    cat.accelerationX = 0.2;
    cat.friction = 1;
  }

  if (jump && cat.isOnGround) {
    cat.vy += cat.jumpForce;
    cat.isOnGround = false;
    cat.friction = 1;
  }

  if (!moveLeft && !moveRight) {
    cat.accelerationX = 0;
    cat.friction = 0.96;
    cat.gravity = 0.3;
  }

  // Apply acceleration
  cat.vx += cat.accelerationX;
  cat.vy += cat.accelerationY;

  if (cat.isOnGround) {
    // Apply friction
    cat.vx *= cat.friction;
  }

  // Apply gravity
  cat.vy += cat.gravity;

  //   // Limit the speed
  if (cat.vx > cat.speedLimit) {
    cat.vx = cat.speedLimit;
  }

  if (cat.vx < -cat.speedLimit) {
    cat.vx = -cat.speedLimit;
  }

  if (cat.vy > cat.speedLimit * 2) {
    cat.vy = cat.speedLimit * 2;
  }

  // Move the cat
  cat.x += cat.vx;
  cat.y += cat.vy;

  // Check for a collision with the box
  for (let i = 0; i < boxes.length; i++) {
    const collisionSide = blockRectangle(cat, boxes[i], false);
    if (collisionSide === 'bottom' && cat.vy >= 0) {
      // Tell the game that the cas is on the ground
      // if it's standing on the top of a platform
      cat.isOnGround = true;

      // Neutralize gravity by appllying its
      // exact opposite force to the character's vy
      cat.vy = -cat.gravity;
    } else if (collisionSide === 'top' && cat.vy <= 0) {
      cat.vy = 0;
    } else if (collisionSide === 'right' && cat.vx >= 0) {
      cat.vx = 0;
    } else if (collisionSide === 'left' && cat.vx <= 0) {
      cat.vx = 0;
    }
    if (collisionSide !== 'bottom' && cat.vy > 0) {
      cat.isOnGround = false;
    }
  }

  // The hedgehogs
  for (let i = 0; i < hedgehogs.length; i++) {
    const hedgehog = hedgehogs[i];

    if (hedgehog.state === hedgehog.NORMAL) {
      hedgehog.x += hedgehog.vx;
      hedgehog.y += hedgehog.vy;
    }

    // Check whether the hedgehog is at a cell corner
    if (Math.floor(hedgehog.x) % SIZE === 0 && Math.floor(hedgehog.y) % SIZE === 0) {
      // Change the hedgehog's direction if there's no box under it

      // Find the hedgehog's column and row in the array

      const hedgehogColumn = Math.floor(hedgehog.x / SIZE);
      const hedgehogRow = Math.floor(hedgehog.y / SIZE);

      if (hedgehogRow < ROWS - 1) {
        const thingsBelowLeft = map[hedgehogRow + 1][hedgehogColumn - 1];
        const thingsBelowRight = map[hedgehogRow + 1][hedgehogColumn + 1];

        if (thingsBelowLeft !== BOX || thingsBelowRight !== BOX) {
          hedgehog.vx *= -1;
        }
      }

      if (hedgehogColumn > 0) {
        const thingsToTheLeft = map[hedgehogRow][hedgehogColumn - 1];
        if (thingsToTheLeft === BOX) {
          hedgehog.vx *= -1;
        }
      }

      if (hedgehogColumn < COLUMNS - 1) {
        const thingsToTheRight = map[hedgehogRow][hedgehogColumn + 1];
        if (thingsToTheRight === BOX) {
          hedgehog.vx *= -1;
        }
      }
    }
  }

  // Collision between the cat and the hedgehogs
  for (let i = 0; i < hedgehogs.length; i++) {
    const hedgehog = hedgehogs[i];
    if (hedgehog.visible && hitTestCircle(cat, hedgehog) && hedgehog.state === hedgehog.NORMAL) {
      if (cat.vy > 0) {
        blockCircle(cat, hedgehog, true);
        hedgehogsSquashed++;
        squashHedgehog(hedgehog);
      } else {
        gameState = OVER;
      }
    }
  }

  if (hitTestRectangle(cat, door)) {
    if (hedgehogsSquashed === hedgehogs.length) {
      gameState = OVER;
    }
  }

  // Bounce off the screen edges
  if (cat.x < 0) {
    cat.vx = 0;
    cat.x = 0;
  }
  if (cat.y < 0) {
    cat.vy = 0;
    cat.y = 0;
  }

  if (cat.x + cat.width > canvas.width) {
    cat.vx = 0;
    cat.x = canvas.width - cat.width;
  }

  if (cat.y + cat.height > canvas.height) {
    cat.y = 0;
    cat.y = canvas.height - cat.height;
    cat.isOnGround = true;
    cat.vy *= -cat.gravity;
  }
}

function squashHedgehog(hedgehog) {
  hedgehog.state = hedgehog.SQUASHED;
  hedgehog.update();

  setTimeout(removeHedgehog, 2000);

  function removeHedgehog() {
    hedgehog.visible = false;
  }
}

function endGame() {
  gameOverDisplay.visible = true;
  gameOverMessage.visible = true;

  if (hedgehogsSquashed === hedgehogs.length) {
    gameOverMessage.text = 'You Won!';
  } else {
    gameOverMessage.text = 'You Lost!';
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (sprites.length) {
    for (let sprite of sprites) {
      if (sprite.visible) {
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

  if (messages.length) {
    for (let message of messages) {
      if (message.visible) {
        context.font = message.font;
        context.fillStyle = message.fillStyle;
        context.textBaseline = message.textBaseline;
        context.fillText(message.text, message.x, message.y);
      }
    }
  }
}
