"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type IPRecord @fieldViewPermission(requiresAdminPermission: "viewIPRecords") {
    _id: String

    ip: String @fieldViewPermission(requiresAdminPermission: "viewIPs")
    ipMask: Int

    server: Server
    player: Player

    lastSeen: Date
  }
`;

exports.default = _default;