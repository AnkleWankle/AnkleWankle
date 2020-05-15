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

export const GraphicsComponent = Vue.extend({
    data: () => ({}),
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

        const maze:Maze = new Maze(game_width, game_height);
        const mazeGenerator:MazeGenerator = new MazeGenerator(maze);
        mazeGenerator.generateMaze();
        document.body.appendChild(pixiApp.view);

        //Container that contains the walls of the labyrinth
        const wall_container:PIXI.Container = new PIXI.Container();
        pixiApp.stage.addChild(wall_container);
        let walls:PIXI.Graphics = new PIXI.Graphics();
        maze.draw(walls);
        wall_container.addChild(walls);

        let ball:Ball = new Ball((walls_distance/3),0x000000, walls_distance,(walls_distance/2) + walls_first_x,(walls_distance/2) + walls_first_y);
        let ball_rendered:PIXI.Graphics = new PIXI.Graphics();
        ball_rendered.beginFill(ball.color);
        ball_rendered.drawCircle(ball.x, ball.y, ball.radius);
        ball_rendered.endFill();
        pixiApp.stage.addChild(ball_rendered);
    }
});

export {
    walls_thickness,
    walls_distance,
    walls_first_y,
    walls_first_x,
};
