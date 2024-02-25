const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
            // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;

      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
});
