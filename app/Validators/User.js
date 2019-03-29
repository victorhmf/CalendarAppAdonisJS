'use strict'

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      username: 'required|unique:users'
    }
  }
}

module.exports = User
