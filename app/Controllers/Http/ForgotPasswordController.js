'use strict'

const User = use('App/Models/User')
const crypto = require('crypto')
const kue = use('Kue')
const Job = use('App/Jobs/ForgotPasswordMail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const { email, redirect_url } = request.all()

      const user = await User.findByOrFail('email', email)
      user.forgot_password_token = crypto.randomBytes(10).toString('hex')
      user.forgot_password_token_created_at = new Date()

      await user.save()

      kue.dispatch(Job.key, { email, redirect_url, user }, { attempts: 3 })
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message:
            'Invalid email, please make sure you filled in with valid email'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
