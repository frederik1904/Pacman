import "./style.css";
import P5 from "p5";
//import WorldBlock from "./WorldBlock";
import { Cheese } from './Actor/Cheese';
import { Ghost } from './Actor/Ghost';
import { Pacman } from './Actor/Pacman';
import { Wall } from './Wall'

class WorldBlock {
  private cheese: Cheese; private ghost: Ghost; private pacman: Pacman; private wall: Wall;

  constructor(cheese: Cheese, ghost: Ghost, pacman: Pacman, wall: Wall) {
    this.cheese = cheese;
    this.ghost = ghost;
    this.pacman = pacman;
    this.wall = wall;
  }

  
}


new P5((p5: P5) => {
  let w: number = 400;
  let h: number = 400;
  let frameRate: number = 30;
  let world = [];

  p5.setup = () => {
    p5.pixelDensity(1);
    p5.createCanvas(w, h);
    p5.frameRate(frameRate);
    createWorld();
  };

  function createWorld() {
    for (let i: number = 0; i < 25; i++) {
      world[i] = [];
      for (let j: number = 0; j < 19; j++) {
        if (i == 1 || j == 1) {
          world[i][j] = new WorldBlock(null, null, null, new Wall());
        } else {
          world[i][j] = new WorldBlock(null, null, null, null);
        }
      }
    }
  }

  // int[][] labyrinth = {
  //               {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1},
  //               {1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
  //               {1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1},
  //               {1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1},
  //               {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
  //           };

  // function foodLocation() {
  //   let x = p5.floor(p5.random(w));
  //   let y = p5.floor(p5.random(h));
  //   food = p5.createVector(x, y);
  // }

  // p5.keyPressed = () => {
  //   switch (p5.keyCode) {
  //     case p5.LEFT_ARROW: {
  //       snake.setDir(-1, 0);
  //       break;
  //     }
  //     case p5.RIGHT_ARROW: {
  //       snake.setDir(1, 0);
  //       break;
  //     }
  //     case p5.DOWN_ARROW: {
  //       snake.setDir(0, 1);
  //       break;
  //     }
  //     case p5.UP_ARROW: {
  //       snake.setDir(0, -1);
  //       break;
  //     }
  //   }
  // };

  p5.draw = () => {
    // p5.scale(rez);
    p5.background(220);
    // for (let i: number = 0; i < 25; i++) {
    //   for (let j: number = 0; j < 19; j++) {
    //     console.log(world[i][j]);
    //   }
    // }
    // if (snake.eat(food)) {
    //   foodLocation();
    // }
    // snake.update();
    // snake.show();

    // if (snake.endGame()) {
    //   p5.print("END GAME");
    //   p5.background(255, 0, 0);
    //   p5.noLoop();
    // }

    // p5.noStroke();
    // p5.fill(255, 0, 0);
    // p5.rect(food.x, food.y, 1, 1);
  };
});


