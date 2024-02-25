describe('The Shop tests spec', () => {
    beforeEach(() => {
        // Visit the URL before each test
        cy.visit('http://practice.automationtesting.in/')
        cy.viewport(1280, 768) // resize screen 
        cy.wait(3000) //wait for the URl to load
        cy.contains('Shop').click(); // click on shop in menu 
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            // there is an error when resizing the screen due to the third party adds loading see screenshot when exception is removed 
            return false
        })
        cy.wait(5000) //wait for the URl to load
    });

    it('12.A Shop-Add to Basket-View Basket-Tax Functionality for Ireland it should be 5%', () => {
        cy.get('.products').should('be.visible'); // are the products showing
        // Click on the "Add to Basket" button for a book
        cy.contains('Add to basket').first().click();

        // Verify that the book is added to the basket
        cy.get('.cartcontents').should('contain', '1 item');

        // Click on the "Basket" link
        cy.contains('Basket').click();

        // Verify total and subtotal values
        cy.get('.cart-subtotal .amount').invoke('text').then((subtotal) => {
            cy.get('.order-total .amount').invoke('text').then((total) => {
                cy.log(`subtotal: ${subtotal}, total: ${total}`); // log the prices    
                expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));
            });
        });
        cy.wait(1500);

        cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/div/a').click();// Click on proceed to checkout button
        cy.wait(500);
        // fill in billing details form 
        cy.get('#billing_first_name').type('Sarah');
        cy.get('#billing_last_name').type('Smith');
        cy.get('#billing_email').type('sarah.smith@doctor.com');
        cy.get('#billing_phone').type('0892348797');
        cy.get('#select2-chosen-1').type('Republic of Ireland');
        cy.xpath('//*[@id="select2-result-label-433"]').click();
        cy.wait(1000);
        cy.get('#billing_address_1').type('Waterford');
        cy.get('#billing_city').type('Waterford');
        cy.get('#billing_state').type('Waterford');

        // then you need to check the tax rate adds is correct for Ireland It sshould be 5%
        // Verify total and subtotal values
        cy.get('.cart-subtotal .amount').invoke('text').then((subtotal) => {
            cy.get('.order-total .amount').invoke('text').then((total) => {
                cy.get('.tax-rate  .amount').invoke('text').then((tax) => {
                    // log the prices diff   
                    cy.log(`subtotal: ${subtotal}, total: ${total}, tax: ${tax}`);
                    // the subtotal shound be less that the total 
                    // numeric value from the subtotal and total strings
                    expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));
                    // calculate the expected tax (5% of subtotal)
                    const taxAmount = parseFloat(tax.replace('₹', ''));
                    const subtotalAmount = parseFloat(subtotal.replace('₹', ''));
                    const expectedTax = (5 / 100) * subtotalAmount;
                    cy.log(`Calulated Tax: ${expectedTax}`)
                    cy.wait(1000);
                    expect(taxAmount).to.equal(expectedTax);
                    cy.log(`Calulated Tax: ${expectedTax}, Tax in field: ${taxAmount}`);

                });

            });
        });

        // then you need to check the tax rate adds is correct for India It sshould be 2%
        cy.get('#select2-chosen-1').type('India'); // select India
        cy.xpath('//*[@id="select2-result-label-891"]').click(); // dropdown select 
        cy.wait(1000);
    
        // then you need to check the tax rate adds is correct for India It sshould be 2%
        // Verify total and subtotal values
        cy.get('.cart-subtotal .amount').invoke('text').then((subtotal) => {
            cy.get('.order-total .amount').invoke('text').then((total) => {
                cy.get('.tax-rate  .amount').invoke('text').then((tax) => {
                    // log the prices diff   
                    cy.log(`subtotal: ${subtotal}, total: ${total}, tax: ${tax}`);
                    // the subtotal shound be less that the total 
                    // numeric value from the subtotal and total strings
                    expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));
                    // calculate the expected tax (2% of subtotal)
                    const taxAmount = parseFloat(tax.replace('₹', ''));
                    const subtotalAmount = parseFloat(subtotal.replace('₹', ''));
                    const expectedTax = (2 / 100) * subtotalAmount;
                    cy.log(`Calulated Tax: ${expectedTax}`)
                    cy.wait(1000);
                    expect(taxAmount).to.equal(expectedTax);
                    cy.log(`Calulated Tax: ${expectedTax}, Tax in field: ${taxAmount}`);

                });

            });
        });


    })


})