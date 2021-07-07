"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function format(timestamp) {
    var hours = Math.floor(timestamp / (60 * 60));
    var minutes = Math.floor(timestamp % (60 * 60) / 60);
    var seconds = Math.floor(timestamp % 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
var UptimeWSServer = /** @class */ (function () {
    function UptimeWSServer(uptimeServer) {
        var _this = this;
        this.sockets = [];
        this.sendInterval = null;
        uptimeServer.addListener("connection", function (socket) {
            if (!_this.sendInterval)
                _this.sendInterval = setInterval(_this.sendUptime.bind(_this), 10);
            _this.sockets.push(socket);
            socket.addEventListener("close", function () {
                var socketIndex = _this.sockets.indexOf(socket);
                if (socketIndex > -1)
                    _this.sockets.splice(socketIndex, 1);
                if (_this.sockets.length == 0 && _this.sendInterval) {
                    clearInterval(_this.sendInterval);
                    _this.sendInterval = null;
                }
            });
        });
        uptimeServer.addListener("close", function () {
            if (_this.sendInterval)
                clearInterval(_this.sendInterval);
        });
    }
    UptimeWSServer.prototype.sendUptime = function () {
        for (var _i = 0, _a = this.sockets; _i < _a.length; _i++) {
            var socket = _a[_i];
            socket.send(format(process.uptime()));
        }
    };
    return UptimeWSServer;
}());
exports.default = UptimeWSServer;
