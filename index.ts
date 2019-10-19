import P5 from "p5";
//import WorldBlock from "./WorldBlock";
import { Cheese } from './Cheese'
import { Wall } from './Wall'
import { Actor, Pacman, Ghost } from './Actor'
import { WorldBlock } from './WorldBlock'

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

new P5((p5: P5) => {
  let w: number = 800;
  let h: number = 600;

  let heightBlocks = 19;
  let widhtBlocks = 25
  let widthScale = w / widhtBlocks;

  let frameRate: number = 15;
  let world = [];

  let player: Pacman;
  let ai: Ghost[] = [];

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.createCanvas(w, h);
    p5.frameRate(frameRate);
    createWorld();
  };

  function createWorld() {
    for (let y: number = 0; y < heightBlocks; y++) {
      world[y] = [];
      for (let x: number = 0; x < widhtBlocks; x++) {
        world[y][x] = new WorldBlock(null, null, p5);
      }
    }

    createWalls();
    createCheese();
    createPacman();
    createGhosts();
  }

  function createWalls() {
    let walls: number[][] = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    for (let y: number = 0; y < walls.length; y++) {
      for (let x: number = 0; x < walls[y].length; x++) {
        if (walls[y][x] == 1) {
          world[y][x].setWall(new Wall());
        }
      }
    }
  }

  function createCheese() {
    for (let y: number = 0; y < world.length; y++) {
      for (let x: number = 0; x < world[y].length; x++) {
        world[y][x].createCheese();
      }
    }
  }

  function createPacman() {
    player = new Pacman(p5.createVector(12,13));
  }

  function createGhosts() {
    ai = [ new Ghost(p5.createVector(1,1)), 
           new Ghost(p5.createVector(22,1)),
           new Ghost(p5.createVector(1,17)),
           new Ghost(p5.createVector(22,17)) 
        ]
  }

  function moveIfPossibleInDirection(actor: Actor) {
    let x: number = actor.getPos().x;
    let y: number = actor.getPos().y;

    switch (actor.keyPressed(p5)) {
      case Direction.Down: {
        if (world[y + 1][x].isMovable()) {
          y += 1;
        }
        break;
      }
      case Direction.Left: {
        if (world[y][x - 1].isMovable()) {
          x -= 1;
        }
        break;
      }
      case Direction.Right: {
        if (world[y][x + 1].isMovable()) {
          x += 1;
        }
        break;
      }
      case Direction.Up: {
        if (world[y - 1][x].isMovable()) {
          y -= 1;
        }
        break;
      }
    }
    actor.setPos(x, y);
    actor.removeOnTouch(world[y][x]);
  }

  function gameIsDone() {
    let cheeseCount: number = 0;
    for (let y: number = 0; y < world.length; y++) {
      for (let x: number = 0; x < world[y].length; x++) {
        cheeseCount += world[y][x].hasCheese() ? 1 : 0;
      }
    }
    return cheeseCount == 0;
  }

  p5.draw = () => {
    p5.scale(widthScale);
    p5.background(220);
    for (let y: number = 0; y < world.length; y++) {
      for (let x: number = 0; x < world[y].length; x++) {
        world[y][x].draw(x, y);
      }
    }

    moveIfPossibleInDirection(player);

    for (let i = 0; i < ai.length; i++) {
      moveIfPossibleInDirection(ai[i]);
    }

    //Draw ghosts
    for (let i: number = 0; i < ai.length; i++) {
      p5.noStroke();
      p5.fill(150);
      p5.rect(ai[i].getPos().x, ai[i].getPos().y,1,1);
    }

    //Draw Pacman
    p5.noStroke();
    p5.fill(150);
    p5.rect(player.getPos().x, player.getPos().y,1,1);

    if (gameIsDone()) {
      p5.noLoop();
      console.log("Done")
    }
  };
});


