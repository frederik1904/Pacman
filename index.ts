import P5 from "p5";
//import WorldBlock from "./WorldBlock";
import { Cheese } from './Cheese'
import { Wall } from './Wall'
import { Actor } from './Actor'
import { Pacman } from './Pacman'
import { Ghost } from './Ghost'
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
  let heightScale = h / heightBlocks;

  let frameRate: number = 15;
  let world = [];

  let actors: Actor[] = [];

  let pacman;
  let ghost;

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.createCanvas(w, h);

    pacman = p5.loadImage('https://i.gifer.com/origin/64/649852e53b7e4edf15ea1c2f23a61f29_w200.gif')
    ghost = p5.loadImage('https://i.gifer.com/origin/50/5016760dd9f147e7a445529ed8ff40de_w200.gif')

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
    actors.push(new Pacman(p5.createVector(12,13)));
  }

  function createGhosts() {
    actors.push(new Ghost(p5.createVector(1,1))) 
    actors.push(new Ghost(p5.createVector(22,1)))
    actors.push(new Ghost(p5.createVector(1,17)))
    actors.push(new Ghost(p5.createVector(22,17)))
  }

  function moveIfPossibleInDirection(actor: Actor) {
    let x: number = actor.getPos().x;
    let y: number = actor.getPos().y;

    switch (actor.keyPressed(p5)) {
      case Direction.Down: {
        if (world[y + 1][x].isMovable()) {
          actor.setRotation(Direction.Down);
          y += 1;
        }
        break;
      }
      case Direction.Left: {
        if (world[y][x - 1].isMovable()) {
          actor.setRotation(Direction.Left);
          x -= 1;
        }
        break;
      }
      case Direction.Right: {
        if (world[y][x + 1].isMovable()) {
          actor.setRotation(Direction.Right);
          x += 1;
        }
        break;
      }
      case Direction.Up: {
        if (world[y - 1][x].isMovable()) {
          actor.setRotation(Direction.Up);
          y -= 1;
        }
        break;
      }
    }
    actor.setPos(x, y);
    actor.removeOnTouch(world[y][x], actors);
  }

  function gameIsDone() {
    for (let i: number = 0; i < actors.length; i++) {
      if (actors[i].getType() != Pacman.name) {
        if (actors[i].removeOnTouch(null, actors)) {
          return true;
        };
      }
    }

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

    //Draw actors
    for (let i: number = 0; i < actors.length; i++) {
      moveIfPossibleInDirection(actors[i]);
       p5.push();
        p5.translate(actors[i].getPos().x + 0.5, actors[i].getPos().y + 0.5)
        p5.imageMode(p5.CENTER)
        p5.angleMode(p5.DEGREES)
        
      if (actors[i].getType() == Pacman.name) {
        switch (actors[i].getRotation()) {
          case Direction.Down:
          p5.rotate(90);
          break;
          case Direction.Up:
          p5.rotate(270);
          break;
          case Direction.Left:
          p5.rotate(180);
          break;
          case Direction.Right:
          p5.rotate(0);
          break;
        }
        p5.image(pacman, 0, 0, 1, 1);
      } else if(actors[i].getType() == Ghost.name) {

        p5.image(ghost, 0, 0, 1, 1);
      }
      p5.pop();
    }

    if (gameIsDone()) {
      p5.noLoop();
      console.log("Done")
    }
  };
});


