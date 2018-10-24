const Service = require('egg').Service

class RoomService extends Service {
    constructor(ctx) {
        super(ctx)
        
    }

    async add(roomID) {
        const ctx = this.ctx
        const Op = this.app.Sequelize.Op

        /* const downloader = await ctx.service.downloaders.checkAvailability()
        if(!downloader)
            ctx.throw(500, 'No downloader available') */
        

        const existRoom = await ctx.model.Room.findOne({
            where: {
                [Op.or]: [
                    { info_id: roomID }, { info_short_id: roomID }
                ]
            }
        })

        if(existRoom) {
            existRoom.addUser(ctx.user)
            /* debugmode!!!!!!!!!!!!!!!!!!!!!!! */
            ctx.service.downloaders.assignToRoom(existRoom)
            return {
                code: 0,
                message: 'success',
                data: existRoom
            }
        }

        const roomInfo = await this.getInfo(roomID)
        if (roomInfo === 'MISSING') {
            return {
                code: 1,
                message: '房间不存在'
            }
        } else {
            const newRoom = await ctx.model.Room.create(roomInfo)
            // We don't care whether the room has a downloader
            ctx.service.downloaders.assignToRoom(newRoom)
            newRoom.addUser(ctx.user)
            return {
                code: 0,
                message: 'success',
                data: newRoom
            }
        }
    }

    async getInfo(roomID) {
        const oopsGot = this.ctx.helper.oopsGot

        const roomInfoRes = (await oopsGot(
            '获取直播间信息时发生错误',
            'https://api.live.bilibili.com/room/v1/Room/get_info?room_id=' + roomID, {
                json: true
            })).body

        const { code, data, message } = roomInfoRes
        
        if (code === 1) 
            return 'MISSING'
        else if (code !== 0)
            throw new Error('读取直播间信息时发生错误: ' + message)
        
        const userInfoRes = (await oopsGot(
            '获取主播信息时发生错误',
            'https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room?roomid=' + data.room_id, {
                json: true
            }
        )).body

        const { data: { info } } = userInfoRes

        if (!info)  // -400 means invalid params; others are unknown
            throw new Error('读取主播信息时发生错误')
        
        return {
            info_id: data.room_id,
            info_short_id: data.short_id,
            info_uid: data.uid,
            info_username: info.uname,
            info_title: data.title,
            info_parent_area_id: data.parent_area_id,
            info_parent_area_name: data.parent_area_name,
            info_area_id: data.area_id,
            info_area_name: data.area_name,
            info_description: data.description,

            live_status: data.live_status === 1 ? 'LIVE' : 'PREPARING',
            live_attention: data.attention
        }
    }

    async list() {
        const ctx = this.ctx

        const rooms = await ctx.user.getRooms()
        return rooms
    }
}

module.exports = RoomService