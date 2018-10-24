module.exports = app => {
    return async (ctx, next) => {
        //ctx.logger.info('packet: ', ctx.packet)
        await next()
    }
}