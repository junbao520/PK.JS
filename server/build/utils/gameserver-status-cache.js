"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _gameserverInstanceTools = require("./gameserver-instance-tools");

var _getGameserverStatus = _interopRequireDefault(require("./get-gameserver-status"));

// every minute check screen is still alive
const GAMESERVER_ONLINE_CACHE_TIME = 60 * 1000; // event 15 seconds update player count

const GAMESERVER_STATUS_CACHE_TIME = 15 * 1000; // disable caching

const DISABLE_CACHE = false;

class GameserverStatusCache {
  constructor() {
    (0, _defineProperty2.default)(this, "gameserverOnlineCache", {});
    (0, _defineProperty2.default)(this, "gameserverStatusCache", {});
  }

  fetchGameserverOnline(serverID) {
    let gameserverOnline = (0, _gameserverInstanceTools.isServerOnline)(serverID);
    this.gameserverOnlineCache[serverID] = {
      gameserverOnline,
      lastFetched: Date.now()
    };
    return gameserverOnline;
  }

  gameserverOnline(serverID) {
    if (DISABLE_CACHE || !this.gameserverOnlineCache[serverID] || this.gameserverOnlineCache[serverID].lastFetched < Date.now() - GAMESERVER_ONLINE_CACHE_TIME) this.fetchGameserverOnline(serverID);
    return this.gameserverOnlineCache[serverID].gameserverOnline;
  }

  async fetchGameserverStatus(host, port) {
    let gameserverStatus = await (0, _getGameserverStatus.default)(host, port);
    this.gameserverStatusCache[`${host}:${port}`] = {
      gameserverStatus,
      lastFetched: Date.now()
    };
  }

  async gameserverStatus(host, port) {
    if (DISABLE_CACHE || !this.gameserverStatusCache[`${host}:${port}`] || this.gameserverStatusCache[`${host}:${port}`].lastFetched < Date.now() - GAMESERVER_STATUS_CACHE_TIME) await this.fetchGameserverStatus(host, port);
    return this.gameserverStatusCache[`${host}:${port}`].gameserverStatus;
  }

}

var _default = new GameserverStatusCache();

exports.default = _default;