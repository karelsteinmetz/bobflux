"use strict";
const b = require('bobril');
const f = require('fun-model');
function createComponent(component) {
    return (c) => (children) => b.createDerivedComponent(b.createComponent({
        init(ctx) {
            ctx.cursor = c;
            ctx.state = f.getState(ctx.cursor);
        },
        shouldChange(ctx, me, oldMe) {
            let previousState = ctx.state;
            ctx.state = f.getState(ctx.cursor);
            return ctx.forceShouldChange || ctx.state !== previousState;
        }
    }), component)(null, children);
}
exports.createComponent = createComponent;
