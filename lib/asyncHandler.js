import { log } from './logger'

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
