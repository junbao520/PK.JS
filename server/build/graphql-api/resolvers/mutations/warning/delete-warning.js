"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const warning = await _models.Warning.findOne({
    _id: args.warningID
  });
  if (warning === null) throw new Error('Warning not found.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: warning.server,
    admin: context.user,
    deleteWarnings: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  await warning.delete();
  await new _models.AdminLog({
    server: warning.server,
    admin: context.user,
    type: 'delete_warning',
    targetPlayer: warning.player,
    reason: args.reason
  }).save();
  return warning;
};

exports.default = _default;