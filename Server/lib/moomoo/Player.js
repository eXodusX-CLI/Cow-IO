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
var Entity_1 = __importDefault(require("./Entity"));
var util_1 = require("./util");
var vec2_1 = __importDefault(require("vec2"));
var Weapons_1 = require("./Weapons");
var PacketFactory_1 = require("../packets/PacketFactory");
var Packet_1 = require("../packets/Packet");
var PacketType_1 = require("../packets/PacketType");
var items_1 = require("../items/items");
var UpgradeItems_1 = require("../items/UpgradeItems");
var GameObject_1 = __importDefault(require("../gameobjects/GameObject"));
var Physics_1 = require("./Physics");
var Hats_1 = require("./Hats");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(sid, ownerID, location, game, client, angle, name, skinColor, hatID, accID) {
        if (client === void 0) { client = undefined; }
        if (angle === void 0) { angle = 0; }
        if (name === void 0) { name = "unknown"; }
        if (skinColor === void 0) { skinColor = util_1.SkinColor.Light2; }
        if (hatID === void 0) { hatID = -1; }
        if (accID === void 0) { accID = -1; }
        var _this = _super.call(this, sid, location, angle, new vec2_1.default(0, 0)) || this;
        _this._health = 100;
        _this.lastPing = 0;
        _this.lastDot = 0;
        _this.hatID = 0;
        _this.accID = 0;
        _this.spdMult = 1;
        _this.upgradeAge = 2;
        _this.invincible = false;
        _this.layer = 0;
        _this.foodHealOverTime = 0;
        _this.foodHealOverTimeAmt = 0;
        _this.maxFoodHealOverTime = -1;
        _this.healCol = 0;
        _this.bleedDmg = 5;
        _this.bleedAmt = 0;
        _this.maxBleedAmt = -1;
        _this.bleedSpd = 5;
        _this.bleedSpdAmt = 0;
        _this.maxBleedSpdAmt = -1;
        _this.spikeHit = 0;
        _this.weapon = 0;
        _this.secondaryWeapon = -1;
        _this.selectedWeapon = 0;
        _this._primaryWeaponExp = 0;
        _this._secondaryWeaponExp = 0;
        _this.primaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
        _this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
        _this.buildItem = -1;
        _this.items = [UpgradeItems_1.ItemType.Apple, UpgradeItems_1.ItemType.WoodWall, UpgradeItems_1.ItemType.Spikes, UpgradeItems_1.ItemType.Windmill];
        _this.clanName = null;
        _this.isClanLeader = false;
        _this._kills = 0;
        _this.invisible = false;
        _this.maxXP = 300;
        _this.age = 1;
        _this._xp = 0;
        _this.dead = false;
        _this.inTrap = false;
        _this.autoAttackOn = false;
        _this.disableRotation = false;
        _this.moveDirection = null;
        _this._attack = false;
        _this.lastHitTime = 0;
        _this._food = 100000;
        _this._stone = 100000;
        _this._points = 100000;
        _this._wood = 100000;
        _this.name = name;
        _this.skinColor = skinColor;
        _this.client = client;
        _this.ownerID = ownerID;
        _this.hatID = hatID;
        _this.accID = accID;
        _this.game = game;
        return _this;
    }
    Object.defineProperty(Player.prototype, "primaryWeaponExp", {
        get: function () {
            return this._primaryWeaponExp;
        },
        set: function (value) {
            if (value >= 20000)
                this.primaryWeaponVariant = Weapons_1.WeaponVariant.Dark;
            else if (value >= 16000)
                this.primaryWeaponVariant = Weapons_1.WeaponVariant.Emerald;
            else if (value >= 12000)
                this.primaryWeaponVariant = Weapons_1.WeaponVariant.Ruby;
            else if (value >= 7000)
                this.primaryWeaponVariant = Weapons_1.WeaponVariant.Diamond;
            else if (value >= 3000)
                this.primaryWeaponVariant = Weapons_1.WeaponVariant.Gold;
            this._primaryWeaponExp = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "secondaryWeaponExp", {
        get: function () {
            return this._secondaryWeaponExp;
        },
        set: function (value) {
            /*if (value >= 20000) this.secondaryWeaponVariant = WeaponVariant.Dark;
            else*/ if (value >= 16000)
                this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Emerald;
            else if (value >= 12000)
                this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Ruby;
            else if (value >= 7000)
                this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Diamond;
            else if (value >= 3000)
                this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Gold;
            this._secondaryWeaponExp = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "kills", {
        get: function () {
            return this._kills;
        },
        set: function (newKills) {
            var _a;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STATS, ["kills", newKills, 1])));
            this._kills = newKills;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.damageOverTime = function () {
        var _a, _b;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var hat = Hats_1.getHat(this.hatID);
        if (hat) {
            var healthRegen = hat.healthRegen || 0;
            if (healthRegen > 0 && this.health < 100) {
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -Math.min(100 - this.health, healthRegen), 1])));
            }
            this.health = Math.min(this.health + healthRegen, 100);
        }
        if (this.foodHealOverTimeAmt < this.maxFoodHealOverTime) {
            if (100 - this.health > 0) {
                (_b = this.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -Math.min(100 - this.health, this.foodHealOverTime), 1])));
                this.health = Math.min(this.health + this.foodHealOverTime, 100);
            }
            this.foodHealOverTimeAmt++;
        }
        else {
            this.foodHealOverTime = -1;
        }
        if (this.bleedAmt < this.maxBleedAmt) {
            if (!(hat === null || hat === void 0 ? void 0 : hat.poisonRes))
                this.health -= this.bleedDmg;
            this.bleedAmt++;
        }
        else {
            this.maxBleedAmt = -1;
        }
        if (this.bleedSpdAmt < this.maxBleedSpdAmt) {
            this.spdMult *= 1 - this.bleedSpd;
            this.bleedSpdAmt++;
        }
        else {
            this.maxBleedSpdAmt = -1;
        }
    };
    Player.prototype.healOverTime = function (healAmount) {
        var _a;
        if (healAmount === void 0) { healAmount = 0; }
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        if (healAmount != 0 && this.health < 100) {
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -Math.min(100 - this.health, healAmount), 1])));
            this.health = Math.min(this.health + healAmount, 100);
        }
    };
    Object.defineProperty(Player.prototype, "xp", {
        get: function () {
            return this._xp;
        },
        set: function (newXP) {
            var _a, _b;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            newXP *= 4;
            if (newXP >= this.maxXP) {
                this.age++;
                this.maxXP *= 1.2;
                newXP = 0;
                (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPGRADES, [this.age - this.upgradeAge + 1, this.upgradeAge])));
            }
            (_b = this.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_AGE, [newXP, this.maxXP, this.age])));
            this._xp = newXP;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "isAttacking", {
        get: function () {
            return this._attack || this.autoAttackOn;
        },
        set: function (val) {
            this._attack = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "food", {
        get: function () {
            return this._food;
        },
        set: function (newFood) {
            var _a;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STATS, ["food", newFood, 1])));
            this._food = newFood;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "stone", {
        get: function () {
            return this._stone;
        },
        set: function (newStone) {
            var _a;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STATS, ["stone", newStone, 1])));
            this._stone = newStone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "points", {
        get: function () {
            return this._points;
        },
        set: function (newPoints) {
            var _a;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STATS, ["points", newPoints, 1])));
            this._points = newPoints;
            this.game.sendLeaderboardUpdates();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "wood", {
        get: function () {
            return this._wood;
        },
        set: function (newWood) {
            var _a;
            var packetFactory = PacketFactory_1.PacketFactory.getInstance();
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STATS, ["wood", newWood, 1])));
            this._wood = newWood;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "health", {
        get: function () {
            return this._health;
        },
        set: function (newHealth) {
            if (!this.invincible) {
                var packetFactory = PacketFactory_1.PacketFactory.getInstance();
                for (var _i = 0, _a = this.game.clients; _i < _a.length; _i++) {
                    var client = _a[_i];
                    client === null || client === void 0 ? void 0 : client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_UPDATE, [this.id, newHealth])));
                }
                this._health = newHealth;
                if (this._health <= 0 && !this.dead) {
                    this.game.killPlayer(this);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.getWeaponHitTime = function () {
        var base = items_1.getHitTime(this.selectedWeapon);
        var hat = Hats_1.getHat(this.hatID);
        return base * ((hat === null || hat === void 0 ? void 0 : hat.atkSpd) || 1);
    };
    Player.prototype.useItem = function (item, gameState, gameObjectID) {
        var _this = this;
        var _a, _b, _c, _d;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        if (items_1.getPlaceable(item) && gameState && gameObjectID) {
            var placeLimit = items_1.getGameObjPlaceLimit(item);
            var placedAmount = gameState.gameObjects.filter(function (gameObj) { return gameObj.data === item && gameObj.ownerSID == _this.id; }).length;
            if (placedAmount >= placeLimit)
                return;
            var offset = 35 + items_1.getScale(item) + (items_1.getPlaceOffset(item) || 0);
            var location = this.location.add(offset * Math.cos(this.angle), offset * Math.sin(this.angle), true);
            var newGameObject = new GameObject_1.default(gameObjectID, location, this.angle, items_1.getScale(item), -1, undefined, item, this.id, items_1.getGameObjHealth(item), items_1.getGameObjDamage(item), items_1.isSpawnPad(item));
            for (var _i = 0, _e = gameState.gameObjects; _i < _e.length; _i++) {
                var gameObject = _e[_i];
                if (Physics_1.collideGameObjects(gameObject, newGameObject))
                    return false;
            }
            gameState === null || gameState === void 0 ? void 0 : gameState.gameObjects.push(newGameObject);
            (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_PLACE_LIMIT, [items_1.getGroupID(item), placedAmount + 1])));
            return true;
        }
        var healedAmount;
        switch (item) {
            case UpgradeItems_1.ItemType.Cookie:
                if (this.health >= 100)
                    return false;
                healedAmount = Math.min(100 - this.health, 40);
                (_b = this.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -healedAmount, 1])));
                this.health = Math.min(this.health + 40, 100);
                return true;
            case UpgradeItems_1.ItemType.Cheese:
                if (this.health >= 100)
                    return false;
                healedAmount = Math.min(100 - this.health, 30);
                (_c = this.client) === null || _c === void 0 ? void 0 : _c.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -healedAmount, 1])));
                this.foodHealOverTime = 10;
                this.foodHealOverTimeAmt = 0;
                this.maxFoodHealOverTime = 5;
                this.health = Math.min(this.health + 30, 100);
                return true;
            case UpgradeItems_1.ItemType.Apple:
                if (this.health >= 100)
                    return false;
                healedAmount = Math.min(100 - this.health, 20);
                (_d = this.client) === null || _d === void 0 ? void 0 : _d.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [this.location.x, this.location.y, -healedAmount, 1])));
                this.health = Math.min(this.health + 20, 100);
                return true;
        }
    };
    Player.prototype.getNearbyGameObjects = function (state, includeHidden) {
        var _a;
        if (includeHidden === void 0) { includeHidden = false; }
        var RADIUS = process.env.GAMEOBJECT_NEARBY_RADIUS || 1250;
        var gameObjects = [];
        for (var _i = 0, _b = state.gameObjects; _i < _b.length; _i++) {
            var gameObject = _b[_i];
            if (util_1.eucDistance([this.location.x, this.location.y], [gameObject.location.x, gameObject.location.y]) < RADIUS) {
                if (!(gameObject.isPlayerGameObject() &&
                    items_1.shouldHideFromEnemy(gameObject.data) &&
                    gameObject.isEnemy(this, state.tribes) &&
                    !((_a = this.client) === null || _a === void 0 ? void 0 : _a.seenGameObjects.includes(gameObject.id))) || includeHidden) {
                    gameObjects.push(gameObject);
                }
            }
        }
        return gameObjects;
    };
    Player.prototype.die = function () {
        var _a;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        this.dead = true;
        this.kills = 0;
        this.weapon = 0;
        this.secondaryWeapon = -1;
        this.selectedWeapon = 0;
        this.primaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
        this.secondaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
        this.age = 1;
        this.xp = 0;
        this.inTrap = false;
        this.buildItem = -1;
        this.autoAttackOn = false;
        this.disableRotation = false;
        this.moveDirection = null;
        this.items = [UpgradeItems_1.ItemType.Apple, UpgradeItems_1.ItemType.WoodWall, UpgradeItems_1.ItemType.Spikes, UpgradeItems_1.ItemType.Windmill];
        this.upgradeAge = 2;
        this.maxXP = 300;
        this.kills = 0;
        this.points = 0;
        this.food = 0;
        this.wood = 0;
        this.stone = 0;
        (_a = this.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.DEATH, [])));
    };
    Player.prototype.move = function (direction) {
        this.moveDirection = direction;
    };
    Player.prototype.stopMove = function () {
        this.moveDirection = null;
    };
    Player.prototype.getUpdateData = function (gameState) {
        var leadKills = 0;
        for (var _i = 0, _a = gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.kills > leadKills) {
                leadKills = player.kills;
            }
        }
        return [
            this.id,
            this.location.x,
            this.location.y,
            this.angle,
            this.buildItem,
            this.selectedWeapon,
            this.selectedWeapon == this.weapon ?
                this.primaryWeaponVariant : this.secondaryWeaponVariant,
            this.clanName,
            this.isClanLeader ? 1 : 0,
            this.hatID,
            this.accID,
            this.kills === leadKills && this.kills > 0 ? 1 : 0,
            0,
        ];
    };
    Player.prototype.getNearbyPlayers = function (state) {
        var RADIUS = process.env.PLAYER_NEARBY_RADIUS || 1250;
        var players = [];
        for (var _i = 0, _a = state.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player !== this && !player.dead) {
                if (util_1.eucDistance([this.location.x, this.location.y], [player.location.x, player.location.y]) < RADIUS) {
                    players.push(player);
                }
            }
        }
        return players;
    };
    return Player;
}(Entity_1.default));
exports.default = Player;
