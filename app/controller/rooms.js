const Controller = require('egg').Controller

class RoomController extends Controller {
    async index() {
        const ctx = this.ctx

        if (!ctx.isAuthenticated())
            ctx.throw(401, '尚未登录')
        
        const rooms = await ctx.service.rooms.list()
        ctx.body = {
            rooms: rooms
        }
        ctx.status = 200
    }
    async create() {
        const ctx = this.ctx
        const roomIDRule = /^(?:https?:\/\/)?live\.bilibili\.com\/(?<roomID1>\d+)|^(?<roomID2>\d+)$/

        if (!ctx.isAuthenticated())
            ctx.throw(401, '尚未登录')

        const { groups: { roomID1, roomID2 } } = roomIDRule.exec(ctx.request.body.room_id)
        const roomID = roomID1 ? roomID1 : roomID2
        if(!roomID)
            ctx.throw(422, '服务器不认识这种直播间地址或者房间号，咋办呢')

        const room = await ctx.service.rooms.add(roomID)
        if(!room) {
            ctx.throw(404, '服务器找不到这个房间诶')
        }
        ctx.body = room
        ctx.status = 200
    }
    async list() {
        const ctx = this.ctx

        ctx.validate(listRule, ctx.request.body)
        const rooms = await ctx.service.rooms.list(ctx.request.body)
        ctx.body = {
            rooms: rooms
        }
        ctx.status = 201
    }
}

module.exports = RoomController