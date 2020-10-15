"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeSchedule = require("node-schedule");

var _recordPlayerStats = _interopRequireDefault(require("./record-player-stats"));

var _recordServerStats = _interopRequireDefault(require("./record-server-stats"));

var _restartServers = _interopRequireDefault(require("./restart-servers"));

var _updateBansList = _interopRequireDefault(require("./update-bans-list"));

class JobContainer {
  async initContainer() {
    this.addJob('recordPlayerStats', '*/30 * * * *', _recordPlayerStats.default);
    this.addJob('recordServerStats', '*/5 * * * *', _recordServerStats.default);
    this.addJobs(await (0, _restartServers.default)());
    this.addJob('updateBanList', '*/5 * * * *', _updateBansList.default);
  }

  addJob(id, cron, func) {
    this[id] = (0, _nodeSchedule.scheduleJob)(cron, func);
  }

  addJobs(jobs) {
    jobs.forEach(job => this.addJob(job.id, job.cron, job.func));
  }

  deleteJob(id) {
    this[id].cancel();
    delete this[id];
  }

}

var _default = new JobContainer();

exports.default = _default;