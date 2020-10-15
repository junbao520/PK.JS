"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addNote = _interopRequireDefault(require("./add-note"));

var _deleteNote = _interopRequireDefault(require("./delete-note"));

var _default = {
  Mutation: {
    addNote: _addNote.default,
    deleteNote: _deleteNote.default
  }
};
exports.default = _default;