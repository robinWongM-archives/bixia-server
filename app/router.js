'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { io, router, controller } = app;
  router.get('/', controller.home.index);

  router.resources('rooms', '/api/rooms', app.controller.rooms);
  
  const github = app.passport.authenticate('github', {})
  router.get('/api/auth/github', github)
  router.get('/api/auth/github/callback', github)

  // ?
  io.of('/downloader').route('danmu', app.io.controller.downloader.danmu)
  io.of('/downloader').route('status', app.io.controller.downloader.status)
  io.of('/downloader').route('speed', app.io.controller.downloader.speed)

};
