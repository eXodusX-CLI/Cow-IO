"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resources;
(function (Resources) {
    Resources[Resources["Food"] = 0] = "Food";
    Resources[Resources["Wood"] = 1] = "Wood";
    Resources[Resources["Stone"] = 2] = "Stone";
    Resources[Resources["Points"] = 3] = "Points";
})(Resources || (Resources = {}));
var Item = /** @class */ (function () {
    function Item(type, requires) {
        this.type = type;
        this.requires = requires;
    }
    return Item;
}());
exports.default = Item;
