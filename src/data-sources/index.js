const fetchFromCSVWithCache = require('./fromCSV.js');

async function loadFiles(paths) {
  const filesToBeFetched = paths.map(path => fetchFromCSVWithCache(path));
  return Promise.all(filesToBeFetched);
}

module.exports = {
  loadFiles
};
