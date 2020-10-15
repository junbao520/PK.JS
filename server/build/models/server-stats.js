"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const ServerStats = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  uniqueGUIDs: Number,
  uniqueIPs: Number,
  adminCount: Number,
  totalBans: Number,
  totalWarnings: Number,
  totalNotes: Number,
  playerCount: Number,
  currentMap: String,
  totalGold: Number,
  totalBankGold: Number,
  totalPouchGold: Number,
  bankLimit: Number
});

var _default = _mongoose.default.model('ServerStat', ServerStats);

exports.default = _default;