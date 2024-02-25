# Project Setup:

## Install Dependencies:
```bash
npm install
npm init -y
npm install --save-dev cypress
``` 

### Run Cypress:
```bash
npx cypress open
```
- Select "E2E testing."
- Click "Continue."
- Make sure to select a browser to run the test in.
- Create a new spec and start coding.

### Cypress libriary :
```bash
Add the following to support/commands.js in order to use Cypress libriaries 
 /// <reference types="Cypress" /> 
```
### Configure for XPath:
Install Cypress XPath (element selector):
```bash
npm install -D cypress-xpath
```
Add the following to support/e2e.js:
```bash
require('cypress-xpath');
```
### Run Tests:
Add the following script to your package.json:
```bash
"scripts": {
  "cy:run": "cypress run"
}
```
Run tests for all specs or from a single spec file:
```bash
npx cypress run
```
### Usage with Mochawesome for Reporting:
Install Mochawesome:
```bash
npm install --save-dev mochawesome
```
Add the following to cypress.config.js:
```bash
module.exports = {
  // ... other configurations
  reporter: 'mochawesome',
};
```
To view the report, open the generated file in your browser by copying the path and pasting it in your browser:
```bash
.../SHOP/mochawesome-report/mochawesome.html
```
Or by opening with live server in vscode 

