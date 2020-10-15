"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type PlayerName {
    _id: String

    server: Int
    name: String

    player: Player

    lastSeen: Date
  }
`;

exports.default = _default;