"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type ServerStatus {
    _id: String

    Name: String
    ModuleName: String
    MultiplayerVersionNo: Int
    ModuleVersionNo: Int
    MapID: Int
    MapName: String
    MapTypeID: String
    MapTypeName: String
    NumberOfActivePlayers: Int
    MaxNumberOfPlayers: Int
    HasPassword: Boolean
    IsDedicated: Boolean
    HasSteamAntiCheat: Boolean
  }
`;

exports.default = _default;