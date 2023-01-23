import chai from "chai";
import chaiHttp from "chai-http";

import app from "../app.js";

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

let token;

describe('LUNCH TEST', () => {
    //Test Login
    it('Should connect', (done) => {
        chai
            .request(app)
            .post('/talks/api/v1/users/login')
            .send({ email: 'val@golla.com', password: 'val' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = res.body.token;
                done();
            });
    });

    //Test Get all users
    it('Get all users', (done) => {
        chai
            .request(app)
            .get('/talks/api/v1/users')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

});