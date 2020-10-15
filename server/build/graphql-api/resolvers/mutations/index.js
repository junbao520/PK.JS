"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _adminPermission = _interopRequireDefault(require("./admin-permission"));

var _ban = _interopRequireDefault(require("./ban"));

var _note = _interopRequireDefault(require("./note"));

var _player = _interopRequireDefault(require("./player"));

var _playerName = _interopRequireDefault(require("./player-name"));

var _server = _interopRequireDefault(require("./server"));

var _warning = _interopRequireDefault(require("./warning"));

var _default = [_adminPermission.default, _ban.default, _note.default, _player.default, _playerName.default, _server.default, _warning.default];
exports.default = _default;