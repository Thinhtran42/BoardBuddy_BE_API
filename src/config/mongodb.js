import { MongoClient } from 'mongodb'
import logger from './logger'
import { env } from './environment'

const url = env.MONGODB_URI
const dbName = env.DATABASE_NAME

let db
let client

const connectDB = async() => {
    client = new MongoClient(url, {})

    try {
        await client.connect()
        logger.info('MongoDB connected successfully.')
        db = client.db(dbName)
        logger.info(`Connected to database: ${dbName}`)
    } catch (error) {
        logger.error('MongoDB connection failed:', error.message)
        process.exit(1) // Dừng ứng dụng nếu không kết nối được
    }
}

const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.')
    }
    return db
}

const closeDB = async() => {
    if (client) {
        await client.close()
        logger.info('MongoDB connection closed.')
    }
}

process.on('SIGINT', async() => {
    await closeDB()
    process.exit(0)
})

export { connectDB, getDB }