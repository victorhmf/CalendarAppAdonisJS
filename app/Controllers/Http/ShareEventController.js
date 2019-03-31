'use strict'

const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/ShareEvent')

class ShareEventController {
  async share ({ request, response, params, auth }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ erorr: { message: 'Only event owner can share it' } })
    }

    const email = request.input('email')

    Kue.dispatch(Job.key, { email, username: auth.user.username, event })
    return event
  }
}

module.exports = ShareEventController
