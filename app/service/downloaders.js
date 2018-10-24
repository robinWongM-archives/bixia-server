const Service = require('egg').Service

class DownloaderService extends Service {
    constructor(ctx) {
        super(ctx)
    }

    /* async checkAvailability () {
        const ctx = this.ctx

        return await ctx.model.Downloader.findOne({
            where: {
                status: 'online'
            },
            order: this.app.model.random()
        })
    }

    async addRoom(room, downloader) {
        const ctx = this.ctx

        // before calling addRoom, you must call checkAvailbility to gather one downloader
        if(downloader.status !== 'online')
            throw new Error('The given downloader is NOT online')

        downloader.addRoom(room)
        // Find socket
        const socket = this.app.io.of('/downloader').connected[downloader.socketID]
        const [code, data] = await ctx.helper.promisify(socket.emit, socket)('add room', room.info_id)
        if(code === 1)
            // Room Missing
            // TODO
        if(code === -1)
            // Server Error
            //TODO
        
        await room.update()

        //ctx.helper.promisify()
        return room
    } */

    async addRoom(downloader, room) {
        const ctx = this.ctx

        // Find socket
        const socket = this.app.io.of('/downloader').connected[downloader.socketID]
        const [ret, err] = await ctx.helper.promisify(socket.emit, socket)('add room', room.info_id)

        if (ret === 0) // success
            downloader.addRoom(room)
        else
            return // Use schedule tasks to readd
    }

    async assignToRoom(room) {
        const { ctx } = this

        const downloader = await ctx.model.Downloader.findOne({
            where: {
                status: 'online'
            },
            order: this.app.model.random()
        })
        
        if(downloader)
            this.addRoom(downloader, room)
    }

    async online(info) {
        const { ctx } = this
        let { uniqueToken, IP, socketID } = info
        
        if (!uniqueToken)
            uniqueToken = require('nanoid')(16)

        let [ downloader ] = await ctx.model.Downloader.findOrCreate({
            where: { uniqueToken }
        })

        if(!downloader) {
            // It's a downloader with token we don't recognize
            throw new Error('unknown downloader uniqueToken')
        }

        // Store to DB
        await downloader.update({
            lastIP: IP,
            status: 'online',
            socketID
        })

        // Fetch Room List
        const roomList = (await downloader.getRooms()).map(room => { return room.info_id })

        return { downloader, roomList }
    }

    async offline(downloader) {
        // Oops
        return await downloader.update({
            status: 'offline'
        })
    }
}

module.exports = DownloaderService