"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const AutoIncrement = require('mongoose-sequence')(_mongoose.default);

const IPMaskSchema = new _mongoose.default.Schema({
  id: {
    type: Number,
    require: true
  },
  ip: {
    type: String,
    require: true
  }
});
IPMaskSchema.plugin(AutoIncrement, {
  inc_field: 'id',
  id: 'ipMaskID'
});

var _default = _mongoose.default.model('IPMask', IPMaskSchema);

exports.default = _default;