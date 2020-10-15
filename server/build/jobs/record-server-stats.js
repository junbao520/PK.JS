"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../models");

var _gameserverStatusCache = _interopRequireDefault(require("../utils/gameserver-status-cache"));

var _serverConfigParser = require("../utils/server-config-parser");

const recordServerStats = async server => {
  const uniqueGUIDs = await _models.Player.countDocuments({
    server: server.id
  });
  const uniqueIPs = (await _models.IPRecord.distinct('ip', {
    server: server.id
  })).length;
  const adminCount = await _models.AdminPermission.countDocuments({
    server: server.id
  });
  const totalBans = await _models.Ban.countDocuments({
    server: server.id
  });
  const totalWarnings = await _models.Warning.countDocuments({
    server: server.id
  });
  const totalNotes = await _models.Note.countDocuments({
    server: server.id
  });
  const status = await _gameserverStatusCache.default.gameserverStatus('localhost', (0, _serverConfigParser.assignPorts)(server.id).port, server.id);
  const playerCount = status.NumberOfActivePlayers;
  const currentMap = status.MapName;
  const goldStats = await _models.Player.aggregate([{
    $match: {
      server: server.id
    }
  }, {
    $group: {
      _id: null,
      totalBankGold: {
        $sum: '$bankGold'
      },
      totalPouchGold: {
        $sum: '$pouchGold'
      }
    }
  }, {
    $addFields: {
      totalGold: {
        $add: ['$totalBankGold', '$totalPouchGold']
      }
    }
  }]);
  const totalGold = goldStats.length === 0 ? 0 : goldStats[0].totalGold;
  const totalBankGold = goldStats.length === 0 ? 0 : goldStats[0].totalBankGold;
  const totalPouchGold = goldStats.length === 0 ? 0 : goldStats[0].totalPouchGold;
  const bankLimit = server.defaultBankLimit;
  await _models.ServerStats.create([{
    server: server.id,
    uniqueGUIDs,
    uniqueIPs,
    adminCount,
    totalBans,
    totalWarnings,
    totalNotes,
    playerCount,
    currentMap,
    totalGold,
    totalBankGold,
    totalPouchGold,
    bankLimit
  }], {
    setDefaultsOnInsert: true
  });
};

var _default = async () => {
  console.log('Recording Server Stats...');
  const servers = await _models.Server.find({
    recordStats: true
  });
  servers.forEach(recordServerStats);
};

exports.default = _default;