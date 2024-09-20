/// <reference types="cypress" />

const usernameInput = '#Username';
const passwordInput = '#Password';
const submitButton = 'button[type="submit"]';
const username = 'TestUser423';
const password = 'h!{n9p.vLQyO';
const dashboardPageTitle = 'nav a.navbar-brand';
const addEmployeeButton = 'button#add';
const updateEmployeeButton = 'button#updateEmployee';
const deleteButton = '.modal-footer #deleteEmployee';
const addEmployeeModalTitle = '.modal-content .modal-title';

const firstNameInput = 'input#firstName';
const lastnameInput = 'input#lastName';
const dependentsInput = '#dependants';
const addNewEmployeeButton = '.modal-content #addEmployee';
const superHeroFirstName1 = 'Tony';
const superHeroLastName1 = 'Stark';
const superHero1Depedents = '1';
const deductedAmount = '57.69';

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
  
    it('should add a new user with correct benefits', () => {
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
			.and('contain', deductedAmount)
			.and('be.visible');

		// Hard coded wait added for testing purposes and visibility to Interviewers
		cy.wait(3000);
    });

	it('should edit an existing user', () => {
		// Click 'Edit' icon on newly created user
		cy.get('table tbody tr')
			.last()
			.find('.fa-edit')
			.should('be.visible')
			.click();

		// Fill out First Name input
		cy.get(firstNameInput)
			.should('be.visible')
			.clear()
			.type(superHeroFirstName2);

		// Fill out Last Name input
		cy.get(lastnameInput)
			.should('be.visible')
			.clear()
			.type(superHeroLastName2);

		// Click Add Employee button
		cy.get(updateEmployeeButton)
			.should('be.visible')
			.click();

		// Validates Newly updated user is added to Dashboard
		cy.get('table tbody tr')
			.last()
			.should('contain', superHeroFirstName2)
			.and('contain', superHeroLastName2)

		// Hard coded wait added for testing purposes and visibility to Interviewers
		cy.wait(3000);
    });

	it('should delete a user', () => {
		// Click 'x' icon to delete a user
		cy.get('table tbody tr')
			.last()
			.find('.fa-times')
			.should('be.visible')
			.click();

		// Validate Delete Employee modal is dispayed
		cy.get('.modal-content')
			.last()
			.find('.modal-header')
			.should('contain', 'Delete Employee')
			.and('be.visible');

		// Click 'Delete' button
		cy.get(deleteButton)
			.should('be.visible')
			.click();

		// Validates User is deleted from Dashboard
		cy.get('table tbody tr')
			.last()
			.should('not.contain', superHeroFirstName2);

		// Hard coded wait added for testing purposes and visibility to Interviewers
		cy.wait(3000);
    
    });
  
  }); // describe block
  