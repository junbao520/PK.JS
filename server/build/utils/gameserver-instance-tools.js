"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isServerOnline = exports.restartServer = exports.stopServer = exports.startServer = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _child_process = require("child_process");

var _models = require("../models");

var _gameserverStatusCache = _interopRequireDefault(require("./gameserver-status-cache"));

var _serverConfig = _interopRequireDefault(require("../../server-config"));

const startServer = async (serverID, module, config) => {
  const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${serverID}`);

  if (!_fs.default.existsSync(currentGameserverPath)) throw new Error('Server folder does not exist!');

  const executablePath = _path.default.join(currentGameserverPath, '/WSELoaderServer.exe');

  if (!_fs.default.existsSync(executablePath)) throw new Error('Executable does not exist!');

  const moduleFolder = _path.default.join(currentGameserverPath, `/Modules/${module}`);

  if (!_fs.default.existsSync(moduleFolder)) throw new Error('Module does not exist!');

  let configFile = _path.default.join(currentGameserverPath, `/Configs/${config}`);

  if (!_fs.default.existsSync(configFile)) throw new Error('Config does not exist!');

  if (!_serverConfig.default.gameserverDevDryRun) {
    (0, _child_process.execSync)(`screen -m -d -S serverscreen${serverID} wine WSELoaderServer.exe -r "Configs/${config}" -m "${module}"`, {
      cwd: currentGameserverPath
    });
  } else {
    console.log(`Gameserver Dry Run Exec (${currentGameserverPath}): screen -m -d -S serverscreen${serverID} wine WSELoaderServer.exe -r "Configs/${config}" -m "${module}"`);
  }

  _gameserverStatusCache.default.fetchGameserverOnline(serverID);
};

exports.startServer = startServer;

const stopServer = async serverID => {
  if (!_serverConfig.default.gameserverDevDryRun) {
    (0, _child_process.execSync)(`screen -S serverscreen${serverID} -X quit`);
  } else {
    console.log(`Gameserver Dry Run Exec: screen -S serverscreen${serverID} -X quit`);
  }

  _gameserverStatusCache.default.fetchGameserverOnline(serverID);
};

exports.stopServer = stopServer;

const restartServer = async (serverID, module, config) => {
  await stopServer(serverID);

  if (!module || !config) {
    let server = await _models.Server.findOne({
      id: serverID
    });
    module = server.gameserverLastModule;
    config = server.gameserverLastConfig;
  }

  await startServer(serverID, module, config);
};

exports.restartServer = restartServer;

const isServerOnline = async serverID => {
  if (_serverConfig.default.gameserverDevDryRun) return _serverConfig.default.gameserverDevDryRunOnline;else return !(0, _child_process.execSync)(`screen -S serverscreen${serverID} -Q select . ; echo $?`).toString().includes('No screen session found.');
};

exports.isServerOnline = isServerOnline;