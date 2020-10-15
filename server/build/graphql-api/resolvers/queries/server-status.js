"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverConfigParser = require("../../../utils/server-config-parser");

var _gameserverStatusCache = _interopRequireDefault(require("../../../utils/gameserver-status-cache"));

var _default = {
  Server: {
    serverStatus: async parent => {
      if (!(await _gameserverStatusCache.default.gameserverOnline(parent.id))) return null;
      const ports = (0, _serverConfigParser.assignPorts)(parent.id);
      return _gameserverStatusCache.default.gameserverStatus('localhost', ports.port);
    }
  }
};
exports.default = _default;