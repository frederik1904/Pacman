import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
export { Actor, Pacman, Ghost };

enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

class Actor {
  constructor(private pos: P5.vector) {}

  getPos() {
    return this.pos;
  }

  setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  keyPressed(p5: P5) {
    return null;
  }

  removeOnTouch(wb: WorldBlock) {
    return false;
  }
}

class Pacman extends Actor {
  constructor(pos: P5.vector) {
    super(pos);
  }

  keyPressed(p5) {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      return Direction.Left;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      return Direction.Right;
    }
    if (p5.keyIsDown(p5.UP_ARROW)) {
      return Direction.Up;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      return Direction.Down;
    }
  }

  removeOnTouch(wb: WorldBlock) {
    return wb.eatCheese();
  }
}

class Ghost extends Actor {
  constructor(pos: P5.vector) {
    super(pos);
  }

  keyPressed(p5) {
    switch (Math.floor(Math.random() * 10)) {
      case 0:
      return Direction.Down;
      case 1:
      return Direction.Up;
      case 2:
      return Direction.Left;
      case 3:
      return Direction.Right;
    }
    return 4;
  }
}
