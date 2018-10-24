const got = require('got')

module.exports = {
    promisify(func, receiver) {
        return (...args) => {
            return new Promise((resolve, reject) => {
                let timerID = setTimeout(() => {
                    clearTimeout(timerID)
                    reject('Timeout')
                }, 5000)
                func.apply(receiver, [...args, (...cbData) => {
                    clearTimeout(timerID)
                    resolve(cbData)
                }])
            })
        }
    },

    buildResponse(resp) {
        return {
            data: resp
        }
    },

    // https://stackoverflow.com/a/38750895
    filterModel(instance, fields) {
        return Object.keys(instance)
               .filter(key => fields.includes(key))
               .reduce((obj, key) => {
                   return {
                       ...obj,
                       [key]: instance[key]
                   }
               }, {})
    },

    async oopsGot(errMsg, ...args) {
        try {
            console.log(...args)
            return await got(...args)
        } catch (err) {
            throw new Error(''.concat(errMsg).concat(': ').concat(err))
        }
    }
}