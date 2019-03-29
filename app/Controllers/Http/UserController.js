'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)

    return user
  }

  async update ({ request, response, params }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'current_password', 'password'])

    if (data.current_password) {
      const isSame = await Hash.verify(data.current_password, user.password)

      if (!isSame) {
        return response.status(400).send({
          error: {
            message: 'Current password is not correct',
            field: 'current_password'
          }
        })
      }

      delete data.current_password
    }

    user.merge(data)
    await user.save()

    return user
  }
}

module.exports = UserController
