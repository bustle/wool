import logger from './logger'
import { errorHandler } from './error'

export default function (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    logger.info(event)
    func(event)
      .then(v => {
        callback(null, v)
      })
      .catch(err => {
        errorHandler(err, callback)
      })
  }
}
