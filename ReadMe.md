## Project Setup:
``` npm
npm install
npm -i init
npm install --save-dev cypress

# Then run npx cypress open 
Then select E2E testing after that select the Continue button make sure you select a browser to run the test in. Create new spec and start coding.

# Add /// <reference types="Cypress" /> to support/commands.js in order to use Cypress libriary 

# In order to use xpath install cypress xpath (element selecter)
npm install -D cypress-xpath
Add require('cypress-xpath') to support/e2e.js 

# To run tests for all specs or from a single spec file add the following to package.json
 "scripts": {
    "cy:run": "cypress run"
  }
Use npx cypress run to run tests 


```