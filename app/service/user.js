const Service = require('egg').Service
const assert = require('assert')

class UserService extends Service {
    async find(user) {
        const ctx = this.ctx

        assert(user.oauth_provider, 'user.oauth_provider should exists')
        assert(user.oauth_id, 'user.oauth_id should exists')

        const result = await ctx.model.User.findOne({
            where: {
                oauth_provider: user.oauth_provider,
                oauth_id: user.oauth_id
            }
        })
        return result
    }

    async register(user) {
        const ctx = this.ctx

        assert(user.oauth_provider, 'user.oauth_provider should exists')
        assert(user.oauth_id, 'user.oauth_id should exists')

        const result = await ctx.model.User.findOrCreate({
            where: {
                oauth_provider: user.oauth_provider,
                oauth_id: user.oauth_id
            },
            defaults: {
                oauth_provider: user.oauth_provider,
                oauth_id: user.oauth_id,
                nickname: user.nickname
            }
        })
        return result[0]
    }
}

module.exports = UserService