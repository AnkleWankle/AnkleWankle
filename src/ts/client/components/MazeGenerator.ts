import {Maze, Wall, WallDirection} from "./Maze";
import {walls_distance, walls_first_x, walls_first_y, walls_thickness} from "./GraphicsComponent";

class MazeGenerator{
    maze: Maze;

    constructor(maze: Maze){
        this.maze = maze;
    }

    generateMaze(){
        //surrounding walls
        //top wall
        let wall: Wall;
        wall = new Wall(walls_first_x, walls_first_y, WallDirection.HORIZONTAL, this.maze.w, true);
        this.maze.walls.push(wall);
        //bottom wall
        wall = new Wall(walls_first_x, walls_first_y + this.maze.h, WallDirection.HORIZONTAL, this.maze.w + walls_thickness, true);
        this.maze.walls.push(wall);
        //left wall
        wall = new Wall(walls_first_x, walls_first_y + walls_distance, WallDirection.VERTICAL, this.maze.h - walls_distance,true);
        this.maze.walls.push(wall);
        //right wall
        wall = new Wall(walls_first_x + this.maze.w , walls_first_y, WallDirection.VERTICAL, this.maze.h - walls_distance, true);
        this.maze.walls.push(wall);

        let walls_current_x = walls_first_x + walls_distance;
        let walls_current_y = walls_first_y + walls_distance;

        //first column
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //second column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*3, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //third column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);

        //fourth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*6, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*7;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //fifth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //sixth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*3, true);
        this.maze.walls.push(wall);

        //seventh column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*3, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*3, true);
        this.maze.walls.push(wall);

        //eigth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance*8;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //ninth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*6;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //tenth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*3, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //eleventh column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y + walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*6;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //twelfth column
        walls_current_x += walls_distance;
        walls_current_y = walls_first_y;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_y += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.VERTICAL, walls_distance, true);
        this.maze.walls.push(wall);

        //first row
        walls_current_x = walls_first_x + walls_distance*3;
        walls_current_y = walls_first_y + walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //second row
        walls_current_x = walls_first_x + walls_distance*2;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*4, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //third row
        walls_current_x = walls_first_x + walls_distance;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //fourth row
        walls_current_x = walls_first_x + walls_distance;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*6, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*8;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //fifth row
        walls_current_x = walls_first_x ;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //sixth row
        walls_current_x = walls_first_x + walls_distance;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*5, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*7;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*4, true);
        this.maze.walls.push(wall);

        //seventh row
        walls_current_x = walls_first_x + walls_distance*2;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*3, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);

        //eight row
        walls_current_x = walls_first_x;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*3, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*5;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);

        //ninth row
        walls_current_x = walls_first_x + walls_distance*2;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*10, true);
        this.maze.walls.push(wall);

        //tenth row
        walls_current_x = walls_first_x;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*9;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);

        //eleventh row
        walls_current_x = walls_first_x + walls_distance;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*4;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*3, true);
        this.maze.walls.push(wall);

        //twelfth row
        walls_current_x = walls_first_x;
        walls_current_y += walls_distance;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*3;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*6;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance, true);
        this.maze.walls.push(wall);
        walls_current_x += walls_distance*2;
        wall = new Wall(walls_current_x, walls_current_y, WallDirection.HORIZONTAL, walls_thickness + walls_distance*2, true);
        this.maze.walls.push(wall);
    }
}

export {
    MazeGenerator,
};
