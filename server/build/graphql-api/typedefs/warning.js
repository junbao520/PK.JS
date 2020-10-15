"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type Warning
    @fieldViewPermission(
      requiresAdminPermission: "viewWarnings"
      viewIfPlayer: true
    ) {
    _id: String

    server: Int
    player: Player

    admin: SteamUser

    publicReason: String
    privateReason: String
      @fieldViewPermission(requiresAdminPermission: "viewWarnings")

    date: Date
  }
`;

exports.default = _default;