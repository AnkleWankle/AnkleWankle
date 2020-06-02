
export class Ball {
    readonly radius: number;
    readonly color: number;
    readonly  border_distance: number;
    x: number;
    y: number;
    v_x: number;
    v_y: number;

    constructor(radius: number, color: number, border_distance:number, x: number, y: number, v_x: number, v_y: number){
        this.radius = radius;
        this.color = color;
        this.border_distance = border_distance;
        this.x = x;
        this.y = y;
        this.v_x = v_x;
        this.v_y = v_y;
    }

    public move(x: number, y: number){
        this.x += x;
        this.y += y;
    }
}
