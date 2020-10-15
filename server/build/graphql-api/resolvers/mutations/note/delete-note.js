"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../../../../models");

var _default = async (parent, args, context) => {
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const note = await _models.Note.findOne({
    _id: args.noteID
  });
  if (note === null) throw new Error('Note not found.');
  const requestingAdmin = await _models.AdminPermission.findOne({
    server: note.server,
    admin: context.user,
    deleteNotes: {
      $gt: 0
    }
  });
  if (requestingAdmin === null) throw new Error('You do not have permission to do that.');
  await note.delete();
  await new _models.AdminLog({
    server: note.server,
    admin: context.user,
    type: 'delete_note',
    targetPlayer: note.player,
    reason: args.reason
  }).save();
  return note;
};

exports.default = _default;