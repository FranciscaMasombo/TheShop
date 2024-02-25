
describe('The Shop tests spec', () => {
  beforeEach(() => {
    // Visit the URL before each test
    cy.visit('http://practice.automationtesting.in/shop')
    cy.wait(3000) //wait for the URl to load
    // cy.viewport(1024, 768)
    // cy.wait(3000) //wait for the URl to load
    // cy.xpath('/html/body/div[1]/div[1]/header/div[2]/nav/ul/li[1]').click();
    // error with when reszing a loading page will provide screen shots 
  });

  // test case one
  // Error with filter as the filter is not in order 
  it('1.Shop-Filter By Price Functionality', () => {
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
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span[1]').should('exist'); // the sales sticker should show
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click(); //click on the product 
    // look at the sale price with old price 
    cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/del/span').invoke('text').then((oldPrice) => {
      cy.xpath('//*[@id="product-169"]/div[2]/div[1]/p/ins/span').invoke('text').then((newPrice) => {
        cy.log(`Old Price: ${oldPrice}, New Price: ${newPrice}`); // log the prices 
        expect(parseFloat(oldPrice.replace('₹', ''))).to.be.greaterThan(parseFloat(newPrice.replace('₹', ''))); // old price should be high than the new 
      });
    });
  })

  it('10.Shop-Add to Basket-View Basket Functionality', () => {

    cy.get('.products').should('be.visible');
    cy.xpath('/html/body/div[1]/div[2]/div/div/ul/li[1]/a[2]').click(); //add the first book to basket 
    cy.wait(1500);
    cy.xpath('//*[@id="wpmenucartli"]/a').click(); // view basket
    // Verify total and subtotal values
    cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[1]/td/span').invoke('text').then((subtotal) => {
      cy.xpath('//*[@id="page-34"]/div/div[1]/div/div/table/tbody/tr[3]/td/strong/span').invoke('text').then((total) => {
        cy.log(`subtotal: ${subtotal}, total: ${total}`); // log the prices    
        expect(parseFloat(subtotal.replace('₹', ''))).to.be.lessThan(parseFloat(total.replace('₹', '')));      //total is less than subtotal
      });
      cy.wait(1500);
      cy.contains('Proceed to Checkout').click();
      // fill in billing details form 
      cy.get('#billing_first_name').type('Sarah');
      cy.get('#billing_last_name').type('Smith');
      cy.get('#billing_email').type('sarah.smith@doctor.com');
      cy.get('#billing_phone').type('0892348797');
      cy.get('#select2-chosen-1').type('Republic of Ireland');
      cy.xpath('//*[@id="select2-result-label-433"]').click();
      cy.get('#billing_address_1').type('Waterford');
      cy.get('#billing_city').type('Waterford');
      cy.get('#billing_state').type('Waterford');

      cy.get('#payment_method_bacs').check(); //select the payment method Direct Bank Transfer
      cy.wait(1500);
      cy.contains('Place order').click();

      // confirmed the order was made   
      cy.contains('Thank you. Your order has been received.').should('be.visible');
      cy.wait(1500);
      cy.xpath('//*[@id="page-35"]/div/div[1]/h2[1]').should('be.visible'); //Bank details should be visable 
      cy.xpath('//*[@id="page-35"]/div/div[1]/h2[2]').should('be.visible'); //Order details should be visable 
      cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('be.visible');
      cy.xpath('//*[@id="page-35"]/div/div[1]/table/tfoot/tr[3]/td').should('include.text', 'Direct Bank Transfer');

    });

  })

})