import airbrake from 'airbrake'
import config from './config'

export function initAirbrake () {
  airbrake.createClient(
    config.AIRBRAKE_PROJECT_ID,
    config.AIRBRAKE_PROJECT_KEY
  )

  airbrake.handleExceptions()
}
