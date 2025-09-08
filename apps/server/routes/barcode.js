var express = require('express');
var router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb')
const mongo = new MongoClient(process.env.MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	maxPoolSize: 50,
})

function padBarcode(barcode) {
	return barcode.padStart(20, '0')
}

router.get('/barcode', function (req, res, next) {
	!(async () => {
		try {
			const { search } = req.query

			if (search) {
				// first check MongoDB
				await mongo.connect()
				const shopbot = mongo.db('shopbot')
				const upc = shopbot.collection('upc')
				const query = { barcode: padBarcode(search) }

				const count = await upc.countDocuments(query)

				if (count > 0) {
					const result = await upc.find(query).toArray()
					res.json(result)
					return next()
				} else {
					// if it doesn't exist, call the UPC lookup service
					const response = await fetch(`${process.env.UPCDB_URL}/product/${search}`, {
						headers: {
							Authorization: `Bearer ${process.env.UPCDB_KEY}`,
						},
					})
					const json = await response.json()

					if (json?.success) {
						// write to Mongo
						json.barcode = padBarcode(json.barcode)
						await upc.insertOne(json)
						res.json(json)
						return next()
					} else {
						res.status(404)
						res.json({ success: false })
						return next()
					}
				}
			} else {
				console.error('Missing barcode parameter')
				res.status(400)
				res.json({ success: false, })
				return next()
			}
		} catch (err) {
			console.error(err)
			res.status(500)
			res.json({ success: false })
			return next()
		}
	})()
});

module.exports = router;
