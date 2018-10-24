module.exports = app => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize
  
    const Room = app.model.define('room', {
      id: {
        allowNull: false,
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      // 直播间相关信息 定期更新
      info_id: INTEGER,
      info_short_id: INTEGER,
      info_uid: INTEGER,
      info_username: STRING,
      info_title: STRING,
      info_parent_area_id: INTEGER,
      info_parent_area_name: STRING,
      info_area_id: INTEGER,
      info_area_name: STRING,
      info_description: {
          type: TEXT,
          length: 'long'
      },

      live_status: {
          type: ENUM,
          values: ['PREPARING', 'LIVE', 'ROUND']
      },
      live_attention: INTEGER
    })

    Room.associate = function() {
      app.model.Room.belongsToMany(app.model.User, {
        through: 'user_room_mapping',
        foreignKey: 'room_id',
        otherKey: 'user_id'
      })
      app.model.Room.belongsToMany(app.model.Downloader, {
        through: 'room_downloader_mapping',
        foreignKey: 'room_id',
        otherKey: 'downloader_id'
      })
    }
  
    return Room
  }