"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stableSort = exports.chunk = exports.randomPos = exports.eucDistance = exports.SkinColor = void 0;
var vec2_1 = __importDefault(require("vec2"));
var SkinColor;
(function (SkinColor) {
    SkinColor[SkinColor["Light1"] = 2] = "Light1";
    SkinColor[SkinColor["Light2"] = 0] = "Light2";
    SkinColor[SkinColor["Light3"] = 1] = "Light3";
    SkinColor[SkinColor["Pink"] = 3] = "Pink";
    SkinColor[SkinColor["White"] = 4] = "White";
    SkinColor[SkinColor["Red"] = 5] = "Red";
    SkinColor[SkinColor["Black"] = 6] = "Black";
    SkinColor[SkinColor["Purple"] = 7] = "Purple";
    SkinColor[SkinColor["Blue"] = 8] = "Blue";
    SkinColor[SkinColor["Green"] = 9] = "Green";
})(SkinColor || (SkinColor = {}));
exports.SkinColor = SkinColor;
function eucDistance(a, b) {
    return Math.hypot.apply(Math, a.map(function (val, i) { return val - b[i]; }));
}
exports.eucDistance = eucDistance;
function randomPos(width, height) {
    return new vec2_1.default(Math.random() * (width + 1), Math.random() * (height + 1));
}
exports.randomPos = randomPos;
function chunk(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}
exports.chunk = chunk;
var defaultCmp = function (a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
};
function stableSort(array, cmp) {
    if (cmp === void 0) { cmp = defaultCmp; }
    var stabilized = array.map(function (el, index) { return [el, index]; });
    var stableCmp = function (a, b) {
        var order = cmp(a[0], b[0]);
        if (order != 0)
            return order;
        return a[1] - b[1];
    };
    stabilized.sort(stableCmp);
    for (var i = 0; i < array.length; i++) {
        array[i] = stabilized[i][0];
    }
    return array;
}
exports.stableSort = stableSort;
