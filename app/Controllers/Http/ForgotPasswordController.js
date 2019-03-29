'use strict'

const User = use('App/Models/User')
const crypto = require('crypto')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const { email, redirect_url } = request.all()

      const user = await User.findByOrFail('email', email)
      user.forgot_password_token = crypto.randomBytes(10).toString('hex')
      user.forgot_password_token_created_at = new Date()

      await user.save()

      return user
    } catch (error) {
      return response.status(401).send({
        error: {
          message:
            'Invalid email, please make sure you filled in with valid email'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
