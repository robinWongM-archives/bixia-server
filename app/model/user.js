module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    oauth_id: INTEGER,
    oauth_provider: STRING,
    nickname: STRING,
    user_group: {
      type: ENUM,
      values: ['admin', 'registered', 'vip']
    },
    created_at: DATE,
    updated_at: DATE
  })

  User.associate = function() {
    app.model.User.belongsToMany(app.model.Room, {
      through: 'user_room_mapping',
      foreignKey: 'user_id',
      otherKey: 'room_id'
    })
  }

  return User
}