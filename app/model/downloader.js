module.exports = app => {
    const { BIGINT, STRING, INTEGER, ENUM } = app.Sequelize

    const Downloader = app.model.define('downloader', {
        id: {
            allowNull: false,
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: STRING,
        
        uniqueToken: STRING,
        lastIP: STRING,
        socketID: STRING,

        maxBandwidth: BIGINT,
        bandwidth: BIGINT,

        maxTransferred: BIGINT,
        transferred: BIGINT,

        maxDiskSpace: BIGINT,
        diskSpace: BIGINT,

        status: {
            type: ENUM,
            values: ['online', 'offline', 'disabled']
        }
    })

    Downloader.associate = function() {
        app.model.Downloader.belongsToMany(app.model.Room, {
            through: 'room_downloader_mapping',
            foreignKey: 'downloader_id',
            otherKey: 'room_id'
        })
    }

    return Downloader
}