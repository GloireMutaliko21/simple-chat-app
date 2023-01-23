import chai from "chai";
import chaiHttp from "chai-http";

import app from "../app.js";

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

describe('LUNCH TEST', () => {
    //Test API
    it('Should connect', (done) => {
        chai
            .request(app)
            .post('/talks/api/v1/users/login')
            .send({ email: 'val@golla.com', password: 'val' })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

});