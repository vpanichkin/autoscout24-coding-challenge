const router = require('express').Router();
const { menu } = require('../config.js')(process.env.NODE_ENV);

router.get('/', function (req, res) {
  res.render('index', { menu });
});

module.exports = router;
