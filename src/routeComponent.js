"use strict";
const b = require('bobril');
const f = require('fun-model');
function createRouteComponent(component) {
    return (c) => b.createDerivedComponent(b.createComponent({
        init(ctx) {
            ctx.cursor = c;
            ctx.state = f.getState(ctx.cursor);
            ctx.lastData = ctx.data;
        },
        shouldChange(ctx, me, oldMe) {
            let previousState = ctx.state;
            let previousData = ctx.lastData;
            ctx.state = f.getState(ctx.cursor);
            ctx.lastData = ctx.data;
            return ctx.forceShouldChange || !(ctx.data === previousData && ctx.state === previousState);
        }
    }), component);
}
exports.createRouteComponent = createRouteComponent;
