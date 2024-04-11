import {APIserve,serviceMaps} from '../apiMap';
const testurl = APIserve+serviceMaps.user;

describe('Test for user API routes', () => { 
    const username = "shivamjain"
    it("Get user profile",()=>{
        cy.request(
            testurl+`/${username}`,
        )
        .its("body")
        .then((user)=>{
            expect(user.username).to.have.length.greaterThan(4)
        })
    });

    it("should be able to edit  user info",()=>{
        cy.request({
            method : 'PUT',
            url:testurl+`/${username}`+"/edit",
            body:{
               username : "nicos",
               bio : " a new bio"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(false);
        })
    });


    it("should be able to delete user",()=>{
        cy.request({
            method : 'DELETE',
            url:testurl+`/${username}`,
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(false);
        })
    });

 })