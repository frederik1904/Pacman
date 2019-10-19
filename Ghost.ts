import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
import { Actor } from "./Actor"
import { Pacman} from "./Pacman"

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
    super(pos, "Ghost", 0);
  }

  keyPressed(p5) {
    switch (Math.floor(Math.random() * 8)) {
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
        return true;
      }
    }
    
    return false;
  }
}