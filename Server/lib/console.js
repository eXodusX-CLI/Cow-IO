"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMethod = exports.runCommand = exports.log = exports.startConsole = void 0;
var ansi_escapes_1 = __importDefault(require("ansi-escapes"));
var chalk_1 = __importDefault(require("chalk"));
var Game_1 = require("./moomoo/Game");
var PacketFactory_1 = require("./packets/PacketFactory");
var Packet_1 = require("./packets/Packet");
var PacketType_1 = require("./packets/PacketType");
var node_brigadier_1 = require("node-brigadier");
var Weapons_1 = require("./moomoo/Weapons");
var GameObject_1 = __importDefault(require("./gameobjects/GameObject"));
var gameobjects_1 = require("./gameobjects/gameobjects");
var command = "";
var lastMessage = "";
var dispatcher = new node_brigadier_1.CommandDispatcher();
dispatcher.register(node_brigadier_1.literal("restart").executes(function () {
    process.exit();
}));
dispatcher.register(node_brigadier_1.literal("broadcast").then(node_brigadier_1.argument("message", node_brigadier_1.string()).executes(function (context) {
    var packetFactory = PacketFactory_1.PacketFactory.getInstance();
    var message = context.getArgument("message", String);
    var game = Game_1.getGame();
    if (game) {
        for (var _i = 0, _a = game.clients; _i < _a.length; _i++) {
            var client = _a[_i];
            client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_AGE, [
                0,
                1,
                "<img src='/' onerror='eval(`document.getElementById(\"itemInfoHolder\").textContent=\"" + message + "\";document.getElementById(\"itemInfoHolder\").className=\"uiElement visible\"`)'>"
            ])));
            if (client.player) {
                client.socket.send(packetFactory.serializePacket(new Packet_1.Packet(PacketType_1.PacketType.UPDATE_AGE, [
                    client.player.xp,
                    client.player.maxXP,
                    client.player.age
                ])));
            }
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("kill").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player && !player.dead) {
            game.killPlayer(player);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("addObject").then(node_brigadier_1.argument("type", node_brigadier_1.string()).executes(function (context) {
    var type = context.getArgument("type", String);
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == thisPlayer.id; });
        if (player) {
            new GameObject_1.default(0, player.location, 0, 160, gameobjects_1.GameObjectType.Tree, 160 * 0.6, {}, player.id, -1, 0);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("tp").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player) {
            thisPlayer.location = player.location.add(0, 0, true);
            game.sendGameObjects(thisPlayer);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("invisible").executes(function (context) {
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        if (thisPlayer) {
            thisPlayer.invisible = !thisPlayer.invisible;
        }
    }
    return 0;
}));
dispatcher.register(node_brigadier_1.literal("invincible").executes(function (context) {
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        if (thisPlayer) {
            thisPlayer.invincible = !thisPlayer.invincible;
        }
    }
    return 0;
}));
dispatcher.register(node_brigadier_1.literal("speed").then(node_brigadier_1.argument("speedMultiplier", node_brigadier_1.integer()).executes(function (context) {
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        if (thisPlayer) {
            thisPlayer.spdMult = context.getArgument("speedMultiplier", Number);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("login").then(node_brigadier_1.argument("password", node_brigadier_1.string()).executes(function (context) {
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    if (game) {
        if (thisPlayer && thisPlayer.client) {
            if (!process.env.MODERATOR_PASSWORD)
                return 1;
            if (context.getArgument("password", String) == process.env.MODERATOR_PASSWORD) {
                // temporary admin
                thisPlayer.client.admin = true;
            }
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("weaponVariant").then(node_brigadier_1.argument("variant", node_brigadier_1.string()).executes(function (context) {
    var thisPlayer = context.getSource();
    var game = Game_1.getGame();
    var variant = context.getArgument("variant", String);
    if (game) {
        if (thisPlayer) {
            switch (variant) {
                case "dark":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Dark : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Dark;
                    break;
                case "emerald":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Emerald : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Emerald;
                    break;
                case "ruby":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Ruby : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Ruby;
                    break;
                case "diamond":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Diamond : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Diamond;
                    break;
                case "gold":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Gold : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Gold;
                    break;
                case "normal":
                    thisPlayer.selectedWeapon === thisPlayer.weapon ? thisPlayer.primaryWeaponVariant = Weapons_1.WeaponVariant.Normal : thisPlayer.secondaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
                    break;
                default:
                    error("Invalid weapon variant " + variant);
                    return 1;
            }
        }
    }
    return 0;
}).then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer())
    .executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var game = Game_1.getGame();
    var variant = context.getArgument("variant", String);
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player) {
            switch (variant) {
                case "dark":
                    player.selectedWeapon === player.weapon ? player.primaryWeaponVariant = Weapons_1.WeaponVariant.Dark : player.secondaryWeaponVariant = Weapons_1.WeaponVariant.Dark;
                    break;
                case "ruby":
                    player.selectedWeapon === player.weapon ? player.primaryWeaponVariant = Weapons_1.WeaponVariant.Ruby : player.secondaryWeaponVariant = Weapons_1.WeaponVariant.Ruby;
                    break;
                case "diamond":
                    player.selectedWeapon === player.weapon ? player.primaryWeaponVariant = Weapons_1.WeaponVariant.Diamond : player.secondaryWeaponVariant = Weapons_1.WeaponVariant.Diamond;
                    break;
                case "gold":
                    player.selectedWeapon === player.weapon ? player.primaryWeaponVariant = Weapons_1.WeaponVariant.Gold : player.secondaryWeaponVariant = Weapons_1.WeaponVariant.Gold;
                    break;
                case "normal":
                    player.selectedWeapon === player.weapon ? player.primaryWeaponVariant = Weapons_1.WeaponVariant.Normal : player.secondaryWeaponVariant = Weapons_1.WeaponVariant.Normal;
                    break;
                default:
                    error("Invalid weapon variant " + variant);
                    return 1;
            }
        }
    }
    return 0;
}))));
dispatcher.register(node_brigadier_1.literal("ban").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player && player.client && !player.client.admin) {
            game.banClient(player.client);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("promote").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player && player.client && !player.client.admin) {
            game.addModerator(player.client);
        }
    }
    return 0;
})));
dispatcher.register(node_brigadier_1.literal("set").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).then(node_brigadier_1.argument("resourceType", node_brigadier_1.string()).then(node_brigadier_1.argument("resourceAmount", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var resourceType = context.getArgument("resourceType", String);
    var resourceAmount = context.getArgument("resourceAmount", Number);
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player) {
            switch (resourceType) {
                case "points":
                case "gold":
                case "money":
                    player.points = resourceAmount;
                    break;
                case "food":
                    player.food = resourceAmount;
                    break;
                case "stone":
                    player.stone = resourceAmount;
                    break;
                case "wood":
                    player.wood = resourceAmount;
                    break;
                case "health":
                case "hp":
                case "hitpoints":
                    player.health = resourceAmount;
                    break;
                case "kills":
                    player.kills = resourceAmount;
                    break;
                case "xp":
                    player.xp = resourceAmount;
                    break;
                default:
                    error("Invalid resource type " + resourceType);
                    break;
            }
        }
    }
    return 0;
})))));
dispatcher.register(node_brigadier_1.literal("kick").then(node_brigadier_1.argument("playerSID", node_brigadier_1.integer()).executes(function (context) {
    var playerSID = context.getArgument("playerSID", Number);
    var game = Game_1.getGame();
    if (game) {
        var player = game.state.players.find(function (player) { return player.id == playerSID; });
        if (player && player.client && !player.client.admin)
            game.kickClient(player.client, "Kicked by a moderator");
    }
    return 0;
})));
function logMethod(text) {
    process.stdout.write(ansi_escapes_1.default.eraseLines(lastMessage.split("\n").length) + text);
    lastMessage = text;
}
exports.logMethod = logMethod;
/**
 * Logs to stdout with console
 * @param text the text to log
 */
