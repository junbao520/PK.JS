"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const IPRecordSchema = new _mongoose.default.Schema({
  ip: {
    type: String,
    require: true
  },
  // for easier searching
  ipMask: {
    type: Number,
    require: true
  },
  server: {
    type: Number,
    require: true
  },
  player: {
    type: String,
    require: true
  },
  firstSeen: {
    type: Date,
    require: true,
    default: Date.now
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

var _default = _mongoose.default.model('IPRecord', IPRecordSchema);

exports.default = _default;