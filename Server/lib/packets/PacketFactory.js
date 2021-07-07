"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reversePacketTypeMapping = exports.packetTypeMapping = exports.Side = exports.PacketFactory = void 0;
var Packet_1 = require("./Packet");
Object.defineProperty(exports, "Side", { enumerable: true, get: function () { return Packet_1.Side; } });
var PacketType_1 = require("./PacketType");
var msgpack_lite_1 = __importDefault(require("msgpack-lite"));
/**
 * A mapping of PacketTypes to their serialized counterparts
 */
var packetTypeMapping = {};
exports.packetTypeMapping = packetTypeMapping;
packetTypeMapping[PacketType_1.PacketType.ATTACK] = { value: "c", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.AUTO_ATK] = { value: "7", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.CHAT] = { value: "ch", side: Packet_1.Side.Both };
packetTypeMapping[PacketType_1.PacketType.CLAN_ACC_JOIN] = { value: "11", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.DEATH] = { value: "11", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.CLAN_CREATE] = { value: "8", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.CLAN_LIST] = { value: "id", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.CLAN_ADD] = { value: "ac", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.CLAN_DEL] = { value: "ad", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.CLAN_KICK] = { value: "12", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.CLAN_REQ_JOIN] = { value: "10", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.DISCONN] = { value: "d", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.GATHER_ANIM] = { value: "7", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.BUY_AND_EQUIP] = { value: "13c", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.HEALTH_UPDATE] = { value: "h", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.ITEM_BUY] = { value: "13", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.LEADERBOARD_UPDATE] = { value: "5", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.LEAVE_CLAN] = { value: "9", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.LOAD_GAME_OBJ] = { value: "6", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.MINIMAP] = { value: "mm", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.PING] = { value: "pp", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.PLAYER_MOVE] = { value: "33", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.UPDATE_ANIMALS] = { value: "a", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.PLAYER_REMOVE] = { value: "4", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.PLAYER_SET_CLAN] = { value: "st", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.PLAYER_START] = { value: "1", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.PLAYER_UPDATE] = { value: "33", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.SELECT_ITEM] = { value: "5", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.SELECT_UPGRADE] = { value: "6", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.SET_ANGLE] = { value: "2", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.SET_CLAN_PLAYERS] = { value: "sa", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_AGE] = { value: "15", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_HEALTH] = { value: "h", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.CLAN_NOTIFY_SERVER] = { value: "14", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.CLAN_NOTIFY_CLIENT] = { value: "p", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_PLACE_LIMIT] = { value: "14", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.SPAWN] = { value: "sp", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.UPDATE_ITEMS] = { value: "17", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_STORE] = { value: "us", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPGRADES] = { value: "16", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.WIGGLE] = { value: "8", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.WINDOW_FOCUS] = { value: "rmd", side: Packet_1.Side.Server };
packetTypeMapping[PacketType_1.PacketType.PLAYER_ADD] = { value: "2", side: Packet_1.Side.Client };
// packetTypeMapping[PacketType.PLAYER_ATTACK] = { value: "2", side: Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_STATS] = { value: "9", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.IO_INIT] = { value: "io-init", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.HEALTH_CHANGE] = { value: "t", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.JOIN_REQUEST] = { value: "an", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.REMOVE_GAME_OBJ] = { value: "12", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.ADD_PROJECTILE] = { value: "18", side: Packet_1.Side.Client };
packetTypeMapping[PacketType_1.PacketType.UPDATE_PROJECTILES] = { value: "19", side: Packet_1.Side.Client };
var reversePacketTypeMapping = [];
exports.reversePacketTypeMapping = reversePacketTypeMapping;
for (var _i = 0, _a = Object.keys(packetTypeMapping); _i < _a.length; _i++) {
    var key = _a[_i];
    reversePacketTypeMapping.push({ type: parseInt(key), side: packetTypeMapping[key].side, value: packetTypeMapping[key].value });
}
/**
 * Controls serialization of packets in preparation for exchange, and deserialization on the destination
 */
var PacketFactory = /** @class */ (function () {
    function PacketFactory() {
    }
    /**
     * Get an instance of PacketFactory
     * @returns {PacketFactory} An instance of PacketFactory
     */
    PacketFactory.getInstance = function () {
        return PacketFactory.instance ? PacketFactory.instance : PacketFactory.instance = new PacketFactory();
    };
    /**
     * Serializes a Packet to an ArrayBuffer suitable for transmission
     * @param packet the packet to serialize
     */
    PacketFactory.prototype.serializePacket = function (packet) {
        if (!Object.values(PacketType_1.PacketType).includes(packet.type))
            throw new Error("Packet is missing a type.");
        var type;
        if (Object.keys(packetTypeMapping).includes(packet.type.toString())) {
            type = packetTypeMapping[packet.type].value;
        }
        else {
            throw new Error("Packet type invalid or not implemented: " + PacketType_1.PacketType[packet.type]);
        }
        try {
            return msgpack_lite_1.default.encode([type, packet.data]);
        }
        catch (error) {
            throw new Error("msgpack encountered an error: " + error);
        }
    };
    /**
     * Deserializes packets for reading
     * @param buffer an ArrayBuffer to deserialize
     * @param side the recieving side of the packet
     */
    PacketFactory.prototype.deserializePacket = function (buffer, side, timeStamp) {
        if (timeStamp === void 0) { timeStamp = 0; }
        var array;
        try {
            array = msgpack_lite_1.default.decode(new Uint8Array(buffer));
        }
        catch (error) {
            throw new Error("Invalid packet");
        }
        var packetType;
        var mapping = reversePacketTypeMapping.find(function (mapping) { return (mapping.side === side || mapping.side === Packet_1.Side.Both) && mapping.value === array[0]; });
        if (mapping) {
            return new Packet_1.Packet(mapping.type, array[1], timeStamp);
        }
        else {
            throw new Error("Invalid packet type: " + array[0]);
        }
    };
    return PacketFactory;
}());
exports.PacketFactory = PacketFactory;
