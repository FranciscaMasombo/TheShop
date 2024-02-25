
describe('The Shop tests spec', () => {
  beforeEach(() => {
    cy.visit('http://practice.automationtesting.in/') // Visit the URL before each test
    cy.viewport(1280, 768)  // resize screen 
    cy.wait(3000) //wait for the URl to load
    cy.contains('Shop').click(); // click on shop in menu 
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      // there is an error when resizing the screen due to the third party adds loading see screenshot when exception is removed 
      return false
    })
    cy.wait(5000) //wait for the URl to load
  });

  // Error with filter as the filter is not in order 
  it('1. Shop-Filter By Price Functionality', () => {
    cy.xpath('//*[@id="woocommerce_price_filter-2"]/form/div/div[2]/div[1]/span[2]').invoke('text', '₹450'); // set price to 150 to450
    cy.wait(2000) // wait for the new price to load 
    cy.xpath('//*[@id="woocommerce_price_filter-2"]/form/div/div[2]/button').click(); // click filter to load results 

    // filter from high to low
    cy.xpath('//*[@id="content"]/form/select').select('price-desc');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span[2]/ins/span').invoke('text').then((value) => {
      cy.log(`The Highest is: ${value}`); // Log the value 
    });

    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span[2]/ins/span').should('include.text', '450'); //the highest cost should be 450

    // filter from low to high
    cy.wait(1000)
    cy.xpath('//*[@id="content"]/form/select').select('price');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span/span').invoke('text')
      .then((value) => {
        cy.log(`The lowest is: ${value}`); // Log the value 
      });
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span/span').should('include.text', '150'); //the highest cost should be 450
  })

  it('2.Shop-Product Categories Functionality', () => {
    cy.xpath('//*[@id="content"]/form/select').select('price-desc'); // filter from high to low
    cy.wait(2000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); // click on the first book 
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="product-160"]/div[2]/h1').should('include.text', 'Selenium Ruby'); // the book name shoul match 
  })

  it('3.Shop-Default Sorting Functionality Popularity', () => {
    cy.xpath('//*[@id="content"]/form/select').select('popularity'); // Sort by popularity
    cy.wait(2000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); // click on the first book 
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="product-169"]/div[2]/h1').should('include.text', 'Android Quick Start Guide'); // the book name shoul match 

  })

  it('4.Shop-Default Sorting Functionality Average Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('rating'); // Sort by rating
    cy.wait(2000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); // click on the first book 
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="product-160"]/div[2]/h1').should('include.text', 'Selenium Ruby'); // the book name shoul match 

  })

  it('5.Shop-Default Sorting Functionality Newness Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('Sort by newness'); // Sort by newness
    cy.wait(3000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').click(); // click on the first book 
    cy.wait(3000) //wait for the URl to load
    cy.xpath('//*[@id="product-182"]/div[2]/h1').should('include.text', 'HTML5 WebApp Develpment'); // the book name should match 
  })

  it('6.Shop-Default Sorting Functionality Low to High Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('price'); // Sort by low to high
    cy.wait(3000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); // click on the first book 
    cy.wait(3000) //wait for the URl to load
    cy.xpath('//*[@id="product-180"]/div[2]/h1').should('include.text', 'JS Data Structures and Algorithm'); // the book name should match 
  })

  it('7.Shop-Default Sorting Functionality High to Low Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('price-desc'); // Sort by high to low
    cy.wait(2000) //wait for the URl to load
    cy.get('.products').should('be.visible');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); // click on the first book 
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="product-160"]/div[2]/h1').should('include.text', 'Selenium Ruby'); // the book name should match 
  })

  it('8.Shop-Read More Functionality	', () => {
    // there is no Read more button on the Shop page 
  })


  it('9.Shop-Sale Functionality', () => {
    cy.get('.products').should('be.visible'); // are the products showing
    cy.contains('.products .onsale', 'Sale').click(); // click on the product with "Sale" sticker 

    // look at the sale price with old price 
    cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/del/span').invoke('text').then((oldPrice) => {
      cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/ins/span').invoke('text').then((newPrice) => {
        cy.log(`Old Price: ${oldPrice}, New Price: ${newPrice}`); // log the prices 
        expect(parseFloat(oldPrice.replace('₹', ''))).to.be.greaterThan(parseFloat(newPrice.replace('₹', ''))); // old price should be high than the new 
      });
    });

  })

  it('10.Shop-Add to Basket-View Basket Functionality', () => {
    cy.get('.products').should('be.visible'); // Are the products showing
    cy.contains('Add to basket').first().click();  // Click on the "Add to Basket" button for a book
    cy.contains('Basket').click(); // view basket

    // Verify total and subtotal values
    cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[1]/td/span').invoke('text').then((subtotal) => {
      cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[3]/td/strong/span').invoke('text').then((total) => {
        cy.log(`subtotal: ${subtotal}, total: ${total}`); // log the prices    
        //total is less than subtotal
        expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));
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

      cy.get('#payment_method_bacs').check(); // Select the payment method Direct Bank Transfer
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
  // test could be split to two to test tax for India and another to test any other country
  it('11.Shop-Add to Basket-View Basket through Item link', () => {
    cy.get('.products').should('be.visible'); // are the products showing
    cy.contains('Add to basket').first().click(); // Click on the "Add to Basket" button for a book

    cy.get('.cartcontents').should('contain', '1 item');   // Verify that the book is added to the basket
    cy.contains('Basket').click(); // view basket

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
    cy.contains('Add to basket').first().click(); // Click on the "Add to Basket" button for a book

    cy.get('.cartcontents').should('contain', '1 item');   // Verify that the book is added to the basket
    cy.contains('Basket').click(); // view basket

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
          const expectedTax = (5 / 100) * subtotalAmount; // 5% of the Subtotal amount 
          cy.log(`Calulated Tax: ${expectedTax}`)
          cy.wait(1000);
          expect(taxAmount).to.equal(expectedTax); // the calculated tax should equal the tax inthe tax field 
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

  it('should verify product count for Android category', () => {
    cy.xpath('//*[@id="woocommerce_product_categories-2"]/ul/li[1]').click(); // Click on the Android category
    cy.wait(1500)
    // Verify the count of products for Android category
    cy.xpath('//*[@id="content"]/ul').should('have.length', 1);
  });

})