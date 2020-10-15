"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mbWarbandParser = require("mb-warband-parser");

var _models = require("../models");

var _actions = require("./actions");

var _default = async (ctx, next) => {
  const servers = await _models.Server.find({
    id: ctx.query.serverID,
    apiKey: ctx.query.apiKey
  });

  if (servers.length) {
    await next();
  } else {
    ctx.throw(403, (0, _mbWarbandParser.encode)([_actions.ACCESS_DENIED, 'Forbidden']));
  }
};

exports.default = _default;