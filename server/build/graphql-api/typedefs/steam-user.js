"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type SteamUser {
    _id: String

    steamID: String
    displayName: String
    avatar: String
    avatarMedium: String
    avatarFull: String

    panelAdmin: Boolean
  }
`;

exports.default = _default;