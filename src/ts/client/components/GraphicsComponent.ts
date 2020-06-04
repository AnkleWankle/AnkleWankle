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
let game_finished = false;
let physics_gravity: Gravity = new Gravity(450, 0.1);
// let ball:Ball;
// let ball_rendered:PIXI.Graphics;
let mazeGenerator: MazeGenerator;

let timestamp:number;
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
        ball: new Ball((walls_distance/3),0x000000, walls_distance, (walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y, 0, 0),
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
        }
    },
    template: '<div></div>',
    mounted: function() {

        //this.$el.appendChild(pixiApp.view);
        //this.$emit('pixi-app', pixiApp);
        pixiApp.view.style.position = 'absolute';
        pixiApp.view.style.left = '42%';
        pixiApp.view.style.top = '50%';
        pixiApp.view.style.transform = 'translate3d( -42%, -50%, 0)';
        document.body.appendChild(pixiApp.view);

        // const maze:Maze = new Maze(game_width, game_height);
        // let mazeGenerator:MazeGenerator;

        //Container that contains the walls of the labyrinth
        // let wall_container = new PIXI.Container();
        // let walls: PIXI.Graphics;
        // let ball: Ball;
        // let ball_rendered = new PIXI.Graphics();


        this.initialize();
        pixiApp.stage.addChild(this.wall_container);
        pixiApp.stage.addChild(this.ball_rendered);

        // let i = 0;
        let draw = () => {
            // if(i < 100000 && !this.paused) {
            //     if(i<150){
            //         this.moveBall(1, MoveDirection.RIGHT);
            //     }
            //     else if(i<300){
            //         this.moveBall(1, MoveDirection.LEFT);
            //     }
            //     else if(i<600){
            //         this.moveBall(1, MoveDirection.DOWN);
            //     }
            //     else if(i<1135){
            //         let isEven:boolean = (i%2) == 0;
            //         switch(isEven){
            //             case true:
            //                 this.moveBall(1, MoveDirection.RIGHT);
            //                 break;
            //             case false:
            //                 this.moveBall(1, MoveDirection.UP);
            //                 break;
            //             default:
            //                 break;
            //         }
            //     }
            //     else{
            //         this.moveBall(1, MoveDirection.LEFT);
            //     }
            //     pixiApp.render();
            //     i++;
            // }
            // if(i == 1500){
            //     game_finished = true;
            // }
            pixiApp.render();
            if(game_finished){}
            else{
                requestAnimationFrame(draw);
            }
        };

        draw();
    },
    methods: {
        onControlData(beta: number, gamma: number) {
            if ((!this.paused) && (game_finished == false))
            {
                // console.log("GraphicsComponent got control data: x=", x, "y=", y);
                // let d = new Date();
                // let ts =  d.getTime();
                let delta_time = 0.1;//ts-timestamp;
                // timestamp = ts;

                let current_v_x = physics_gravity.calcVelocity(gamma, this.ball.v_x, delta_time);
                // ball.v_x = current_v_x;
                let delta_x = Math.round(physics_gravity.calcDeltaPosition(current_v_x, delta_time));

                // console.log("GraphicsComponent got control data: x=", delta_x);

                // this.ball_rendered.x += delta_x;
                // ball.move(delta_x,+0);

                if (delta_x > 0)
                    this.moveBall(Math.abs(delta_x), MoveDirection.RIGHT);
                else
                    this.moveBall(Math.abs(delta_x), MoveDirection.LEFT);

                let current_v_y = physics_gravity.calcVelocity(beta, this.ball.v_y, delta_time);
                // ball.v_y = current_v_y;
                let delta_y = Math.round(physics_gravity.calcDeltaPosition(current_v_y, delta_time));

                // console.log("GraphicsComponent got control data: y=", delta_y);

                // this.ball_rendered.y += delta_y;
                // this.ball.move(delta_x,delta_y);

                if (delta_y > 0)
                    this.moveBall(Math.abs(delta_y), MoveDirection.DOWN);
                else
                    this.moveBall(Math.abs(delta_y), MoveDirection.UP);
            }


            /***************************** */
            // let delta_x: number;

            // if (gamma > 10)
            //     delta_x = 1;
            // else if (gamma < -10)
            //     delta_x = -1;
            // else
            //     delta_x = 0;


            // let delta_y: number;

            // if (beta > 10)
            //     delta_y = 1;
            // else if (beta < -10)
            //     delta_y = -1;
            // else
            //     delta_y = 0;

            // console.log("GraphicsComponent got control data: x=", delta_x);

            // // ball.v_x += delta_x;
            // ball_rendered.x += delta_x;
            // ball.move(delta_x,+0);

            // // ball.v_y += delta_x;
            // ball_rendered.y += delta_y;
            // ball.move(+0,delta_y);
            /***************************** */

            // TODO
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
            game_finished = false;
        },
        initialize() {
            mazeGenerator = new MazeGenerator(this.maze);
            mazeGenerator.generateMaze();
            // this.walls = new PIXI.Graphics();
            this.maze.draw(this.walls);
            this.wall_container.addChild(this.walls);
            // ball = new Ball((walls_distance/3),0x000000, walls_distance, (walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y, 0, 0);
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
                    game_finished = true;
                    this.$emit("game-finished");
                }
                if(!successfulMove){
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
