const CSVToJSON = require('csvtojson');
const path = require('path');

const logger = require('../shared/logger.js');
const { withCache } = require('../shared/utils.js');

async function fetchFromCSV(filePath) {
  try {
    const normalizedPath = path.join(process.cwd(), filePath);
    return CSVToJSON().fromFile(normalizedPath);
  } catch (error) {
    logger.error(`The file cannot be found: ${normalizedPath}`);
    logger.error(error);
  }

}

module.exports = withCache(fetchFromCSV);
