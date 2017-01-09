"use strict";
var b = require("bobril");
var f = require("fun-model");
var c = require("./common");
function createRouteComponent(component) {
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
                ctx.lastData = ctx.data;
            },
            shouldChange: function (ctx, me, oldMe) {
                var shouldChange = false;
                if (c.isCursor(innerCursor)) {
                    var previousState = ctx.state;
                    ctx.state = f.getState(ctx.cursor);
                    shouldChange = ctx.forceShouldChange || ctx.state !== previousState;
                }
                else {
                    Object.keys(innerCursor).forEach(function (ck) {
                        var stateName = c.unifyStateName(ck);
                        var previousState = ctx[stateName];
                        ctx[stateName] = f.getState(innerCursor[ck]);
                        shouldChange = shouldChange || ctx.forceShouldChange || ctx[stateName] !== previousState;
                    });
                    shouldChange;
                }
                var previousData = ctx.lastData;
                ctx.lastData = ctx.data;
                return ctx.forceShouldChange || !(ctx.data === previousData && !shouldChange);
            }
        }), component);
    };
}
exports.createRouteComponent = createRouteComponent;
