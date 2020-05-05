import Vue from 'vue';
import * as PIXI from 'pixi.js';

import { GraphicsComponent } from './components/GraphicsComponent';
import { Protocol } from '../common/protocol/Protocol';
import { ControlDeviceComponent } from './components/ControlDeviceComponent';
import { DeviceDecisionComponent } from './components/DeviceDecisionComponent';
import {DisplaySidebarComponent} from "./components/DisplaySidebarComponent";

// connect via socket.io
let socket = io();

let currentPixiApp: PIXI.Application | undefined = undefined;
let drawStarQueue: Parameters<Protocol.CallbackTypeFromMessageType<typeof Protocol.DRAW_STAR>>[] = [];

// set up Vue
let app = new Vue({
    el: '#app',
    data: () => ({
        deviceType: undefined as (undefined | Protocol.DeviceType)
    }),
    components: {
        GraphicsComponent: GraphicsComponent,
        ControlDeviceComponent: ControlDeviceComponent,
        DeviceDecisionComponent: DeviceDecisionComponent,
        DisplaySidebarComponent: DisplaySidebarComponent
    },
    methods: {
        pixiApp(pixiApp: PIXI.Application) {
            // this function is called when GraphicsComponent fires its 'pixi-app' event to signal that we're ready to draw
            currentPixiApp = pixiApp;

            console.log(`PIXI app ready, number of queued draw star messages: ${drawStarQueue.length}`);

            // if we already received any draw star messages before the pixi app became ready, draw them now
            for(let args of drawStarQueue) { // drawStartQueue might be empty
                drawStar(pixiApp, args);
            }
            drawStarQueue = [];
        },
        onDeviceTypeSet(deviceType: Protocol.DeviceType) {
            // this function is called when DeviceDecisionComponent fires its 'device-type-set' event to signal that the user set the type of this device
            // let's tell the server that device type and the room we're in
            Protocol.emit(socket, Protocol.READY, deviceType, location.pathname.replace(/^\//, "").split("/")[0]);

            this.deviceType = deviceType;
        }
    }
});

function drawStar(pixiApp: PIXI.Application, args: Parameters<PIXI.Graphics["drawStar"]>) {
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x00FF00);
    graphics.drawStar(...args);
    graphics.endFill();
    graphics.x = pixiApp.view.width/2;
    graphics.y = pixiApp.view.height/2;
    pixiApp.stage.addChild(graphics);
}

Protocol.on(socket, Protocol.DRAW_STAR, (...args) => {
    if(currentPixiApp !== undefined) {
        // pixi app is already ready, draw the star
        drawStar(currentPixiApp, args);
    } else {
        // pixi app is not ready yet, queue the request
        drawStarQueue.push(args);
    }
});
