"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _serverConfigParser = require("../../../../utils/server-config-parser");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

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
  const server = await _models.Server.findOneAndUpdate({
    id: args.serverID
  }, {
    useCustomBanList: args.on
  }, {
    new: true
  });

  const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${args.serverID}`);

  if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

  const configFolderPath = _path.default.join(currentGameserverPath, '/Configs');

  if (!_fs.default.existsSync(configFolderPath)) throw new Error('Configs folder does not exist!');

  let files = _fs.default.readdirSync(configFolderPath, {
    withFileTypes: true
  });

  files = files.filter(file => file.isFile()).map(file => ({
    name: file.name
  }));
  files.forEach(file => {
    let configPath = _path.default.join(configFolderPath, file.name);

    let config = _fs.default.readFileSync(configPath, 'utf8');

    config = (0, _serverConfigParser.buildConfig)(server, (0, _serverConfigParser.parseConfig)(config));

    _fs.default.writeFileSync(configPath, config, 'utf8');
  });
  return server;
};

exports.default = _default;