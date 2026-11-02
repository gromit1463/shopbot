import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import { getUpcModel } from '../lib/schema/upc.schema.ts'
import { padBarcode } from '@shopbot/shared'
import type { UpcProduct } from '@shopbot/shared'
import * as middleware from './middleware.ts'

const UPCDB_URL = process.env.UPCDB_URL
const UPCDB_KEY = process.env.UPCDB_KEY

const Upc = getUpcModel()

interface UpcDoc {
	barcode: string
	success?: boolean
	[key: string]: unknown
}

const router = express.Router()

router.get(
	'/barcode',
	middleware.hasAuthToken,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { search } = req.query

			if (typeof search !== 'string' || !search) {
				console.error('Missing barcode parameter')
				return res.status(400).json({ success: false })
			}

			// first check MongoDB
			const query = { barcode: padBarcode(search) }

			const existing: UpcProduct | null = await Upc.findOne(query)

			if (existing) {
				return res.json(existing)
			}

			// if it doesn't exist, call the UPC lookup service
			const response = await fetch(
				`${UPCDB_URL}/product/${encodeURIComponent(search)}`,
				{
					headers: { Authorization: `Bearer ${UPCDB_KEY}` },
				}
			)
			const json = (await response.json()) as UpcDoc

			if (!json?.success) {
				return res.status(404).json({ success: false })
			}

			// write to Mongo
			json.barcode = padBarcode(json.barcode)
			await Upc.insertOne(json)
			return res.json(json)
		} catch (err) {
			console.error(err)
			return res.status(500).json({ success: false })
		}
	}
)

export default router
