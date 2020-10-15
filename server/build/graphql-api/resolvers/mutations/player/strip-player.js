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
    stripPlayer: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  const player = await _models.Player.findOneAndUpdate({
    server: args.serverID,
    guid: args.guid
  }, {
    $unset: {
      factionID: 1,
      classID: 1,
      health: 1,
      food: 1,
      poison: 1,
      headArmour: 1,
      bodyArmour: 1,
      footArmour: 1,
      handArmour: 1,
      firstItem: 1,
      secondItem: 1,
      thirdItem: 1,
      forthItem: 1,
      firstAmmo: 1,
      secondAmmo: 1,
      thirdAmmo: 1,
      forthAmmo: 1,
      horse: 1,
      horseHealth: 1,
      xPosition: 1,
      yPosition: 1,
      zPosition: 1
    }
  }, {
    new: true
  });
  if (player === null) throw new Error('Player not found.');
  await new _models.AdminLog({
    server: player.server,
    admin: context.user,
    type: 'strip_player',
    targetPlayer: player.guid,
    reason: args.reason
  }).save();
  return player;
};

exports.default = _default;