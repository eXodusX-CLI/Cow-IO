"use strict";
/* enum StartingItems {
  Axe = 1,
  Sword = 3,
  Polearm = 5,
  Bat = 6,
  Daggers = 7,
  Stick = 8
} */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = exports.Age9Items = exports.Age8Items = exports.Age7Items = exports.Age5Items = exports.Age4Items = exports.Age3Items = void 0;
var StartingItems;
(function (StartingItems) {
    StartingItems[StartingItems["Apple"] = 0] = "Apple";
    StartingItems[StartingItems["WoodWall"] = 3] = "WoodWall";
    StartingItems[StartingItems["Spikes"] = 6] = "Spikes";
    StartingItems[StartingItems["Windmill"] = 10] = "Windmill";
})(StartingItems || (StartingItems = {}));
var Age3Items;
(function (Age3Items) {
    Age3Items[Age3Items["Cookie"] = 1] = "Cookie";
    Age3Items[Age3Items["StoneWall"] = 4] = "StoneWall";
})(Age3Items || (Age3Items = {}));
exports.Age3Items = Age3Items;
var Age4Items;
(function (Age4Items) {
    Age4Items[Age4Items["PitTrap"] = 15] = "PitTrap";
    Age4Items[Age4Items["BoostPad"] = 16] = "BoostPad";
})(Age4Items || (Age4Items = {}));
exports.Age4Items = Age4Items;
var Age5Items;
(function (Age5Items) {
    Age5Items[Age5Items["GreaterSpikes"] = 7] = "GreaterSpikes";
    Age5Items[Age5Items["FasterWindmill"] = 11] = "FasterWindmill";
    Age5Items[Age5Items["Mine"] = 13] = "Mine";
    Age5Items[Age5Items["Sapling"] = 14] = "Sapling";
})(Age5Items || (Age5Items = {}));
exports.Age5Items = Age5Items;
var Age7Items;
(function (Age7Items) {
    Age7Items[Age7Items["Cheese"] = 2] = "Cheese";
    Age7Items[Age7Items["Turret"] = 17] = "Turret";
    Age7Items[Age7Items["Platform"] = 18] = "Platform";
    Age7Items[Age7Items["HealingPad"] = 19] = "HealingPad";
    Age7Items[Age7Items["Blocker"] = 21] = "Blocker";
    Age7Items[Age7Items["Teleporter"] = 22] = "Teleporter";
    Age7Items[Age7Items["CastleWall"] = 5] = "CastleWall";
})(Age7Items || (Age7Items = {}));
exports.Age7Items = Age7Items;
var Age8Items;
(function (Age8Items) {
    Age8Items[Age8Items["PowerMill"] = 12] = "PowerMill";
})(Age8Items || (Age8Items = {}));
exports.Age8Items = Age8Items;
var Age9Items;
(function (Age9Items) {
    Age9Items[Age9Items["PoisonSpikes"] = 8] = "PoisonSpikes";
    Age9Items[Age9Items["SpinningSpikes"] = 9] = "SpinningSpikes";
    Age9Items[Age9Items["SpawnPad"] = 20] = "SpawnPad";
})(Age9Items || (Age9Items = {}));
exports.Age9Items = Age9Items;
var ItemType = __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, StartingItems), Age3Items), Age4Items), Age5Items), Age7Items), Age8Items), Age9Items);
exports.ItemType = ItemType;
