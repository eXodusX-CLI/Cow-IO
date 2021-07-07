"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHat = void 0;
var hats_json_1 = __importDefault(require("../hats.json"));
function getHat(id) {
    return hats_json_1.default.find(function (hat) { return hat.id == id; });
}
exports.getHat = getHat;
