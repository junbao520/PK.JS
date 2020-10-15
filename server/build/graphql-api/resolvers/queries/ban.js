"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _models = require("../../../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Server: {
    bans: async (parent, filter) => {
      let query = {
        server: parent.id
      };
      if (filter.player) query.player = filter.player;
      if (filter.active && filter.active === true) query = {
        $or: [_objectSpread(_objectSpread({}, query), {}, {
          unbannedDate: null,
          startDate: {
            $lte: Date.now()
          },
          endDate: null
        }), _objectSpread(_objectSpread({}, query), {}, {
          unbannedDate: null,
          startDate: {
            $lte: Date.now()
          },
          endDate: {
            $gt: Date.now()
          }
        })]
      };
      return _models.Ban.find(query);
    }
  },
  Player: {
    bans: async (parent, filter) => {
      return _models.Ban.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
exports.default = _default;