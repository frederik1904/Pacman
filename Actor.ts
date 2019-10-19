import P5 from "p5";
export {
  Actor,
  Pacman,
  Ghost,
};

enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}

class Actor {
  constructor(private pos: P5.vector) {
  }
  act(){
    // Do nothing
  }

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

}

class Pacman extends Actor{
  constructor(pos: P5.vector) {
    super(pos);
  }


  keyPressed(p5: P5) {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      return Direction.Left;
    }
    if (p5.KeyIsDown(p5.RIGHT_ARROW)) {
      return Direction.Right;
    }
    if (p5.KeyIsDown(p5.UP_ARROW)) {
      return Direction.Up;
    }
    if (p5.KeyIsDown(p5.DOWN_ARROW)) {
      return Direction.Down;
    }
  }
}

class Ghost extends Actor {
  constructor(pos: P5.vector) {
    super(pos);
  }
}

