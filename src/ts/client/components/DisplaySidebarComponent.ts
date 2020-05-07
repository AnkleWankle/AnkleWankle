import Vue from 'vue';

export const DisplaySidebarComponent = Vue.extend({
    data: () => ({
        connected: false,
        paused: false,
        time: 0,
        loc: location
    }),
    template: `
    <div class="sidebar">
       <div class="row">
            <div class="col">
                <h1 class="center"><b>AnkleWankle</b></h1>
            </div>
        </div>
        <div class="row">
            <div class="column">
                 <img width="80" height="80" src="/static/img/hourglass-icon.png">
            </div>
            <div class="column">
                <h3> Time here</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <img v-if="!paused" v-on:click="togglePausedStatus()"  width="70" height="70" src="/static/img/play-button.png">
                <img v-if="paused" v-on:click="togglePausedStatus()"  width="70" height="70" src="/static/img/pause-button.png">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <img width="80" height="80" src="/static/img/reset-button.png">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h3 class="center"><b>Connection</b></h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p><b> URL: </b>{{loc}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p v-if="connected"> <b>Status:</b> <span class="badge badge-pill badge-success"> connected </span> </p> 
                <p v-if="!connected"> <b>Status:</b> <span class="badge badge-pill badge-danger"> not connected </span> </p> 
            </div>
        </div>
    </div>
`,
    mounted: function() {

    },
    methods: {
        togglePausedStatus: function () {
            this.paused = !this.paused;
        }
    }
});
