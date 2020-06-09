import Vue from 'vue';
import * as PIXI from 'pixi.js';
import {Maze} from "./Maze";
import {MazeGenerator} from "./MazeGenerator";
import {Ball} from "./Ball";
import { Gravity } from './Gravity';

//Canvas height & width have to be a multiple of 13 + 20
const canvas_width:number = 800;
const canvas_height:number = 800;
const game_width:number = canvas_width - 20;
const game_height:number = canvas_height - 20;
const walls_thickness:number = 5;
const walls_distance:number = game_width / 13;
const walls_first_x:number = 5;
const walls_first_y:number = 5;
let physics_gravity: Gravity = new Gravity(2450, 0.15);
let mazeGenerator: MazeGenerator;
let timestamp:number;
let game_finished = false;
let pixiApp:PIXI.Application = new PIXI.Application({
    width: canvas_width,
    height: canvas_height,
    antialias: true,
    transparent: false,
    backgroundColor: 0xf2f3f4,
    resolution: 1
});

enum MoveDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

export const GraphicsComponent = Vue.extend({
    data: () => ({
        ball: new Ball((walls_distance/4),0x000000, walls_distance, (walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y, 0, 0),
        ball_rendered: new PIXI.Graphics(),
        maze: new Maze(game_width, game_height),
        walls: new PIXI.Graphics(),
        wall_container: new PIXI.Container()
    }),
    props: {
        paused: {
            type: Boolean,
            default: true,
            required: true
        },
        gameFinished: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    template: '<div></div>',
    mounted: function() {
        pixiApp.view.style.position = 'absolute';
        pixiApp.view.style.left = '42%';
        pixiApp.view.style.top = '50%';
        pixiApp.view.style.transform = 'translate3d( -42%, -50%, 0)';
        document.body.appendChild(pixiApp.view);

        this.initialize();
        pixiApp.stage.addChild(this.wall_container);
        pixiApp.stage.addChild(this.ball_rendered);

        let draw = () => {
            pixiApp.render();
            if(!this.gameFinished) {
                requestAnimationFrame(draw);
            }
        };

        draw();
    },
    methods: {
        onControlData(beta: number, gamma: number) {
            if ((!this.paused) && (this.gameFinished == false))
            {
                let delta_time = 0.05;

                let current_v_x = physics_gravity.calcVelocity(gamma, this.ball.v_x, delta_time);
                let delta_x = Math.round(physics_gravity.calcDeltaPosition(current_v_x, delta_time));

                let x_no_wall = true;

                if (delta_x > 0)
                    x_no_wall = this.moveBall(Math.abs(delta_x), MoveDirection.RIGHT);
                else
                    x_no_wall = this.moveBall(Math.abs(delta_x), MoveDirection.LEFT);

                if (x_no_wall == false)
                    this.ball.v_x = 0;

                let current_v_y = physics_gravity.calcVelocity(beta, this.ball.v_y, delta_time);
                let delta_y = Math.round(physics_gravity.calcDeltaPosition(current_v_y, delta_time));

                let y_no_wall = true;

                if (delta_y > 0)
                    y_no_wall = this.moveBall(Math.abs(delta_y), MoveDirection.DOWN);
                else
                    y_no_wall = this.moveBall(Math.abs(delta_y), MoveDirection.UP);

                if (y_no_wall == false)
                    this.ball.v_y = 0;
            }
        },
        resetBall: function () {
            pixiApp.stage.removeChild(this.ball_rendered);
            this.ball.x = walls_distance/2 + walls_first_x;
            this.ball.y = walls_distance/2 + walls_first_y;
            this.ball_rendered = new PIXI.Graphics();
            this.ball_rendered.beginFill(this.ball.color);
            this.ball_rendered.drawCircle(this.ball.x, this.ball.y, this.ball.radius);
            this.ball_rendered.endFill();
            pixiApp.stage.addChild(this.ball_rendered);
            this.$emit("change-game-finished-to-false");
        },
        initialize() {
            mazeGenerator = new MazeGenerator(this.maze);
            mazeGenerator.generateMaze();
            this.maze.draw(this.walls);
            this.wall_container.addChild(this.walls);
            this.ball_rendered.beginFill(this.ball.color);
            console.log("initialize" + this.ball.x + " " + this.ball.y);
            this.ball_rendered.drawCircle(this.ball.x, this.ball.y, this.ball.radius);
            this.ball_rendered.endFill();
        },
        moveBall(distance:number, direction:MoveDirection) {
            let successfulMove:boolean = true;
            for(let i:number = 0; i < distance; i++) {
                switch (direction) {
                    case MoveDirection.LEFT:
                        if (!this.maze.isNeighbourOrthogonalWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                            if (!this.maze.isNeighbourParallelWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                                this.ball_rendered.x -= 1;
                                this.ball.move(-1, 0);
                            }
                            else{
                                successfulMove = false;
                            }
                        }
                        else{
                            successfulMove = false;
                        }
                        break;
                    case MoveDirection.UP:
                        if (!this.maze.isNeighbourOrthogonalWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                            if (!this.maze.isNeighbourParallelWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                                this.ball_rendered.y -= 1;
                                this.ball.move(0, -1);
                            }
                            else{
                                successfulMove = false;
                            }
                        }
                        else{
                            successfulMove = false;
                        }
                        break;
                    case MoveDirection.RIGHT:
                        if (!this.maze.isNeighbourOrthogonalWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                            if (!this.maze.isNeighbourParallelWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                                this.ball_rendered.x += 1;
                                this.ball.move(+1, 0);
                            }
                            else{
                                successfulMove = false;
                            }
                        }
                        else{
                            successfulMove = false;
                        }
                        break;
                    case MoveDirection.DOWN:
                        if (!this.maze.isNeighbourOrthogonalWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                            if (!this.maze.isNeighbourParallelWall(this.ball.x, this.ball.y, direction, 1, this.ball.radius)) {
                                this.ball_rendered.y += 1;
                                this.ball.move(0, 1);
                            }
                            else{
                                successfulMove = false;
                            }
                        }
                        else{
                            successfulMove = false;
                        }
                        break;
                    default:
                        break;
                }
                if (this.ball.x >= (walls_first_x + game_width)) {
                    this.$emit("game-has-finished");
                }
                console.log("gameFinished: " + this.gameFinished);
                if(!successfulMove || this.gameFinished){
                    return successfulMove;
                }
            }
            return successfulMove;
        }
    }
});

export {
    walls_thickness,
    walls_distance,
    walls_first_y,
    walls_first_x,
    MoveDirection
};
