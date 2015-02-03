module.exports = {

    saveSuccessMessages: function (messages) {
        localStorage.setItem('successMessages', messages)
    },

    getSuccessMessages: function () {
        return exists('successMessages') ? localStorage.getItem('successMessages').split(',') : []
    }
}

function exists(key) {
    var val = localStorage.getItem(key)
    return val && val.trim().length !== 0
}
