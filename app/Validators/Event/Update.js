'use strict'

const Antl = use('Antl')

const { rule } = use('Validator')

class Update {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      datetime: [rule('dateFormat', 'YYYY-MM-DD HH:mm')]
    }
  }

  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Update
