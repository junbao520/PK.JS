"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Server: {
    serverStats: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.stopDate || filter.stopDate) query.date = {};
      if (filter.startDate) query.date.$gte = filter.startDate;
      if (filter.stopDate) query.date.$lt = filter.stopDate;
      return _models.ServerStats.find(query).sort({
        date: 1
      });
    }
  }
};
exports.default = _default;