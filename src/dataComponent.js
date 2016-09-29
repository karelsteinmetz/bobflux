"use strict";
const b = require('bobril');
const f = require('fun-model');
function createDataComponent(component) {
    return (c) => b.createDerivedComponent(b.createComponent({
        init(ctx) {
            ctx.cursor = c;
            ctx.state = f.getState(ctx.cursor);
        },
        render(ctx) {
            ctx.state = f.getState(ctx.cursor);
        }
    }), component);
}
exports.createDataComponent = createDataComponent;
