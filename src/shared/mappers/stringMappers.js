function formatToMoney(input) {
  return `€ ${parseInt(input).toLocaleString().replace(',', '.')}, -`;
}

function formatToMileage(input) {
  return `${input} KM`;
}

function formatShare(input) {
  return `${input}%`;
}

module.exports = {
  formatToMoney,
  formatToMileage,
  formatShare
};
