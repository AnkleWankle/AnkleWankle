import Vue from 'vue';

let beta: number|null = 0;
let gamma: number|null = 0;

export const ControlDeviceComponent = Vue.extend({
    data: () => ({
        loc: location,
    }),
    props: {
        connected: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    template: `
    <div id="control-page" class="container">
        <div class="row">
            <div class="col">
                <h1>AnkleWankle</h1>
                <h3 class="center">Control Device</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h3>URL: {{loc}}</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h3 v-if="connected"> Status: <span class="badge badge-pill badge-success"> connected </span> </h3>
                <h3 v-if="!connected"> Status: <span class="badge badge-pill badge-danger"> not connected </span> </h3>
            </div>
        </div>
    </div>
`,
    mounted: function() {
        // console.log("test if controlDevice only");
        if((window as any).DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                beta = event.beta;
                gamma = event.gamma;
            });
            
            window.setInterval(() => {
                if (this.connected == true)
                {
                    this.$emit('sensor-data', beta, gamma);
                }   
            }, 50);
        }
    }
});
