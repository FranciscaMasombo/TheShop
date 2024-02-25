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

    it('9.Shop-Sale Functionality', () => {
        cy.get('.products').should('be.visible'); // are the products showing
        // click on the product with "Sale" sticker 
        cy.contains('.products .onsale', 'Sale').click();
        // look at the sale price with old price 
        cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/del/span').invoke('text').then((oldPrice) => {
            cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/ins/span').invoke('text').then((newPrice) => {
                cy.log(`Old Price: ${oldPrice}, New Price: ${newPrice}`); // log the prices 
                expect(parseFloat(oldPrice.replace('₹', ''))).to.be.greaterThan(parseFloat(newPrice.replace('₹', ''))); // old price should be high than the new 
            });
        });
    })

    it('10.Shop-Add to Basket-View Basket Functionality', () => {
        cy.get('.products').should('be.visible'); // are the products showing
        cy.contains('Add to basket').first().click(); //add the first book to basket 
        cy.contains('Basket').click(); // view basket

        // Verify total and subtotal values
        cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[1]/td/span').invoke('text').then((subtotal) => {
            cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[3]/td/strong/span').invoke('text').then((total) => {
                cy.log(`subtotal: ${subtotal}, total: ${total}`); // log the prices    
                expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));   //total is less than subtotal
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

            cy.get('#payment_method_bacs').check(); //select the payment method Direct Bank Transfer
            cy.wait(1500);
            cy.contains('Place order').click();

            // confirmed the order was made   
            cy.contains('Thank you. Your order has been received.').should('be.visible');
            cy.wait(1000);
            cy.xpath('//*[@id="page-35"]/div/div[1]/h2[1]').should('be.visible'); //Bank details should be visable 
            cy.xpath('//*[@id="page-35"]/div/div[1]/h2[2]').should('be.visible'); //Order details should be visable 
            cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('be.visible');
            cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('include.text', 'Direct Bank Transfer');

        });

    })

    it('11.Shop-Add to Basket-View Basket through Item link', () => {
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

        cy.get('#payment_method_bacs').check(); //select the payment method Direct Bank Transfer
        cy.wait(1500);
        cy.contains('Place order').click();

        // confirmed the order was made   
        cy.contains('Thank you. Your order has been received.').should('be.visible');
        cy.wait(1000);
        cy.xpath('//*[@id="page-35"]/div/div[1]/h2[1]').should('be.visible'); //Bank details should be visable 
        cy.xpath('//*[@id="page-35"]/div/div[1]/h2[2]').should('be.visible'); //Order details should be visable 
        cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('be.visible');
        cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('include.text', 'Direct Bank Transfer');


    })
    it('12. Shop-Add to Basket-View Basket-Tax Functionality', () => {
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

        // then you need to check the tax rate adds is correct for Ieland It sshould be 5%
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

    })


})