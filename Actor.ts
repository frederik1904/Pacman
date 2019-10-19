import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
import { node } from "./index"

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
  constructor(private pos: P5.vector, private className: string, private rotation: Direction) {}

  getPos() {
    return this.pos;
  }

  getRotation() {
    return this.rotation;
  }

  setRotation(dir: Direction) {
    this.rotation = dir;
  }

  setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  keyPressed(p5: P5, world: node[][], pacman: Actor) {
    return null;
  }

  removeOnTouch(wb: WorldBlock, actors: Actor[]) {
    return false;
  }

  getType() {
    return this.className;
  }
}
