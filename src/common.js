"use strict";
function isCursor(obj) {
    return "key" in obj;
}
exports.isCursor = isCursor;
function unifyStateName(prefix) {
    return prefix === "" ? "state" : prefix + "State";
}
exports.unifyStateName = unifyStateName;
function unifyCursorName(prefix) {
    return prefix === "" ? "cursor" : prefix + "Cursor";
}
exports.unifyCursorName = unifyCursorName;
