// ladda in dependencies
const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest')(app);

// testet börjar här
describe('index route', () => {
  describe('GET /', () => {
    // vad förväntar vi oss ska ske, it should return...
    it('should return OK status', () => {
      // utför requesten, kontrollera att den svarar 200 och avsluta sedan testet
      request.get('/')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
        });
    });
  });
});