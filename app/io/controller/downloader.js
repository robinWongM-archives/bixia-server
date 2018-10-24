'use strict';

const Controller = require('egg').Controller

class DownloaderController extends Controller {
    async status() {
        const { ctx, app } = this
        const message = ctx.args[0]
        ctx.logger.info('received!', ctx.args)
    }
    async downloadStarted() {
        const { ctx } = this
        const message = ctx.args[0]

        //ctx.service
    }
    async downloadSaved() {

    }
    async liveStatus() {

    }
    async danmu() {
        const { ctx, app } = this
        //app.model.Downloader.findOne()
    }
    async speed() {

    }
}

module.exports = DownloaderController