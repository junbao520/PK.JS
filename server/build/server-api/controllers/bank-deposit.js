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

  let amount = ctx.query.amount;
  let amountToDeposit = Math.min(player.bankGold >= player.bankLimit ? 0 : player.bankLimit - player.bankGold, ctx.query.amount);
  player.bankGold = player.bankGold + amountToDeposit;
  await player.save(); // return info to player

  ctx.body = (0, _mbWarbandParser.encode)([_actions.BANK_DEPOSIT, ctx.query.playerID, amountToDeposit, player.bankGold, amount - amountToDeposit, // amount go give back to player-selector
  'Bank limit reached.' // reason for above
  ]);
}