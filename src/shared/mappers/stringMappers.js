function formatToMoney(input) {
  return `€ ${parseInt(input).toLocaleString().replace(',', '.')}, -`;
}

function formatToMillage(input) {
  return `${input} KM`;
}

module.exports = {
  formatToMoney,
  formatToMillage
};
