'use strict'

const Antl = use('Antl')

class Update {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'unique:users',
      password:
        'confirmed|required_if:current_password|required_if:password_confirmation',
      current_password: `required_if:password`
    }
  }

  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Update
