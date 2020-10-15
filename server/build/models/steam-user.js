"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const SteamUserSchema = new _mongoose.default.Schema({
  steamID: {
    type: String,
    require: true
  },
  displayName: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  avatarMedium: {
    type: String,
    require: true
  },
  avatarFull: {
    type: String,
    require: true
  },
  panelAdmin: {
    type: Boolean,
    require: true,
    default: false
  }
});

var _default = _mongoose.default.model('SteamUser', SteamUserSchema);

exports.default = _default;