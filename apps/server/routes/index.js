var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.type('html').send('hello world')
});

module.exports = router;
