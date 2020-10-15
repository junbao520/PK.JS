"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _typedefs = _interopRequireDefault(require("./typedefs"));

var _directives = _interopRequireDefault(require("./directives"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("../models");

var _serverConfig = _interopRequireDefault(require("../../server-config"));

const schema = (0, _apolloServerKoa.makeExecutableSchema)({
  typeDefs: _typedefs.default,
  resolvers: _resolvers.default,
  schemaDirectives: _directives.default
});

var _default = new _apolloServerKoa.ApolloServer({
  schema,
  context: async ({
    ctx
  }) => {
    try {
      const user = _jsonwebtoken.default.verify(ctx.get('JWT'), _serverConfig.default.jwtAuth.secret, {
        algorithms: [_serverConfig.default.jwtAuth.algorithm]
      }).user.steamID;

      let adminPermissions = {};
      (await _models.AdminPermission.find({
        admin: user
      })).forEach(function (adminPermission) {
        adminPermissions[adminPermission.server] = adminPermission;
      });
      let players = {};
      (await _models.Player.find({
        linkedSteamUser: user
      })).forEach(function (player) {
        players[`${player.server}-${player.guid}`] = player;
      });
      return {
        user,
        adminPermissions,
        players
      };
    } catch (err) {
      return {
        user: null,
        adminPermissions: {},
        players: {}
      };
    }
  }
});

exports.default = _default;