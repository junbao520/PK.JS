"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _crypto = _interopRequireDefault(require("crypto"));

var _serverConfig = _interopRequireDefault(require("../../server-config"));

const AutoIncrement = require('mongoose-sequence')(_mongoose.default);

const ServerSchema = new _mongoose.default.Schema({
  id: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  welcomeMessage: {
    type: String,
    require: true,
    default: 'Welcome to a PK.js powered server.'
  },
  defaultBankGold: {
    type: Number,
    require: true,
    default: 150000
  },
  defaultPouchGold: {
    type: Number,
    require: true,
    default: 10000
  },
  defaultBankLimit: {
    type: Number,
    require: true,
    default: 1000000
  },
  recordStats: {
    type: Boolean,
    require: true,
    default: false
  },
  apiKey: {
    type: String,
    require: true,
    default: () => _crypto.default.randomBytes(20).toString('hex')
  },
  gameserverLastModule: String,
  gameserverLastConfig: String,
  gameserverRestartCron: {
    type: String,
    default: _serverConfig.default.gameserverRestartCron
  },
  useCustomBanList: {
    type: Boolean,
    default: false
  }
});
ServerSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'serverID'
});

var _default = _mongoose.default.model('Server', ServerSchema);

exports.default = _default;