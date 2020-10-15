"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _auth = _interopRequireDefault(require("./auth"));

var _controllers = require("./controllers");

const router = new _koaRouter.default();
router.use(_auth.default);
router.get('/ping', _controllers.ping); // for server startup

router.get('/loadplayer', _controllers.loadPlayer); // for when player-selector joins server

router.get('/loadgear', _controllers.loadGear); // for when player-selector spawns in

router.get('/stripgear', _controllers.stripGear); // for when player-selector dies

router.get('/saveplayer', _controllers.savePlayer); // for when a player-selector leaves the server

router.get('/bankdeposit', _controllers.bankDeposit); // for when a player-selector uses a bank

router.get('/bankwithdraw', _controllers.bankWithdraw); // for when a player-selector uses a bank

var _default = router;
exports.default = _default;