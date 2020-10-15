"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const PlayerNameSchema = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  player: {
    type: String,
    require: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

var _default = _mongoose.default.model('PlayerName', PlayerNameSchema);

exports.default = _default;