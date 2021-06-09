const calculateAverage = require('../services/reports/calculateAverage.js');
const calculateAverage30 = require('../services/reports/calculateAverage30.js');
const calculateDistribution = require('../services/reports/calculateDistribution.js');
const calculateTop = require('../services/reports/calculateTop.js');
const router = require('express').Router();
const { loadFiles } = require('../data-sources');
const { menu, filePaths } = require('../config.js')(process.env.NODE_ENV);

router.get('/average', async function (req, res) {
  const files = await loadFiles([filePaths.listings]);
  const report = calculateAverage(files);
  res.render('singleReport', { menu, report });
});

router.get('/distribution', async function (req, res) {
  const files = await loadFiles([filePaths.listings]);
  const report = calculateDistribution(files);
  res.render('singleReport', { menu, report });
});

router.get('/average-30', async function (req, res) {
  const files = await loadFiles([filePaths.listings, filePaths.contacts]);
  const report = calculateAverage30(files);
  res.render('singleReport', { menu, report });
});

router.get('/top', async function (req, res) {
  const files = await loadFiles([filePaths.listings, filePaths.contacts]);
  const reportsByMonth = calculateTop(files);
  res.render('reportsByMonth', { menu, reportsByMonth });
});

module.exports = router;
