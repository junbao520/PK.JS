"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _mbWarbandParser = require("mb-warband-parser");

var _models = require("../../models");

var _actions = require("../actions");

async function _default(ctx) {
  // get player value to check increment value with
  const player = await _models.Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  }); // find amount to increment player bank by

  let amount = Math.min(player.bankGold, ctx.query.amount);
  player.bankGold = player.bankGold - amount;
  await player.save(); // return info to player

  ctx.body = (0, _mbWarbandParser.encode)([_actions.BANK_WITHDRAW, ctx.query.playerID, amount, player.bankGold]);
}