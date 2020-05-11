import * as PIXI from "pixi.js";
import { walls_thickness} from "./GraphicsComponent";

enum WallDirection {
    HORIZONTAL,
    VERTICAL
}

class Wall {
    readonly x: number;
    readonly y: number;
    readonly direction: WallDirection;
    readonly length: number;
    readonly isWall: boolean;

    constructor(x: number, y: number, direction: WallDirection, length: number, isWall: boolean) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.length = length;
        this.isWall = isWall;
    }
}

class Maze {
    readonly w: number;
    readonly h: number;
    walls: Wall[];

    constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
        this.walls = [];
    }

    draw(graphics: PIXI.Graphics){
        graphics.beginFill(0x000000);
        for (let i = 0; i < this.walls.length; i++){
            if(this.walls[i].isWall){
                switch(this.walls[i].direction){
                    case WallDirection.HORIZONTAL:
                        graphics.drawRect(this.walls[i].x, this.walls[i].y, this.walls[i].length, walls_thickness);
                        break;
                    case WallDirection.VERTICAL:
                        graphics.drawRect(this.walls[i].x, this.walls[i].y, walls_thickness, this.walls[i].length);
                        break;
                }
            }
        }
        graphics.endFill();
        return graphics;
    }
}

export {
    Wall,
    Maze,
    WallDirection,
};
