'use strict'

const Antl = use('Antl')

class Update {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Update
