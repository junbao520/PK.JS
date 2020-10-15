"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Query: {
    steamUser: async (parent, filter) => {
      return _models.SteamUser.findOne({
        steamID: filter.steamID
      });
    },
    steamUsers: async (parent, filter) => {
      let query = {};
      if (filter.displayNameLike) query.displayName = new RegExp('.*' + filter.displayNameLike + '.*', 'i');
      return _models.SteamUser.find(query);
    }
  },
  Player: {
    linkedSteamUser: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.linkedSteamUser
      });
    }
  },
  Ban: {
    admin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.admin
      });
    }
  },
  Warning: {
    admin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.admin
      });
    }
  },
  Note: {
    admin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.admin
      });
    }
  },
  AdminLog: {
    admin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.admin
      });
    },
    targetAdmin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.targetAdmin
      });
    }
  },
  AdminPermission: {
    admin: async parent => {
      return _models.SteamUser.findOne({
        steamID: parent.admin
      });
    }
  }
};
exports.default = _default;