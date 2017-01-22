import { log } from './logger'
import { notify } from './notifier'

export function asyncHandler (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    log.info(event)
    func(event)
      .then(v => {
        callback(null, v)
      })
      .catch((error) => {
        notify(error)
        callback(error)
      })
  }
}
