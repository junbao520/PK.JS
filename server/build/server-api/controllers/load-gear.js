"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _mbWarbandParser = require("mb-warband-parser");

var _models = require("../../models");

var _actions = require("../actions");

var _promiseStore = _interopRequireDefault(require("../../utils/promise-store"));

async function _default(ctx) {
  try {
    if (_promiseStore.default[`load-player-${ctx.query.guid}`]) await _promiseStore.default[`load-player-${ctx.query.guid}`];
  } catch (err) {
    ctx.body = (0, _mbWarbandParser.encode)([_actions.LOAD_FAIL_KICK, ctx.query.playerID]);
    return;
  }

  const server = await _models.Server.findOne({
    id: ctx.query.serverID
  });
  const player = await _models.Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  });
  ctx.body = (0, _mbWarbandParser.encode)([_actions.LOAD_GEAR, ctx.query.playerID, player.pouchGold, player.bankGold, player.health || -1, player.food || -1, player.poison || -1, player.headArmour || -1, player.bodyArmour || -1, player.footArmour || -1, player.handArmour || -1, player.firstItem || -1, player.secondItem || -1, player.thirdItem || -1, player.forthItem || -1, player.firstAmmo || -1, player.secondAmmo || -1, player.thirdAmmo || -1, player.forthAmmo || -1, player.horseHealth || -1, player.xPosition || -1, player.yPosition || -1, player.zPosition || -1, player.linkedSteamUser ? '*****' : player.pin, server.welcomeMessage]);
}