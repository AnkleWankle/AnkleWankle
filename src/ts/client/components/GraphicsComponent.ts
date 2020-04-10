import Vue from 'vue';
import * as PIXI from 'pixi.js';

export const GraphicsComponent = Vue.extend({
    data: () => ({}),
    template: '<div></div>',
    mounted: function() {
        let pixiApp = new PIXI.Application();
        this.$el.appendChild(pixiApp.view);

        this.$emit('pixi-app', pixiApp);
    }
});
