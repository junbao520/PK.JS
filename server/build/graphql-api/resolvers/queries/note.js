"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Server: {
    notes: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.player) query.player = filter.player;
      return _models.Note.find(query);
    }
  },
  Player: {
    notes: async (parent, filter) => {
      return _models.Note.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
exports.default = _default;