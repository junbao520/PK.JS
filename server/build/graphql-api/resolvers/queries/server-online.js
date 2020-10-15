"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gameserverStatusCache = _interopRequireDefault(require("../../../utils/gameserver-status-cache"));

var _default = {
  Server: {
    gameserverOnline: async parent => {
      return _gameserverStatusCache.default.gameserverOnline(parent.id);
    }
  }
};
exports.default = _default;