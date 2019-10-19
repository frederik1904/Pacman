import P5 from 'P5'
import { Cheese } from './Cheese'
import { Wall } from './Wall'
import { Actor, Pacman, Ghost } from './Actor'

export {
  WorldBlock,
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

  hasCheese() {
    return this.cheese != null && this.wall == null;
  }

  eatCheese() {
    let tmp = this.cheese;
    this.cheese = null;
    return tmp != null;
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