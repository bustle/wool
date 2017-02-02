import { notify } from './notifier'
import { config } from './config'

export function asyncHandler (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    if (config.ENV !== 'development') {
      timeoutProtect(context.getRemainingTimeInMillis(), callback)
    }
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

async function timeoutProtect (millis, callback) {
  setTimeout(() => {
    notify(new Error('Timeout'))
    callback({ error: 'Timeout' })
  }, millis - 50)
}
