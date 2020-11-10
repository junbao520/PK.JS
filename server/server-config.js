const baseConfig = {
  host: 'http://localhost',
  port: 80 /* Must be port 80 due to M&B only connecting on it */,

  //mongoDB: 'mongodb://123.56.68.67:7017/PKJS',
  mongoDB: 'mongodb://admin:pkjs123456@123.56.68.67:7017/admin',
  //mongoDB: 'mongodb://xxhh:fDA2*BkBw8ZwQrfUPKJ8@localhost:9430/pk-js',
  //头像地址
  avatar:'http://xtest.persistentworld.cn/static/media/mrtx.83e148ed.jpg',

  steamAPIKey: '',

  jwtAuth: {
    secret: 'b4HSVV65JXtig4tR8f1mtfIoWVREtt16eC2oGKBYoNo',
    algorithm: 'HS256'
  },

  // disable cron jobs for testing
  disableCronJobs: false,

  gameserverPortStart: 7240,
  gameserverRestartCron: '0 6 * * *',

  // only needs to be changed if using redirector such as nginx
  gameserverAPIAddress: 'http://localhost',

  // turn to true to prevent server boot and to fake online status
  // useful for testing on Windows
  gameserverDevDryRun: false,
  // if dry run enabled does the server show as online?
  gameserverDevDryRunOnline: false
};

const serverConfig = {
  production: {
    env: 'production',

    ...baseConfig
  },

  development: {
    env: 'development',

    ...baseConfig
  }
};

module.exports = serverConfig[process.env.NODE_ENV || 'development'];
