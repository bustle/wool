import logger from 'shep-logger'

logger.output({
  level: process.env.LOG_LEVEL || 'info',
  stream: process.stdout
})

const log = logger('nighthawk')
export default log
