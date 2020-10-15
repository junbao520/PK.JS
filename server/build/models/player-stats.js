"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const PlayerStats = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  player: {
    type: String,
    requie: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalGold: Number
});

var _default = _mongoose.default.model('PlayerStat', PlayerStats);

exports.default = _default;