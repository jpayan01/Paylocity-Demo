/// <reference types="cypress" />

const usernameInput = '#Username';
const passwordInput = '#Password';
const username = 'TestUser423';
const password = 'h!{n9p.vLQyO';
const submitButton = 'button[type="submit"]';
const dashboardPageTitle = 'nav a.navbar-brand';

const authToken = 'VGVzdFVzZXI0NDI6MFMlRldsJFo0b2wh'; // Basic auth token
const addEmployeeUrl = 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees';

const newEmployeeFirstName = 'Bruce';
const newEmployeeLastName = 'Wayne';
const newEmployee1Dependents = 1;

const updatedEmployeeFirstName = 'James';
const updatedEmployeeLastName = 'Gordon';
const updatedEmployeeDependents = 2;

let employeeResponseId;

describe('Paylocity API demo', () => {
    // Navigates to Demo url
    beforeEach(() => {
        // Navigates to Home Page just to visualize test
    	cy.visit('/');
        // Fill out Username
		cy.get(usernameInput)
        .should('be.visible')
        .type(username);

        // Fill out password
        cy.get(passwordInput)
            .should('be.visible')
            .type(password);

        // Click Submit button
        cy.get(submitButton)
            .should('be.enabled')
            .click();

        // Validates use is logged in to Dashboard page.
        cy.get(dashboardPageTitle)
            .should('have.text', 'Paylocity Benefits Dashboard')
            .and('be.visible');
    });

    it('POST reqeust to create a new employee', () => {
        
        cy.request({
            method: 'POST',
            url: addEmployeeUrl,
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: {
                "firstName": newEmployeeFirstName,
                "lastName": newEmployeeLastName,
                "dependants": newEmployee1Dependents
            }
        }).then((response) => {
            // Asserts status code is 200
            expect(response.status).to.eq(200);

            // validates response returns the new employee
            expect(response.body).to.have.property('id');
            employeeResponseId = response.body.id;
            expect(response.body.firstName).to.eq(newEmployeeFirstName);
            expect(response.body.lastName).to.eq(newEmployeeLastName);
            expect(response.body.dependants).to.eq(newEmployee1Dependents);

            cy.log(`The new employee id is: ${employeeResponseId}`);
            cy.log(`The new employee first name and last are: ${response.body.firstName}, ${response.body.lastName}`);
        });
    });    
    
    it('GET request for newly created employee', () => {
        
        cy.request({
            method: 'GET',
            url: `${addEmployeeUrl}/${employeeResponseId}`,
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // Asserts status code is 200
            expect(response.status).to.eq(200);

            // validates response returns the new employee
            expect(response.body.id).to.eq(employeeResponseId);
            expect(response.body.firstName).to.eq(newEmployeeFirstName);
            expect(response.body.lastName).to.eq(newEmployeeLastName);
            expect(response.body.dependants).to.eq(newEmployee1Dependents);

            cy.log(`The new employee id is: ${response.body.id}`);
            cy.log(`The new employee first and last name are: ${response.body.firstName}, ${response.body.lastName}`);
        });
    });
    
    it('PUT request to update an existing employee', () => {
        
        cy.request({
            method: 'PUT',
            url: `${addEmployeeUrl}`,
            headers: {
                'Authorization': `Basic ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: {
                "id": employeeResponseId,
                "firstName": updatedEmployeeFirstName,
                "lastName": updatedEmployeeLastName,
                "dependants": updatedEmployeeDependents,
            }
        }).then((response) => {
            // Asserts status code is 200
            expect(response.status).to.eq(200);

            // validates response returns the new employee
            employeeResponseId = response.body.id;
            expect(response.body.firstName).to.eq(updatedEmployeeFirstName);
            expect(response.body.lastName).to.eq(updatedEmployeeLastName);
            expect(response.body.dependants).to.eq(updatedEmployeeDependents);

            cy.log(`The new employee id is: ${response.body.id}`);
            cy.log(`The updated employee: ${response.body.firstName}, ${response.body.lastName}`);
        });
    });

    it('DELETE request for existing employee', () => {
        
        cy.request({
            method: 'DELETE',
            url: `${addEmployeeUrl}/${employeeResponseId}`,
            headers: {
                'Authorization': `Basic ${authToken}`,
            },
        }).then((response) => {
            // Asserts status code is 200
            expect(response.status).to.eq(200);
        });

        // For testing purposes
        cy.wait(3000);
    }); 
});
    