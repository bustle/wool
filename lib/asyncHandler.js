import { log } from './logger'
import airbrake from 'airbrake'

const config = process.env

if (config.AIRBRAKE_PROJECT_ID && config.AIRBRAKE_PROJECT_KEY) {
  airbrake.createClient(
    config.AIRBRAKE_PROJECT_ID,
    config.AIRBRAKE_PROJECT_KEY
  )

  airbrake.handleExceptions()
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
