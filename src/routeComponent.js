"use strict";
var b = require('bobril');
var f = require('fun-model');
function createRouteComponent(component) {
    return function (c) {
        return b.createDerivedComponent(b.createVirtualComponent({
            init: function (ctx) {
                ctx.cursor = c;
                ctx.state = f.getState(ctx.cursor);
                ctx.lastData = ctx.data;
            },
            shouldChange: function (ctx, me, oldMe) {
                var previousState = ctx.state;
                var previousData = ctx.lastData;
                ctx.state = f.getState(ctx.cursor);
                ctx.lastData = ctx.data;
                return ctx.forceShouldChange || !(ctx.data === previousData && ctx.state === previousState);
            }
        }), component);
    };
}
exports.createRouteComponent = createRouteComponent;
