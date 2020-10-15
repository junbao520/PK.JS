"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _models = require("../models");

var _gameserverInstanceTools = require("../utils/gameserver-instance-tools");

async function _default() {
  const servers = await _models.Server.find();
  let jobs = [];

  for (let server of servers) {
    jobs.push({
      id: `restart-server-${server.id}`,
      cron: server.gameserverRestartCron,
      func: async () => {
        console.log(`Checking if restarted need for instance for server: ${server.id}`);

        if (await (0, _gameserverInstanceTools.isServerOnline)(server.id)) {
          console.log(`Restarting server instance for server: ${server.id}`);
          await (0, _gameserverInstanceTools.restartServer)(server.id);
        }
      }
    });
  }

  return jobs;
}