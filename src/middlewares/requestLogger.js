import morgan from 'morgan'
import logger from '~/config/logger'

const requestLoggerMiddleware = morgan(
    ':method :url :status :response-time ms', {
        stream: {
            write: (message) => logger.info(message.trim()), // Ghi log sử dụng winston
        },
    }
)

export default requestLoggerMiddleware