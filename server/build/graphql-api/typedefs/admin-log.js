"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type AdminLog @fieldViewPermission(requiresAdminPermission: "viewAdminLogs") {
    _id: String
    hasMore: Boolean

    server: Server
    admin: SteamUser

    type: String
    date: Date

    targetPlayer: Player
    targetAdmin: SteamUser

    reason: String

    length: Int
    ipBanned: Boolean

    amount: Int
    adjustmentType: String
    recipientPlayer: Player
    from: String

    name: String
  }
`;

exports.default = _default;