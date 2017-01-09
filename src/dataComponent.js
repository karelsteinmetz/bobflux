"use strict";
var b = require('bobril');
var f = require('fun-model');
var c = require("./common");
function createDataComponent(component) {
    return function (innerCursor) {
        return b.createDerivedComponent(b.createVirtualComponent({
            init: function (ctx) {
                if (c.isCursor(innerCursor)) {
                    ctx.cursor = innerCursor;
                    ctx.state = f.getState(ctx.cursor);
                }
                else {
                    Object.keys(innerCursor).forEach(function (ck) {
                        ctx[c.unifyCursorName(ck)] = innerCursor[ck];
                        ctx[c.unifyStateName(ck)] = f.getState(innerCursor[ck]);
                    });
                }
            },
            render: function (ctx) {
                if (c.isCursor(innerCursor)) {
                    ctx.state = f.getState(ctx.cursor);
                }
                else {
                    Object.keys(innerCursor).forEach(function (ck) {
                        ctx[c.unifyStateName(ck)] = f.getState(innerCursor[ck]);
                    });
                }
            }
        }), component);
    };
}
exports.createDataComponent = createDataComponent;
