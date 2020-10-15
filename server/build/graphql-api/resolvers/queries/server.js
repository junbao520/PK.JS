"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Query: {
    server: async (parent, filter) => {
      return _models.Server.findOne({
        id: filter.id
      });
    },
    servers: async () => {
      return _models.Server.find();
    }
  },
  Player: {
    server: async parent => {
      return _models.Server.findOne({
        id: parent.server
      });
    }
  },
  IPRecord: {
    server: async parent => {
      return _models.Server.findOne({
        id: parent.server
      });
    }
  },
  AdminLog: {
    server: async parent => {
      return _models.Server.findOne({
        id: parent.server
      });
    }
  },
  AdminPermission: {
    server: async parent => {
      return _models.Server.findOne({
        id: parent.server
      });
    }
  },
  ServerStats: {
    server: async parent => {
      return _models.Server.findOne({
        id: parent.server
      });
    }
  }
};
exports.default = _default;