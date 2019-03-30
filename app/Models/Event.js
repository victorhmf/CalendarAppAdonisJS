'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Event extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  static async checkExistingEvents (user, datetime) {
    const existingEvents = await Event.query()
      .where({
        user_id: user.id,
        datetime: datetime
      })
      .fetch()

    return existingEvents.rows.length
  }
}

module.exports = Event
