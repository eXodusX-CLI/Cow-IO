"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Side = exports.Packet = void 0;
/**
 * An enumeration containing the different sides of communication (for conflicting packets)
 */
var Side;
(function (Side) {
    Side[Side["Server"] = 0] = "Server";
    Side[Side["Client"] = 1] = "Client";
    Side[Side["Both"] = 2] = "Both";
})(Side || (Side = {}));
exports.Side = Side;
/**
 * A packet of data recieved from or sent to the server
 */
var Packet = /** @class */ (function () {
    function Packet(type, data, time) {
        if (time === void 0) { time = 0; }
        this.type = type;
        this.data = data;
        this.time = time;
    }
    return Packet;
}());
exports.Packet = Packet;
