const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest')(app);

describe('/login', () => {

  describe('GET /', () => {
    it('should return OK status', () => {
      request.get('/login')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
        });
    });

    it('should return message on rendering', (done) => {
      request.get('/login')
        .end((err, res) => {
          if (err) throw err;
          expect(res.text).to.contain('Please sign in')
          return done();
        });
    });
  });

  describe('POST /', () => {
    it('should sign in user provided it has a correct request body', (done) => {
      request.post('/login')
        .type('form')
        .send({
          username: process.env.TEST_USER,
          password: process.env.TEST_PASSWORD
        })
        .expect(302)
        .expect('Location', '/home')
        .end((err, res) => {
          if (err) throw err;
          return done();
        });
    });

    it('should fail to sign in user with a invalid request body', (done) => {
      request.post('/login')
        .type('form')
        .send({username: '', password: ''})
        .expect(401)
        .end((err, res) => {
          if (err) throw err;
          expect(res.text).to.contain('Username or password is invalid');
          return done();
        });
    });
  });
});