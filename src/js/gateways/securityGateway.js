import gateway from './gateway'

module.exports = {
  encryptPassword(password) {
    return gateway.post('/api/encrypt', {password: password})
  }
}
