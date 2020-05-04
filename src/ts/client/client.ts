import Vue from 'vue';
import * as PIXI from 'pixi.js';

import { GraphicsComponent } from './components/GraphicsComponent';
import { Protocol } from '../common/protocol/Protocol';
import { ControlDeviceComponent } from './components/ControlDeviceComponent';
import { DeviceDecisionComponent } from './components/DeviceDecisionComponent';

// connect via socket.io
let socket = io();

// set up Vue
let app = new Vue({
    el: '#app',
    data: {device: null},
    components: {
        GraphicsComponent: GraphicsComponent,
        ControlDeviceComponent: ControlDeviceComponent,
        DeviceDecisionComponent: DeviceDecisionComponent
    },
    methods: {
        pixiApp(pixiApp: PIXI.Application) {

            // this function is called when GraphicsComponent fires its 'pixi-app' event to signal that we're ready to draw

            // let's tell the server the room we're in
            Protocol.emit(socket, Protocol.READY, location.pathname.replace(/^\//, "").split("/")[0]);

            Protocol.on(socket, Protocol.DRAW_STAR, (...args) => {
                if(pixiApp) {
                    let graphics = new PIXI.Graphics();
                    graphics.beginFill(0x00FF00);
                    graphics.drawStar(...args);
                    graphics.endFill();
                    graphics.x = pixiApp.view.width/2;
                    graphics.y = pixiApp.view.height/2;
                    pixiApp.stage.addChild(graphics);
                }
            });
        },
        deviceDecision() {
            // let's tell the server the room we're in
            Protocol.emit(socket, Protocol.READY, location.pathname.replace(/^\//, "").split("/")[0]);

            Protocol.on(socket, Protocol.CHOOSE_DEVICE, () => {
                //alert("CHOOSE DEVICE");
            });
        }

    }
});