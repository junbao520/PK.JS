"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaPassport = _interopRequireDefault(require("koa-passport"));

var _passportSteam = _interopRequireDefault(require("passport-steam"));

var _models = require("../models");

var _serverConfig = _interopRequireDefault(require("../../server-config"));

_koaPassport.default.use(new _passportSteam.default({
  returnURL: _serverConfig.default.host + '/login',
  realm: _serverConfig.default.host,
  apiKey: _serverConfig.default.steamAPIKey
}, async (indetifier, profile, done) => {
  const user = {
    steamID: profile.id,
    displayName: profile.displayName,
    avatar: profile.photos[0].value,
    avatarMedium: profile.photos[1].value,
    avatarFull: profile.photos[2].value,
    $setOnInsert: {
      panelAdmin: (await _models.SteamUser.count({})) === 0
    }
  };
  await _models.SteamUser.findOneAndUpdate({
    steamID: user.steamID
  }, user, {
    upsert: true,
    setDefaultsOnInsert: true
  });
  return done(null, user);
}));

var _default = _koaPassport.default;
exports.default = _default;