'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg'
    if(this.ctx.isAuthenticated()) {
      this.ctx.body = 'hi, ' + this.ctx.user.nickname
    }
  }
}

module.exports = HomeController