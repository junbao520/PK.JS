"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adjustGold = _interopRequireDefault(require("./adjust-gold"));

var _clearPlayerLocations = _interopRequireDefault(require("./clear-player-locations"));

var _linkSteamUser = _interopRequireDefault(require("./link-steam-user"));

var _stripPlayer = _interopRequireDefault(require("./strip-player"));

var _default = {
  Mutation: {
    adjustGold: _adjustGold.default,
    clearPlayerLocations: _clearPlayerLocations.default,
    linkSteamUser: _linkSteamUser.default,
    stripPlayer: _stripPlayer.default
  }
};
exports.default = _default;