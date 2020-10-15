"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const WarningSchema = new _mongoose.default.Schema({
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
  date: {
    type: Number,
    require: true,
    default: Date.now
  }
});

var _default = _mongoose.default.model('Warning', WarningSchema);

exports.default = _default;