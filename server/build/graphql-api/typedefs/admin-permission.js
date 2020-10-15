"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _constants = require("shared/constants");

const addPermissions = () => {
  let permissions = '';

  for (let permission of _constants.panelPermissions.concat(_constants.gamePermissions)) {
    permissions += `${permission.permission}: Int\n`;
  }

  return permissions;
};

var _default = (0, _apolloServerKoa.gql)`
  type AdminPermission {
    _id: String

    server: Server
    admin: SteamUser
    player: Player

    ${addPermissions()}

    adminLogs(
      filter: [String]
      page: Boolean
      startingAfter: String
      endingBefore: String
    ): [AdminLog] @fieldViewPermission(requiresAdminPermission: "viewAdminLogs")
  }
`;

exports.default = _default;