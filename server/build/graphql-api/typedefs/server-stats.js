"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type ServerStats {
    _id: String

    server: Server
    date: Date

    uniqueGUIDs: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    uniqueIPs: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    adminCount: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    totalBans: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalWarnings: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalNotes: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    playerCount: Int
    currentMap: String
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")

    totalGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalBankGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    totalPouchGold: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
    bankLimit: Int
      @fieldViewPermission(requiresAdminPermission: "viewServerStats")
  }
`;

exports.default = _default;