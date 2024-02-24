
describe('The Shop tests spec', () => {
  beforeEach(() => {
    // Visit the URL before each test
    cy.visit('https://practice.automationtesting.in/shop/')
    cy.wait(1000) //wait for the URl to load

  });

  // test case one
  // Error with filter as the filter is not in order 
  it('Shop-Filter By Price Functionality', () => {
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

  
})