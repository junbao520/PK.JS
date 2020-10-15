"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _queries = _interopRequireDefault(require("./queries"));

var _mutations = _interopRequireDefault(require("./mutations"));

var _default = _queries.default.concat(_mutations.default);

exports.default = _default;