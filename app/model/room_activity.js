module.exports = app => {
    const { DATE, STRING, INTEGER } = app.Sequelize

    const RoomActivity = app.model.define('room_activity', {
        id: {
            allowNull: false,
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        type: STRING, // for now, only 'live'
        start_time: DATE,
        end_time: DATE

        
    })

    RoomActivity.associate = function() {
        app.model.Room.hasMany(app.model.RoomActivity)
    }

    return RoomActivity
}