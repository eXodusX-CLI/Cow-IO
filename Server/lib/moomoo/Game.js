"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.getGame = void 0;
var lowdb_1 = __importDefault(require("lowdb"));
var Client_1 = __importDefault(require("./Client"));
var nanotimer_1 = __importDefault(require("nanotimer"));
var util_1 = require("./util");
var msgpack_lite_1 = __importDefault(require("msgpack-lite"));
var GameState_1 = __importDefault(require("./GameState"));
var Physics = __importStar(require("./Physics"));
var console = __importStar(require("../console"));
var badWords_json_1 = __importDefault(require("../badWords.json"));
var Packet_1 = require("../packets/Packet");
var GameObject_1 = __importDefault(require("../gameobjects/GameObject"));
var PacketType_1 = require("../packets/PacketType");
var FileAsync_1 = __importDefault(require("lowdb/adapters/FileAsync"));
var PacketFactory_1 = require("../packets/PacketFactory");
var items_1 = require("../items/items");
var gameobjects_1 = require("../gameobjects/gameobjects");
var Upgrades_1 = require("./Upgrades");
var Hats_1 = require("./Hats");
var Weapons_1 = require("./Weapons");
var UpgradeItems_1 = require("../items/UpgradeItems");
var projectiles_1 = require("../projectiles/projectiles");
var currentGame = null;
var DEFAULT_MAX_CPS = 25;
var MAX_CPS = (process.env.MAX_CPS && parseInt(process.env.MAX_CPS, 10)) || DEFAULT_MAX_CPS;
if (isNaN(MAX_CPS))
    MAX_CPS = DEFAULT_MAX_CPS;
