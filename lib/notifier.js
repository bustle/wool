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

  if (config.SENTRY_KEY) {
    Raven.config(config.SENTRY_DSN).install()

    Raven.captureException(error)
  }

  log.error(error)
}
