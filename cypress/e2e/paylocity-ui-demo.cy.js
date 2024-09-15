/// <reference types="cypress" />

const usernameInput = '#Username';
const passwordInput = '#Password';
const submitButton = 'button[type="submit"]';
const username = 'TestUser423';
const password = 'h!{n9p.vLQyO';
const dashboardPageTitle = 'nav a.navbar-brand';
const addEmployeeButton = 'button#add';
const addEmployeeModalTitle = '.modal-content .modal-title';

const firstNameInput = 'input#firstName';
const lastnameInput = 'input#lastName';
const dependentsInput = '#dependants';
const addNewEmployeeButton = '.modal-content #addEmployee';
const superHeroFirstName1 = 'Tony';
const superHeroLastName1 = 'Stark';
const superHero1Depedents = '10';

const superHeroFirstName2 = 'Peter';
const superHeroLastName2 = 'Parker';

describe('Paylocity Automation demo', () => {
    // Navigates to Demo url
    beforeEach(() => {
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
  
    it('should add a new user', () => {
		// Click Add Employee button
		cy.get(addEmployeeButton)
			.should('be.visible')
			.click();

		// Waits for Modal to be dislayed
		cy.get(addEmployeeModalTitle)
			.first()
			.should('have.text', 'Add Employee')
			.and('be.visible');

		// Fill out First Name input
		cy.get(firstNameInput)
			.should('be.visible')
			.type(superHeroFirstName1);

		// Fill out Last Name input
		cy.get(lastnameInput)
			.should('be.visible')
			.type(superHeroLastName1);

		// Fill out dependents input
		cy.get(dependentsInput)
			.should('be.visible')
			.type(superHero1Depedents);
		
		// Click Add button
		cy.get(addNewEmployeeButton)
			.should('be.visible')
			.click();

		// Validates Newly created user is added to Dashboard
		cy.get('table tbody tr')
			.last()
			.should('contain', superHeroFirstName1)
			.and('contain', superHeroLastName1)
			.and('be.visible');

		// Hard coded wait added for testing purposes and visibility to Interviewers
		cy.wait(5000);
    });

	it('should cancel adding a new user', () => {
		// Click Add Employee button
		cy.get(addEmployeeButton)
			.should('be.visible')
			.click();

		// Waits for Modal to be dislayed
		cy.get(addEmployeeModalTitle)
			.first()
			.should('have.text', 'Add Employee')
			.and('be.visible');

		// Fill out First Name input
		cy.get(firstNameInput)
			.should('be.visible')
			.type(superHeroFirstName2);

		// Fill out Last Name input
		cy.get(lastnameInput)
			.should('be.visible')
			.type(superHeroLastName2);

		// Fill out dependents input
		cy.get(dependentsInput)
			.should('be.visible')
			.type(superHero1Depedents);
		
		// Click Cancel button
		cy.contains('button', 'Cancel')
			.first()
			.should('be.visible')
			.click();

		// Validates user is NOT created in Dashboard page.
		cy.get('table tbody tr')
			.last()
			.should('not.contain', superHeroFirstName2)
			.and('not.contain', superHeroLastName2)
			.and('be.visible');

		// Hard coded wait added for testing purposes and visibility to Interviewers
		cy.wait(5000);
    
    });
  
  }); // describe block
  