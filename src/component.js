"use strict";
var b = require('bobril');
var f = require('fun-model');
function createComponent(component) {
    return function (c) { return function (children) { return b.createDerivedComponent(b.createVirtualComponent({
        init: function (ctx) {
            ctx.cursor = c;
            ctx.state = f.getState(ctx.cursor);
        },
        shouldChange: function (ctx, me, oldMe) {
            var previousState = ctx.state;
            ctx.state = f.getState(ctx.cursor);
            return ctx.forceShouldChange || ctx.state !== previousState;
        }
    }), component)(null, children); }; };
}
exports.createComponent = createComponent;
