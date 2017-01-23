import { log } from './logger'
import airbrake from 'airbrake'
import Raven from 'raven'
import config from './config'

export function notify (error) {
  if (config.AIRBRAKE_PROJECT_ID && config.AIRBRAKE_PROJECT_KEY) {
    const client = airbrake.createClient(
      config.AIRBRAKE_PROJECT_ID,
      config.AIRBRAKE_PROJECT_KEY
    )

    client.notify(error)
  }

  if (config.SENTRY_KEY && config.SENTRY_SECRET && config.SENTRY_PROJECT) {
    Raven.config(`https://${config.SENTRY_KEY}:${config.SENTRY_SECRET}@sentry.io/${config.SENTRY_PROJECT}`).install()

    Raven.captureException(error)
  }

  log.error(error)
}
