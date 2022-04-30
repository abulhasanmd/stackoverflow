/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const { generateToken } = require('../src/utils/jwtUtil');

const should = chai.should();

chai.use(chaiHttp);
describe('/POST LOGIN', () => {
  it('it should throw error on login', (done) => {
    chai.request(app)
      .post('/users/login')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST LOGIN', () => {
  it('it should return token on login', (done) => {
    const user = {
      email: 'shahrukh@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('/POST REGISTER', () => {
  it('it should return error on register', (done) => {
    const user = {
      email: 'shahrukh@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post('/users/register')
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('/POST REGISTER', () => {
  it('it should return token on login', (done) => {
    const user = {
      email: `shahrukh@gmail.com${(Math.random() * 1000)}`,
      password: 'password',
      fullname: 'ShahRukh Khan',
    };
    chai.request(app)
      .post('/users/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('/GET SUPPORTING DATA FOR PROFILE', () => {
  it('it should return countries and s3 url on GET request', (done) => {
    chai.request(app)
      .get('/users/get')
      .set('AuthorizatiOn', generateToken(68))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('countries');
        done();
      });
  });
});

describe('/GET ALL FAVOURITES FOR A USER', () => {
  it('it should return all favourites of the user', (done) => {
    chai.request(app)
      .get('/favourites/get-all')
      .set('AuthorizatiOn', generateToken(68))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('/GET Check if an Item is favourite for an user', () => {
  it('it should return ERROR as item is not favourite for the user', (done) => {
    chai.request(app)
      .get('/favourites/check-favourite?item_id=11111')
      .set('Authorization', generateToken(68))
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
