module.exports = app => {
    return async (ctx, next) => {
        // Connected, AUTH the client
        //ctx.socket.emit('res', 'connected!')
        const handshake = ctx.socket.handshake
        if (handshake.query.authToken !== app.config.bixia.downloaderAuthToken) {
            ctx.socket.disconnect()
            return
        }
        // Register the downloader
        const { downloader, roomList } = await ctx.service.downloaders.online({
            uniqueToken: handshake.query.uniqueToken,
            IP: handshake.address,
            socketID: ctx.socket.id
        })
        // Return new info to downloader and waiting for its room list
        ctx.socket.emit('handshake', downloader.uniqueToken)
        ctx.socket.emit('list room', list => {
            ctx.logger.info(list)
        })
        ctx.logger.info('Downloader connected: %s', downloader.uniqueToken)
        await next()
        // Offline the Downloader
        await ctx.service.downloaders.offline(downloader)
        ctx.logger.warn('Downloader DISconnected: %s', downloader.uniqueToken)
    }
}