"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildConfig = exports.parseConfig = exports.assignPorts = void 0;

var _serverConfig = _interopRequireDefault(require("../../server-config"));

const assignPorts = serverID => {
  const port = _serverConfig.default.gameserverPortStart + (serverID - 1) * 2;
  const steamPort = port + 1;
  return {
    port,
    steamPort
  };
};

exports.assignPorts = assignPorts;

const parseConfig = config => {
  return config.split('\r\n').map(line => {
    if (line.startsWith('#') || line === '') return line;
    line = line.split(' ');
    const option = line[0];
    const value = line.slice(1).join(' ');

    switch (option) {
      case 'set_server_name':
      case 'set_port':
      case 'set_steam_port':
      case 'set_add_to_game_servers_list':
      case 'set_server_log_folder':
      case 'set_server_ban_list_file':
      case 'start':
        return undefined;

      default:
        return option + ' ' + value;
    }
  }).filter(line => line !== undefined).join('\r\n');
};

exports.parseConfig = parseConfig;

const buildConfig = (server, config) => {
  return `set_server_name ${server.name}\r\n` + `set_port ${assignPorts(server.id).port}\r\n` + `set_steam_port ${assignPorts(server.id).steamPort}\r\n` + `set_add_to_game_servers_list 1\r\n` + `set_server_log_folder logs\r\n` + `set_server_ban_list_file ${server.useCustomBanList ? 'custom_bans.txt ' : 'bans.txt'}\r\n` + `${parseConfig(config)}\r\n` + 'start';
};

exports.buildConfig = buildConfig;