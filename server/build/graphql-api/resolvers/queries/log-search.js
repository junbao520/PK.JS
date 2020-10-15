"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _default = {
  Server: {
    logSearch: (parent, filter) => {
      const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${parent.id}`);

      if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

      const logFolderPath = _path.default.join(currentGameserverPath, '/logs');

      if (!_fs.default.existsSync(logFolderPath)) throw new Error('Logs folder does not exist!');
      let [date, startTime, endTime, ...searchTerms] = filter.searchString.split(';');

      const logFilePath = _path.default.join(logFolderPath, `server_log_${date}.txt`);

      if (!_fs.default.existsSync(logFilePath)) return JSON.stringify([]);

      const logEnginePath = _path.default.join(require.resolve('log-engine'), '..');

      const payload = {
        searchTerms
      };
      if (startTime !== 'null') payload.startTime = startTime;
      if (endTime !== 'null') payload.endTime = endTime;
      const inputArgs = {
        configFile: _path.default.join(logEnginePath, '/resources/config.json'),
        prettyPrinting: false,
        function: 0,
        serverLogFile: logFilePath,
        payload: JSON.stringify(payload)
      };
      const child = (0, _child_process.spawn)(_path.default.join(logEnginePath, '/log_engine'));
      child.stdin.setEncoding = 'utf-8';
      child.stdin.write(JSON.stringify(inputArgs));
      child.stdin.end();
      let result = '';
      let error = '';
      return new Promise((resolve, reject) => {
        child.stdout.on('data', data => {
          result += data.toString();
        });
        child.stderr.on('error', data => {
          error += data.toString();
        });
        child.on('close', () => {
          if (error !== '') reject(error);else resolve(result);
        });
      });
    }
  }
};
exports.default = _default;