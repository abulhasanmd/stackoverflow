/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const should = chai.should();

before(done => {
  setTimeout(() => {
    done();

  }, 10000);
});

chai.use(chaiHttp);

describe('/ADMIN GET-TAGS', () => {
  it('It should fetch all the tags', (done) => {
    chai.request(app)
      .get('/admin/get-tags')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/ADMIN GET-PENDING-QUESTIONS', () => {
  it('It should fetch all the pending questions', (done) => {
    chai.request(app)
      .get('/admin/get-pending-questions')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/ADMIN GET-ANALYTICS', () => {
  it('It should fetch the admin analytics', (done) => {
    chai.request(app)
      .get('/admin/get-analytics')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER GET-ALL-QUESTIONS', () => {
  it('It should fetch all the questions', (done) => {
    chai.request(app)
      .get('/questions/get-allquestion')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER GET-SPECIFIC-QUESTION', () => {
  it('It should fetch a specific question detail', (done) => {
    chai.request(app)
      .get('/questions/get-questionbyid/627de55f33ccb6af3a111724')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER FETCH ALL POSTS', () => {
  it('It should fetch all the Posts of the User', (done) => {
    chai.request(app)
      .get('/users/627d97d015a42baf06a52112/posts')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER FETCH USER PROFILE', () => {
  it('It should fetch the user profile of the user', (done) => {
    chai.request(app)
      .get('/users/profile/627d97d015a42baf06a52112')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER GET REPUTATION ACTIVITY OF THE USER', () => {
  it('It should fetch the reputation activity of the user', (done) => {
    chai.request(app)
      .get('/users/get-reputation-activity/627d97d015a42baf06a52112')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('/USER GET BOOKMARKS OF THE USER', () => {
  it('It should fetch the bookmarks of the user', (done) => {
    chai.request(app)
      .get('/users/get-bookmarks/627d97d015a42baf06a52112')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});
// //get-tags-used-in-questions/

describe('/USER GET TAGS USED BY USER IN QUESTIONS', () => {
  it('It should fetch all the tags used by the user in all the questions', (done) => {
    chai.request(app)
      .get('/users/get-tags-used-in-questions/627d97d015a42baf06a52112')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
});

