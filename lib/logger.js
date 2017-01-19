import logger from 'shep-logger'

logger.output({
  level: process.env.LOG_LEVEL || 'info',
  stream: process.stdout
})

export const log = logger(process.env.PROJECT_NAME)
