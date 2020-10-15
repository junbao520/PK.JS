"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    wipePlayerNames: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  const playerName = await _models.PlayerName.findOne({
    server: args.serverID,
    name: args.name
  });
  if (playerName === null) throw new Error('Player Name not found.');
  await playerName.delete();
  await new _models.AdminLog({
    server: playerName.server,
    admin: context.user,
    type: 'wipe_player_name',
    targetPlayer: playerName.player,
    name: playerName.name
  }).save();
  return playerName;
};

exports.default = _default;