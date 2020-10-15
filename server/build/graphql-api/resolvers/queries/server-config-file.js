"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _serverConfigParser = require("../../../utils/server-config-parser");

var _default = {
  Server: {
    serverConfigFile: async (parent, filter) => {
      const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${parent.id}`);

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

      const configFolderPath = _path.default.join(currentGameserverPath, '/Configs');

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Configs folder does not exist!');

      const configFilePath = _path.default.join(configFolderPath, `/${filter.name}`);

      if (!_fs.default.existsSync(configFilePath)) return null;
      const rawConfig = await _fs.default.promises.readFile(configFilePath, 'utf8');
      return {
        server: parent.id,
        name: filter.name,
        config: (0, _serverConfigParser.parseConfig)(rawConfig),
        rawConfig: rawConfig
      };
    },
    serverConfigFiles: async parent => {
      const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${parent.id}`);

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

      const configFolderPath = _path.default.join(currentGameserverPath, '/Configs');

      if (!_fs.default.existsSync(configFolderPath)) throw new Error('Configs folder does not exist!');

      let files = _fs.default.readdirSync(configFolderPath, {
        withFileTypes: true
      });

      files = files.filter(file => file.isFile()).map(file => ({
        server: parent.id,
        name: file.name
      }));
      return files;
    }
  }
};
exports.default = _default;