"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = __importDefault(require("vec2"));
var Entity_1 = __importDefault(require("../moomoo/Entity"));
var projectiles_1 = require("./projectiles");
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(id, location, type, speed, angle, layer, ownerSID, damage) {
        if (damage === void 0) { damage = projectiles_1.getProjectileDamage(type); }
        var _this = _super.call(this, id, location, angle, new vec2_1.default(speed * Math.cos(angle), speed * Math.sin(angle))) || this;
        _this.id = id;
        _this.location = location;
        _this.type = type;
        _this.speed = speed;
        _this.angle = angle;
        _this.layer = layer;
        _this.ownerSID = ownerSID;
        _this.damage = damage;
        _this.distance = 0;
        return _this;
    }
    return Projectile;
}(Entity_1.default));
exports.default = Projectile;
