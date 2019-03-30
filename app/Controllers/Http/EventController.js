'use strict'

const Event = use('App/Models/Event')
const moment = require('moment')

class EventController {
  /**
   * Show a list of all events.
   * GET events
   */
  async index ({ request, response, auth }) {
    const { page, date } = request.get()

    if (date) {
      const eventsByDate = Event.query()
        .with('user')
        .where({ user_id: auth.user.id })
        .whereRaw(`"datetime"::date = ?`, date)
        .paginate(page)

      return eventsByDate
    }

    const events = Event.query()
      .with('user')
      .where({ user_id: auth.user.id })
      .paginate(page)

    return events
  }

  /**
   * Create/save a new event.
   * POST events
   */
  async store ({ request, response, auth }) {
    const data = request.only(['title', 'location', 'datetime'])

    const existingEvents = await Event.checkExistingEvents(
      auth.user,
      data.datetime
    )

    if (existingEvents) {
      return response.status(401).send({
        error: {
          message: "It's not possible create two events in the same time"
        }
      })
    }

    const event = await Event.create({ ...data, user_id: auth.user.id })

    return event
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show ({ params, response, auth }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: { message: 'Only event owner can to see it' } })
    }

    return event
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   */
  async update ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: { message: 'Only event owner can to edit it' } })
    }

    const data = request.only(['title', 'location', 'datetime'])

    if (data.datetime) {
      const passed = moment().isAfter(event.datetime)

      if (passed) {
        return response
          .status(401)
          .send({ error: { message: "You can't edit event that have passed" } })
      }

      const existingEvents = await Event.checkExistingEvents(
        auth.user,
        data.datetime
      )

      if (existingEvents) {
        return response.status(401).send({
          error: {
            message: "It's not possible create two events in the same time"
          }
        })
      }
    }

    event.merge(data)
    event.save()

    return event
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   */
  async destroy ({ params, request, response, auth }) {
    const event = await Event.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response
        .status(401)
        .send({ error: { message: 'Only event owner can to remove it' } })
    }

    const passed = moment().isAfter(event.datetime)

    if (passed) {
      return response.status(401).send({
        error: { message: "You can't remove event that have passed" }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
