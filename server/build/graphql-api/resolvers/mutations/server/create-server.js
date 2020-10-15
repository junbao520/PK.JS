"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _models = require("../../../../models");

var _serverFolderManager = require("../../../../utils/server-folder-manager");

var _jobs = _interopRequireDefault(require("../../../../jobs"));

var _validators = require("shared/validators");

var _constants = require("shared/constants");

var _gameserverInstanceTools = require("../../../../utils/gameserver-instance-tools");

var _default = async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null) throw new Error('You must be logged in to complete this action.');
  const requestingUser = await _models.SteamUser.findOne({
    steamID: context.user,
    panelAdmin: true
  });
  if (requestingUser === null) throw new Error('You do not have permission to do that.');
  /* Create Server Document in DB */

  if (!(0, _validators.validatorServerName)(args.name)) throw new _apolloServerKoa.UserInputError('Invalid Server Name.');
  let serverInput = {
    name: args.name
  };
  if (args.welcomeMessage) serverInput.welcomeMessage = args.welcomeMessage;
  if (args.defaultBankGold) serverInput.defaultBankGold = args.defaultBankGold;
  if (args.defaultPouchGold) serverInput.defaultPouchGold = args.defaultPouchGold;
  if (args.defaultBankLimit) serverInput.defaultBankLimit = args.defaultBankLimit;
  if (args.recordStats) serverInput.recordStats = args.recordStats;
  if (args.gameserverRestartCron) serverInput.gameserverRestartCron = args.gameserverRestartCron;
  let server = await _models.Server.create([serverInput], {
    setDefaultsOnInsert: true
  });
  server = server[0];
  /* Create AdminPermisisons Document in DB */

  let adminPermission = {
    server: server.id
  };

  for (let permission of _constants.panelPermissions.concat(_constants.gamePermissions)) {
    adminPermission[permission.permission] = 2;
  }

  const panelAdmins = await _models.SteamUser.find({
    panelAdmin: true
  });

  for (let panelAdmin of panelAdmins) {
    adminPermission.admin = panelAdmin.steamID;
    await _models.AdminPermission.create(adminPermission);
  }

  await (0, _serverFolderManager.installServer)(server);

  _jobs.default.addJob(`restart-server-${server.id}`, server.gameserverRestartCron, async () => {
    console.log(`Checking if restarted need for instance for server: ${server.id}`);

    if (await (0, _gameserverInstanceTools.isServerOnline)(server.id)) {
      console.log(`Restarting server instance for server: ${server.id}`);
      await (0, _gameserverInstanceTools.restartServer)(server.id);
    }
  });

  return server;
};

exports.default = _default;