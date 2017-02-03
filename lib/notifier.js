import { log } from './logger'
import airbrake from 'airbrake'
import { config } from './config'

export function notify (error) {
  if (config.AIRBRAKE_PROJECT_ID && config.AIRBRAKE_PROJECT_KEY) {
    const client = airbrake.createClient(
      config.AIRBRAKE_PROJECT_ID,
      config.AIRBRAKE_PROJECT_KEY
    )

    client.notify(error)
  }

  log.error(error)
}
