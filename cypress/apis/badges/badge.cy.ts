import {APIserve,serviceMaps} from '../apiMap';
const testurl = APIserve+serviceMaps.badge;

describe('Test for badge API routes', () => { 
    it("create a badge",()=>{
        cy.request({
            method : 'POST',
            url:testurl+"/create",
            body:{
                "name":"A test badge",
                "pic" : "https://images.pexels.com/photos/20610427/pexels-photo-20610427/free-photo-of-disney.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
                "description" : "A vivid club",
                "creator" : "user010"  
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(true);
        })
    });

    it("should be able to edit  badge info",()=>{
        cy.request({
            method : 'PUT',
            url:testurl+"/edit",
            body:{
               badge_id : "b001",
               name : "A new name"
            }
        })
        .then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.body.success).to.equal(false);
        })
    });


 })