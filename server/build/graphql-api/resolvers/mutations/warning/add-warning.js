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
    createWarnings: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  if (args.publicReason === '') throw new Error('Warning must have a public reason.');
  if (args.privateReason === '') throw new Error('Warning must have a private reason.');
  const player = await _models.Player.findOne({
    server: args.serverID,
    guid: args.guid
  });
  if (player === null) throw new Error('Player not found.');
  const warning = new _models.Warning({
    server: args.serverID,
    player: args.guid,
    admin: context.user,
    publicReason: args.publicReason,
    privateReason: args.privateReason,
    date: new Date()
  });
  await warning.save();
  await new _models.AdminLog({
    server: warning.server,
    admin: warning.admin,
    type: 'add_warning',
    targetPlayer: warning.player,
    reason: warning.privateReason
  }).save();
  return warning;
};

exports.default = _default;