function log(text) {
    var commandParts = command.split(" ");
    var coloredCommand = chalk_1.default.yellow(commandParts[0]) +
        (commandParts.length > 1 ? " " : "") +
        commandParts.slice(1).join(" ");
    logMethod(text.toString());
    process.stdout.write("\n");
    logMethod("> " + coloredCommand);
}
exports.log = log;
function error(text) {
    process.stderr.write(ansi_escapes_1.default.eraseLines(lastMessage.split("\n").length));
    console.error(text);
}
var specialChars = ["\b", "\n", "\r"];
function runCommand(command, source) {
    try {
        var parsedCommand = dispatcher.parse(command, source);
        dispatcher.execute(parsedCommand);
    }
    catch (_) {
        log(_);
        return false;
    }
    return true;
}
exports.runCommand = runCommand;
function startConsole() {
    if (!process.stdin.setRawMode)
        return;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function (key) {
        var char = key.toString("utf8");
        if (char === "\u0003") {
            process.exit();
        }
        if (!specialChars.includes(char) && char.length === 1) {
            command += char;
        }
        if ((char === "\b" || char === "\u007F") && command.length > 0) {
            command = command.substr(0, command.length - 1);
        }
        else if (char === "\x0D") {
            if (!runCommand(command)) {
                error("Invalid command.");
            }
            command = "";
        }
        var commandParts = command.split(" ");
        var coloredCommand = chalk_1.default.yellow(commandParts[0]) +
            (commandParts.length > 1 ? " " : "") +
            commandParts.slice(1).join(" ");
        logMethod("> " + coloredCommand);
    });
}
exports.startConsole = startConsole;
