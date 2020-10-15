"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _xml2js = require("xml2js");

const fetchStatus = async (host, port) => {
  return (await _axios.default.get(`http://${host}:${port}`)).data;
};

const parseStatus = (host, port) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetchStatus(host, port);
      (0, _xml2js.parseString)(response, (err, result) => {
        if (err) return reject(new Error('Server status failed to parse.'));else resolve(result);
      });
    } catch (err) {
      reject(err);
    }
  });
};

var _default = async (host, port) => {
  try {
    let status = await parseStatus(host, port);
    status = status.ServerStats;

    for (let key in status) {
      status[key] = status[key][0];
      if (status[key] === 'Yes') status[key] = true;
      if (status[key] === 'No') status[key] = false;
    }

    return status;
  } catch (err) {
    return {};
  }
};

exports.default = _default;