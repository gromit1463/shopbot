/* MongoDB/Mongoose */

import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)

export { mongoose }

export function createSchema(schema, options) {
	const { Schema } = mongoose
	return new Schema(schema, options)
}

export function createModel(name, schema) {
	return mongoose.model(name, schema)
}

const counterSchema = createSchema({
	_id: String,
	seq: {
		type: Number,
		default: 0,
	},
})
const Counter = createModel('Counter', counterSchema)

export async function getNextId(collection) {
	const counter = await Counter.findOneAndUpdate(
		{ _id: collection },
		{ $inc: { seq: 1 } },
		{
			new: true,
			upsert: true,
		}
	)

	return counter.seq
}

export const autoIncrement = (collection, schema) => {
	schema.pre('save', async function () {
		if (this.isNew && !this.id) {
			this.id = await getNextId(collection)
		}
	})
}
