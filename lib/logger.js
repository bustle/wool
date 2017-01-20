import logger from 'shep-logger'
import config from './config'

logger.output({
  level: config.LOG_LEVEL || 'info',
  stream: process.stdout
})

export const log = logger(config.PROJECT_NAME)
