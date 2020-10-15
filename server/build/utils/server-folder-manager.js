"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reinstallServer = exports.deleteServer = exports.installServer = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cprPromise = _interopRequireDefault(require("cpr-promise"));

var _serverConfigParser = require("./server-config-parser");

var _serverConfig = _interopRequireDefault(require("../../server-config"));

var _del = _interopRequireDefault(require("del"));

const installServer = async server => {
  /* Create Server in Gameservers folder */
  const gameserverPath = _path.default.join(require.resolve('gameservers'), '../');

  await (0, _cprPromise.default)(_path.default.join(gameserverPath, '/default'), _path.default.join(gameserverPath, `/${server.id}`), {
    overwrite: true,
    confirm: true,
    filter: filePath => _path.default.basename(filePath) !== '.gitkeep'
  });

  const newGameserverPath = _path.default.join(gameserverPath, `/${server.id}`);
  /* Update Server Name & Port in Config Files */


  const configFolderPath = _path.default.join(newGameserverPath, '/Configs');

  if (!_fs.default.existsSync(newGameserverPath)) throw new Error('Configs folder does not exist!');

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
  /* Configure Quick Strings in PK module */

  const pkPath = _path.default.join(newGameserverPath, '/Modules/Persistent Kingdoms');

  if (!_fs.default.existsSync(pkPath)) return server;

  let input = _fs.default.readFileSync(_path.default.join(pkPath, '/quick_strings.txt'), 'utf8').split('\n');

  let output = [];

  for (let line of input) {
    let split = line.split(' ');

    if (split.length === 2) {
      split[1] = split[1].replace(/SERVER_ADDRESS/g, _serverConfig.default.gameserverAPIAddress).replace(/SERVER_ID/g, server.id).replace(/SERVER_API_KEY/g, server.apiKey);
    }

    output.push(split.join(' '));
  }

  await _fs.default.writeFileSync(_path.default.join(pkPath, '/quick_strings.txt'), output.join('\n'), 'utf8');
};

exports.installServer = installServer;

const deleteServer = async (server, deleteLogs = true) => {
  /* Delete server folder */
  const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${server.id}`);

  if (!_fs.default.existsSync(currentGameserverPath)) return server;
  let files = [currentGameserverPath];
  if (!deleteLogs) files.push(_path.default.join(currentGameserverPath, '/logs'));
  await (0, _del.default)(files, {
    force: true
  });
};

exports.deleteServer = deleteServer;

const reinstallServer = async server => {
  await deleteServer(server, false);
  await installServer(server);
};

exports.reinstallServer = reinstallServer;