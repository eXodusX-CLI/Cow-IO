"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeaponUpgrades = exports.getUpgrades = void 0;
var weapons_json_1 = __importDefault(require("../items/weapons.json"));
var items_json_1 = __importDefault(require("../items/items.json"));
function getUpgrades(age) {
    return items_json_1.default.map(function (_item, index) { return index; }).filter(function (item) { return items_json_1.default[item].age == age; });
}
exports.getUpgrades = getUpgrades;
function getWeaponUpgrades(age) {
    return weapons_json_1.default.map(function (_item, index) { return index; }).filter(function (item) { return weapons_json_1.default[item].age === age; });
}
exports.getWeaponUpgrades = getWeaponUpgrades;
