import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
import { Actor } from "./Actor"

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class Pacman extends Actor {
  constructor(pos: P5.vector) {
    super(pos, "Pacman", 0);
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

  removeOnTouch(wb: WorldBlock, actors: Actor[]) {
    return wb.eatCheese();
  }
}

export {
  Pacman,
}