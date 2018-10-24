const assert = require('assert')

module.exports = app => {
    app.passport.verify(async (ctx, user) => {
        assert(user.provider, 'user.provider should exists')
        assert(user.id, 'user.id should exists')

        const foundUser = await ctx.service.user.register({
            oauth_provider: user.provider,
            oauth_id: user.id,
            nickname: user.displayName
        })
        return foundUser
    })
    app.passport.serializeUser(async (ctx, user) => {
        return {
            oauth_provider: user.oauth_provider,
            oauth_id: user.oauth_id
        }
    })
    app.passport.deserializeUser(async (ctx, user) => {
        const foundUser = await ctx.service.user.register({
            oauth_provider: user.oauth_provider,
            oauth_id: user.oauth_id
        })
        return foundUser
    })

    app.beforeStart(function* () {
        //同步数据库表
        app.logger.info(`同步数据表:` + ( app.model.sync == null) )
        app.model.sync()
      })
    
}