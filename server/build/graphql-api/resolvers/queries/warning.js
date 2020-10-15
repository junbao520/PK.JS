"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Server: {
    warnings: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.player) query.player = filter.player;
      return _models.Warning.find(query);
    }
  },
  Player: {
    warnings: async parent => {
      return _models.Warning.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
exports.default = _default;