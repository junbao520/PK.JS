"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _serverConfig = _interopRequireDefault(require("../../server-config"));

var _passport = _interopRequireDefault(require("./passport"));

const router = new _koaRouter.default();
router.get('/steam', _passport.default.authenticate('steam'));
router.get('/steam/return', _passport.default.authenticate('steam', {
  session: false,
  failureFlash: 'Failed to login.'
}), ctx => {
  ctx.body = JSON.stringify({
    token: _jsonwebtoken.default.sign({
      user: ctx.req.user
    }, _serverConfig.default.jwtAuth.secret)
  });
});
var _default = router;
exports.default = _default;