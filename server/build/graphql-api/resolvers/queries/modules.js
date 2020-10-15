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
    modules: async parent => {
      const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${parent.id}`);

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

      const modulesFolder = _path.default.join(currentGameserverPath, `/Modules`);

      if (!_fs.default.existsSync(modulesFolder)) throw new Error('Module does not exist!');

      let modules = _fs.default.readdirSync(modulesFolder, {
        withFileTypes: true
      });

      modules = modules.filter(folder => folder.isDirectory());
      modules = modules.map(module => module.name);
      return modules;
    }
  }
};
exports.default = _default;