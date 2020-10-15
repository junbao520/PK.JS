"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Server: {
    playerName: async (parent, filter) => {
      return _models.PlayerName.findOne({
        server: parent.id,
        name: filter.name
      });
    },
    playerNames: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.nameLike) query.name = new RegExp('.*' + filter.nameLike + '.*', 'i');
      return _models.PlayerName.find(query);
    }
  },
  Player: {
    playerNames: async parent => {
      return _models.PlayerName.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
exports.default = _default;