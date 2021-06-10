function withCache(fn) {
  let cache = new Map();
  return async (...arg) => {
    if (cache.has(...arg)) return cache.get(...arg);
    cache.set(...arg, await fn(...arg));
    return cache.get(...arg);
  };
}

function getAverage(entries) {
  let sum = 0;
  for (let i = 0; i < entries.length; i++) {
    sum += parseInt(entries[i]);
  }
  return (sum / entries.length).toFixed(2);
}

function getShare(subTotalByGroup, total) {
  return (subTotalByGroup / total * 100).toFixed(2);
}

module.exports = {
  withCache,
  getAverage,
  getShare
};
