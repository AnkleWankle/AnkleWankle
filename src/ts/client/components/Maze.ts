import * as PIXI from "pixi.js";
import {MoveDirection, walls_distance, walls_first_x, walls_first_y, walls_thickness} from "./GraphicsComponent";

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

    isNeighbourOrthogonalWall(x:number, y:number, direction:MoveDirection, distance:number, radius:number) {
        let neighbourIsWall:boolean = false;
        let relevantWallIndex:number = 0;
        let wallDirection:WallDirection;
        let ballUpperEdge = y - radius;
        if(direction == MoveDirection.UP){
            ballUpperEdge -= walls_thickness;
        }
        let ballLowerEdge = y + radius;
        let ballLeftEdge = x - radius;
        if(direction == MoveDirection.LEFT){
            ballLeftEdge -= walls_thickness;
        }
        let ballRightEdge = x + radius;
        let xWall:number = 0;
        let yWall:number = 0;

        if(direction == MoveDirection.LEFT || direction == MoveDirection.RIGHT){
            wallDirection = WallDirection.VERTICAL;
        }
        else{
            wallDirection = WallDirection.HORIZONTAL;
        }
        if(wallDirection == WallDirection.VERTICAL){
            let fieldNumber = Math.floor((x-walls_first_x)/walls_distance);
            xWall = fieldNumber * walls_distance + walls_first_x;
            if(direction == MoveDirection.RIGHT){
                xWall += walls_distance;
            }
            for(let i = 0; i < this.walls.length; i++){
                if(this.walls[i].direction == wallDirection){
                    if(this.walls[i].x == xWall){
                        relevantWallIndex = i;
                        break;
                    }
                }
            }
        }
        else{
            let fieldNumber = Math.floor((y-walls_first_y)/walls_distance);
            yWall = fieldNumber * walls_distance + walls_first_y;
            if(direction == MoveDirection.DOWN){
                yWall += walls_distance;
            }
            for(let i = 0; i < this.walls.length; i++){
                if(this.walls[i].direction == wallDirection){
                    if(this.walls[i].y == yWall){
                        relevantWallIndex = i;
                        break;
                    }
                }
            }
        }
        for(let i = 0; i < distance; i++){
            let j:number = relevantWallIndex;
            let yWallCompare:number = yWall;
            let xWallCompare:number = xWall;
            switch(direction){
                case MoveDirection.UP:
                    ballUpperEdge -= 1;
                    while(yWallCompare == yWall){
                        if(ballUpperEdge == this.walls[j].y){
                            if(ballLeftEdge >= this.walls[j].x && ballLeftEdge <= (this.walls[j].x + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if(ballRightEdge >= this.walls[j].x && ballRightEdge <= (this.walls[j].x + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            yWallCompare = this.walls[j].y;
                        }
                        else{
                            yWallCompare = yWall-1;
                        }
                    }
                    break;
                case MoveDirection.DOWN:
                    ballLowerEdge += 1;
                    while(yWallCompare == yWall){
                        if(ballLowerEdge == this.walls[j].y){
                            if(ballLeftEdge >= this.walls[j].x && ballLeftEdge <= (this.walls[j].x + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if(ballRightEdge >= this.walls[j].x && ballRightEdge <= (this.walls[j].x + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            yWallCompare = this.walls[j].y;
                        }
                        else{
                            yWallCompare = yWall-1;
                        }
                    }
                    break;
                case MoveDirection.LEFT:
                    ballLeftEdge -= 1;
                    while(xWallCompare == xWall){
                        if(ballLeftEdge == this.walls[j].x){
                            if(ballUpperEdge >= this.walls[j].y && ballUpperEdge <= (this.walls[j].y + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if(ballLowerEdge >= this.walls[j].y && ballLowerEdge <= (this.walls[j].y + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            xWallCompare = this.walls[j].x;
                        }
                        else{
                            xWallCompare = xWall-1;
                        }
                    }
                    break;
                case MoveDirection.RIGHT:
                    ballRightEdge += 1;
                    while(xWallCompare == xWall){
                        if(ballRightEdge == this.walls[j].x){
                            if(ballUpperEdge >= this.walls[j].y && ballUpperEdge <= (this.walls[j].y + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if(ballLowerEdge >= this.walls[j].y && ballLowerEdge <= (this.walls[j].y + this.walls[j].length)){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            xWallCompare = this.walls[j].x;
                        }
                        else{
                            xWallCompare = xWall-1;
                        }
                    }
                    break;
                default:
                    break
            }
            if(neighbourIsWall){
                break;
            }
        }
        return neighbourIsWall;
    }

    isNeighbourParallelWall(x:number, y:number, direction:MoveDirection, distance:number, radius:number){
        let neighbourIsWall:boolean = false;
        let relevantWallIndex:number = 0;
        let wallDirection:WallDirection;
        let ballUpperEdge = y - radius;
        if(direction == MoveDirection.UP){
            ballUpperEdge -= walls_thickness;
        }
        let ballLowerEdge = y + radius;
        let ballLeftEdge = x - radius;
        if(direction == MoveDirection.LEFT){
            ballLeftEdge -= walls_thickness;
        }
        let ballRightEdge = x + radius;
        let xWall:number = 0;
        let yWall:number = 0;
        if(direction == MoveDirection.LEFT || direction == MoveDirection.RIGHT){
            wallDirection = WallDirection.HORIZONTAL;
        }
        else{
            wallDirection = WallDirection.VERTICAL;
        }

        if(wallDirection == WallDirection.HORIZONTAL){
            let fieldNumber = Math.round((y-walls_first_y)/walls_distance);
            yWall = fieldNumber * walls_distance + walls_first_y;
            for(let i = 0; i < this.walls.length; i++){
                if(this.walls[i].direction == wallDirection){
                    if(this.walls[i].y == yWall){
                        relevantWallIndex = i;
                        break;
                    }
                }
            }
        }
        else{
            let fieldNumber = Math.round((x-walls_first_x)/walls_distance);
            xWall = fieldNumber * walls_distance + walls_first_x;
            for(let i = 0; i < this.walls.length; i++){
                if(this.walls[i].direction == wallDirection){
                    if(this.walls[i].x == xWall){
                        relevantWallIndex = i;
                        break;
                    }
                }
            }
        }

        for(let i = 0; i < distance; i++){
            let j:number = relevantWallIndex;
            let yWallCompare:number = yWall;
            let xWallCompare:number = xWall;
            switch(direction){
                case MoveDirection.UP:
                    ballUpperEdge -= 1;
                    while(xWallCompare == xWall){
                        if(ballUpperEdge >= this.walls[j].y && ballUpperEdge <= (this.walls[j].y + this.walls[j].length)){
                            if(xWallCompare >= ballLeftEdge && xWallCompare <= ballRightEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if((xWallCompare + walls_thickness) >= ballLeftEdge && (xWallCompare + walls_thickness) <= ballRightEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            xWallCompare = this.walls[j].x;
                        }
                        else{
                            xWallCompare = xWall-1;
                        }
                    }
                    break;
                case MoveDirection.DOWN:
                    ballLowerEdge += 1;
                    while(xWallCompare == xWall){
                        if(ballLowerEdge >= this.walls[j].y && ballLowerEdge <= (this.walls[j].y + this.walls[j].length)){
                            if(xWallCompare >= ballLeftEdge && xWallCompare <= ballRightEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if((xWallCompare + walls_thickness) >= ballLeftEdge && (xWallCompare + walls_thickness) <= ballRightEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            xWallCompare = this.walls[j].x;
                        }
                        else{
                            xWallCompare = xWall-1;
                        }
                    }
                    break;
                case MoveDirection.LEFT:
                    ballLeftEdge -= 1;
                    while(yWallCompare == yWall){
                        if(ballLeftEdge >= this.walls[j].x && ballLeftEdge <= (this.walls[j].x + this.walls[j].length)){
                            if(yWallCompare >= ballUpperEdge && yWallCompare <= ballLowerEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if((yWallCompare + walls_thickness) >= ballUpperEdge && (yWallCompare + walls_thickness) <= ballLowerEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            yWallCompare = this.walls[j].y;
                        }
                        else{
                            yWallCompare = yWall-1;
                        }
                    }
                    break;
                case MoveDirection.RIGHT:
                    ballRightEdge += 1;
                    while(yWallCompare == yWall){
                        if(ballRightEdge >= this.walls[j].x && ballRightEdge <= (this.walls[j].x + this.walls[j].length)){
                            if(yWallCompare >= ballUpperEdge && yWallCompare <= ballLowerEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                            else if((yWallCompare + walls_thickness) >= ballUpperEdge && (yWallCompare + walls_thickness) <= ballLowerEdge){
                                neighbourIsWall = true;
                                return neighbourIsWall;
                            }
                        }
                        j++;
                        if(j < this.walls.length){
                            yWallCompare = this.walls[j].y;
                        }
                        else{
                            yWallCompare = yWall-1;
                        }
                    }
                    break;
                default:
                    break;
            }
            if(neighbourIsWall){
                break;
            }
        }
        return neighbourIsWall;
    }
}

export {
    Wall,
    Maze,
    WallDirection,
};
