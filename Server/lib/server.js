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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __importDefault(require("url"));
var http_1 = __importDefault(require("http"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var console = __importStar(require("./console"));
var ws_1 = require("ws");
var uptimeWS_1 = __importDefault(require("./uptimeWS"));
var moomoo_1 = require("./moomoo/moomoo");
dotenv_1.default.config();
var app = express_1.default();
var server = http_1.default.createServer(app);
var port = process.env.PORT;
var vultr = require("../../Client/serverData.js");
nunjucks_1.default.configure('views', {
    autoescape: true,
    express: app
});
var VERSION = "0.0.0a";
function format(timestamp) {
    var hours = Math.floor(timestamp / (60 * 60));
    var minutes = Math.floor(timestamp % (60 * 60) / 60);
    var seconds = Math.floor(timestamp % 60);
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
app.get("/serverData", function (req, res) {
    res.send(JSON.stringify(vultr));
});
/*app.get('/sanctuary', (req, res) => {
  if (req.accepts('html')) {
    res.render('version.html', { version: VERSION, nodeVersion: process.version, uptime: format(process.uptime()) });
    return;
  }

  res.send(`Sanctuary v${VERSION}`);
});

app.get('/uptime', (req, res) => {
  if (req.accepts('html')) {
    res.redirect('/sanctuary');
    return;
  }

  res.send(format(process.uptime()));
});*/
app.use(express_1.default.static("../Client/"));
/*
app.get('/api/v1/playerCount', (_req, res) => {
  let game = getGame();

  if (!game) {
    res.send(JSON.stringify({ type: "error", message: "No game active." }));
  } else {
    res.send(JSON.stringify({ type: "success", playerCount: game.clients.length }));
  }
});

app.get('/api/v1/players', (req, res) => {
  let game = getGame();

  if (!game) {
    res.send(JSON.stringify({ type: "error", message: "No game active." }));
  } else {
    let clients: { clientIPHash: string, playerName: string, playerID: number }[] = [];

    for (let client of game.clients) {
      clients.push(
        {
          clientIPHash: arrayBufferToHex(SHA256(new TextEncoder().encode(client.ip))),
          playerName: client.player?.name || "unknown",
          playerID: client.player?.id || -1
        }
      );
    }

    res.send(JSON.stringify({ type: "success", clients: clients }));
  }
});*/
var servers = [];
for (var i = 0; i < vultr.vultr.servers.length; i++) {
    var wss = new ws_1.Server({ noServer: true });
    moomoo_1.startServer(wss);
    servers.push({ ip: vultr.vultr.servers[i].ip, wss: wss });
}
function getWSServer(ip) {
    for (var _server in servers) {
        if (servers[_server].ip == ip.split("_")[1])
            return servers[_server].wss;
    }
    return false;
}
var uptimeServer = new ws_1.Server({ noServer: true });
new uptimeWS_1.default(uptimeServer);
server.on('upgrade', function upgrade(request, socket, head) {
    var _a;
    var pathname = (_a = url_1.default.parse(request.url).pathname) === null || _a === void 0 ? void 0 : _a.replace(/\/$/, '');
    if (pathname === '/uptimeWS') {
        uptimeServer.handleUpgrade(request, socket, head, function done(ws) {
            uptimeServer.emit('connection', ws, request);
        });
    }
    else if (pathname === null || pathname === void 0 ? void 0 : pathname.includes("/ip_")) {
        var ip = pathname.replace("/", "");
        var wss_1 = getWSServer(ip);
        if (wss_1) {
            wss_1.handleUpgrade(request, socket, head, function done(ws) {
                wss_1.emit('connection', ws, request);
            });
        }
    }
    else {
        socket.destroy();
    }
});
console.startConsole();
server.listen(port || 3000, function () {
    console.log("Sanctuary listening locally, port: " + (port || 3000));
});
