"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vec2_1 = __importDefault(require("vec2"));
var Player_1 = __importDefault(require("./Player"));
var Packet_1 = require("../packets/Packet");
var PacketFactory_1 = require("../packets/PacketFactory");
var PacketType_1 = require("../packets/PacketType");
var Projectile_1 = __importDefault(require("../projectiles/Projectile"));
var projectiles_1 = require("../projectiles/projectiles");
var GameState = /** @class */ (function () {
    function GameState(game) {
        this.gameObjects = [];
        this.players = [];
        this.tribes = [];
        this.projectiles = [];
        this.game = game;
    }
    GameState.prototype.addProjectile = function (type, location, player, angle, layer) {
        if (angle === void 0) { angle = player === null || player === void 0 ? void 0 : player.angle; }
        if (layer === void 0) { layer = player === null || player === void 0 ? void 0 : player.layer; }
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var newProjectile = new Projectile_1.default(this.projectiles.length > 0 ? Math.max.apply(Math, this.projectiles.map(function (projectile) { return projectile.id; })) + 1 : 0, location, type, projectiles_1.getProjectileSpeed(type) || 1, angle || 0, layer || 0, (player === null || player === void 0 ? void 0 : player.id) || -1);
        this.projectiles.push(newProjectile);
        this.getPlayersNearProjectile(newProjectile).forEach(function (player) {
            var _a, _b;
            (_a = player.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.ADD_PROJECTILE, [location.x, location.y, angle, projectiles_1.getProjectileRange(type), projectiles_1.getProjectileSpeed(type), type, layer, newProjectile.id])));
            (_b = player.client) === null || _b === void 0 ? void 0 : _b.seenProjectiles.push(newProjectile.id);
        });
    };
    GameState.prototype.removeProjectile = function (projectile) {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
    };
    GameState.prototype.getPlayersNearProjectile = function (projectile) {
        var RADIUS = process.env.PLAYER_NEARBY_RADIUS || 1250;
        return this.players.filter(function (player) { return !player.dead && player.location.distance(projectile.location) < RADIUS; });
    };
    GameState.prototype.removeGameObject = function (gameObject) {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player.client && player.client.seenGameObjects.includes(gameObject.id)) {
                player.client.seenGameObjects.splice(player.client.seenGameObjects.indexOf(gameObject.id), 1);
                player.client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.REMOVE_GAME_OBJ, [gameObject.id])));
            }
        }
    };
    GameState.prototype.joinClan = function (player, tribe) {
        if (!tribe.membersSIDs.includes(player.id))
            tribe.membersSIDs.push(player.id);
        this.updateClanPlayers(tribe);
    };
    GameState.prototype.updateClanPlayers = function (tribe) {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var data = [];
        var _loop_1 = function (memberSID) {
            var player = this_1.players.find(function (player) { return player.id == memberSID; });
            if (player)
                data.push(player.id, player.name);
        };
        var this_1 = this;
        for (var _i = 0, _a = tribe.membersSIDs; _i < _a.length; _i++) {
            var memberSID = _a[_i];
            _loop_1(memberSID);
        }
        var _loop_2 = function (memberSID) {
            var player = this_2.players.find(function (player) { return player.id == memberSID; });
            var client = player === null || player === void 0 ? void 0 : player.client;
            if (client) {
                client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.SET_CLAN_PLAYERS, [data])));
            }
        };
        var this_2 = this;
        for (var _b = 0, _c = tribe.membersSIDs; _b < _c.length; _b++) {
            var memberSID = _c[_b];
            _loop_2(memberSID);
        }
    };
    GameState.prototype.addPlayer = function (sid, ownerID, client, game) {
        return this.players[this.players.push(new Player_1.default(sid, ownerID, new vec2_1.default(0, 0), game, client)) - 1];
    };
    GameState.prototype.addTribe = function (name, ownerSID) {
        var _a;
        if (this.tribes.find(function (tribe) { return tribe.name == name || tribe.ownerSID == ownerSID; }))
            return false;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        for (var _i = 0, _b = this.game.clients; _i < _b.length; _i++) {
            var client = _b[_i];
            (_a = client.socket) === null || _a === void 0 ? void 0 : _a.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.CLAN_ADD, [{ sid: name }])));
        }
        return this.tribes[this.tribes.push({ name: name, ownerSID: ownerSID, membersSIDs: [ownerSID] }) - 1];
    };
    GameState.prototype.removeTribe = function (tribeIndex) {
        var _a;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var tribe = this.tribes[tribeIndex];
        if (tribe) {
            for (var _i = 0, _b = this.game.clients; _i < _b.length; _i++) {
                var client = _b[_i];
                (_a = client.socket) === null || _a === void 0 ? void 0 : _a.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.CLAN_DEL, [tribe.name])));
            }
            var _loop_3 = function (memberSID) {
                var player = this_3.players.find(function (player) { return player.id == memberSID; });
                var client = player === null || player === void 0 ? void 0 : player.client;
                if (player)
                    player.clanName = null;
                if (client) {
                    client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_SET_CLAN, [null, 0])));
                    if (client.player)
                        client.player.isClanLeader = false;
                }
            };
            var this_3 = this;
            for (var _c = 0, _d = tribe.membersSIDs; _c < _d.length; _c++) {
                var memberSID = _d[_c];
                _loop_3(memberSID);
            }
            this.tribes.splice(tribeIndex, 1);
        }
    };
    GameState.prototype.leaveClan = function (player, tribeIndex) {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var client = player === null || player === void 0 ? void 0 : player.client;
        this.tribes[tribeIndex].membersSIDs = this.tribes[tribeIndex].membersSIDs.filter(function (memberSID) { return memberSID != player.id; });
        if (player)
            player.clanName = null;
        if (client) {
            client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_SET_CLAN, [null, 0])));
            if (client.player)
                client.player.isClanLeader = false;
        }
        this.updateClanPlayers(this.tribes[tribeIndex]);
    };
    return GameState;
}());
exports.default = GameState;
