"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type Query {
    steamUser(steamID: String!): SteamUser
    steamUsers(displayNameLike: String): [SteamUser]

    item(id: Int): Item
    items: [Item]

    server(id: Int!): Server
    servers: [Server]

    adminPermission(serverID: Int!, steamID: String!): AdminPermission
    adminPermissions(serverID: Int, steamID: String): [AdminPermission]

    linkedPlayers: [Player]
  }
`;

exports.default = _default;