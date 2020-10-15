"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _default = {
  Server: {
    customBanList: async parent => {
      const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${parent.id}`);

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

      const customBanListFile = _path.default.join(currentGameserverPath, '/custom_bans.txt');

      if (!_fs.default.existsSync(customBanListFile)) throw new Error('Custom ban list file does not exist!');
      return _fs.default.promises.readFile(customBanListFile, 'utf8');
    }
  }
};
exports.default = _default;