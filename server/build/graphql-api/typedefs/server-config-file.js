"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  type ServerConfigFile
    @fieldViewPermission(requiresAdminPermission: "viewServerFiles") {
    server: Int
    name: String
    config: String
    rawConfig: String
  }
`;

exports.default = _default;