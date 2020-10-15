"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const ban = await _models.Ban.findOne({
    _id: args.banID
  });
  if (ban === null) throw new Error('Ban not found.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: ban.server,
    admin: context.user,
    manageBans: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  if (ban.endDate !== null && ban.endDate <= Date.now() || ban.unbannedDate !== null) throw new Error('Ban already expired.');
  ban.unbannedDate = Date.now();
  await ban.save();
  await new _models.AdminLog({
    server: ban.server,
    admin: context.user,
    type: 'un_ban',
    targetPlayer: ban.player,
    reason: args.reason
  }).save();
  return ban;
};

exports.default = _default;