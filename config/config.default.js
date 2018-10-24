'use strict';

module.exports = appInfo => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + 'CHANGE TO YOUR OWN PLEASE',

    // for more information, please refer to: https://eggjs.org/zh-cn/tutorials/passport.html
    passportGithub: {
      key: 'CHANGE TO YOUR OWN ClientID',
      secret: 'CHANGE TO YOUR OWN Secret',
      callbackURL: '/api/auth/github/callback',
      proxy: true
    },

    sequelize: {
      dialect: 'mysql',
      database: 'YOUR MYSQL DATABASE',
      host: 'YOUR MYSQL HOST',
      port: '3306',
      user: 'YOUR MYSQL USER',
      password: 'YOUR MYSQL PASSWORD'
    },

    // for more information: https://eggjs.org/zh-cn/tutorials/socketio.html
    io: {
      init: {},
      namespace: {
        '/downloader': {
          connectionMiddleware: ['connection'],
          packetMiddleware: ['packet']
        }
      }
    },

    bixia: {
      downloaderToken: 'PLEASE CHANGE TO YOUR OWN & MATCH THE DOWNLOADER CONFIG'
    },

    // add your config here
    middleware: []
  }
}
