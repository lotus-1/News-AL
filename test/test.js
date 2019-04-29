const test = require('tape');
const supertest = require('supertest');
const router = require('./router');

test('Tape is working', (t) => {
  t.equal(1, 1, 'Should return 1 when given 1');
  t.end();
});

test('check status code is 200', (t) => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text);
      t.end();
    });
});

test('check status code is 404', (t) => {
  supertest(router)
    .get('/elephants')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      t.error(err)
      t.equal(res.text, '<h1> 404 not found </h1>');
      t.end();
    });
});
