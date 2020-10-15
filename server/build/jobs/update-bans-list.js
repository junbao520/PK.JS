"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _models = require("../models");

async function updateBanList(server) {
  const currentGameserverPath = _path.default.join(require.resolve('gameservers'), `../${server.id}`);

  if (!_fs.default.existsSync(currentGameserverPath)) return;

  const banListFile = _path.default.join(currentGameserverPath, '/bans.txt'); // get all active bans


  const activeBans = await _models.Ban.find({
    $or: [{
      server: server.id,
      unbannedDate: null,
      startDate: {
        $lte: Date.now()
      },
      endDate: null
    }, {
      server: server.id,
      unbannedDate: null,
      startDate: {
        $lte: Date.now()
      },
      endDate: {
        $gt: Date.now()
      }
    }]
  }); // split bans into array of banned guids and array of ip banned guids

  let bannedGUIDs = [];
  let ipBannedGUIDs = [];
  activeBans.forEach(ban => {
    if (ban.ipBan) ipBannedGUIDs.push(ban.player);
    bannedGUIDs.push(ban.player);
  }); // get guids that are victims of an ip ban

  const ipBannedVictims = await _models.IPRecord.distinct('player', {
    server: server.id,
    ip: {
      $in: await _models.IPRecord.distinct('ip', {
        player: {
          $in: ipBannedGUIDs
        },
        server: server.id
      })
    }
  });
  ipBannedVictims.forEach(player => {
    if (!bannedGUIDs.includes(player)) bannedGUIDs.push(player);
  });

  _fs.default.writeFileSync(banListFile, bannedGUIDs.join('\r\n'), 'utf8');
}

var _default = async () => {
  console.log('Updating Ban Lists...');
  const servers = await _models.Server.find();
  servers.forEach(updateBanList);
};

exports.default = _default;