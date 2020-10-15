"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createServer = _interopRequireDefault(require("./create-server"));

var _deleteServer = _interopRequireDefault(require("./delete-server"));

var _reinstallServer = _interopRequireDefault(require("./reinstall-server"));

var _renameServer = _interopRequireDefault(require("./rename-server"));

var _restartServer = _interopRequireDefault(require("./restart-server"));

var _saveCustomBanList = _interopRequireDefault(require("./save-custom-ban-list"));

var _saveServerConfig = _interopRequireDefault(require("./save-server-config"));

var _startServer = _interopRequireDefault(require("./start-server"));

var _stopServer = _interopRequireDefault(require("./stop-server"));

var _useCustomBanList = _interopRequireDefault(require("./use-custom-ban-list"));

var _default = {
  Mutation: {
    createServer: _createServer.default,
    deleteServer: _deleteServer.default,
    reinstallServer: _reinstallServer.default,
    renameServer: _renameServer.default,
    restartServer: _restartServer.default,
    saveCustomBanList: _saveCustomBanList.default,
    saveServerConfig: _saveServerConfig.default,
    startServer: _startServer.default,
    stopServer: _stopServer.default,
    useCustomBanList: _useCustomBanList.default
  }
};
exports.default = _default;