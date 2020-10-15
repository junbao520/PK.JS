"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addWarning = _interopRequireDefault(require("./add-warning"));

var _deleteWarning = _interopRequireDefault(require("./delete-warning"));

var _default = {
  Mutation: {
    addWarning: _addWarning.default,
    deleteWarning: _deleteWarning.default
  }
};
exports.default = _default;