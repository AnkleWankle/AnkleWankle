class Ball {
  readonly radius: number;
  readonly color: number;
  readonly  border_distance: number;
  x: number;
  y: number;

  constructor(radius: number, color: number, border_distance:number, x: number, y: number){
      this.radius = radius;
      this.color = color;
      this.border_distance = border_distance;
      this.x = x;
      this.y = y;
  }
}

export {
    Ball,
};
