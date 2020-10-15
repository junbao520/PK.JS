"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type Note @fieldViewPermission(requiresAdminPermission: "viewNotes") {
    _id: String
    server: Int
    player: Player

    admin: SteamUser

    note: String

    date: Date
  }
`;

exports.default = _default;