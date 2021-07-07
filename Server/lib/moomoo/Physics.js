"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collideProjectileGameObject = exports.collideProjectilePlayer = exports.getAttackLocation = exports.movePlayer = exports.checkAttackGameObj = exports.collideGameObjects = exports.checkAttack = exports.moveTowards = exports.collideRectangles = exports.collideCircles = void 0;
var vec2_1 = __importDefault(require("vec2"));
var items_1 = require("../items/items");
var UpgradeItems_1 = require("../items/UpgradeItems");
var Hats_1 = require("./Hats");
var PacketType_1 = require("../packets/PacketType");
var Packet_1 = require("../packets/Packet");
var PacketFactory_1 = require("../packets/PacketFactory");
var Game_1 = require("./Game");
var util_1 = require("./util");
function collideCircles(pos1, r1, pos2, r2) {
    return pos1.distance(pos2) <= r1 + r2;
}
exports.collideCircles = collideCircles;
function collideRectangles(x1, y1, w1, x2, y2, w2, h2) {
    return x1 + w1 >= x2 && x1 <= x2 + w2 && y1 + w1 >= y2 && y1 <= y2 + h2;
}
exports.collideRectangles = collideRectangles;
function moveTowards(player, angle, speed, deltaTime, state) {
    /* tryMovePlayer(player,
      deltaTime,
      Math.cos(angle) * speed * 0.1528, Math.sin(angle) * speed * 0.1528,
      state
    ); */
    player.velocity.add(Math.cos(angle) * speed * .0020 * deltaTime, Math.sin(angle) * speed * .0020 * deltaTime);
} //0016
exports.moveTowards = moveTowards;
/**
 * Utility function to collide a player and a GameObject with collideCircles()
 * @param player the player to test collision for
 * @param gameObj the GameObject to test collision for
 */
