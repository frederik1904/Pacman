import P5 from 'p5';

export class Snake {

  private body: P5.Vector<number, number> = [];
  private xdir: number = 0;
  private ydir: number = 0;
  private len: number = 0;

  constructor(private p5: P5, private w: number, private h: number) {
    this.body[0] = p5.createVector(p5.floor(w / 2), p5.floor(h / 2));
  }

  public setDir(x: number, y: number): void {
    this.xdir = x;
    this.ydir = y;
  }

  public update(): void {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  private grow(): void {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  public endGame(): boolean {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > this.w - 1 || x < 0 || y > this.h - 1 || y < 0) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  public eat(pos: P5.Vector): boolean {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x == pos.x && y == pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  public show(): void {
    for (let i = 0; i < this.body.length; i++) {
      this.p5.fill(0);
      this.p5.noStroke();
      this.p5.rect(this.body[i].x, this.body[i].y, 1, 1)
    }
  }
}