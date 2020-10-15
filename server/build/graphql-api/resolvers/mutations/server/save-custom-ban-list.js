"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    editCustomBanList: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  const server = await _models.Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');

  const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${server.id}`);

  if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

  const customBanListFile = _path.default.join(currentGameserverPath, '/custom_bans.txt');

  if (!_fs.default.existsSync(customBanListFile)) throw new Error('Custom ban list file does not exist!');
  await _fs.default.promises.writeFile(customBanListFile, args.customBanList, 'utf8');
  return server;
};

exports.default = _default;