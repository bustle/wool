import logger from 'shep-logger'
import { logLevel } from 'shep-config'

logger.output({
  level: logLevel || 'info',
  stream: process.stdout
})

const log = logger('nighthawk')
export default log
