"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* Used to store promises between requests, such as load player / gear */
class PromiseStore {}

var _default = new PromiseStore();

exports.default = _default;