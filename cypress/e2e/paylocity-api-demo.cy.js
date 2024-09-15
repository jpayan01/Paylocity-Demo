/// <reference types="cypress" />

const newEmployeeFirstName = 'John1';
const newEmployeeLastName = 'Tester1';
const newEmployee1Dependents = 3;


describe('Paylocity API demo', () => {
    // Navigates to Demo url
    beforeEach(() => {
        // Navigates to Home Page
    	cy.visit('/');
    });

    it('POST reqeust to create a new employee', () => {
        const authToken = 'VGVzdFVzZXI0NDI6MFMlRldsJFo0b2wh'; // Basic auth token
        const apiUrl = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';

        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Authorization': `Basic ${authToken}`, // Basic Authentication header
                'Content-Type': 'application/json' // Content-Type header
            },
            body: {
                "firstName": newEmployeeFirstName,
                "lastName": newEmployeeLastName,
                "dependants": newEmployee1Dependents
            }
        }).then((response) => {
            // Assert that the status code is 201 for created
            expect(response.status).to.eq(200);

            // validates response returns the new employee
            expect(response.body).to.have.property('id'); 
            expect(response.body.firstName).to.eq(newEmployeeFirstName);
            expect(response.body.lastName).to.eq(newEmployeeLastName);
            expect(response.body.dependants).to.eq(newEmployee1Dependents);
        });
    });    
    
});
    