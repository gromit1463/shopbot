import { createModel, createSchema } from '../api-db.ts'
import { Schema } from 'mongoose'

const storeSchema = new Schema({
	store: String,
	price: String,
	url: String,
})

export const getUpcModel = () =>
	createModel(
		'UPC',
		createSchema({
			success: Boolean,
			added_time: String,
			modified_time: String,
			barcode: { type: String, index: true },
			title: String,
			alia: String,
			description: String,
			brand: String,
			manufacturer: String,
			msrp: String,
			ASIN: String,
			category: String,
			categories: [String],
			stores: [storeSchema],
			timestamp: String,
			images: [String],
			metadata: { type: Map, of: String },
			metanutrution: { type: Map, of: String },
		})
	)
