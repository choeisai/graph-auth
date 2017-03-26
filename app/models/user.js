
// Mock user
const user = {
  id: 1,
  username: 'lab',
  password: 'lab12345'
}

const findUser = (username, callback) => {
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

module.exports = {
  findUser,
  user
}
