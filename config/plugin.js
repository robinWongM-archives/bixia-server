'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
    enable: true,
    package: 'egg-validate'
}

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}

exports.passport = {
    enable: true,
    package: 'egg-passport'
}

exports.passportGithub = {
    enable: true,
    package: 'egg-passport-github'
}

exports.io = {
    enable: true,
    package: 'egg-socket.io'
}