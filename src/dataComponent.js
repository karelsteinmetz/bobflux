"use strict";
var b = require('bobril');
var f = require('fun-model');
function createDataComponent(component) {
    return function (c) {
        return b.createDerivedComponent(b.createVirtualComponent({
            init: function (ctx) {
                ctx.cursor = c;
                ctx.state = f.getState(ctx.cursor);
            },
            render: function (ctx) {
                ctx.state = f.getState(ctx.cursor);
            }
        }), component);
    };
}
exports.createDataComponent = createDataComponent;
