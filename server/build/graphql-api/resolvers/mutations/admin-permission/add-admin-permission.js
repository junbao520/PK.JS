"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _models = require("../../../../models");

var _constants = require("shared/constants");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const currentAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (currentAdmin === null) throw new Error('You do not have permission to do that.'); // if they do not have the manageAssignPermissions permission, do they have permission
  // to assign at least one other permission?

  if (currentAdmin.manageAssignPermissions < 1) {
    let allowed = false;

    for (let permission of _constants.panelPermissions.concat(_constants.gamePermissions)) {
      if (currentAdmin[permission.permission] > 1) allowed = true;
    }

    if (!allowed) throw new Error('You do not have permission to do that.');
  }

  const selectedAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: args.steamID
  });
  if (selectedAdmin !== null) throw new Error('User is already an admin.');
  const selectedUser = await _models.SteamUser.findOne({
    steamID: args.steamID
  });
  if (selectedUser === null) throw new _apolloServerKoa.UserInputError('Unknown Steam ID. Please ensure they have logged in first.');
  await new _models.AdminLog({
    server: args.serverID,
    admin: currentAdmin.admin,
    type: 'add_admin_permission',
    targetAdmin: args.steamID
  }).save();
  return _models.AdminPermission.findOneAndUpdate({
    server: args.serverID,
    admin: args.steamID
  }, {
    server: args.serverID,
    admin: args.steamID
  }, {
    upsert: true,
    setDefaultsOnInsert: true,
    new: true
  });
};

exports.default = _default;