import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { getDB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import logger from '~/config/logger'

// Define Collection (Name and Schema)

const Board_Collection_Name = 'boards'

const Board_Collection_Schema = Joi.object({
  title: Joi.string().min(3).max(50).required().trim().strict(),

  slug: Joi.string().min(3).trim().strict(),

  description: Joi.string().min(3).max(50).required().strict(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),

  updatedAt: Joi.date().timestamp('javascript').default(null),

  _destroy: Joi.boolean().default(false),
})
const validateBeforeCreate = async (data) => {
  return await Board_Collection_Schema.validateAsync(data, {
    abortEarly: false,
  })
}

const createNew = async (data) => {
  try {
    const value = await validateBeforeCreate(data)

    const createBoard = await getDB()
      .collection(Board_Collection_Name)
      .insertOne(value)

    return createBoard
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(Board_Collection_Name)
      .findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) {
    logger.error(error.details)
    throw new Error(`Error in findOneById: ${error.message}`)
  }
}

export const boardModel = {
  Board_Collection_Name,
  Board_Collection_Schema,
  createNew,
  findOneById,
}
