import Vue from 'vue';
import * as PIXI from 'pixi.js';
import {Maze} from "./Maze";
import {MazeGenerator} from "./MazeGenerator";
import {Ball} from "./Ball";

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
        let ball:Ball;
        let ball_rendered:PIXI.Graphics;
        reset();
        pixiApp.stage.addChild(wall_container);
        pixiApp.stage.addChild(ball_rendered);
        let i:number = 0;
        let draw = () => {
            if(i < 100000 && !this.paused) {
                if(i<150){
                if(!maze.isNeighbourWall(ball.x, ball.y,MoveDirection.RIGHT, 1,ball.radius)){
                    ball_rendered.x += 1;
                    ball_rendered.y += 0;
                    ball.move(+1,+0);
                }}
            else if(i<300){
                if(!maze.isNeighbourWall(ball.x, ball.y, MoveDirection.LEFT, 1, ball.radius)){
                    ball_rendered.x -= 1;
                    ball_rendered.y -= 0;
                    ball.move(-1,+0);
                }
                }
            else if(i<600){
                if(!maze.isNeighbourWall(ball.x, ball.y, MoveDirection.DOWN, 1,ball.radius)){
                    ball_rendered.x += 0;
                    ball_rendered.y += 1;
                    ball.move(+0,+1);
                }
                }
            else if(i<1135){
                let isEven:boolean = (i%2) == 0;
                switch(isEven){
                    case true:
                        if(!maze.isNeighbourWall(ball.x, ball.y, MoveDirection.RIGHT, 1,ball.radius)){
                            ball_rendered.x += 1;
                            ball_rendered.y += 0;
                            ball.move(+1,+0);
                        }
                        break;
                    case false:
                        if(!maze.isNeighbourWall(ball.x,ball.y,MoveDirection.UP, 1,ball.radius)){
                            ball_rendered.x += 0;
                            ball_rendered.y -= 1;
                            ball.move(+0, -1);
                        }
                        break;
                    default:
                        break;
                }
                }
            else{
                if(!maze.isNeighbourWall(ball.x, ball.y, MoveDirection.LEFT, 1, ball.radius)){
                    ball_rendered.x -= 1;
                    ball_rendered.y += 0;
                    ball.move(-1, +0);
                }
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
            ball = new Ball((walls_distance/3),0x000000, walls_distance, (walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y);
            ball_rendered = new PIXI.Graphics();
            ball_rendered.beginFill(ball.color);
            ball_rendered.drawCircle(ball.x, ball.y, ball.radius);
            ball_rendered.endFill();
        }
    },
    methods: {
        onControlData(x: number, y: number) {
            console.log("GraphicsComponent got control data: x=", x, "y=", y);
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
