import Vue from 'vue';
import { Protocol } from "../../common/protocol/Protocol";

export const DeviceDecisionComponent = Vue.extend({
    data: () => ({  }),
    template: `
        <div>
            <h1>Choose Device</h1>
            <img src="/static/img/control.png">
        </div>
    `,
    mounted: function() {
        //let container = document.createElement('div')
        //this.$el.appendChild(container);

        console.log(`DeviceDecisionComponent mounted, waiting 5 seconds and then pretending the user selected 'control' as device type`);
        setTimeout(() => {
            this.$emit('device-type-set', 'control');
        }, 5000);
    }
});
