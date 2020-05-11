import Vue from 'vue';

export const DeviceDecisionComponent = Vue.extend({
    data: () => ({  }),
    template: `
        <div id="decision-page" class="container-fluid">
            <div class="row">
                <div class="col">
                    <h1>AnkleWankle</h1>
                    <h3>Choose Device</h3>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img v-on:click="setDeviceType('control')" src="/static/img/control.png">
                    <h3>Control Device</h3>
                </div>
                <div class="col">
                    <img v-on:click="setDeviceType('display')" src="/static/img/display.png">
                    <h3>Display Device</h3>
                </div>
            </div>
        </div>
    `,
    mounted: function() {
        //let container = document.createElement('div')
        //this.$el.appendChild(container);

        //console.log(`DeviceDecisionComponent mounted, waiting 5 seconds and then pretending the user selected 'control' as device type`);
        /*setTimeout(() => {
            this.$emit('device-type-set', 'control');
        }, 5000);*/
    },
    methods: {
        setDeviceType: function (deviceType: string) {
            this.$emit('device-type-set', deviceType);
        }
    }
});
