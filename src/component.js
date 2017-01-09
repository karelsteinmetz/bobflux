"use strict";
var b = require("bobril");
var f = require("fun-model");
var c = require("./common");
function createComponent(component) {
    return function (innerCursor) { return function (children) { return b.createDerivedComponent(b.createVirtualComponent({
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
        shouldChange: function (ctx, me, oldMe) {
            if (c.isCursor(innerCursor)) {
                var previousState = ctx.state;
                ctx.state = f.getState(ctx.cursor);
                return ctx.forceShouldChange || ctx.state !== previousState;
            }
            else {
                var shouldChange_1 = false;
                Object.keys(innerCursor).forEach(function (ck) {
                    var stateName = c.unifyStateName(ck);
                    var previousState = ctx[stateName];
                    ctx[stateName] = f.getState(innerCursor[ck]);
                    shouldChange_1 = shouldChange_1 || ctx.forceShouldChange || ctx[stateName] !== previousState;
                });
                return shouldChange_1;
            }
        }
    }), component)(null, children); }; };
}
exports.createComponent = createComponent;
