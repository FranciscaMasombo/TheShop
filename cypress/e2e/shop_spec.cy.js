
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
    cy.wait(3000) //wait for the URl to load
    cy.xpath('//*[@id="woocommerce_price_filter-2"]/form/div/div[2]/div[1]/span[2]').invoke('text', '₹450'); // set price to 150 to450
    cy.wait(2000) // wait for the new price to load 
    cy.xpath('//*[@id="woocommerce_price_filter-2"]/form/div/div[2]/button').click(); // click filter to load results 

    // filter from high to low
    cy.xpath('//*[@id="content"]/form/select').select('price-desc');
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/span[2]/ins/span').invoke('text')
      .then((value) => {
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
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/img').click();
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="product-160"]/div[2]/h1').should('include.text', 'Selenium Ruby'); // the book name shoul match 
  })

  it('3.Shop-Default Sorting Functionality Popularity', () => {
    cy.xpath('//*[@id="content"]/form/select').select('popularity'); // Sort by popularity
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').should('include.text', 'Android Quick Start Guide'); // the book name should match 
  })

  it('4.Shop-Default Sorting Functionality Average Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('rating'); // Sort by rating
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').should('include.text', 'Selenium Ruby'); // the book name should match 
  })

  it('5.Shop-Default Sorting Functionality Newness Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('rating'); // Sort by newness
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').should('include.text', 'HTML5 WebApp Develpment'); // the book name should match 
  })

  it('6.Shop-Default Sorting Functionality Low to High Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('price-desc'); // Sort by low to high
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').should('include.text', 'JS Data Structures and Algorithm'); // the book name should match 
  })

  it('7.Shop-Default Sorting Functionality High to Low Ratings ', () => {
    cy.xpath('//*[@id="content"]/form/select').select('price-desc'); // Sort by high to low
    cy.wait(2000) //wait for the URl to load
    cy.xpath('//*[@id="content"]/ul/li[1]/a[1]/h3').should('include.text', 'Selenium Ruby'); // the book name should match 
  })

  it('8.Shop-Read More Functionality	', () => {
    // there is no Read more button on the Shop page 
  })

  it('8.Shop-Read More Functionality	', () => {
    // there is no Read more button on the Shop page 
  })


})