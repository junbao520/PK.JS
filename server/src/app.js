import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import BodyParser from 'koa-bodyparser';
import Cors from '@koa/cors';
import Helmet from 'koa-helmet';
import Logger from 'koa-logger';
import serve from 'koa-static';
import mount from 'koa-mount';
import views from 'koa-views';

import mongoose from 'mongoose';

import jobContainer from './jobs';

import { passport, SteamAuth } from './auth';

import ApolloServer from './graphql-api';
import ServerApi from './server-api';

import serverConfig from '../server-config';
const inProduction = serverConfig.env === 'production';

mongoose.connect(serverConfig.mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const app = new Koa();
const router = new Router();

if (!serverConfig.disableCronJobs) jobContainer.initContainer();
app.jobContainer = jobContainer;

app.use(Helmet());
app.use(Cors());
app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: function (err, ctx) {
      if (err) console.log(err);
      ctx.throw('body parse error', 422);
    }
  })
);

if (!inProduction) app.use(Logger());

app.use(passport.initialize());

const clientPath = path.join(require.resolve('client'), '../');

if (inProduction)
  app.use(mount('/static', serve(path.join(clientPath, '/build/static'))));
else app.use(serve(path.join(clientPath, '/public')));

if (inProduction) app.use(views(path.join(path.join(clientPath, '/build'))));

ApolloServer.applyMiddleware({ app });

router.use('/auth', SteamAuth.routes(), SteamAuth.allowedMethods());
router.use('/serverapi', ServerApi.routes(), ServerApi.allowedMethods());

var FlakeId = require('flake-idgen');
var flakeIdGen = new FlakeId({ epoch: 1300000000000 });
var intformat = require('biguint-format');
let MongoClient = require('mongodb').MongoClient;
import jwt from 'jsonwebtoken';
//登录
router.post('/user/login',async ctx=>{
  let postData = ctx.request.body;
  let res = await new Promise(function (resolve, reject) {
    MongoClient.connect(serverConfig.mongoDB, function (err, db) {
      const dbo = db.db("pk-js")
      const collection = dbo.collection("steamusers")
      collection.findOne({ displayName: postData.displayName,pwd:postData.pwd }, function (err, res) {
        if (err) reject(err);
        else resolve(res)
      });
    });
  });

  if(res==null){
    ctx.body=-1;
  }
  else{
    let user={
      steamID: "76561199098027095",
      displayName: "757114760",
      avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
      avatarMedium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
      avatarFull: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      $setOnInsert: {
        panelAdmin: false
      }
    }
    user.steamID=res.steamID;
    user.displayName=res.displayName;
    user.avatar=res.avatar;
    user.avatarMedium=res.avatarMedium;
    user.$setOnInsert.panelAdmin=res.panelAdmin;
    

    ctx.body = JSON.stringify({
      token: jwt.sign({ user: user }, serverConfig.jwtAuth.secret)
    });
  }
})


router.post('/register', async ctx => {
  //console.log(ctx.query);
  let postData = ctx.request.body;
  var steamID = intformat(flakeIdGen.next(), 'dec');
  postData.steamID = steamID;
  //postData.id=id;
  postData.__v=0;
  postData.aduit = 0;
  postData.avatar = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg';
  postData.avatarFull = postData.avatar;
  postData.avatarMedium = postData.avatar;
  postData.panelAdmin = false;

  //先判断下用户名是否存在
  let res = await new Promise(function (resolve, reject) {
    MongoClient.connect(serverConfig.mongoDB, function (err, db) {
      const dbo = db.db("pk-js")
      const collection = dbo.collection("steamusers")
      collection.findOne({ displayName: postData.displayName }, function (err, res) {
        if (err) reject(err);
        else resolve(res)
      });
    });
  });
  if (res!= null) {
    ctx.body = -1;
  }
  else {
    await new Promise(function (resolve, reject) {
      MongoClient.connect(serverConfig.mongoDB, function (err, db) {
        const dbo = db.db("pk-js")
        const collection = dbo.collection("steamusers")
        collection.insert(postData, function (err, res) {
          if (err) reject(err);
          else resolve(res)
        });
      });
    });
    ctx.body = 1;
  }

})
if (inProduction) {
  router.get('/manifest.json', async ctx => {
    ctx.body = fs.readFileSync(path.join(clientPath, '/build/manifest.json'));
  });

  router.get('/favicon.png', async ctx => {
    ctx.body = fs.readFileSync(path.join(clientPath, '/build/favicon.png'));
  });



  //bob 2020.10.11
  router.get('/getHouseInfo', async ctx => {
    //ctx.body = ctx.query;
    //http://116.62.168.150/getHouseInfo?house_id=23&id=1&guid=2925719
    let playerid = ctx.query.id;
    let guid = ctx.query.guid;
    //playerid=-1;
    let house_id = parseInt(ctx.query.house_id);
    try {
      let res = await new Promise(function (resolve, reject) {
        let MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(serverConfig.mongoDB, function (err, db) {
          const dbo = db.db("pk-js")
          const collection = dbo.collection("house_system")
          collection.findOne({ house_id: house_id }, function (err, res) {
            if (err) reject(err);
            else resolve(res)
          });
        });
      });
      if (res == null)
        ctx.body = -1;
      else {
        //key_guids mongodb里面最好统一存储格式
        res.key_guids = res.key_guids.toString();
        if (res.key_guids == guid || (res.key_guids.indexOf(",") > -1 && res.key_guids.split(',').includes(guid)))
          ctx.body = `83|${house_id}|${playerid}`
        else
          ctx.body = `83|-1|${playerid}`

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

export default app;
