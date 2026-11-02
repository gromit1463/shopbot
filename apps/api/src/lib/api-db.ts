/* MongoDB/Mongoose */

import mongoose, { Schema } from 'mongoose'
import type { SchemaOptions, SchemaDefinition, HydratedDocument } from 'mongoose'

if (!process.env.MONGODB_URI) {
	throw new TypeError('Environment variable MONGODB_URI is not set')
}

export const dbReady = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
	console.error('MongoDB connection failed:', err)
	process.exit(1)
})

export { mongoose }

export function createSchema(definition: SchemaDefinition, options?: SchemaOptions) {
	return new Schema(definition, options)
}

export function createModel(name: string, schema: Schema<any>) {
	return (mongoose.models[name] as mongoose.Model<any>) || mongoose.model(name, schema)
}

const counterSchema = new Schema<{ _id: string; seq: number }>({
	_id: { type: String, required: true },
	seq: { type: Number, default: 0 },
})

const Counter =
	(mongoose.models.Counter as mongoose.Model<{ _id: string; seq: number }>) ||
	mongoose.model('Counter', counterSchema)

export async function getNextId(collection: string) {
	const counter = await Counter.findOneAndUpdate(
		{ _id: collection },
		{ $inc: { seq: 1 } },
		{
			new: true,
			upsert: true,
		}
	)

	if (!counter) throw new Error(`Failed to generate id for ${collection}`)

	return counter.seq
}

export const autoIncrement = (collection: string, schema: Schema<any>) => {
	schema.pre('save', async function (this: HydratedDocument<any>) {
		if (this.isNew && this.get('id') == null) {
			this.set('id', await getNextId(collection))
		}
	})
}
