import { log } from './logger'
import { notify } from './notifier'

export function asyncHandler (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    log.info(event)
    timeoutProtect(context.getRemainingTimeInMillis(), callback)
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

const timeoutProtect = (millis, callback) => {
  setTimeout(() => {
    notify(new Error('Timeout'))
    callback({ error: 'Timeout' })
  }, millis - 50)
}
