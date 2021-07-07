"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = __importDefault(require("vec2"));
var Entity = /** @class */ (function () {
    function Entity(id, location, angle, velocity) {
        if (angle === void 0) { angle = 0; }
        if (velocity === void 0) { velocity = new vec2_1.default(0, 0); }
        this.id = id;
        this.location = location;
        this.angle = angle;
        this.velocity = velocity;
    }
    return Entity;
}());
exports.default = Entity;
