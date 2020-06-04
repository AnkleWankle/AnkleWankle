import Vue from 'vue';
import * as PIXI from 'pixi.js';

import { GraphicsComponent } from './components/GraphicsComponent';
import { Protocol } from '../common/protocol/Protocol';
import { ControlDeviceComponent } from './components/ControlDeviceComponent';
import { DeviceDecisionComponent } from './components/DeviceDecisionComponent';
import { DisplaySidebarComponent } from "./components/DisplaySidebarComponent";

// connect via socket.io
let socket = io();

let currentPixiApp: PIXI.Application | undefined = undefined;

// set up Vue
let app = new Vue({
    el: '#app',
    data: () => ({
        deviceType: undefined as (undefined | Protocol.DeviceType),
        connected: false,
        paused: true
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
        },
        onDeviceTypeSet(deviceType: Protocol.DeviceType) {
            // this function is called when DeviceDecisionComponent fires its 'device-type-set' event to signal that the user set the type of this device
            // let's tell the server that device type and the room we're in
            Protocol.emit(socket, Protocol.READY, deviceType, location.pathname.replace(/^\//, "").split("/")[0]);

            this.deviceType = deviceType;
        },
        onLocalSensorData(beta: number, gamma: number) {
            Protocol.emit(socket, Protocol.SENSOR_DATA, beta, gamma);
        },
        onRemoteSensorData(beta: number, gamma: number) {
            (this.$refs.graphics as InstanceType<typeof GraphicsComponent>).onControlData(beta, gamma);
        },
        changePaused() {
            console.log("client before pause change");
            this.paused = !this.paused;
        },
        resetBall(){
            (this.$refs.graphics as any).resetBall();
        },
        pauseGame(){
            this.paused = true;
        },
        gameFinished(){
            this.paused = true;
            (this.$refs.sidebar as any).stopClock();
        }
    }
});

Protocol.on(socket, Protocol.ROOM_STATUS, (roomStatus) => {
    app.connected = (roomStatus === "connected");
});

Protocol.on(socket, Protocol.SENSOR_DATA, (beta, gamma) => {
    app.onRemoteSensorData(beta, gamma);
});
