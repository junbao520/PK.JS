"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _itemIDs = _interopRequireDefault(require("../../../../data/itemIDs.json"));

var _default = {
  Query: {
    item: (parent, filter) => {
      return _itemIDs.default[filter.id];
    },
    items: () => {
      return Object.values(_itemIDs.default);
    }
  },
  Player: {
    headArmour: parent => _itemIDs.default[parent.headArmour],
    bodyArmour: parent => _itemIDs.default[parent.bodyArmour],
    footArmour: parent => _itemIDs.default[parent.footArmour],
    handArmour: parent => _itemIDs.default[parent.handArmour],
    firstItem: parent => _itemIDs.default[parent.firstItem],
    secondItem: parent => _itemIDs.default[parent.secondItem],
    thirdItem: parent => _itemIDs.default[parent.thirdItem],
    forthItem: parent => _itemIDs.default[parent.forthItem],
    horse: parent => _itemIDs.default[parent.horse]
  }
};
exports.default = _default;