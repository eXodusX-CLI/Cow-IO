"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = __importDefault(require("vec2"));
var gameobjects_1 = require("./gameobjects");
var GameObject = /** @class */ (function () {
    function GameObject(id, location, angle, scale, type, realScale, data, ownerSID, health, dmg, spawnPoint) {
        if (id === void 0) { id = 0; }
        if (location === void 0) { location = new vec2_1.default(0, 0); }
        if (angle === void 0) { angle = 0; }
        if (scale === void 0) { scale = 1; }
        if (type === void 0) { type = gameobjects_1.GameObjectType.Tree; }
        if (realScale === void 0) { realScale = scale; }
        if (data === void 0) { data = null; }
        if (ownerSID === void 0) { ownerSID = -1; }
        if (health === void 0) { health = -1; }
        if (dmg === void 0) { dmg = 0; }
        if (spawnPoint === void 0) { spawnPoint = false; }
        this.id = id;
        this.location = location;
        this.angle = angle;
        this.scale = scale;
        this.type = type;
        this.realScale = realScale;
        this.data = data;
        this.ownerSID = ownerSID;
        this.health = health;
        this.dmg = dmg;
        this.spawnPoint = spawnPoint;
    }
    GameObject.prototype.getData = function () {
        return [
            this.id,
            this.location.x,
            this.location.y,
            this.angle,
            this.scale,
            this.type,
            this.data,
            this.ownerSID
        ];
    };
    GameObject.prototype.isPlayerGameObject = function () {
        return this.type === -1 && typeof this.data === 'number';
    };
    GameObject.prototype.isEnemy = function (player, tribes) {
        if (this.ownerSID === player.id)
            return false;
        for (var _i = 0, tribes_1 = tribes; _i < tribes_1.length; _i++) {
            var tribe = tribes_1[_i];
            if (tribe.membersSIDs.includes(player.id) && tribe.membersSIDs.includes(this.ownerSID))
                return false;
        }
        return true;
    };
    return GameObject;
}());
exports.default = GameObject;
