# Project Setup:

### Install Dependencies:
```bash
npm install
npm init -y
npm install --save-dev cypress
``` 

### Run Cypress:
```bash
npx cypress open
```

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
# Use the following to run test in Shop folder in Terminal 
npx cypress run 

# Usage with mochawesome for reporting 
npm install --save-dev mochawesome
Add   reporter: 'mochawesome', to cypress.config.js
To view report open this file in your browser by copying the path and pastting browser../SHOP/mochawesome-report/mochawesome.html 


```