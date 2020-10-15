"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addAdminPermission = _interopRequireDefault(require("./add-admin-permission"));

var _removeAdminPermission = _interopRequireDefault(require("./remove-admin-permission"));

var _updateAdminPermission = _interopRequireDefault(require("./update-admin-permission"));

var _default = {
  Mutation: {
    addAdminPermission: _addAdminPermission.default,
    removeAdminPermission: _removeAdminPermission.default,
    updateAdminPermission: _updateAdminPermission.default
  }
};
exports.default = _default;