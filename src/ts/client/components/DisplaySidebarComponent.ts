import Vue from 'vue';
import {Timer} from "../Timer";

export const DisplaySidebarComponent = Vue.extend({
    data: () => ({
        loc: location,
        timer: new Timer(),
        //device: "Some device" // wird gestrichen
    }),
    props: {
        connected: {
            type: Boolean,
            default: false,
            required: true
        },
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
    template: `
    <div class="sidebar">
        <div class="bottom-border">
            <div class="row">
                <div class="col">
                    <h1 class="textcenter"><b>AnkleWankle</b></h1>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img class="imgcenter" width="80" height="80" src="/static/img/hourglass-icon.png">
                    <h3 class="textcenter"> {{timer.minSec}}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img v-if="paused" v-on:click="togglePausedStatus()"  class="imgcenter" width="70" height="70" src="/static/img/play-button.png">
                    <img v-if="!paused" v-on:click="togglePausedStatus()"  class="imgcenter" width="70" height="70" src="/static/img/pause-button.png">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img v-on:click="reset()" width="80" height="80" class="imgcenter" src="/static/img/reset-button.png">
                </div>
            </div>
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <h3 class="textcenter"><b>Connection</b></h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="textcenter" ><b style="font-size: 130%"> URL: </b> <span style="white-space: pre-line"> {{loc}} </span> </p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p v-if="connected" style="font-size: 130%" class="textcenter"> <b>Status:</b> <span class="badge badge-pill badge-success"> connected </span> </p>
                    <p v-if="!connected" style="font-size: 130%" class="textcenter"> <b>Status:</b> <span class="badge badge-pill badge-danger"> not connected </span> </p>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="textcenter" > <canvas id="canvas"> </canvas> </p>
                </div>
            </div>
        </div>
    </div>
`,
    mounted: function() {
        var QRCode = require('qrcode')
        var canvas = document.getElementById('canvas')

        QRCode.toCanvas(canvas, location.href, {scale:3, margin: 0, color: {light: '#909090'}}, function (error:any) {
            if (error) {
                console.error(error)
            } else {
                console.log('success!');
            }
        })
    },
    methods: {
        togglePausedStatus: function (force = false) {
            if (this.connected || force) {
                if (this.paused && !this.gameFinished){
                    this.startClock();
                    this.$emit("change-paused");
                } else if (!this.paused) {
                    this.stopClock();
                    this.$emit("change-paused");
                }
            }
        },
        reset: function () {
            if (this.connected) {
                this.$emit("pause-game");
                this.stopClock();
                this.resetClock();
                this.$emit("reset-ball");
            }
        },
        stopClock: function () {
            this.timer.stopTimer();
        },
        startClock: function () {
            this.timer.startTimer();
        },
        resetClock: function () {
            this.timer.reset();
        }
    },
    watch: {
        connected: function(newValue, oldValue) {
            console.log(`connected`, newValue, oldValue);
            if(oldValue && !newValue && !this.paused) {
                this.togglePausedStatus(true);
            }
        }
    }
});
