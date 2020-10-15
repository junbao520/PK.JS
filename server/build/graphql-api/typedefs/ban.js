"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type Ban
    @fieldViewPermission(
      requiresAdminPermission: "viewBans"
      viewIfPlayer: true
    ) {
    _id: String
    server: Int
    player: Player

    admin: SteamUser

    privateReason: String
      @fieldViewPermission(requiresAdminPermission: "viewBans")
    publicReason: String

    startDate: Date
    endDate: Date
    unbannedDate: Date

    ipBan: Boolean @fieldViewPermission(requiresAdminPermission: "viewBans")
  }
`;

exports.default = _default;