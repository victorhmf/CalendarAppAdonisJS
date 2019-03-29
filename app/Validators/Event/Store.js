'use strict'

const Antl = use('Antl')

const { rule } = use('Validator')

class Store {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      location: 'required',
      datetime: [rule('dateFormat', 'YYYY-MM-DD HH:mm'), rule('required')]
    }
  }

  get messages () {
    return Antl.list('Validation')
  }
}

module.exports = Store
