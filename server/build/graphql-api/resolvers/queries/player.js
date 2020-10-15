"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../models");

var _default = {
  Query: {
    linkedPlayers: async (parent, filter, context) => {
      return _models.Player.find({
        linkedSteamUser: context.user
      });
    }
  },
  Server: {
    player: async (parent, filter) => {
      return _models.Player.findOne({
        server: parent.id,
        guid: filter.guid
      });
    },
    players: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.guidLike) query.guid = new RegExp('.*' + filter.guidLike + '.*');
      return _models.Player.find(query);
    },
    onlinePlayers: async parent => {
      return _models.Player.find({
        server: parent.id,
        online: {
          $gt: 0
        }
      });
    },
    richestPlayers: async (parent, filter) => {
      return _models.Player.find({
        server: parent.id
      }).sort({
        bankGold: -1
      }).limit(30 || filter.limit);
    }
  },
  Player: {
    ipBanned: async parent => {
      const usedIPs = (await _models.IPRecord.find({
        server: parent.server,
        player: parent.guid
      })).map(record => record.ip);
      const linkedGUIDs = (await _models.IPRecord.find({
        server: parent.server,
        ip: {
          $in: usedIPs
        }
      })).map(record => record.player);
      const linkedIPBannedGUIDs = (await _models.Ban.find({
        $or: [{
          ipBan: true,
          player: {
            $in: linkedGUIDs
          },
          unbannedDate: null,
          startDate: {
            $lte: Date.now()
          },
          endDate: null,
          server: parent.server
        }, {
          ipBan: true,
          player: {
            $in: linkedGUIDs
          },
          unbannedDate: null,
          startDate: {
            $lte: Date.now()
          },
          endDate: {
            $gt: Date.now()
          },
          server: parent.server
        }]
      })).map(ban => ban.player);
      return _models.Player.find({
        server: parent.server,
        guid: {
          $in: linkedIPBannedGUIDs
        }
      });
    }
  },
  PlayerName: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Ban: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Warning: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  Note: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  IPRecord: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  },
  AdminLog: {
    targetPlayer: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.targetPlayer
      });
    },
    recipientPlayer: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.recipientPlayer
      });
    }
  },
  AdminPermission: {
    player: async parent => {
      return _models.Player.findOne({
        server: parent.server,
        guid: parent.player
      });
    }
  }
};
exports.default = _default;