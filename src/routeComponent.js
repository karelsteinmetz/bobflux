"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b = require("bobril");
var f = require("fun-model");
var c = require("./common");
function createRouteComponent(component) {
    return function (innerCursor) {
        return b.createDerivedComponent(b.createVirtualComponent({
            init: function (ctx) {
                ctx.forceShouldChange = false;
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
            shouldChange: function (ctx) {
                var shouldChange = ctx.forceShouldChange;
                if (c.isCursor(innerCursor)) {
                    var previousState = ctx.state;
                    ctx.state = f.getState(ctx.cursor);
                    shouldChange = ctx.state !== previousState;
                }
                else {
                    Object.keys(innerCursor).forEach(function (ck) {
                        var stateName = c.unifyStateName(ck);
                        var previousState = ctx[stateName];
                        ctx[stateName] = f.getState(innerCursor[ck]);
                        shouldChange = shouldChange || ctx[stateName] !== previousState;
                    });
                }
                var previousData = ctx.lastData;
                ctx.lastData = ctx.data;
                return shouldChange || (ctx.data !== previousData);
            }
        }), component);
    };
}
exports.createRouteComponent = createRouteComponent;
