"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpawnPad = exports.getRecoil = exports.getWeaponLength = exports.getProjectileType = exports.isRangedWeapon = exports.getPPS = exports.shouldHideFromEnemy = exports.getGameObjPlaceLimit = exports.getGameObjDamage = exports.getGameObjHealth = exports.getStructureDamage = exports.hasCollision = exports.getWeaponSpeedMultiplier = exports.getPrerequisiteWeapon = exports.getGroupID = exports.getPrerequisiteItem = exports.getWeaponGatherAmount = exports.getScale = exports.getPlaceOffset = exports.getPlaceable = exports.getItemCost = exports.getWeaponDamage = exports.getWeaponAttackDetails = exports.Weapons = exports.getHitTime = exports.SecondaryWeapons = exports.PrimaryWeapons = void 0;
var weapons_json_1 = __importDefault(require("./weapons.json"));
var items_json_1 = __importDefault(require("./items.json"));
var Weapons_1 = require("../moomoo/Weapons");
var PrimaryWeapons;
(function (PrimaryWeapons) {
    PrimaryWeapons[PrimaryWeapons["ToolHammer"] = 0] = "ToolHammer";
    PrimaryWeapons[PrimaryWeapons["Axe"] = 1] = "Axe";
    PrimaryWeapons[PrimaryWeapons["Sword"] = 3] = "Sword";
    PrimaryWeapons[PrimaryWeapons["Polearm"] = 5] = "Polearm";
    PrimaryWeapons[PrimaryWeapons["Bat"] = 6] = "Bat";
    PrimaryWeapons[PrimaryWeapons["Daggers"] = 7] = "Daggers";
    PrimaryWeapons[PrimaryWeapons["Stick"] = 8] = "Stick";
    PrimaryWeapons[PrimaryWeapons["Katana"] = 4] = "Katana";
    PrimaryWeapons[PrimaryWeapons["GreatAxe"] = 2] = "GreatAxe";
})(PrimaryWeapons || (PrimaryWeapons = {}));
exports.PrimaryWeapons = PrimaryWeapons;
var SecondaryWeapons;
(function (SecondaryWeapons) {
    SecondaryWeapons[SecondaryWeapons["GreatHammer"] = 10] = "GreatHammer";
    SecondaryWeapons[SecondaryWeapons["Shield"] = 11] = "Shield";
    SecondaryWeapons[SecondaryWeapons["Crossbow"] = 12] = "Crossbow";
    SecondaryWeapons[SecondaryWeapons["RepeaterCrossbow"] = 13] = "RepeaterCrossbow";
    SecondaryWeapons[SecondaryWeapons["McGrabby"] = 14] = "McGrabby";
    SecondaryWeapons[SecondaryWeapons["Musket"] = 15] = "Musket";
    SecondaryWeapons[SecondaryWeapons["Bow"] = 9] = "Bow";
})(SecondaryWeapons || (SecondaryWeapons = {}));
exports.SecondaryWeapons = SecondaryWeapons;
var Weapons = __assign(__assign({}, PrimaryWeapons), SecondaryWeapons);
exports.Weapons = Weapons;
function getHitTime(weapon) {
    var speed = weapons_json_1.default[weapon].speed || -1;
    if (speed != -1)
        speed += 150;
    return speed;
}
exports.getHitTime = getHitTime;
function isRangedWeapon(weapon) {
    return Object.keys(weapons_json_1.default[weapon]).includes("projectile");
}
exports.isRangedWeapon = isRangedWeapon;
function isSpawnPad(item) {
    return (items_json_1.default[item].spawnPoint) ? true : false;
}
exports.isSpawnPad = isSpawnPad;
function getProjectileType(weapon) {
    var projType = weapons_json_1.default[weapon].projectile;
    if (typeof projType == "undefined")
        return -1;
    return projType;
}
exports.getProjectileType = getProjectileType;
function getRecoil(weapon) {
    return weapons_json_1.default[weapon].rec || 0;
}
exports.getRecoil = getRecoil;
function getWeaponAttackDetails(item) {
    var weapon = weapons_json_1.default.find(function (weapon) { return weapon.id == item; });
    return { kbMultiplier: (weapon === null || weapon === void 0 ? void 0 : weapon.knock) || 1, attackRange: (weapon === null || weapon === void 0 ? void 0 : weapon.range) || 10 };
}
exports.getWeaponAttackDetails = getWeaponAttackDetails;
function getWeaponDamage(item, weaponVariant) {
    var weapon = weapons_json_1.default.find(function (weapon) { return weapon.id == item; });
    var baseDamage = (weapon === null || weapon === void 0 ? void 0 : weapon.dmg) || 0;
    switch (weaponVariant) {
        case Weapons_1.WeaponVariant.Normal:
            return baseDamage;
        case Weapons_1.WeaponVariant.Gold:
            return baseDamage * 1.1;
        case Weapons_1.WeaponVariant.Diamond:
            return baseDamage * 1.18;
        case Weapons_1.WeaponVariant.Ruby:
            return baseDamage * 1.18;
        case Weapons_1.WeaponVariant.Emerald:
            return baseDamage * 1.20;
        case Weapons_1.WeaponVariant.Dark:
            return baseDamage * 1.20;
    }
}
exports.getWeaponDamage = getWeaponDamage;
function getWeaponGatherAmount(item) {
    var weapon = weapons_json_1.default.find(function (weapon) { return weapon.id == item; });
    return (weapon === null || weapon === void 0 ? void 0 : weapon.gather) || 0;
}
exports.getWeaponGatherAmount = getWeaponGatherAmount;
function getItemCost(item) {
    return items_json_1.default[item].req;
}
exports.getItemCost = getItemCost;
function getPlaceable(item) {
    return !!items_json_1.default[item].group.place;
}
exports.getPlaceable = getPlaceable;
function getGroupID(item) {
    return items_json_1.default[item].group.id;
}
exports.getGroupID = getGroupID;
function getPrerequisiteItem(item) {
    return items_json_1.default[item].pre;
}
exports.getPrerequisiteItem = getPrerequisiteItem;
function getPrerequisiteWeapon(weapon) {
    return weapons_json_1.default[weapon].pre;
}
exports.getPrerequisiteWeapon = getPrerequisiteWeapon;
function getPlaceOffset(item) {
    return items_json_1.default[item].placeOffset;
}
exports.getPlaceOffset = getPlaceOffset;
function getScale(item) {
    return items_json_1.default[item].scale;
}
exports.getScale = getScale;
function hasCollision(item) {
    return !items_json_1.default[item].ignoreCollision;
}
exports.hasCollision = hasCollision;
function getPPS(item) {
    return items_json_1.default[item].pps || 0;
}
exports.getPPS = getPPS;
function getWeaponSpeedMultiplier(weapon) {
    return weapons_json_1.default[weapon].spdMult || 1;
}
exports.getWeaponSpeedMultiplier = getWeaponSpeedMultiplier;
function getStructureDamage(weapon) {
    var weaponData = weapons_json_1.default[weapon];
    if (weaponData.dmg) {
        if (weaponData.sDmg)
            return weaponData.dmg * weaponData.sDmg;
        return weaponData.dmg;
    }
    return 0;
}
exports.getStructureDamage = getStructureDamage;
function getGameObjHealth(item) {
    return items_json_1.default[item].health || -1;
}
exports.getGameObjHealth = getGameObjHealth;
function getGameObjDamage(item) {
    return items_json_1.default[item].dmg || 0;
}
exports.getGameObjDamage = getGameObjDamage;
function getGameObjPlaceLimit(item) {
    return items_json_1.default[item].group.limit || Infinity;
}
exports.getGameObjPlaceLimit = getGameObjPlaceLimit;
function shouldHideFromEnemy(item) {
    return !!items_json_1.default[item].hideFromEnemy;
}
exports.shouldHideFromEnemy = shouldHideFromEnemy;
function getWeaponLength(weapon) {
    return weapons_json_1.default[weapon].length;
}
exports.getWeaponLength = getWeaponLength;
