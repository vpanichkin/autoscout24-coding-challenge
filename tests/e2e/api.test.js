const request = require('supertest');
const app = require('../../src/app.js');
const { users } = require('../../src/config.js')(process.env.NODE_ENV);

describe('API', () => {

  const [userName, password] = Object.entries(users)[0];
  const authorizationHeader = Buffer.from(`${userName}:${password}`).toString('base64');

  describe('#indexRouter', () => {
    test('index page is restricted', async () => {
      const pageRequest = await request(app).get('/');

      expect(pageRequest.status).toBe(401);
      expect(pageRequest.text).toBe('Unauthorized');
    });

    test('index can be return with authorization header', async () => {
      const pageRequest = await request(app)
        .get('/')
        .set('Authorization', `Basic ${authorizationHeader}`);
      expect(pageRequest.res.text).toContain('Average Listing Selling Price per Seller Type');
    });
  });

  describe('#reportRouter', () => {
    const reportRouterUrls = [
      ['/reports/average'],
      ['/reports/distribution'],
      ['/reports/average-30'],
      ['/reports/top']
    ];

    test.each([reportRouterUrls])('%s page is restricted', async (url) => {
      const pageRequest = await request(app).get(url);

      expect(pageRequest.status).toBe(401);
      expect(pageRequest.text).toBe('Unauthorized');
    });

    test.each([reportRouterUrls])('%s page is available after auth', async (url) => {
      const pageRequest = await request(app).get(url).set('Authorization', `Basic ${authorizationHeader}`);

      expect(pageRequest.text).toContain('<div class="content-wrapper"><main class="report">');
      expect(pageRequest.status).toBe(200);
    });
  });
});
