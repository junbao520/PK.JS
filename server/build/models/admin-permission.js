"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = require("shared/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const addPermissions = () => {
  let permissions = {};

  for (let permission of _constants.panelPermissions.concat(_constants.gamePermissions)) {
    permissions[permission.permission] = {
      type: Number,
      require: true,
      default: 0,
      min: 0,
      max: 2
    };
  }

  return permissions;
};

const AdminPermission = new _mongoose.default.Schema(_objectSpread({
  server: {
    type: Number,
    require: true
  },
  admin: {
    type: String,
    require: true
  },
  player: {
    type: String,
    require: true
  }
}, addPermissions()));

var _default = _mongoose.default.model('AdminPermission', AdminPermission);

exports.default = _default;