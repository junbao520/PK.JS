"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _gameserverInstanceTools = require("../../../../utils/gameserver-instance-tools");

var _adminLog = _interopRequireDefault(require("../../../../models/admin-log"));

var _default = async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    manageServerInstance: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  const server = await _models.Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');
  await (0, _gameserverInstanceTools.restartServer)(server.id, server.gameserverLastModule, server.gameserverLastConfig);
  await new _adminLog.default({
    server: server.id,
    admin: requestingAdmin.admin,
    type: 'restart_server'
  }).save();
  return server;
};

exports.default = _default;