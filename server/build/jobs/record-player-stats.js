"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

const recordStats = async player => {
  const lastRecord = await _models.PlayerStats.findOne({
    server: player.server,
    player: player.guid
  }).sort({
    date: -1
  });
  if (lastRecord !== null && lastRecord.totalGold === player.bankGold + player.pouchGold) return;
  await _models.PlayerStats.create([{
    server: player.server,
    player: player.guid,
    totalGold: player.bankGold + player.pouchGold
  }], {
    setDefaultsOnInsert: true
  });
};

var _default = async () => {
  console.log('Recording Player Stats...');
  let servers = await _models.Server.find({
    recordStats: true
  });
  servers = servers.map(server => server.id);
  const players = await _models.Player.find({
    server: {
      $in: servers
    }
  });
  players.forEach(recordStats);
};

exports.default = _default;