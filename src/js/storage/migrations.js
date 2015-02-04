module.exports = function (successRepository) {
    return {
        migrate: function () {
            eggplantMigrations(successRepository)
        }
    }
}

function eggplantMigrations(successRepository) {
    var successText = localStorage.getItem('successText')
    var successImageUrl = localStorage.getItem('successImageUrl')
    var successMessages = []

    pushIfSet(successMessages, successText)
    pushIfSet(successMessages, successImageUrl)

    successRepository.saveSuccessMessages(successMessages)

    localStorage.removeItem('successText')
    localStorage.removeItem('successImageUrl')
}

function pushIfSet(arr, val) {
    if (val && val.trim().length !== 0) {
        arr.push(val)
    }
}
