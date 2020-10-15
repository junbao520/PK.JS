"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _mbWarbandParser = require("mb-warband-parser");

var _index = require("../../models/index");

var _actions = require("../actions");

async function _default(ctx) {
  await _index.Player.updateMany({
    server: ctx.query.serverID
  }, {
    online: 0
  });
  ctx.body = (0, _mbWarbandParser.encode)([_actions.PING]);
}