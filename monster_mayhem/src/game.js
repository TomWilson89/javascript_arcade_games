const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const levelMaps = [];
const levelGameObjects = [];

let levelCounter = 0;

let levelChangeTimer = 0;

//Level 0
var map0 = [
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 6],
  [6, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 6],
  [6, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 6],
  [6, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 6],
  [6, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 6],
  [6, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 6],
  [6, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 6],
  [6, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 6],
  [6, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 2, 6],
  [6, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
  [6, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 6],
  [6, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 6],
  [6, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 6],
  [6, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

levelMaps.push(map0);
var gameObjects0 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//Push gameObjects0 into the levelGameObjects array
levelGameObjects.push(gameObjects0);

//Level 1

var map1 = [
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6],
  [6, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 6],
  [6, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 6],
  [6, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 1, 6],
  [6, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 6],
  [6, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 6],
  [6, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 6],
  [6, 1, 1, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 6],
  [6, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 6],
  [6, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 6],
  [6, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 6],
  [6, 2, 1, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 6],
  [6, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 2, 1, 6],
  [6, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 6],
  [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
];

//Push map1 into the leveMaps array
levelMaps.push(map1);

//The game objects maps
var gameObjects1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//Push gameObjects1 into the levelGameObjects array
levelGameObjects.push(gameObjects1);

// MAP CODE

const EMPTY = 0;
const FLOOR = 1;
const BOX = 2;
const MONSTER = 3;
const STAR = 4;
const ALIEN = 5;
const WALL = 6;

// The size of each tile cell
const SIZE = 64;

// Sprites we need to access bu name
let alien = null;
let levelCompleteDisplay = null;
let youLostDisplay = null;
let youWonDisplay = null;

const ROWS = map0.length;
const COLUMNS = map0[0].length;

// number of columnson the tilesheet
const tileSheetColumns = 4;

// Arryas to store the game objects

let sprites = [];
let monsters = [];
let boxes = [];
let messages = [];
let stars = [];

const assetsToLoad = [];
let assetsLoaded = 0;

// Load the tilesheet image
const image = new Image();
image.addEventListener('load', loadHandler, false);
image.src = '../images/monsterMayhem.png';
assetsToLoad.push(image);

// Game states
const LOADING = 0;
const BUILD_MAP = 1;
const PLAYING = 2;
const OVER = 3;
const LEVEL_COMPLETE = 4;

let gameState = LOADING;
let starsCollected = 0;

const gameWorld = {
  x: 0,
  y: 0,
  width: map0[0].length * SIZE,
  height: map0.length * SIZE,
};

const camera = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  rightInnerBoundary: function () {
    return this.x + this.width / 2 + this.width / 4;
  },
  leftInnerBoundary: function () {
    return this.x + this.width / 2 - this.width / 4;
  },
  topInnerBoundary: function () {
    return this.y + this.height / 2 - this.height / 4;
  },
  bottomInnerBoundary: function () {
    return this.y + this.height / 2 + this.height / 4;
  },
};

camera.x = gameWorld.x + gameWorld.width / 2 - camera.width / 2;
camera.y = gameWorld.y + gameWorld.height / 2 - camera.height / 2;

const RIGHT = 'ArrowRight';
const LEFT = 'ArrowLeft';
const UP = 'ArrowUp';
const DOWN = 'ArrowDown';

// Direction
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

window.addEventListener('keydown', function (e) {
  switch (e.code) {
    case UP:
      moveUp = true;
      break;
    case DOWN:
      moveDown = true;
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
    case UP:
      moveUp = false;
      break;
    case DOWN:
      moveDown = false;
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
      console.log('LOADING...');
      break;

    case BUILD_MAP:
      buildMap(levelMaps[levelCounter]);
      buildMap(levelGameObjects[levelCounter]);
      createOtherObjects();
      gameState = PLAYING;
      console.log('start :>> ', stars.length);
      break;

    case PLAYING:
      playGame();
      break;

    case LEVEL_COMPLETE:
      levelComplete();
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

function levelComplete() {
  levelCompleteDisplay.visible = true;

  levelChangeTimer++;

  if (levelChangeTimer === 120) {
    loadNextLevel();
  }

  function loadNextLevel() {
    levelChangeTimer = 0;

    levelCounter++;

    // Load the next level if there is one or end the game if there isn't
    if (levelCounter < levelMaps.length) {
      sprites = [];
      monsters = [];
      boxes = [];
      stars = [];

      starsCollected = 0;

      gameWorld.width = levelMaps[levelCounter][0].length * SIZE;
      gameWorld.height = levelMaps[levelCounter].length * SIZE;

      // Re-center the camera
      camera.x = gameWorld.x + gameWorld.width / 2 - camera.width / 2;
      camera.y = gameWorld.y + gameWorld.height / 2 - camera.height / 2;

      gameState = BUILD_MAP;
    } else {
      gameState = OVER;
    }
  }
}

function buildMap(levelMap) {
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const currentTile = levelMap[row][column];
      if (currentTile !== EMPTY) {
        // Find the tile's x and y position on the tile sheet
        const tileSheetX = Math.floor((currentTile - 1) % tileSheetColumns) * SIZE;
        const tileSheetY = Math.floor((currentTile - 1) / tileSheetColumns) * SIZE;

        switch (currentTile) {
          case FLOOR:
            const floor = Object.create(spriteObject);
            floor.sourceX = tileSheetX;
            floor.sourceY = tileSheetY;
            floor.x = column * SIZE;
            floor.y = row * SIZE;
            sprites.push(floor);
            break;

          case BOX:
            const box = Object.create(spriteObject);
            box.sourceX = tileSheetX;
            box.sourceY = tileSheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;

          case WALL:
            const wall = Object.create(spriteObject);
            wall.sourceX = tileSheetX;
            wall.sourceY = tileSheetY;
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            break;

          case STAR:
            const star = Object.create(spriteObject);
            star.sourceX = tileSheetX;
            star.sourceY = tileSheetY;
            star.sourceWidth = 48;
            star.sourceHeight = 48;
            star.width = 48;
            star.height = 48;
            star.x = column * SIZE + 8;
            star.y = row * SIZE + 8;
            sprites.push(star);
            stars.push(star);
            break;

          case ALIEN:
            alien = Object.create(spriteObject);
            alien.sourceX = tileSheetX;
            alien.sourceY = tileSheetY;
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
            break;

          case MONSTER:
            const monster = Object.create(monsterObject);
            monster.sourceX = tileSheetX;
            monster.sourceY = tileSheetY;
            monster.x = column * SIZE;
            monster.y = row * SIZE;
            // Make the monster choose a random start direction
            changeDirection(monster);
            monsters.push(monster);
            sprites.push(monster);
            break;

          default:
            break;
        }
      }
    }
  }
}

function createOtherObjects() {
  levelCompleteDisplay = Object.create(spriteObject);
  levelCompleteDisplay.sourceX = 0;
  levelCompleteDisplay.sourceY = 384;
  levelCompleteDisplay.sourceWidth = 256;
  levelCompleteDisplay.sourceHeight = 128;
  levelCompleteDisplay.width = 256;
  levelCompleteDisplay.height = 128;
  levelCompleteDisplay.x = canvas.width / 2 - levelCompleteDisplay.width / 2;
  levelCompleteDisplay.y = canvas.height / 2 - levelCompleteDisplay.height / 2;
  levelCompleteDisplay.visible = false;
  levelCompleteDisplay.scrollable = false;
  sprites.push(levelCompleteDisplay);

  youLostDisplay = Object.create(spriteObject);
  youLostDisplay.sourceX = 0;
  youLostDisplay.sourceY = 128;
  youLostDisplay.sourceWidth = 256;
  youLostDisplay.sourceHeight = 128;
  youLostDisplay.width = 256;
  youLostDisplay.height = 128;
  youLostDisplay.x = canvas.width / 2 - youLostDisplay.width / 2;
  youLostDisplay.y = canvas.height / 2 - youLostDisplay.height / 2;
  youLostDisplay.visible = false;
  youLostDisplay.scrollable = false;
  sprites.push(youLostDisplay);

  youWonDisplay = Object.create(spriteObject);
  youWonDisplay.sourceX = 0;
  youWonDisplay.sourceY = 256;
  youWonDisplay.sourceWidth = 256;
  youWonDisplay.sourceHeight = 128;
  youWonDisplay.width = 256;
  youWonDisplay.height = 128;
  youWonDisplay.x = canvas.width / 2 - youWonDisplay.width / 2;
  youWonDisplay.y = canvas.height / 2 - youWonDisplay.height / 2;
  youWonDisplay.visible = false;
  youWonDisplay.scrollable = false;
  sprites.push(youWonDisplay);
}

function changeDirection(object) {
  object.validDirections = [];

  object.direction = object.NONE;

  const objectColumn = Math.floor(object.x / SIZE);
  const objectRow = Math.floor(object.y / SIZE);

  const currentMap = levelMaps[levelCounter];

  // Find out what kinds of thins are in the map cells
  // that surround the monster. If the cells contain a FLOOR cell,
  // push the corresponding direction into the validDirections array

  if (objectRow > 0) {
    const thingsAbove = currentMap[objectRow - 1][objectColumn];
    if (thingsAbove === FLOOR) {
      object.validDirections.push(object.UP);
    }
  }

  if (objectRow < ROWS - 1) {
    const thingsBelow = currentMap[objectRow + 1][objectColumn];
    if (thingsBelow === FLOOR) {
      object.validDirections.push(object.DOWN);
    }
  }

  if (objectColumn > 0) {
    const thingsToTheLeft = currentMap[objectRow][objectColumn - 1];
    if (thingsToTheLeft === FLOOR) {
      object.validDirections.push(object.LEFT);
    }
  }

  if (objectColumn < COLUMNS - 1) {
    const thingsToTheRight = currentMap[objectRow][objectColumn + 1];
    if (thingsToTheRight === FLOOR) {
      object.validDirections.push(object.RIGHT);
    }
  }

  // The monster's validDirections array now contains 0 to 4 directions that
  // contains FLOOR cells. Which of those directions will the monster
  // choose to move in?

  // If a valid direction was found, figure out if the monster is at an
  // maze passage intersection
  if (object.validDirections.length) {
    const upOrDownPassage =
      object.validDirections.indexOf(object.UP) !== -1 || object.validDirections.indexOf(object.DOWN !== -1);
    const leftOrRightPassage =
      object.validDirections.indexOf(object.LEFT) !== -1 || object.validDirections.indexOf(object.RIGHT !== -1);

    // Change the monster's direction if it's at an intersectaion or
    // in a cul-de-sac (dead-end)
    if ((upOrDownPassage && leftOrRightPassage) || object.validDirections.length === 1) {
      // Optionally find the closest distance to teh alien
      if (alien !== null && object.hunt) {
        findClosestDirection(object);
      }

      // Assign a random validDirection if the alien object doesn't exist in the game
      // or a validDirection wasn't found that brings the monster closer to the alien
      if (alien === null || object.direction === object.NONE) {
        const randomNumber = Math.floor(Math.random() * object.validDirections.length);
        object.direction = object.validDirections[randomNumber];
      }

      switch (object.direction) {
        case object.RIGHT:
          object.vx = object.speed;
          object.vy = 0;
          break;

        case object.LEFT:
          object.vx = -object.speed;
          object.vy = 0;
          break;

        case object.UP:
          object.vx = 0;
          object.vy = -object.speed;
          break;

        case object.DOWN:
          object.vx = 0;
          object.vy = object.speed;
          break;

        default:
          break;
      }

      /**
       * alternative to the switch statement
       * const moveByDirection = [
       *      [0, -1],
       *      [0, 1],
       *      [-1, 0],
       *      [1, 0],
       *    ]
       *
       * object.vx = object.speed * moveByDirection[object.direction - 1][0]
       * object.vy = object.speed * moveByDirection[object.direction - 1][1]
       */
    }
  }
}

function findClosestDirection(object) {
  let closestDirection = undefined;

  const vx = alien.centerX() - object.centerX();
  const vy = alien.centerY() - object.centerY();

  // The distance is greater on the x axis
  if (Math.abs(vx) >= Math.abs(vy)) {
    // Trye lest and right
    if (vx <= 0) {
      closestDirection = monsterObject.LEFT;
    } else {
      closestDirection = monsterObject.RIGHT;
    }
  } else {
    if (vy <= 0) {
      closestDirection = monsterObject.UP;
    } else {
      closestDirection = monsterObject.DOWN;
    }
  }

  // find out if the closestDirection is one of the validDirections
  for (let i = 0; i < object.validDirections.length; i++) {
    if (closestDirection === object.validDirections[i]) {
      object.direction = closestDirection;
    }
  }
}

function playGame() {
  if (moveUp && !moveDown) {
    alien.vy = -4;
  }

  if (moveDown & !moveUp) {
    alien.vy = 4;
  }

  if (moveLeft && !moveRight) {
    alien.vx = -4;
  }

  if (moveRight && !moveLeft) {
    alien.vx = 4;
  }

  if (!moveDown && !moveUp) {
    alien.vy = 0;
  }

  if (!moveRight && !moveLeft) {
    alien.vx = 0;
  }

  alien.x = Math.max(64, Math.min(alien.x + alien.vx, gameWorld.width - alien.width - 64));
  alien.y = Math.max(64, Math.min(alien.y + alien.vy, gameWorld.height - alien.height - 64));

  // Colision with boxes
  for (let i = 0; i < boxes.length; i++) {
    blockRectangle(alien, boxes[i]);
  }

  // Check for collisions with start
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    if (hitTestRectangle(alien, star) && star.visible) {
      star.visible = false;
      starsCollected++;

      // Check wether the level is over
      // by checking if the starsCollected matches
      // the total number in the stars array
      if (starsCollected === stars.length) {
        gameState = LEVEL_COMPLETE;
      }
    }
  }

  // Collisions with monsters
  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];
    if (hitTestCircle(alien, monster)) {
      gameState = OVER;
    }
  }

  for (let i = 0; i < monsters.length; i++) {
    const monster = monsters[i];

    monster.x += monster.vx;
    monster.y += monster.vy;

    // Check whether the monster is at a tile corner
    if (Math.floor(monster.x) % SIZE === 0 && Math.floor(monster.y) % SIZE === 0) {
      changeDirection(monster);
    }

    // Change the monster's state to SCARED if it's 128 pixels from the alien
    const vx = alien.centerX() - monster.centerX();
    const vy = alien.centerY() - monster.centerY();

    // Find the distance between the circle by calculating
    // the vector's magnitude (how long the vector is)
    const magnitude = Math.hypot(vx + vy);
    // const magnitude = Math.sqrt(vx * vx + vy * vy);

    if (magnitude < 192) {
      monster.state = monster.SCARED;
    } else {
      monster.state = monster.NORMAL;
    }

    // update the monster to reflect state changes
    monster.update();
  }

  // Scroll the camera
  if (alien.x < camera.leftInnerBoundary()) {
    camera.x = Math.floor(alien.x - camera.width / 4);
  }

  if (alien.y < camera.topInnerBoundary()) {
    camera.y = Math.floor(alien.y - camera.height / 4);
  }

  if (alien.x + alien.width > camera.rightInnerBoundary()) {
    camera.x = Math.floor(alien.x + alien.width - (camera.width / 4) * 3);
  }

  if (alien.y + alien.height > camera.bottomInnerBoundary()) {
    camera.y = Math.floor(alien.y + alien.height - (camera.height / 4) * 3);
  }

  // The camera's gameWorld boundaries
  if (camera.x < gameWorld.x) {
    camera.x = gameWorld.x;
  }

  if (camera.y < gameWorld.y) {
    camera.y = gameWorld.y;
  }

  if (camera.x + camera.width > gameWorld.x + gameWorld.width) {
    camera.x = gameWorld.x + gameWorld.width - camera.width;
  }

  if (camera.y + camera.height > gameWorld.height) {
    camera.y = gameWorld.height - camera.height;
  }
}

function endGame() {
  levelCompleteDisplay.visible = false;

  if (levelCounter === levelMaps.length && starsCollected === stars.length) {
    youWonDisplay.visible = true;
  } else {
    youLostDisplay.visible = true;
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(-camera.x, -camera.y);

  if (sprites.length) {
    for (let i = 0; i < sprites.length; i++) {
      const sprite = sprites[i];
      if (sprite.visible && sprite.scrollable) {
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

      if (sprite.visible && !sprite.scrollable) {
        context.drawImage(
          image,
          sprite.sourceX,
          sprite.sourceY,
          sprite.sourceWidth,
          sprite.sourceHeight,
          Math.floor(camera.x + sprite.x),
          Math.floor(camera.y + sprite.y),
          sprite.width,
          sprite.height,
        );
      }
    }
  }

  context.restore();

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
