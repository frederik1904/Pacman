import P5 from "p5";
import { WorldBlock } from "./WorldBlock";
import { Actor } from "./Actor"
import { Pacman } from "./Pacman"
import { node } from "./index"
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

  keyPressed(p5: P5, world: node[][], pacman: Actor) {
    //console.log(this.lkv(, world[this.getPos().y][this.getPos().x], [], 10000))
    if (Math.round(Math.random() * 3) == 1) {
      let dir = Direction.Up;
      let pacmanNode: node = world[pacman.getPos().y][pacman.getPos().x];
      let shortestSoFar = 1000;
      let tmp = this.lkv(pacmanNode, world[this.getPos().y - 1][this.getPos().x], [], 10000)
      if (tmp < shortestSoFar) {
        shortestSoFar = tmp;
      }
      tmp = this.lkv(pacmanNode, world[this.getPos().y + 1][this.getPos().x], [], 10000)
      if (tmp < shortestSoFar) {
        shortestSoFar = tmp
        dir = Direction.Down;
      }
      tmp = this.lkv(pacmanNode, world[this.getPos().y][this.getPos().x + 1], [], 10000)
      if (tmp < shortestSoFar) {
        shortestSoFar = tmp
        dir = Direction.Right;
      }
      tmp = this.lkv(pacmanNode, world[this.getPos().y][this.getPos().x - 1], [], 10000)
      if (tmp < shortestSoFar) {
        shortestSoFar = tmp
        dir = Direction.Left;
      }

      return dir;
    } else {
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

  lkv(endNode: node, nextNode: node, beenToNodes: node[], shortestSoFar: number) {
    let shortestLength: number = 1000000;
    if (nextNode.wall) {
      return 10000;
    }
    if (endNode == nextNode) {
      return beenToNodes.length;
    }

    for (let i: number = 0; i < nextNode.connections.length; i++) {
      // check if road has been travelled before on this trip
      let roadTravelled: boolean = false;
      for (let j = 0; j < beenToNodes.length; j++) {
        if (beenToNodes[j].x == nextNode.connections[i].x && beenToNodes[j].y == nextNode.connections[i].y) {
          roadTravelled = true;
          break;
        }
      }

      if (!roadTravelled) {

        // new piece of road :-)
        beenToNodes.push(nextNode);

        if (shortestSoFar > beenToNodes.length + 1) {
          let temp: number = this.lkv(endNode, nextNode.connections[i], beenToNodes, shortestSoFar);

          if (temp < shortestLength) {
            shortestSoFar = temp;
            shortestLength = temp;
          }
        }
        beenToNodes.pop();
      }
    }

    return shortestLength;
  }
}