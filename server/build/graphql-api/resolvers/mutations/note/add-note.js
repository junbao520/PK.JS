"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    createNotes: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  if (args.publicReason === '') throw new Error('Note cannot be blank.');
  const player = await _models.Player.findOne({
    server: args.serverID,
    guid: args.guid
  });
  if (player === null) throw new Error('Player not found.');
  const note = new _models.Note({
    server: args.serverID,
    player: args.guid,
    admin: context.user,
    note: args.note,
    date: new Date()
  });
  await note.save();
  await new _models.AdminLog({
    server: note.server,
    admin: note.admin,
    type: 'add_note',
    targetPlayer: note.player,
    reason: note.note
  }).save();
  return note;
};

exports.default = _default;