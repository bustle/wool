import { log } from './logger'
import { initAirbrake } from './notifier'
import config from './config'

if (config.AIRBRAKE_PROJECT_ID && config.AIRBRAKE_PROJECT_KEY) {
  initAirbrake()
}

export function asyncHandler (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    log.info(event)
    func(event)
      .then(v => {
        callback(null, v)
      })
      .catch((error) => {
        log.error(error)
        callback(error)
      })
  }
}
