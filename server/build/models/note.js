"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const NoteSchema = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  player: {
    type: String,
    require: true
  },
  admin: {
    type: String,
    require: true
  },
  note: {
    type: String,
    require: true
  },
  date: {
    type: Number,
    require: true,
    default: Date.now
  }
});

var _default = _mongoose.default.model('Note', NoteSchema);

exports.default = _default;