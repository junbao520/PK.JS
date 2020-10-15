"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serverFolderManager = require("../../../../utils/server-folder-manager");

var _models = require("../../../../models");

var _gameserverStatusCache = _interopRequireDefault(require("../../../../utils/gameserver-status-cache"));

var _default = async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingUser = await _models.SteamUser.findOne({
    steamID: context.user,
    panelAdmin: true
  });
  if (requestingUser === null) throw new Error('You do not have permission to do that.');
  /* Get copy of server */

  const server = await _models.Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');
  if (await _gameserverStatusCache.default.gameserverOnline(server.id)) throw new Error('You cannot reinstall a server while it is running!');
  await (0, _serverFolderManager.reinstallServer)(server);
  return server;
};

exports.default = _default;