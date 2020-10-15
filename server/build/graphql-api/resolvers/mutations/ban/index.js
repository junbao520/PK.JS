"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addBan = _interopRequireDefault(require("./add-ban"));

var _deleteBan = _interopRequireDefault(require("./delete-ban"));

var _unBan = _interopRequireDefault(require("./un-ban"));

var _default = {
  Mutation: {
    addBan: _addBan.default,
    deleteBan: _deleteBan.default,
    unBan: _unBan.default
  }
};
exports.default = _default;