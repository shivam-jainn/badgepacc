import {APIserve,serviceMaps} from '../apiMap';
const testurl = APIserve+serviceMaps.token;

describe('Test for token API routes', () => { 
    it("create a token",()=>{
        cy.request({
            method : 'POST',
            url:testurl+"/create",
            body:{
                "user" : "u001",
                "badge" : "b001"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
        })
    });

    it("create a collectible token",()=>{
        cy.request({
            method : 'POST',
            url:testurl+"/create/collectible",
            body:{
                "badge" : "b001",
                "medium" : "github",
                "username" : "shivam-jainn"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
            expect(response.body.collect_url).to.be.string;
        })
    });
    
 })