'use strict'

const Mail = use('Mail')

class ShareEvent {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ShareEvent-job'
  }

  // This is where the work is done.
  async handle ({ email, username, event }) {
    await Mail.send(
      ['emails.share_event'],
      {
        username,
        event
      },
      message => {
        message
          .to(email)
          .from('calendar@webmaster.com')
          .subject('New Event')
      }
    )
  }
}

module.exports = ShareEvent
