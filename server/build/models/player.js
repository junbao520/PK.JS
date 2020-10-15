"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _generatePin = _interopRequireDefault(require("../utils/generate-pin"));

const PlayerSchema = new _mongoose.default.Schema({
  server: {
    type: Number,
    require: true
  },
  guid: {
    type: String,
    require: true
  },
  pin: {
    type: String,
    require: true,
    default: _generatePin.default
  },
  linkedSteamUser: String,
  online: {
    type: Number,
    require: true,
    default: 0
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  lastPlayerName: {
    type: String
  },
  factionID: Number,
  classID: Number,
  health: Number,
  food: Number,
  poison: Number,
  headArmour: Number,
  bodyArmour: Number,
  footArmour: Number,
  handArmour: Number,
  firstItem: Number,
  secondItem: Number,
  thirdItem: Number,
  forthItem: Number,
  firstAmmo: Number,
  secondAmmo: Number,
  thirdAmmo: Number,
  forthAmmo: Number,
  horse: Number,
  horseHealth: Number,
  xPosition: Number,
  yPosition: Number,
  zPosition: Number,
  pouchGold: {
    type: Number,
    require: true
  },
  bankGold: {
    type: Number,
    require: true
  },
  bankLimit: {
    type: Number,
    require: true
  }
});

var _default = _mongoose.default.model('Player', PlayerSchema);

exports.default = _default;