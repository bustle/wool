import logger from './logger'

export default function (func /* event */) {
  return (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    logger.info(event)
    func(event)
      .then(v => {
        logger.info(v)
        callback(null, v)
      })
      .catch(callback)
  }
}
