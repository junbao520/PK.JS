"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseCursorPagination = _interopRequireDefault(require("mongoose-cursor-pagination"));

const AdminLog = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  admin: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  targetPlayer: String,
  targetAdmin: String,
  reason: String,
  length: Number,
  ipBanned: Boolean,
  amount: Number,
  adjustmentType: String,
  recipientPlayer: String,
  from: String,
  name: String
});
AdminLog.plugin(_mongooseCursorPagination.default);

var _default = _mongoose.default.model('AdminLog', AdminLog);

exports.default = _default;