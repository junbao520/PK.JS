"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _default = (0, _apolloServerKoa.gql)`
  directive @fieldViewPermission(
    requiresAdminPermission: String
    viewIfPlayer: Boolean
    viewIfAdmin: Boolean
  ) on OBJECT | FIELD_DEFINITION
`;

exports.default = _default;