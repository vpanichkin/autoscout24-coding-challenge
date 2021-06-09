const commonConfig = {
  port: 3000,
  logPath: `./logs`,
  menu: [
    { title: 'Average Listing Selling Price per Seller Type', href: '/reports/average' },
    { title: 'Distribution (in percent) of available cars by Make', href: '/reports/distribution' },
    { title: 'Average price of the 30% most contacted listings', href: '/reports/average-30' },
    { title: 'The Top 5 most contacted listings per Month', href: '/reports/top' },
  ],
  filePaths: {
    contacts: './src/model/contacts.csv',
    listings: './src/model/listings.csv'
  }
};

const prodConfig = {
  port: process.env.PORT || 3000,
  users: {
    'manager': 'password'
  },
};

const devConfig = {
  users: {
    'admin': 'devPassword'
  },
};

function getConfigFor(environment) {
  switch (environment) {
    case 'development':
      return { ...commonConfig, ...devConfig };
    default:
      return { ...commonConfig, ...prodConfig };
  }
}

module.exports = getConfigFor;
