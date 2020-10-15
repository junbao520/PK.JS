"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type PlayerStats {
    _id: String

    server: Server
    player: Player
    date: Date

    totalGold: Int
  }
`;

exports.default = _default;