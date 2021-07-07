"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layer = exports.ProjectileType = exports.getProjectileSpeed = exports.getProjectileRange = exports.getProjectileLayer = exports.getProjectileDamage = void 0;
var projectiles_json_1 = __importDefault(require("./projectiles.json"));
var Layer;
(function (Layer) {
    Layer[Layer["Pad"] = -1] = "Pad";
    Layer[Layer["Player"] = 0] = "Player";
    Layer[Layer["Platform"] = 1] = "Platform";
})(Layer || (Layer = {}));
exports.Layer = Layer;
var ProjectileType;
(function (ProjectileType) {
    ProjectileType[ProjectileType["Bow"] = 0] = "Bow";
    ProjectileType[ProjectileType["Turret"] = 1] = "Turret";
    ProjectileType[ProjectileType["Crossbow"] = 2] = "Crossbow";
    ProjectileType[ProjectileType["RepeaterCrossbow"] = 3] = "RepeaterCrossbow";
    ProjectileType[ProjectileType["Musket"] = 5] = "Musket";
})(ProjectileType || (ProjectileType = {}));
exports.ProjectileType = ProjectileType;
function getProjectileDamage(type) {
    return projectiles_json_1.default[type].dmg;
}
exports.getProjectileDamage = getProjectileDamage;
function getProjectileLayer(type) {
    return projectiles_json_1.default[type].layer;
}
exports.getProjectileLayer = getProjectileLayer;
function getProjectileRange(type) {
    return projectiles_json_1.default[type].range;
}
exports.getProjectileRange = getProjectileRange;
function getProjectileSpeed(type) {
    return projectiles_json_1.default[type].speed;
}
exports.getProjectileSpeed = getProjectileSpeed;
