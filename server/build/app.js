"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaMount = _interopRequireDefault(require("koa-mount"));

var _koaViews = _interopRequireDefault(require("koa-views"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jobs = _interopRequireDefault(require("./jobs"));

var _auth = require("./auth");

var _graphqlApi = _interopRequireDefault(require("./graphql-api"));

var _serverApi = _interopRequireDefault(require("./server-api"));

var _serverConfig = _interopRequireDefault(require("../server-config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

const inProduction = _serverConfig.default.env === 'production';

_mongoose.default.connect(_serverConfig.default.mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = new _koa.default();
const router = new _koaRouter.default();
if (!_serverConfig.default.disableCronJobs) _jobs.default.initContainer();
app.jobContainer = _jobs.default;
app.use((0, _koaHelmet.default)());
app.use((0, _cors.default)());
app.use((0, _koaBodyparser.default)({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    if (err) console.log(err);
    ctx.throw('body parse error', 422);
  }
}));
if (!inProduction) app.use((0, _koaLogger.default)());
app.use(_auth.passport.initialize());

const clientPath = _path.default.join(require.resolve('client'), '../');

if (inProduction) app.use((0, _koaMount.default)('/static', (0, _koaStatic.default)(_path.default.join(clientPath, '/build/static'))));else app.use((0, _koaStatic.default)(_path.default.join(clientPath, '/public')));
if (inProduction) app.use((0, _koaViews.default)(_path.default.join(_path.default.join(clientPath, '/build'))));

_graphqlApi.default.applyMiddleware({
  app
});

router.use('/auth', _auth.SteamAuth.routes(), _auth.SteamAuth.allowedMethods());
router.use('/serverapi', _serverApi.default.routes(), _serverApi.default.allowedMethods());

var FlakeId = require('flake-idgen');

var flakeIdGen = new FlakeId({
  epoch: 1300000000000
});

var intformat = require('biguint-format');

let MongoClient = require('mongodb').MongoClient;

//登录
router.post('/user/login', async ctx => {
  try {
    let postData = ctx.request.body;
    let res = await new Promise(function (resolve, reject) {
      MongoClient.connect(_serverConfig.default.mongoDB, function (err, db) {
        const dbo = db.db("pk-js");
        const collection = dbo.collection("steamusers");
        collection.findOne({
          displayName: postData.displayName,
          pwd: postData.pwd,
          aduit: 1
        }, function (err, res) {
          if (err) reject(err);else resolve(res);
        });
      });
    });

    if (res == null) {
      ctx.body = -1;
    } else {
      let user = {
        steamID: "76561199098027095",
        displayName: "757114760",
        avatar: "",
        avatarMedium: "",
        avatarFull: "",
        $setOnInsert: {
          panelAdmin: false
        }
      };
      user.steamID = res.steamID;
      user.displayName = res.displayName;
      user.avatar = res.avatar;
      user.avatarMedium = res.avatarMedium;
      user.$setOnInsert.panelAdmin = res.panelAdmin;
      ctx.body = JSON.stringify({
        token: _jsonwebtoken.default.sign({
          user: user
        }, _serverConfig.default.jwtAuth.secret)
      });
    }
  } catch (error) {
    ctx.body = error.message;
  }
});
router.post('/register', async ctx => {
  try {
    let postData = ctx.request.body;
    var steamID = intformat(flakeIdGen.next(), 'dec');
    postData.steamID = steamID; //postData.id=id;

    postData.__v = 0;
    postData.aduit = 0;
    postData.avatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg';
    postData.avatarFull = postData.avatar;
    postData.avatarMedium = postData.avatar;
    postData.panelAdmin = false; //先判断下用户名是否存在

    let res = await new Promise(function (resolve, reject) {
      MongoClient.connect(_serverConfig.default.mongoDB, function (err, db) {
        const dbo = db.db("pk-js");
        const collection = dbo.collection("steamusers");
        collection.findOne({
          displayName: postData.displayName
        }, function (err, res) {
          if (err) reject(err);else resolve(res);
        });
      });
    });

    if (res != null) {
      ctx.body = -1;
    } else {
      await new Promise(function (resolve, reject) {
        MongoClient.connect(_serverConfig.default.mongoDB, function (err, db) {
          const dbo = db.db("pk-js");
          const collection = dbo.collection("steamusers");
          collection.insert(postData, function (err, res) {
            if (err) reject(err);else resolve(res);
          });
        });
      });
      ctx.body = 1;
    }
  } catch (error) {
    ctx.body = error.message;
  } //console.log(ctx.query);

});

if (inProduction) {
  router.get('/manifest.json', async ctx => {
    ctx.body = _fs.default.readFileSync(_path.default.join(clientPath, '/build/manifest.json'));
  });
  router.get('/favicon.png', async ctx => {
    ctx.body = _fs.default.readFileSync(_path.default.join(clientPath, '/build/favicon.png'));
  }); //bob 2020.10.11

  router.get('/getHouseInfo', async ctx => {
    //ctx.body = ctx.query;
    //http://116.62.168.150/getHouseInfo?house_id=23&id=1&guid=2925719
    let playerid = ctx.query.id;
    let guid = ctx.query.guid; //playerid=-1;

    let house_id = parseInt(ctx.query.house_id);

    try {
      let res = await new Promise(function (resolve, reject) {
        let MongoClient = require('mongodb').MongoClient;

        MongoClient.connect(_serverConfig.default.mongoDB, function (err, db) {
          const dbo = db.db("pk-js");
          const collection = dbo.collection("house_system");
          collection.findOne({
            house_id: house_id
          }, function (err, res) {
            if (err) reject(err);else resolve(res);
          });
        });
      });
      if (res == null) ctx.body = -1;else {
        //key_guids mongodb里面最好统一存储格式
        res.key_guids = res.key_guids.toString();
        if (res.key_guids == guid || res.key_guids.indexOf(",") > -1 && res.key_guids.split(',').includes(guid)) ctx.body = `83|${house_id}|${playerid}`;else ctx.body = `83|-1|${playerid}`;
      }
    } catch (error) {
      //ctx.body = `83|-1|${playerid}`
      ctx.body = error.message;
    }
  });
  router.get('*', async ctx => {
    await ctx.render('index.html', {});
  });
}

app.use(router.routes());
app.use(router.allowedMethods());
var _default = app;
exports.default = _default;