function collidePlayerGameObject(player, gameObj) {
    return collideCircles(player.location, 35, gameObj.location, gameObj.data === UpgradeItems_1.ItemType.PitTrap ? 0.3 * gameObj.realScale : gameObj.realScale);
}
function tryMovePlayer(player, delta, xVel, yVel, state) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var inTrap = false;
    var packetFactory = PacketFactory_1.PacketFactory.getInstance();
    (player.spikeHit > 0 && --player.spikeHit < 0) && (player.spikeHit = 0);
    var newLocation = new vec2_1.default(player.location.x, player.location.y);
    var _loop_1 = function (gameObj) {
        if (collidePlayerGameObject(player, gameObj)) {
            if (gameObj.isPlayerGameObject()) {
                if (!((_a = player.client) === null || _a === void 0 ? void 0 : _a.seenGameObjects.includes(gameObj.id))) {
                    (_b = player.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.LOAD_GAME_OBJ, [gameObj.getData()])));
                    (_c = player.client) === null || _c === void 0 ? void 0 : _c.seenGameObjects.push(gameObj.id);
                }
                switch (gameObj.data) {
                    case UpgradeItems_1.ItemType.PitTrap:
                        gameObj.isEnemy(player, state.tribes) && (inTrap = !0);
                        break;
                    case UpgradeItems_1.ItemType.BoostPad:
                        player.velocity.add(Math.cos(gameObj.angle) * 0.3, Math.sin(gameObj.angle) * 0.3);
                        break;
                    case UpgradeItems_1.ItemType.Teleporter:
                        player.location = util_1.randomPos(14400 + 35, 14400 - 35);
                        return { value: void 0 };
                    case UpgradeItems_1.ItemType.HealingPad:
                        if (player.healCol >= 10 && player.health < 100) {
                            player.healOverTime(5);
                            player.healCol = 0;
                        }
                        else {
                            player.healCol++;
                        }
                        break;
                }
                if (!items_1.hasCollision(gameObj.data))
                    return "continue";
            }
            var dmg = gameObj.dmg;
            if (dmg && !(gameObj.isPlayerGameObject() && !gameObj.isEnemy(player, state.tribes)) && !player.spikeHit) {
                var owner = state.players.find(function (player) { return player.id == gameObj.ownerSID; });
                player.spikeHit = 2;
                var hat = Hats_1.getHat(player.hatID);
                if (hat) {
                    dmg *= hat.dmgMult || 1;
                }
                var angle_1 = Math.atan2(player.location.y - gameObj.location.y, player.location.x - gameObj.location.x);
                player.velocity.add(Math.cos(angle_1), Math.sin(angle_1));
                if (owner) {
                    (_d = Game_1.getGame()) === null || _d === void 0 ? void 0 : _d.damageFrom(player, owner, owner.selectedWeapon, gameObj.dmg, false);
                }
                else {
                    player.health -= gameObj.dmg;
                }
                (_f = (_e = state.players.find(function (player) { return player.id == gameObj.ownerSID; })) === null || _e === void 0 ? void 0 : _e.client) === null || _f === void 0 ? void 0 : _f.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [gameObj.location.x + Math.cos(angle_1) * (gameObj.realScale + 35), gameObj.location.y + Math.sin(angle_1) * (gameObj.realScale + 35), dmg, 1])));
            }
            xVel *= .83;
            yVel *= .83;
            var angle = Math.atan2(newLocation.y - gameObj.location.y, newLocation.x - gameObj.location.x);
            newLocation = new vec2_1.default(gameObj.location.x + Math.cos(angle) * (gameObj.realScale + 35), gameObj.location.y + Math.sin(angle) * (gameObj.realScale + 35));
        }
    };
    for (var _i = 0, _j = player.getNearbyGameObjects(state, true); _i < _j.length; _i++) {
        var gameObj = _j[_i];
        var state_1 = _loop_1(gameObj);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    player.inTrap = inTrap;
    if (inTrap)
        return;
    // River
    if (player.location.y > 6850 && player.location.y < 7550) {
        if ((_g = Hats_1.getHat(player.hatID)) === null || _g === void 0 ? void 0 : _g.watrImm) {
            xVel *= .75;
            yVel *= .75;
            player.velocity.add(0.0011 * 0.4 * delta * (1 / .75), 0);
        }
        else {
            xVel *= .33;
            yVel *= .33;
            player.velocity.add(0.0011 * delta * (1 / .33), 0);
        }
    }
    else if (player.location.y < 2400) { //Snow
        var hat = Hats_1.getHat(player.hatID);
        if (hat === null || hat === void 0 ? void 0 : hat.coldM) {
            player.spdMult = 1.15;
        }
        else {
            player.spdMult = ((hat === null || hat === void 0 ? void 0 : hat.spdMult) || 1) * 0.75;
        }
    }
    else {
        player.spdMult = ((_h = Hats_1.getHat(player.hatID)) === null || _h === void 0 ? void 0 : _h.spdMult) || 1;
    }
    newLocation.clamp(new vec2_1.default(0 + 35, 0 + 35), new vec2_1.default(14400 - 35, 14400 - 35));
    player.location = newLocation.add(delta * xVel, delta * yVel);
}
function movePlayer(player, delta, state) {
    tryMovePlayer(player, delta, player.velocity.x, player.velocity.y, state);
    if (player.velocity.x || player.velocity.y) {
        player.velocity = player.velocity.multiply(Math.pow(0.993, delta), Math.pow(0.993, delta));
    }
    for (var _i = 0, _a = player.getNearbyPlayers(state); _i < _a.length; _i++) {
        var p = _a[_i];
        if (collideCircles(p.location, 30, player.location, 30)) {
            var dis = player.location.distance(p.location);
            var angle = Math.atan2(p.location.y - player.location.y, p.location.x - player.location.x);
            var distanceToMove = (30 + 30) - dis;
            p.location.add(Math.cos(angle) * distanceToMove, Math.sin(angle) * distanceToMove);
            player.location.add(-Math.cos(angle) * distanceToMove, -Math.sin(angle) * distanceToMove);
            tryMovePlayer(p, delta, p.velocity.x, p.velocity.y, state);
            tryMovePlayer(player, delta, player.velocity.x, player.velocity.y, state);
        }
    }
}
exports.movePlayer = movePlayer;
function pointCircle(point, circlePos, r) {
    if (point.distance(circlePos) <= r) {
        return true;
    }
    return false;
}
function getAttackLocation(player) {
    var range = items_1.getWeaponAttackDetails(player.selectedWeapon).attackRange;
    return new vec2_1.default(Math.cos(player.angle) * range, Math.sin(player.angle) * range).add(player.location);
}
exports.getAttackLocation = getAttackLocation;
function checkAttack(player, players) {
    var hitPlayers = [];
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        var hitPlayer = players_1[_i];
        if (pointCircle(getAttackLocation(player), hitPlayer.location, 35 * 2))
            hitPlayers.push(hitPlayer);
    }
    return hitPlayers;
}
exports.checkAttack = checkAttack;
function collideGameObjects(gameObject1, gameObject2) {
    return collideCircles(gameObject1.location, gameObject1.realScale * 0.9, gameObject2.location, gameObject2.realScale);
}
exports.collideGameObjects = collideGameObjects;
function checkAttackGameObj(player, gameObjects) {
    var GATHER_RANGE = Math.PI / 2.6;
    var hitGameObjects = [];
    var range = items_1.getWeaponAttackDetails(player.selectedWeapon).attackRange;
    for (var _i = 0, gameObjects_1 = gameObjects; _i < gameObjects_1.length; _i++) {
        var gameObject = gameObjects_1[_i];
        if (range + gameObject.scale < gameObject.location.distance(player.location))
            continue;
        var angle = Math.atan2(gameObject.location.y - player.location.y, gameObject.location.x - player.location.x);
        var angleDist = Math.abs(player.angle - angle) % (2 * Math.PI);
        if (angleDist > Math.PI)
            angleDist = 2 * Math.PI - angleDist;
        if (angleDist <= GATHER_RANGE)
            hitGameObjects.push(gameObject);
    }
    return hitGameObjects;
}
exports.checkAttackGameObj = checkAttackGameObj;
function collideProjectilePlayer(projectile, player) {
    return collideCircles(projectile.location, 10, player.location, 35);
}
exports.collideProjectilePlayer = collideProjectilePlayer;
function collideProjectileGameObject(projectile, gameObj) {
    return collideCircles(projectile.location, 10, gameObj.location, gameObj.scale);
}
exports.collideProjectileGameObject = collideProjectileGameObject;
