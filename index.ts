import P5 from "p5";
//import WorldBlock from "./WorldBlock";
import { Cheese } from './Cheese'
import { Wall } from './Wall'
import { Actor, Pacman, Ghost } from './Actor'

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class WorldBlock {
  constructor(private cheese: Cheese, private wall: Wall,
    private p5: P5) {
  }

  setWall(wall: Wall) {
    this.wall = wall;
  }

  createCheese() {
    if (this.wall == null) {
      this.cheese = new Cheese();
    }
  }

  isMovable() {
    return this.wall == null;
  }

  draw(x: number, y: number) {
    if (this.wall != null) {
      this.p5.noStroke();
      this.p5.fill(0, 0, 0);
      this.p5.rect(x, y,1,1);
    }

    if (this.cheese != null) {
      this.p5.noStroke();
      this.p5.fill(252, 190, 3);
      this.p5.circle(x + 0.5, y + 0.5,
        0.3, 0.3);
    }
  }
}


new P5((p5: P5) => {
  let w: number = 800;
  let h: number = 600;

  let heightBlocks = 19;
  let widhtBlocks = 25
  let widthScale = w / widhtBlocks;

  let frameRate: number = 30;
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

  function moveIfPossibleInDirection(actor: Actor, dir: Direction) {
    let x: number = actor.getPos().x;
    let y: number = actor.getPos().y;
    switch (actor.keyPressed(p5)) {
      case Direction.Down: {
        if (world[y + 1][x].isMovable()) {
          player.setPos(x, y + 1);
        }
        break;
      }
      case Direction.Left: {
        if (world[y][x - 1].isMovable()) {
          player.setPos(x - 1, y);
        }
        break;
      }
      case Direction.Right: {
        if (world[y][x + 1].isMovable()) {
          player.setPos(x + 1, y);
        }
        break;
      }
      case Direction.Up: {
        if (world[y - 1][x].isMovable()) {
          player.setPos(x, y - 1);
        }
        break;
      }
    }
  }

  p5.draw = () => {
    p5.scale(widthScale);
    p5.background(220);
    for (let y: number = 0; y < world.length; y++) {
      for (let x: number = 0; x < world[y].length; x++) {
        world[y][x].draw(x, y);
      }
    }

    //Draw Pacman
    p5.noStroke();
    p5.fill(150);
    p5.rect(player.getPos().x, player.getPos().y,1,1);

  };
});


