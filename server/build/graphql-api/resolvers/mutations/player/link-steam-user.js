"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const player = await _models.Player.findOne({
    guid: args.guid,
    pin: args.pin
  });
  if (player === null) throw new Error('GUID / PIN combination invalid.');
  if (player.linkedSteamUser) throw new Error('GUID / PIN combination already claimed.');
  player.linkedSteamUser = context.user; // we do update many for the very rare case that the same GUID has the same
  // pin on two different servers.

  await _models.Player.updateMany({
    guid: args.guid,
    pin: args.pin
  }, {
    linkedSteamUser: context.user
  });
  return player;
};

exports.default = _default;