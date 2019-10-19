import P5 from "p5";
import { WorldBlock } from "./WorldBlock";

export {
  Actor,
}

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class Actor {
  constructor(private pos: P5.vector, private className: string, private rotation: number) {}

  getPos() {
    return this.pos;
  }

  getRotation() {
    return this.rotation;
  }

  setRotation(dir: Direction) {
    switch(dir) {
      case Direction.Down:
      this.rotation = 90;
      break;
      case Direction.Left:
      this.rotation = 0;
      break;
      case Direction.Right:
      this.rotation = 270;
      break;
      case Direction.Up:
      this.rotation = 180;
      break;
    }
  }

  setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  keyPressed(p5: P5) {
    return null;
  }

  removeOnTouch(wb: WorldBlock, actors: Actor[]) {
    return false;
  }

  getType() {
    return this.className;
  }
}
