"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(id, socket, ip, seenPlayers, seenGameObjects, player, ownedHats, ownedAccs, admin) {
        if (seenPlayers === void 0) { seenPlayers = []; }
        if (seenGameObjects === void 0) { seenGameObjects = []; }
        if (player === void 0) { player = null; }
        if (ownedHats === void 0) { ownedHats = []; }
        if (ownedAccs === void 0) { ownedAccs = []; }
        if (admin === void 0) { admin = false; }
        this.id = id;
        this.socket = socket;
        this.ip = ip;
        this.seenPlayers = seenPlayers;
        this.seenGameObjects = seenGameObjects;
        this.player = player;
        this.ownedHats = ownedHats;
        this.ownedAccs = ownedAccs;
        this.admin = admin;
        this.tribeJoinQueue = [];
        this.seenProjectiles = [];
        this.lastAttackTime = 0;
    }
    return Client;
}());
exports.default = Client;
