import Vue from 'vue';

export const DeviceDecisionComponent = Vue.extend({
    data: () => ({  }),
    template: `
            <div>
                <h1>Choose Device</h1>
                <img src='../../../assets/control.png'>
                <img src='img'>
            </div>
        `,
    mounted: function() {
        //let container = document.createElement('div')
        //this.$el.appendChild(container);
        this.$emit('device-decision');
    }
});
