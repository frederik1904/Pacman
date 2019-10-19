import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
import { Actor } from "./Actor"

export {
  Ghost,
}

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class Ghost extends Actor {
  constructor(pos: P5.vector) {
    super(pos, "Ghost");
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
  
  removeOnTouch(wb: WorldBlock, actors: Actor[]) {
    for (let i: number = 0; i < actors.length; i++) {
      if (this.getPos().x == actors[i].getPos().x 
      && this.getPos().y == actors[i].getPos().y
      && actors[i].getType() == Pacman.name) {
        console.log("touching")
        return true;
      }
    }
    
    return false;
  }
}