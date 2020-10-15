"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../../../models/index");

var _default = async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingAdmin = await _index.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    clearPlayerLocations: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  await _index.Player.updateMany({
    server: args.serverID
  }, {
    $unset: {
      xPosition: 1,
      yPosition: 1,
      zPosition: 1
    }
  });
  return _index.Player.find({
    server: args.serverID
  });
};

exports.default = _default;