var vultr = require("../../../Client/serverData.js");
var Game = /** @class */ (function () {
    function Game() {
        this.clients = [];
        this.lastTick = 0;
        this.started = false;
        this.lastUpdate = 0;
        this.state = new GameState_1.default(this);
        this.update = this.update.bind(this);
        if (!currentGame)
            currentGame = this;
        this.initDatabase();
    }
    Game.prototype.initDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, lowdb_1.default(new FileAsync_1.default('./.data/db.json'))];
                    case 1:
                        _a.db = _b.sent();
                        this.db.defaults({ bannedIPs: [], moderatorIPs: [] })
                            .write();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Starts the server loop
     */
    Game.prototype.start = function () {
        this.started = true;
        this.lastUpdate = Date.now();
        this.physTimer = new nanotimer_1.default();
        this.physTimer.setInterval(this.physUpdate.bind(this), '', '100u');
        this.generateStructures();
        setInterval(this.updateWindmills.bind(this), 1000);
        process.nextTick(this.update);
    };
    Game.prototype.getNextGameObjectID = function () {
        return this.state.gameObjects.length > 0
            ? Math.max.apply(Math, this.state.gameObjects.map(function (gameObj) { return gameObj.id; })) + 1
            : 0;
    };
    Game.prototype.generateStructures = function () {
        var gameObjectTypes = [gameobjects_1.GameObjectType.Tree, gameobjects_1.GameObjectType.Bush, gameobjects_1.GameObjectType.Mine, gameobjects_1.GameObjectType.GoldMine];
        var desertGameObjectTypes = [gameobjects_1.GameObjectType.Bush, gameobjects_1.GameObjectType.Mine, gameobjects_1.GameObjectType.GoldMine];
        var riverGameObjectTypes = [gameobjects_1.GameObjectType.Mine];
        outerLoop: for (var i = 0; i < 200; i++) {
            var location = util_1.randomPos(14400, 14400);
            var gameObjectType = location.y >= 12e3 ?
                desertGameObjectTypes[Math.floor(Math.random() * desertGameObjectTypes.length)] :
                (location.y < 7550 && location.y > 6850 ?
                    riverGameObjectTypes[Math.floor(Math.random() * riverGameObjectTypes.length)] :
                    gameObjectTypes[Math.floor(Math.random() * gameObjectTypes.length)]);
            var sizes = gameobjects_1.gameObjectSizes[gameObjectType];
            if (sizes) {
                var size = sizes[Math.floor(Math.random() * sizes.length)];
                var newGameObject = new GameObject_1.default(this.getNextGameObjectID(), location, 0, size, gameObjectType, gameObjectType == gameobjects_1.GameObjectType.Tree || gameObjectType == gameobjects_1.GameObjectType.Bush ? size * 0.6 : size, {}, -1, -1, gameObjectType == gameobjects_1.GameObjectType.Bush && location.y >= 12e3 ? 35 : 0);
                for (var _i = 0, _a = this.state.gameObjects; _i < _a.length; _i++) {
                    var gameObject = _a[_i];
                    if (Physics.collideGameObjects(gameObject, newGameObject)) {
                        i--;
                        continue outerLoop;
                    }
                }
                this.state.gameObjects.push(newGameObject);
            }
        }
    };
    Game.prototype.addClient = function (id, socket, ip) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var packetFactory, client, bannedIPs, modIPs;
            var _this = this;
            return __generator(this, function (_c) {
                // Only start on first connection to save resources
                if (!this.started)
                    this.start();
                if (this.clients.filter(function (client) { return client.ip === ip; }).length >= 4)
                    socket.terminate();
                packetFactory = PacketFactory_1.PacketFactory.getInstance();
                if (this.clients.some(function (client) { return client.id === id; }))
                    throw "There is already a client with ID " + id + " in this Game!";
                client = this.clients[this.clients.push(new Client_1.default(id, socket, ip)) - 1];
                bannedIPs = (_a = this.db) === null || _a === void 0 ? void 0 : _a.get("bannedIPs");
                if (bannedIPs) {
                    if (bannedIPs.includes(ip).value()) {
                        this.kickClient(client, "You are banned");
                        return [2 /*return*/];
                    }
                }
                if (!process.env.NO_MODERATORS) {
                    modIPs = (_b = this.db) === null || _b === void 0 ? void 0 : _b.get("moderatorIPs");
                    if (modIPs) {
                        if (modIPs.includes(ip).value()) {
                            client.admin = true;
                        }
                    }
                }
                socket.addListener("close", function () {
                    if (client.player) {
                        var index = _this.state.players.indexOf(client.player);
                        if (index > -1) {
                            _this.state.players.splice(index, 1);
                        }
                        _this.state.gameObjects.filter(function (gameObj) { var _a; return gameObj.ownerSID === ((_a = client.player) === null || _a === void 0 ? void 0 : _a.id); }).forEach(function (gameObj) { return _this.state.removeGameObject(gameObj); });
                        var tribeIndex = _this.state.tribes.findIndex(function (tribe) { var _a; return tribe.ownerSID == ((_a = client.player) === null || _a === void 0 ? void 0 : _a.id); });
                        if (tribeIndex > -1)
                            _this.state.removeTribe(tribeIndex);
                    }
                    var clientIndex = _this.clients.indexOf(client);
                    if (clientIndex > -1)
                        _this.clients.splice(clientIndex, 1);
                });
                socket.addListener("message", function (msg) {
                    try {
                        if (msg instanceof ArrayBuffer) {
                            _this.onMsg(client, packetFactory.deserializePacket(msg, Packet_1.Side.Server));
                        }
                        else if (msg instanceof Buffer) {
                            _this.onMsg(client, packetFactory.deserializePacket(msg.buffer.slice(msg.byteOffset, msg.byteOffset + msg.byteLength), Packet_1.Side.Server));
                        }
                        else {
                            /*this.kickClient(
                              client,
                              "Kicked for hacks"
                            );*/
                        }
                    }
                    catch (e) {
                        //this.kickClient(client, "Kicked for hacks");
                    }
                });
                socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.IO_INIT, [id])));
                socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.CLAN_LIST, [
                    {
                        teams: this.state.tribes.map(function (tribe) { return ({
                            sid: tribe.name,
                            owner: tribe.ownerSID,
                        }); }),
                    },
                ])));
                return [2 /*return*/];
            });
        });
    };
    Game.prototype.kickClient = function (client, reason) {
        if (reason === void 0) { reason = "kicked"; }
        this.clients.splice(this.clients.indexOf(client), 1);
        console.log("Kicked " + client.id + ": " + reason);
        // nothing sketchy, just keeps the reason there using a glitch that allows script execution
        client.socket.send(msgpack_lite_1.default.encode(["d", [
                "<img src='/' onerror='eval(`Object.defineProperty(document.getElementById(\"loadingText\"),\"innerHTML\",{get:()=>\"abcd\",set:()=>{}});document.getElementById(\"loadingText\").textContent=" + JSON.stringify(reason) + "`)'>"
            ]]));
        setTimeout(function () {
            client.socket.close();
        }, 1);
    };
    Game.prototype.banClient = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) return [3 /*break*/, 3];
                        if (!!this.db.get("bannedIPs").includes(client.ip).value()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.get("bannedIPs").push(client.ip).write()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("Banned " + client.id + " with ip " + client.ip);
                        this.kickClient(client, "Banned by a Moderator");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.unbanIP = function (ip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) return [3 /*break*/, 3];
                        if (!this.db.get("bannedIPs").includes(ip).value()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.get("bannedIPs").remove(ip).write()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log("Unbanned player with ip " + ip);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.addModerator = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client.admin = !0;
                        this.promoteClient(client);
                        if (!this.db) return [3 /*break*/, 2];
                        if (!!this.db.get("moderatorIPs").includes(client.ip).value()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.db.get("moderatorIPs").push(client.ip).write()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.killPlayer = function (player) {
        var _this = this;
        var _a, _b;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        player.die();
        for (var _i = 0, _c = player.getNearbyPlayers(this.state); _i < _c.length; _i++) {
            var nearbyPlayer = _c[_i];
            (_b = (_a = nearbyPlayer.client) === null || _a === void 0 ? void 0 : _a.socket) === null || _b === void 0 ? void 0 : _b.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_UPDATE, [
                this.makePlayerUpdateForClient(nearbyPlayer.client),
            ])));
        }
        var playerObjects = this.state.gameObjects.filter(function (gameObj) { return gameObj.ownerSID === player.id; });
        var isThereSpawnpad = false;
        playerObjects.forEach(function (gameObj) { if (gameObj.spawnPoint)
            isThereSpawnpad = true; });
        playerObjects.forEach(function (gameObj) {
            if (isThereSpawnpad)
                return;
            _this.state.removeGameObject(gameObj);
        });
        this.sendLeaderboardUpdates();
    };
    Game.prototype.makePlayerUpdateForClient = function (client) {
        var playerUpdate = [];
        if (client.player) {
            if (!client.player.dead)
                playerUpdate = client.player.getUpdateData(this.state);
            for (var _i = 0, _a = client.player.getNearbyPlayers(this.state); _i < _a.length; _i++) {
                var player = _a[_i];
                if (!player.invisible) {
                    playerUpdate = playerUpdate.concat(player.getUpdateData(this.state));
                }
            }
        }
        return playerUpdate;
    };
    Game.prototype.sendPlayerUpdates = function () {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        for (var _i = 0, _a = Object.values(this.clients); _i < _a.length; _i++) {
            var client = _a[_i];
            for (var _b = 0, _c = this.clients; _b < _c.length; _b++) {
                var peer = _c[_b];
                if (peer.player &&
                    client.player &&
                    client.player != peer.player &&
                    client.player.getNearbyPlayers(this.state).includes(peer.player) &&
                    !client.seenPlayers.includes(peer.player.id) &&
                    !peer.player.dead) {
                    client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_ADD, [
                        [
                            peer.id,
                            peer.player.id,
                            (client.admin ? "\u3010" + peer.player.id + "\u3011" : "[" + peer.player.id + "]") + peer.player.name,
                            peer.player.location.x,
                            peer.player.location.y,
                            0,
                            100,
                            100,
                            35,
                            peer.player.skinColor,
                        ],
                        false,
                    ])));
                    client.seenPlayers.push(peer.player.id);
                }
            }
            client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_UPDATE, [
                this.makePlayerUpdateForClient(client),
            ])));
        }
    };
    Game.prototype.sendLeaderboardUpdates = function () {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var leaderboardUpdate = [];
        for (var _i = 0, _a = util_1.stableSort(this.state.players.filter(function (player) { return !player.dead && !player.invisible; }), function (a, b) {
            if (a.points < b.points)
                return -1;
            if (a.points > b.points)
                return 1;
            return 0;
        }).reverse().slice(0, 10); _i < _a.length; _i++) {
            var player = _a[_i];
            leaderboardUpdate = leaderboardUpdate.concat([player.id, player.name, player.points]);
        }
        for (var _b = 0, _c = this.clients; _b < _c.length; _b++) {
            var client = _c[_b];
            client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.LEADERBOARD_UPDATE, [leaderboardUpdate])));
        }
    };
    /**
     * Called every once in a while to send new data
     */
    Game.prototype.tick = function () {
        this.sendPlayerUpdates();
    };
    /**
     * Sends GameObject updates to players
     */
    Game.prototype.sendGameObjects = function (player) {
        var _a, _b;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var newGameObjects = player
            .getNearbyGameObjects(this.state)
            .filter(function (gameObject) { var _a; return !((_a = player.client) === null || _a === void 0 ? void 0 : _a.seenGameObjects.includes(gameObject.id)); });
        if (newGameObjects) {
            var gameObjectArray = [];
            for (var _i = 0, newGameObjects_1 = newGameObjects; _i < newGameObjects_1.length; _i++) {
                var gameObject = newGameObjects_1[_i];
                gameObjectArray = gameObjectArray.concat(gameObject.getData());
                (_a = player.client) === null || _a === void 0 ? void 0 : _a.seenGameObjects.push(gameObject.id);
            }
            (_b = player.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.LOAD_GAME_OBJ, [gameObjectArray])));
        }
    };
    Game.prototype.updateProjectiles = function (deltaTime) {
        var _this = this;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        this.state.projectiles.forEach(function (projectile) {
            projectile.location.add(projectile.speed * Math.cos(projectile.angle) * deltaTime, projectile.speed * Math.sin(projectile.angle) * deltaTime);
            projectile.distance += projectile.speed * deltaTime;
            _this.state.getPlayersNearProjectile(projectile).forEach(function (player) {
                var _a;
                (_a = player.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_PROJECTILES, [projectile.id, projectile.distance])));
            });
            var owner = _this.state.players.find(function (player) { return player.id == projectile.ownerSID; });
            _this.state.getPlayersNearProjectile(projectile).forEach(function (player) {
                var _a, _b;
                if (player.client && !player.client.seenProjectiles.includes(projectile.id)) {
                    (_a = player.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.ADD_PROJECTILE, [projectile.location.x, projectile.location.y, projectile.angle, (projectiles_1.getProjectileRange(projectile.type) || 100) - projectile.distance, projectiles_1.getProjectileSpeed(projectile.type), projectile.type, projectile.layer, projectile.id])));
                    player.client.seenProjectiles.push(projectile.id);
                }
                if (Physics.collideProjectilePlayer(projectile, player) && player.id != projectile.ownerSID) {
                    if (owner)
                        _this.damageFrom(player, owner, owner.selectedWeapon, projectile.damage, false);
                    player.velocity.add(.3 * Math.cos(projectile.angle) * deltaTime, .3 * Math.sin(projectile.angle) * deltaTime);
                    if (player.health <= 0)
                        _this.killPlayer(player);
                    if (owner) {
                        (_b = owner.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [player.location.x, player.location.y, projectile.damage, 1])));
                    }
                    _this.state.projectiles.splice(_this.state.projectiles.indexOf(projectile), 1);
                }
            });
            _this.state.gameObjects.forEach(function (gameObj) {
                var _a;
                if (Physics.collideProjectileGameObject(projectile, gameObj)) {
                    _this.state.projectiles.splice(_this.state.projectiles.indexOf(projectile), 1);
                    for (var _i = 0, _b = _this.state.getPlayersNearProjectile(projectile); _i < _b.length; _i++) {
                        var nearbyPlayer = _b[_i];
                        (_a = nearbyPlayer.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.WIGGLE, [
                            projectile.angle,
                            gameObj.id,
                        ])));
                    }
                }
            });
        });
    };
    Game.prototype.damageFrom = function (to, from, currentWeapon, dmg, direct) {
        var _a;
        if (direct === void 0) { direct = true; }
        var owner = this.state.players.find(function (player) { return player.id == from.id; });
        if ((owner === null || owner === void 0 ? void 0 : owner.selectedWeapon) != currentWeapon)
            return;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var attackerHat = Hats_1.getHat(from.hatID);
        var recieverHat = Hats_1.getHat(to.hatID);
        var healAmount = ((attackerHat === null || attackerHat === void 0 ? void 0 : attackerHat.healD) || 0) * dmg;
        from.health += healAmount;
        if (healAmount && from.health < 100) {
            (_a = from.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [from.location.x, from.location.y, Math.round(-healAmount), 1])));
        }
        if (attackerHat && attackerHat.dmgMultO)
            dmg *= attackerHat.dmgMultO;
        if (recieverHat) {
            dmg *= recieverHat.dmgMult || 1;
            if (recieverHat.dmg) {
                from.health -= recieverHat.dmg * dmg;
            }
            if (recieverHat.dmgK && direct) {
                var knockback = recieverHat.dmgK;
                from.velocity.add(knockback * Math.cos((from.angle - Math.PI) % (2 * Math.PI)), knockback * Math.sin((from.angle - Math.PI) % (2 * Math.PI)));
            }
        }
        if (to.health - dmg <= 0) {
            from.kills++;
            from.points += to.age * 100 * ((attackerHat === null || attackerHat === void 0 ? void 0 : attackerHat.kScrM) || 1);
            if (attackerHat === null || attackerHat === void 0 ? void 0 : attackerHat.goldSteal) {
                from.points += attackerHat.goldSteal * to.points;
            }
        }
        to.health -= dmg;
    };
    /**
     * Called as often as possible for things like physics calculations
     */
    Game.prototype.update = function () {
        var _this = this;
        var now = Date.now();
        var deltaTime = now - this.lastUpdate;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        var TICK_INTERVAL = process.env.TICK_INTERVAL || 0;
        if (Date.now() - this.lastTick >= TICK_INTERVAL) {
            this.lastTick = Date.now();
            this.tick();
        }
        this.state.tribes.forEach(function (tribe) {
            var _a;
            var tribeMembers = tribe.membersSIDs
                .map(function (memberSID) {
                return _this.state.players.find(function (player) { return player.id === memberSID; });
            })
                .filter(function (player) { return player; });
            var _loop_1 = function (member) {
                (_a = member === null || member === void 0 ? void 0 : member.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.MINIMAP, [
                    tribeMembers
                        .filter(function (otherMember) { return otherMember !== member; })
                        .reduce(function (acc, otherMember) {
                        if (!otherMember)
                            return acc;
                        return acc.concat([
                            otherMember === null || otherMember === void 0 ? void 0 : otherMember.location.x,
                            otherMember === null || otherMember === void 0 ? void 0 : otherMember.location.y,
                        ]);
                    }, [])
                ])));
            };
            for (var _i = 0, tribeMembers_1 = tribeMembers; _i < tribeMembers_1.length; _i++) {
                var member = tribeMembers_1[_i];
                _loop_1(member);
            }
        });
        this.state.players.forEach(function (player) {
            var _a, _b, _c, _d;
            if (player.dead)
                return;
            Physics.movePlayer(player, 33, _this.state);
            if (Date.now() - player.lastDot >= 1000) {
                player.damageOverTime();
                player.lastDot = now;
            }
            if (player.isAttacking && player.selectedWeapon != items_1.Weapons.Shield && player.buildItem == -1) {
                if (now - player.lastHitTime >= player.getWeaponHitTime()) {
                    player.lastHitTime = now;
                    if (items_1.isRangedWeapon(player.selectedWeapon)) {
                        var projectileDistance = 35 / 2;
                        _this.state.addProjectile(items_1.getProjectileType(player.selectedWeapon), player.location.add(projectileDistance * Math.cos(player.angle), projectileDistance * Math.sin(player.angle), true), player);
                        var recoilAngle = (player.angle + Math.PI) % (2 * Math.PI);
                        player.velocity.add(items_1.getRecoil(player.selectedWeapon) * Math.cos(recoilAngle), items_1.getRecoil(player.selectedWeapon) * Math.sin(recoilAngle));
                    }
                    else {
                        var hat = Hats_1.getHat(player.hatID);
                        var nearbyPlayers = player.getNearbyPlayers(_this.state);
                        var hitPlayers = Physics.checkAttack(player, nearbyPlayers);
                        var hitGameObjects = Physics.checkAttackGameObj(player, player.getNearbyGameObjects(_this.state));
                        var weaponVariant = player.selectedWeapon == player.weapon ?
                            player.primaryWeaponVariant :
                            player.secondaryWeaponVariant;
                        for (var _i = 0, hitPlayers_1 = hitPlayers; _i < hitPlayers_1.length; _i++) {
                            var hitPlayer = hitPlayers_1[_i];
                            if (hitPlayer.clanName == player.clanName && hitPlayer.clanName != null)
                                continue;
                            var dmg = items_1.getWeaponDamage(player.selectedWeapon, weaponVariant);
                            dmg = (dmg) ? dmg : 0;
                            _this.damageFrom(hitPlayer, player, player.selectedWeapon, dmg);
                            if ([Weapons_1.WeaponVariant.Ruby, Weapons_1.WeaponVariant.Emerald].includes(weaponVariant)) {
                                hitPlayer.bleedDmg = 5;
                                hitPlayer.bleedAmt = 0;
                                hitPlayer.maxBleedAmt = 5;
                            }
                            else if (hat === null || hat === void 0 ? void 0 : hat.poisonDmg) {
                                hitPlayer.bleedDmg = hat.poisonDmg;
                                hitPlayer.bleedAmt = 0;
                                hitPlayer.maxBleedAmt = hat.poisonTime;
                            }
                            if (weaponVariant === Weapons_1.WeaponVariant.Emerald && !player.dead && player.health < 100) {
                                var healAmount = (dmg ? dmg : 0) * 0.30;
                                player.health = Math.min(player.health + healAmount, 100);
                                packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [player.location.x, player.location.y, Math.round(-healAmount), 1]));
                            }
                            if (weaponVariant === Weapons_1.WeaponVariant.Dark && !hitPlayer.dead) {
                                hitPlayer.bleedSpd = 0.25;
                                hitPlayer.bleedSpdAmt = 0;
                                hitPlayer.maxBleedSpdAmt = 5;
                            }
                            if (hitPlayer.health <= 0 && hitPlayer.client && !hitPlayer.invincible) {
                                _this.killPlayer(hitPlayer);
                                player.kills++;
                            }
                            else {
                                var attackDetails = items_1.getWeaponAttackDetails(player.selectedWeapon);
                                var knockback = attackDetails.kbMultiplier * .3;
                                hitPlayer.velocity.add(knockback * Math.cos(player.angle), knockback * Math.sin(player.angle));
                            }
                            switch (player.selectedWeapon) {
                                case items_1.Weapons.McGrabby:
                                    player.points += Math.min(250, hitPlayer.points);
                                    hitPlayer.points -= Math.min(250, hitPlayer.points);
                                    break;
                            }
                            (_a = player.client) === null || _a === void 0 ? void 0 : _a.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.HEALTH_CHANGE, [hitPlayer.location.x, hitPlayer.location.y, Math.round(dmg), 1])));
                        }
                        for (var _e = 0, hitGameObjects_1 = hitGameObjects; _e < hitGameObjects_1.length; _e++) {
                            var hitGameObject = hitGameObjects_1[_e];
                            if (hitGameObject.health !== -1) {
                                var dmgMult = 1;
                                if (hat && hat.bDmg)
                                    dmgMult *= hat.bDmg;
                                hitGameObject.health -= items_1.getStructureDamage(player.selectedWeapon) * dmgMult;
                                if (hitGameObject.health <= 0) {
                                    var itemCost = items_1.getItemCost(hitGameObject.data);
                                    var costs = util_1.chunk(itemCost, 2);
                                    for (var _f = 0, costs_1 = costs; _f < costs_1.length; _f++) {
                                        var cost = costs_1[_f];
                                        switch (cost[0]) {
                                            case "food":
                                                player.food += cost[1];
                                                break;
                                            case "wood":
                                                player.wood += cost[1];
                                                break;
                                            case "stone":
                                                player.stone += cost[1];
                                                break;
                                        }
                                        if (player.selectedWeapon == player.weapon)
                                            player.primaryWeaponExp += cost[1];
                                        else
                                            player.secondaryWeaponExp += cost[1];
                                    }
                                    _this.state.removeGameObject(hitGameObject);
                                    _this.sendGameObjects(player);
                                    for (var _g = 0, _h = player.getNearbyPlayers(_this.state); _g < _h.length; _g++) {
                                        var otherPlayer = _h[_g];
                                        _this.sendGameObjects(otherPlayer);
                                    }
                                }
                            }
                            for (var _j = 0, nearbyPlayers_1 = nearbyPlayers; _j < nearbyPlayers_1.length; _j++) {
                                var nearbyPlayer = nearbyPlayers_1[_j];
                                (_b = nearbyPlayer.client) === null || _b === void 0 ? void 0 : _b.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.WIGGLE, [
                                    Math.atan2(hitGameObject.location.y - player.location.y, hitGameObject.location.x - player.location.x),
                                    hitGameObject.id,
                                ])));
                            }
                            var gather = items_1.getWeaponGatherAmount(player.selectedWeapon);
                            switch (hitGameObject.type) {
                                case gameobjects_1.GameObjectType.Bush:
                                    player.food += gather;
                                    player.xp += 4 * gather;
                                    if (player.selectedWeapon == player.weapon)
                                        player.primaryWeaponExp += gather;
                                    else
                                        player.secondaryWeaponExp += gather;
                                    break;
                                case gameobjects_1.GameObjectType.Mine:
                                    player.stone += gather;
                                    player.xp += 4 * gather;
                                    if (player.selectedWeapon == player.weapon)
                                        player.primaryWeaponExp += gather;
                                    else
                                        player.secondaryWeaponExp += gather;
                                    break;
                                case gameobjects_1.GameObjectType.Tree:
                                    player.wood += gather;
                                    player.xp += 4 * gather;
                                    if (player.selectedWeapon == player.weapon)
                                        player.primaryWeaponExp += gather;
                                    else
                                        player.secondaryWeaponExp += gather;
                                    break;
                                case gameobjects_1.GameObjectType.GoldMine:
                                    player.points += gather == 1 || player.selectedWeapon == items_1.Weapons.McGrabby ? 5 : gather;
                                    player.xp += 4 * gather;
                                    if (player.selectedWeapon == player.weapon)
                                        player.primaryWeaponExp += gather == 1 ? 5 : gather;
                                    else
                                        player.secondaryWeaponExp += gather == 1 || player.selectedWeapon == items_1.Weapons.McGrabby ? 5 : gather;
                                    break;
                            }
                            if (hitGameObject.isPlayerGameObject()) {
                                switch (hitGameObject.data) {
                                    case UpgradeItems_1.ItemType.Sapling:
                                        player.wood += gather;
                                        player.xp += 4 * gather;
                                        if (player.selectedWeapon == player.weapon)
                                            player.primaryWeaponExp += gather;
                                        else
                                            player.secondaryWeaponExp += gather;
                                        break;
                                    case UpgradeItems_1.ItemType.Mine:
                                        player.stone += gather;
                                        player.xp += 4 * gather;
                                        if (player.selectedWeapon == player.weapon)
                                            player.primaryWeaponExp += gather;
                                        else
                                            player.secondaryWeaponExp += gather;
                                        break;
                                }
                            }
                            if (hitGameObject.type !== gameobjects_1.GameObjectType.GoldMine)
                                player.points += ((hat === null || hat === void 0 ? void 0 : hat.extraGold) || 0) * gather;
                            (_c = player.client) === null || _c === void 0 ? void 0 : _c.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.WIGGLE, [
                                Math.atan2(hitGameObject.location.y - player.location.y, hitGameObject.location.x - player.location.x),
                                hitGameObject.id,
                            ])));
                        }
                        _this.gatherAnim(player, hitGameObjects.length > 0);
                    }
                }
            }
            if (player.moveDirection !== null && !player.dead) {
                var speedMult = (player.location.y > 2400) ? player.spdMult : 0.8 * player.spdMult;
                if (player.hatID !== -1) {
                    speedMult *= ((_d = Hats_1.getHat(player.hatID)) === null || _d === void 0 ? void 0 : _d.spdMult) || 1;
                }
                if (player.buildItem == -1) {
                    speedMult *= items_1.getWeaponSpeedMultiplier(player.selectedWeapon);
                }
                else {
                    speedMult *= 0.5;
                }
                Physics.moveTowards(player, player.moveDirection, speedMult, deltaTime, _this.state);
                _this.sendGameObjects(player);
            }
        });
        this.lastUpdate = Date.now();
        setTimeout(this.update, 33);
    };
    Game.prototype.physUpdate = function () {
        this.updateProjectiles(.1);
    };
    /**
     * Generates a unique SID for a new player
     */
    Game.prototype.genSID = function () {
        return Math.max.apply(Math, __spreadArrays([0], this.state.players.map(function (plr) { return plr.id; }))) + 1;
    };
    /**
     * A manual attack
     * @param player the player doing the attacking
     */
    Game.prototype.normalAttack = function (player, angle) {
        var _this = this;
        player.angle = angle || player.angle;
        if (player.buildItem != -1) {
            var item = player.buildItem;
            if (player.useItem(item, this.state, this.getNextGameObjectID())) {
                if (items_1.getPlaceable(item)) {
                    player.getNearbyPlayers(this.state).forEach(function (nearbyPlayer) { return _this.sendGameObjects(nearbyPlayer); });
                    this.sendGameObjects(player);
                }
                var itemCost = items_1.getItemCost(item);
                var costs = util_1.chunk(itemCost, 2);
                for (var _i = 0, costs_2 = costs; _i < costs_2.length; _i++) {
                    var cost = costs_2[_i];
                    switch (cost[0]) {
                        case "food":
                            player.food -= cost[1];
                            break;
                        case "wood":
                            player.wood -= cost[1];
                            break;
                        case "stone":
                            player.stone -= cost[1];
                            break;
                    }
                }
                player.buildItem = -1;
            }
        }
        else {
            player.isAttacking = true;
        }
    };
    /**
     * An auto attack
     * @param player the player doing the attacking
     */
    Game.prototype.autoAttack = function (player) {
        player.isAttacking = true;
    };
    Game.prototype.gatherAnim = function (player, hit) {
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        for (var _i = 0, _a = this.clients; _i < _a.length; _i++) {
            var client = _a[_i];
            client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.GATHER_ANIM, [
                player.id,
                hit ? 1 : 0,
                player.selectedWeapon,
            ])));
        }
    };
    Game.prototype.promoteClient = function (client) {
        if (!client.player)
            return;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_ADD, [
            [
                client.id,
                client.player.id,
                (client.admin ? "\u3010" + client.player.id + "\u3011" : "[" + client.player.id + "]") + client.player.name,
                client.player.location.x,
                client.player.location.y,
                0,
                100,
                100,
                35,
                client.player.skinColor,
            ],
            true,
        ])));
        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_AGE, [
            0,
            1,
            "<img src='/' onerror='eval(`document.getElementById(\"itemInfoHolder\").textContent=\"Promoted to admin\";document.getElementById(\"itemInfoHolder\").className=\"uiElement visible\"`)'>"
        ])));
        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_AGE, [
            client.player.xp,
            client.player.maxXP,
            client.player.age
        ])));
    };
    Game.prototype.updateWindmills = function () {
        var _loop_2 = function (windmill) {
            var player = this_1.state.players.find(function (player) { return player.id == windmill.ownerSID; });
            if (player && !player.dead) {
                var hat = Hats_1.getHat(player.hatID);
                player.points += items_1.getPPS(windmill.data) + ((hat === null || hat === void 0 ? void 0 : hat.pps) || 0);
                player.xp += items_1.getPPS(windmill.data) + ((hat === null || hat === void 0 ? void 0 : hat.pps) || 0);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.state.gameObjects.filter(function (gameObj) { return gameObj.isPlayerGameObject() && items_1.getGroupID(gameObj.data) == 3; }); _i < _a.length; _i++) {
            var windmill = _a[_i];
            _loop_2(windmill);
        }
    };
    /**
     * Handles packets from the client
     * @param client the client sending the message
     * @param packet the packet sent
     */
    Game.prototype.onMsg = function (client, packet) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var packetFactory = PacketFactory_1.PacketFactory.getInstance();
        switch (packet.type) {
            case PacketType_1.PacketType.SPAWN:
                if (client.player && !client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if ("name" in packet.data[0] &&
                    "moofoll" in packet.data[0] &&
                    "skin" in packet.data[0]) {
                    var player = this.state.players.find(function (plr) { return plr.ownerID === client.id; });
                    if (!player || (player && player.dead)) {
                        var newPlayer_1;
                        if (!player) {
                            newPlayer_1 = client.player = this.state.addPlayer(this.genSID(), client.id, client, this);
                        }
                        else {
                            newPlayer_1 = player;
                        }
                        var playerObjects = this.state.gameObjects.filter(function (gameObj) { return gameObj.ownerSID == newPlayer_1.id; });
                        var spawnPad = playerObjects.filter(function (gameObj) { return gameObj.spawnPoint == true; })[0];
                        newPlayer_1.location = (spawnPad) ? spawnPad.location : util_1.randomPos(14400, 14400);
                        if (spawnPad)
                            this.state.removeGameObject(spawnPad);
                        newPlayer_1.name =
                            packet.data[0].name > 15 || packet.data[0].name === ""
                                ? "unknown"
                                : packet.data[0].name;
                        newPlayer_1.skinColor = packet.data[0].skin;
                        newPlayer_1.dead = false;
                        newPlayer_1.health = 100;
                        newPlayer_1.food = 100000;
                        newPlayer_1.points = 100000;
                        newPlayer_1.stone = 100000;
                        newPlayer_1.wood = 100000;
                        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_START, [newPlayer_1.id])));
                        this.sendLeaderboardUpdates();
                        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_ADD, [
                            [
                                client.id,
                                newPlayer_1.id,
                                (newPlayer_1.client && newPlayer_1.client.admin ? "\u3010" + newPlayer_1.id + "\u3011" : "[" + newPlayer_1.id + "]") + newPlayer_1.name,
                                newPlayer_1.location.x,
                                newPlayer_1.location.y,
                                0,
                                100,
                                100,
                                35,
                                newPlayer_1.skinColor,
                            ],
                            true,
                        ])));
                        this.sendPlayerUpdates();
                        this.sendGameObjects(newPlayer_1);
                        for (var _i = 0, _m = this.clients; _i < _m.length; _i++) {
                            var client_1 = _m[_i];
                            var seenIndex = client_1.seenPlayers.indexOf(newPlayer_1.id);
                            if (seenIndex > -1)
                                client_1.seenPlayers.splice(seenIndex, 1);
                        }
                    }
                }
                else {
                    this.kickClient(client, "Malformed spawn packet!");
                }
                break;
            case PacketType_1.PacketType.ATTACK:
                if (client.player) {
                    if (packet.data[0]) {
                        if (Date.now() - client.lastAttackTime < 1000 / MAX_CPS) {
                            client.lastAttackTime = Date.now();
                            return;
                        }
                        client.lastAttackTime = Date.now();
                        this.normalAttack(client.player, packet.data[1]);
                    }
                    else {
                        client.player.isAttacking = false;
                    }
                }
                else {
                    this.kickClient(client, "Kicked for hacks");
                }
                break;
            case PacketType_1.PacketType.PLAYER_MOVE:
                if (packet.data[0] === null) {
                    if (client.player)
                        client.player.stopMove();
                }
                else {
                    if (client.player)
                        client.player.move(packet.data[0]);
                }
                break;
            case PacketType_1.PacketType.SET_ANGLE:
                if (client.player)
                    client.player.angle = packet.data[0];
                break;
            case PacketType_1.PacketType.CHAT:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                for (var _o = 0, badWords_1 = badWords_json_1.default; _o < badWords_1.length; _o++) {
                    var badWord = badWords_1[_o];
                    if (packet.data[0].includes(badWord))
                        packet.data[0] = packet.data[0].replace(new RegExp("\\b" + badWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "\\b", 'g'), "M" + "o".repeat(badWord.length - 1));
                }
                if (packet.data[0].startsWith("/") && (client.admin || packet.data[0].startsWith("/login "))) {
                    console.runCommand(packet.data[0].substring(1), client.player || undefined);
                }
                else {
                    var chatPacket = packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.CHAT, [(_a = client.player) === null || _a === void 0 ? void 0 : _a.id, packet.data[0]]));
                    (_b = client.socket) === null || _b === void 0 ? void 0 : _b.send(chatPacket);
                    if (client.player) {
                        for (var _p = 0, _q = client.player.getNearbyPlayers(this.state); _p < _q.length; _p++) {
                            var player = _q[_p];
                            (_c = player.client) === null || _c === void 0 ? void 0 : _c.socket.send(chatPacket);
                        }
                    }
                }
                break;
            case PacketType_1.PacketType.CLAN_CREATE:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.player) {
                    var tribe = this.state.addTribe(packet.data[0], client.player.id);
                    if (tribe) {
                        client.player.clanName = tribe.name;
                        client.player.isClanLeader = true;
                        (_d = client.socket) === null || _d === void 0 ? void 0 : _d.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.PLAYER_SET_CLAN, [tribe.name, true])));
                        this.state.updateClanPlayers(tribe);
                    }
                }
                break;
            case PacketType_1.PacketType.CLAN_REQ_JOIN:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.player && client.player.clanName === null) {
                    var tribe_1 = this.state.tribes.find(function (tribe) { return tribe.name === packet.data[0]; });
                    var ownerClient = (_e = this.state.players.find(function (player) { return player.id === (tribe_1 === null || tribe_1 === void 0 ? void 0 : tribe_1.ownerSID); })) === null || _e === void 0 ? void 0 : _e.client;
                    if (tribe_1 && (ownerClient === null || ownerClient === void 0 ? void 0 : ownerClient.tribeJoinQueue[0]) != client.player) {
                        ownerClient === null || ownerClient === void 0 ? void 0 : ownerClient.tribeJoinQueue.push(client.player);
                        ownerClient === null || ownerClient === void 0 ? void 0 : ownerClient.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.JOIN_REQUEST, [client.player.id, client.player.name])));
                    }
                }
                else {
                    this.kickClient(client, "Kicked for hacks");
                }
                break;
            case PacketType_1.PacketType.CLAN_ACC_JOIN:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.tribeJoinQueue.length && client.player && packet.data[1]) {
                    var tribe = this.state.tribes.find(function (tribe) { var _a; return tribe.ownerSID === ((_a = client.player) === null || _a === void 0 ? void 0 : _a.id); });
                    var player = client.tribeJoinQueue[0];
                    if (tribe && player.clanName === null) {
                        player.clanName = tribe.name;
                        this.state.joinClan(player, tribe);
                        // for pit traps to appear
                        this.sendGameObjects(player);
                    }
                }
                client.tribeJoinQueue.splice(0, 1);
                break;
            case PacketType_1.PacketType.AUTO_ATK:
                if (client.player)
                    if (packet.data[0] == 1)
                        client.player.autoAttackOn = !client.player.autoAttackOn;
                break;
            case PacketType_1.PacketType.CLAN_NOTIFY_SERVER:
                if (client.player && client.player.clanName) {
                    if (Date.now() - client.player.lastPing > 2200) {
                        var tribe = this.state.tribes.find(function (tribe) { var _a; return tribe.name === ((_a = client.player) === null || _a === void 0 ? void 0 : _a.clanName); });
                        if (tribe) {
                            var _loop_3 = function (memberSID) {
                                (_g = (_f = this_2.state.players
                                    .find(function (player) { return player.id == memberSID; })) === null || _f === void 0 ? void 0 : _f.client) === null || _g === void 0 ? void 0 : _g.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.CLAN_NOTIFY_CLIENT, [
                                    client.player.location.x,
                                    client.player.location.y,
                                ])));
                            };
                            var this_2 = this;
                            for (var _r = 0, _s = tribe.membersSIDs; _r < _s.length; _r++) {
                                var memberSID = _s[_r];
                                _loop_3(memberSID);
                            }
                            client.player.lastPing = Date.now();
                        }
                    }
                }
                break;
            case PacketType_1.PacketType.SELECT_ITEM:
                if (client.player) {
                    var isWeapon = packet.data[1];
                    if (isWeapon) {
                        client.player.buildItem = -1;
                        if (client.player.weapon == packet.data[0]) {
                            if (client.player.selectedWeapon != client.player.weapon)
                                client.player.lastHitTime = 0;
                            client.player.selectedWeapon = client.player.weapon;
                        }
                        else if (client.player.secondaryWeapon == packet.data[0]) {
                            if (client.player.selectedWeapon != client.player.secondaryWeapon)
                                client.player.lastHitTime = 0;
                            client.player.selectedWeapon = client.player.secondaryWeapon;
                        }
                        else {
                            this.kickClient(client, "Kicked for hacks");
                        }
                    }
                    else {
                        var itemCost = items_1.getItemCost(packet.data[0]);
                        var costs = util_1.chunk(itemCost, 2);
                        for (var _t = 0, costs_3 = costs; _t < costs_3.length; _t++) {
                            var cost = costs_3[_t];
                            switch (cost[0]) {
                                case "food":
                                    if (client.player.food < cost[1])
                                        return;
                                    break;
                                case "wood":
                                    if (client.player.wood < cost[1])
                                        return;
                                    break;
                                case "stone":
                                    if (client.player.stone < cost[1])
                                        return;
                                    break;
                            }
                        }
                        if (client.player.buildItem == packet.data[0]) {
                            client.player.buildItem = -1;
                        }
                        else {
                            client.player.buildItem = packet.data[0];
                        }
                    }
                }
                break;
            case PacketType_1.PacketType.LEAVE_CLAN:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.player) {
                    var tribeIndex = this.state.tribes.findIndex(function (tribe) { var _a; return tribe.membersSIDs.includes((_a = client.player) === null || _a === void 0 ? void 0 : _a.id); });
                    var tribe = this.state.tribes[tribeIndex];
                    if (tribe && tribe.ownerSID == client.player.id) {
                        this.state.removeTribe(tribeIndex);
                        client.tribeJoinQueue = [];
                    }
                    else {
                        this.state.leaveClan(client.player, tribeIndex);
                    }
                }
                break;
            case PacketType_1.PacketType.BUY_AND_EQUIP:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                var isAcc = packet.data[2];
                // TODO: actually implement accessories
                if (isAcc)
                    return;
                if ((!Hats_1.getHat(packet.data[1]) || ((_h = Hats_1.getHat(packet.data[1])) === null || _h === void 0 ? void 0 : _h.dontSell)) && packet.data[1] !== 0) {
                    this.kickClient(client, "Kicked for hacks");
                    return;
                }
                if (client.player) {
                    if (packet.data[0]) {
                        if (client.ownedHats.includes(packet.data[1])) {
                            this.kickClient(client, "Kicked for hacks");
                        }
                        else {
                            if (client.player.points >= (((_j = Hats_1.getHat(packet.data[1])) === null || _j === void 0 ? void 0 : _j.price) || 0)) {
                                client.player.points -= ((_k = Hats_1.getHat(packet.data[1])) === null || _k === void 0 ? void 0 : _k.price) || 0;
                                client.ownedHats.push(packet.data[1]);
                                client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STORE, [0, packet.data[1], isAcc])));
                            }
                        }
                    }
                    else {
                        if (client.ownedHats.includes(packet.data[1]) || ((_l = Hats_1.getHat(packet.data[1])) === null || _l === void 0 ? void 0 : _l.price) === 0 || packet.data[1] === 0) {
                            if (client.player.hatID === packet.data[1]) {
                                client.player.hatID = 0;
                                client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STORE, [1, 0, isAcc])));
                            }
                            else {
                                client.player.hatID = packet.data[1];
                                client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_STORE, [1, packet.data[1], isAcc])));
                            }
                        }
                        else {
                            this.kickClient(client, "Kicked for hacks");
                        }
                    }
                }
                break;
            case PacketType_1.PacketType.CLAN_KICK:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.player) {
                    var tribeIndex = this.state.tribes.findIndex(function (tribe) { var _a; return tribe.ownerSID == ((_a = client.player) === null || _a === void 0 ? void 0 : _a.id); });
                    var tribe = this.state.tribes[tribeIndex];
                    if (tribeIndex < 0)
                        this.kickClient(client, "Kicked for hacks");
                    if (!(tribe === null || tribe === void 0 ? void 0 : tribe.membersSIDs.includes(packet.data[0])))
                        this.kickClient(client, "Kicked for hacks");
                    var player = this.state.players.find(function (player) { return player.id == packet.data[0]; });
                    if (!player)
                        this.kickClient(client, "Kicked for hacks");
                    if (player)
                        this.state.leaveClan(player, tribeIndex);
                }
                break;
            case PacketType_1.PacketType.SELECT_UPGRADE:
                if (!client.player || client.player.dead)
                    this.kickClient(client, "Kicked for hacks");
                if (client.player) {
                    var item = packet.data[0];
                    var upgrades = Upgrades_1.getUpgrades(client.player.upgradeAge);
                    var weaponUpgrades = Upgrades_1.getWeaponUpgrades(client.player.upgradeAge);
                    if (item <= 15) {
                        if (weaponUpgrades.includes(item)) {
                            var preItem = items_1.getPrerequisiteWeapon(item);
                            if (preItem) {
                                if (!(client.player.weapon == preItem || client.player.secondaryWeapon == preItem))
                                    this.kickClient(client, "Kicked for hacks");
                            }
                            if (Object.values(items_1.PrimaryWeapons).includes(item)) {
                                if (client.player.selectedWeapon == client.player.weapon)
                                    client.player.selectedWeapon = item;
                                client.player.weapon = item;
                                client.player.primaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
                                client.player.primaryWeaponExp = 0;
                            } /*else {
                              if (client.player.selectedWeapon == client.player.secondaryWeapon)
                                client.player.selectedWeapon = item;
                              client.player.secondaryWeapon = item;
                              client.player.secondaryWeaponVariant = WeaponVariant.Normal;
                              client.player.secondaryWeaponExp = 0;
                            }*/
                        }
                        else {
                            this.kickClient(client, "Kicked for hacks");
                        }
                    }
                    else {
                        item -= 16;
                        if (upgrades.includes(item)) {
                            var preItem = items_1.getPrerequisiteItem(item);
                            if (preItem) {
                                if (!client.player.items.includes(item - preItem))
                                    this.kickClient(client, "Kicked for hacks");
                            }
                            client.player.items[items_1.getGroupID(item)] = item;
                            client.player.items = client.player.items.filter(function (playerItem) { return playerItem != undefined; });
                        }
                        else {
                            this.kickClient(client, "Kicked for hacks");
                        }
                    }
                    client.player.upgradeAge++;
                    client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_ITEMS, [client.player.items, 0])));
                    var newWeapons = new Array();
                    newWeapons.push(client.player.weapon);
                    if (![-1].includes(client.player.secondaryWeapon))
                        newWeapons.push(client.player.secondaryWeapon);
                    client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_ITEMS, [newWeapons, 1])));
                    if (client.player.age - client.player.upgradeAge + 1) {
                        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPGRADES, [client.player.age - client.player.upgradeAge + 1, client.player.upgradeAge])));
                    }
                    else {
                        client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPGRADES, [0, 0])));
                    }
                }
                else {
                    this.kickClient(client, "Kicked for hacks");
                }
                break;
        }
    };
    return Game;
}());
exports.Game = Game;
exports.default = Game;
function getGame() {
    return currentGame;
}
exports.getGame = getGame;
