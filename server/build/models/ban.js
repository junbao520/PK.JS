"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const BanSchema = new _mongoose.default.Schema({
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
  privateReason: {
    type: String,
    require: true
  },
  publicReason: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    require: true,
    default: Date.now
  },
  endDate: {
    type: Date,
    require: true
  },
  unbannedDate: {
    type: Date,
    default: null
  },
  ipBan: {
    type: Boolean,
    require: true,
    default: false
  }
});

var _default = _mongoose.default.model('Ban', BanSchema);

exports.default = _default;