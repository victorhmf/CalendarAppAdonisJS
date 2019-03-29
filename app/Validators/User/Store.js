'use strict'

const Antl = use('Antl')

class Store {
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

  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Store
