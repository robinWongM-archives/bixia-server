module.exports = app => {
    const { BIGINT, STRING, INTEGER, ENUM } = app.Sequelize

    const Danmaku = app.model.define('danmaku', {
        // <d p="1619.4599609375,1,25,16777215,1434797363,0,f9b8d3d4,934194846">233333</d>
        // [0, 1, 25, 16777215, 1526267394, -1189421307, 0, "46bc1d5e", 0], "空投！", [10078392, "白の驹", 0, 0, 0, 10000, 1, ""], [11, "狗雨", "宫本狗雨", 102, 10512625, ""]
        // <-----------          对应 XML 弹幕的参数          ------------>, < 本体 >, < UID,      用户名,                        >,< 主播勋章? >

        id: {
            allowNull: false,
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: STRING,
        time: DATE
    })

    Danmaku.associate = function() {
        app.model.Room.hasMany(app.model.Danmaku)
    }

    return Danmaku
}