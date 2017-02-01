import { log } from './logger'
import { notify } from './notifier'
import config from './config'
import iopipe from './iopipe'

export function asyncHandler (func /* event */) {
  return iopipe((event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    log.info(event)
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
  })
}

function timeoutProtect (millis, callback) {
  setTimeout(() => {
    notify(new Error('Timeout'))
    callback({ error: 'Timeout' })
  }, millis - 50)
}
