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
export let physics_gravity: Gravity = new Gravity(150, 0.1);
let ball:Ball;
let ball_rendered:PIXI.Graphics;
let timestamp:number;

enum MoveDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

export const GraphicsComponent = Vue.extend({
    data: () => ({}),
    props: {
        paused: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    template: '<div></div>',
    mounted: function() {
        let pixiApp:PIXI.Application = new PIXI.Application({
            width: canvas_width,
            height: canvas_height,
            antialias: true,
            transparent: false,
            backgroundColor: 0xf2f3f4,
            resolution: 1
        });
        //this.$el.appendChild(pixiApp.view);
        //this.$emit('pixi-app', pixiApp);
        pixiApp.view.style.position = 'absolute';
        pixiApp.view.style.left = '42%';
        pixiApp.view.style.top = '50%';
        pixiApp.view.style.transform = 'translate3d( -42%, -50%, 0)';
        document.body.appendChild(pixiApp.view);

        const maze:Maze = new Maze(game_width, game_height);
        let mazeGenerator:MazeGenerator;

        //Container that contains the walls of the labyrinth
        let wall_container:PIXI.Container;
        let walls:PIXI.Graphics;
        reset();
        pixiApp.stage.addChild(wall_container);
        pixiApp.stage.addChild(ball_rendered);
        let i:number = 0;
        let draw = () => {
            if(i < 100000 && !this.paused) {
                if(i<150){
                    moveBall(1, MoveDirection.RIGHT);
                }
                else if(i<300){
                    moveBall(1, MoveDirection.LEFT);
                }
                else if(i<600){
                    moveBall(1, MoveDirection.DOWN);
                }
                else if(i<1135){
                    let isEven:boolean = (i%2) == 0;
                    switch(isEven){
                        case true:
                            moveBall(1, MoveDirection.RIGHT);
                            break;
                        case false:
                            moveBall(1, MoveDirection.UP);
                            break;
                        default:
                            break;
                    }
                }
                else{
                    moveBall(1, MoveDirection.LEFT);
                }
                pixiApp.render();
                i++;
            }
            if(i == 1500){
                game_finished = true;
            }
            if(game_finished){}
            else{
                requestAnimationFrame(draw);
            }
        };
        draw();

        function reset(){
            mazeGenerator = new MazeGenerator(maze);
            mazeGenerator.generateMaze();
            wall_container = new PIXI.Container();
            walls = new PIXI.Graphics();
            maze.draw(walls);
            wall_container.addChild(walls);
            ball = new Ball((walls_distance/3),0x000000, walls_distance, (walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y, 0, 0);
            ball_rendered = new PIXI.Graphics();
            ball_rendered.beginFill(ball.color);
            ball_rendered.drawCircle(ball.x, ball.y, ball.radius);
            ball_rendered.endFill();
        }
        function moveBall(distance:number, direction:MoveDirection){
            let successfulMove:boolean = false;
            switch(direction){
                case MoveDirection.LEFT:
                    if(!maze.isNeighbourOrthogonalWall(ball.x,ball.y, direction, distance, ball.radius)){
                        if(!maze.isNeighbourParallelWall(ball.x, ball.y, direction, distance, ball.radius)){
                            ball_rendered.x -= distance;
                            ball.move(-distance, 0);
                            successfulMove = true;
                        }
                    }
                    break;
                case MoveDirection.UP:
                    if(!maze.isNeighbourOrthogonalWall(ball.x,ball.y, direction, distance, ball.radius)){
                        if(!maze.isNeighbourParallelWall(ball.x, ball.y, direction, distance, ball.radius)){
                            ball_rendered.y -= distance;
                            ball.move(0, -distance);
                            successfulMove = true;
                        }
                    }
                    break;
                case MoveDirection.RIGHT:
                    if(!maze.isNeighbourOrthogonalWall(ball.x,ball.y, direction, distance, ball.radius)){
                        if(!maze.isNeighbourParallelWall(ball.x, ball.y, direction, distance, ball.radius)){
                            ball_rendered.x += distance;
                            ball.move(+distance, 0);
                            successfulMove = true;
                        }
                    }
                    break;
                case MoveDirection.DOWN:
                    if(!maze.isNeighbourOrthogonalWall(ball.x,ball.y, direction, distance, ball.radius)){
                        if(!maze.isNeighbourParallelWall(ball.x, ball.y, direction, distance, ball.radius)){
                            ball_rendered.y += distance;
                            ball.move(0, distance);
                            successfulMove = true;
                        }
                    }
                    break;
                default:
                    break;
            }
            if(ball.x >= (walls_first_x + game_width)){
                game_finished = true;
            }
            return successfulMove;
        }
    },
    methods: {
        onControlData(beta: number, gamma: number) {
            if (!this.paused)
            {
                // console.log("GraphicsComponent got control data: x=", x, "y=", y);
                // let d = new Date();
                // let ts =  d.getTime();
                let delta_time = 0.1;//ts-timestamp;
                // timestamp = ts;

                let current_v_x = physics_gravity.calcVelocity(gamma, ball.v_x, delta_time);
                // ball.v_x = current_v_x;
                let delta_x = physics_gravity.calcDeltaPosition(current_v_x, delta_time);

                // console.log("GraphicsComponent got control data: x=", delta_x);

                ball_rendered.x += delta_x;
                // ball.move(delta_x,+0);


                let current_v_y = physics_gravity.calcVelocity(beta, ball.v_y, delta_time);
                // ball.v_y = current_v_y;
                let delta_y = physics_gravity.calcDeltaPosition(current_v_y, delta_time);

                // console.log("GraphicsComponent got control data: y=", delta_y);

                ball_rendered.y += delta_y;
                ball.move(delta_x,delta_y);
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
        }
    }
});

export {
    walls_thickness,
    walls_distance,
    walls_first_y,
    walls_first_x,
    MoveDirection,
};
