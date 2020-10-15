"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _models = require("../../../models");

var _constants = require("shared/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const sortAdmins = admins => {
  admins = admins.map(admin => {
    admin = admin.toObject();
    let totalPermissions = 0;

    for (let permission of _constants.panelPermissions.concat(_constants.gamePermissions)) totalPermissions += admin[permission.permission];

    return _objectSpread(_objectSpread({}, admin), {}, {
      totalPermissions
    });
  }).sort((a, b) => {
    return b.totalPermissions - a.totalPermissions;
  });
  return admins;
};

var _default = {
  Query: {
    adminPermission: async (parent, filter) => {
      return _models.AdminPermission.findOne({
        server: filter.serverID,
        admin: filter.steamID
      });
    },
    adminPermissions: async (parent, filter) => {
      let admins = await _models.AdminPermission.find({
        $or: [{
          server: filter.serverID
        }, {
          admin: filter.steamID
        }]
      });
      return sortAdmins(admins);
    }
  },
  Server: {
    adminPermission: async (parent, filter) => {
      return _models.AdminPermission.findOne({
        server: parent.id,
        admin: filter.steamID
      });
    },
    adminPermissions: async parent => {
      let admins = await _models.AdminPermission.find({
        server: parent.id
      });
      return sortAdmins(admins);
    }
  }
};
exports.default = _default;