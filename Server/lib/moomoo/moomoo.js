"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
var Game_1 = __importDefault(require("./Game"));
var vultr = require("../../../Client/serverData.js");
/**
 * Gets a unique (if game is passed) id for a MooMoo.io client
 * @param game A game containing client IDs to skip
 */
function getID(game) {
    if (game === void 0) { game = null; }
    var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890=-+_$%?/";
    function randString() {
        return (new Array(10)).fill(0).reduce(function (acc, _item) { return acc + alphabet[Math.floor(Math.random() * alphabet.length)]; }, "");
    }
    var id = randString();
    if (game) {
        while (game.clients.some(function (client) { return client.id == id; })) {
            id = randString();
        }
    }
    return id;
}
/**
 * Starts a MooMoo.io/Sanctuary server on an existing ws.Server
 * @param server the ws.Server to use
 */
function startServer(server) {
    var game = new Game_1.default();
    server.addListener("connection", function (socket, req) {
        var ip = "";
        if (process.env.BEHIND_PROXY) {
            ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
        }
        else if (req.socket.remoteAddress) {
            ip = req.socket.remoteAddress;
        }
        game.addClient(getID(game), socket, ip);
    });
}
exports.startServer = startServer;
;
