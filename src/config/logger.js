import { createLogger, format, transports } from 'winston'

const logger = createLogger({
    level: 'info', // Cấp độ log mặc định
    format: format.combine(
        format.timestamp(), // Thêm timestamp
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}` // Định dạng log
        })
    ),
    transports: [
        new transports.Console(), // Ghi log ra console
    ],
})

export default logger