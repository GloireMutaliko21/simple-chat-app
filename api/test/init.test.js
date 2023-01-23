import chai from "chai";
import chaiHttp from "chai-http";

import app from "../app.js";

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const baseUrl = '/talks/api/v1';
const usersBaseUrl = '/users';
const messagesBaseUrl = '/messages';

let token;

describe('USERS TEST', () => {
    //Test Login
    it('Should connect', (done) => {
        chai
            .request(app)
            .post(`${baseUrl}${usersBaseUrl}/login`)
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
            .get(`${baseUrl}${usersBaseUrl}/`)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe('MESSAGES', () => {
    //POST A MESSAGE
    it('Should send a message', (done) => {
        chai
            .request(app)
            .post(`${baseUrl}${messagesBaseUrl}/send/6372b1dc6818b9bd35d12749`)
            .auth(token, { type: 'bearer' })
            .send({ content: 'Salut Tests' })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                token = res.body.token;
                done();
            });
    });
});