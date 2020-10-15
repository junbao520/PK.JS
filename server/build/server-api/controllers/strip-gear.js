"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _mbWarbandParser = require("mb-warband-parser");

var _models = require("../../models");

var _actions = require("../actions");

async function _default(ctx) {
  await _models.Player.updateOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  }, {
    $unset: {
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
    },
    pouchGold: ctx.query.pouchGold
  });
  ctx.body = (0, _mbWarbandParser.encode)([_actions.STRIP_GEAR]);
}