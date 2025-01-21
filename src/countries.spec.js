describe("Country App Tests", () => {
    // Test for the Presence of the Search Input Field
    it("UI Elements - should have an input field for searching", () => {
      cy.visit("/");
      cy.get('input[type="text"]').should("exist");
    });
  
    // Test API Call for Success
    it("API Calls - should call API and handle success", () => {
      cy.intercept("GET", "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries", {
        statusCode: 200,
        body: [{ name: 'Canada', flag: 'url' }, { name: 'India', flag: 'url' }]
      }).as("getCountries");
      cy.visit("/");
      cy.wait("@getCountries").its("response.statusCode").should("eq", 200);
    });
  
    // Test for error handling
    it("API Error Handling - logs an error to the console on API failure", () => {
      cy.on("window:before:load", (win) => {
        cy.spy(win.console, "log").as("consoleLog");
        cy.spy(win.console, "error").as("consoleError");
      });
  
      cy.intercept("GET", "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries", {
        forceNetworkError: true,
      }).as("getFailedCountries");
  
      cy.visit("/");
      cy.wait("@getFailedCountries");
      cy.wait(500);
  
      cy.get("@consoleLog").then((consoleLog) => {
        cy.get("@consoleError").then((consoleError) => {
          expect(consoleLog.called || consoleError.called).to.be.true;
        });
      });
    });
  
    // Test for the Presence of Country Containers
    it("Display of Country Containers - should have containers with country flag and name", () => {
      cy.visit("/");
      cy.wait(500); // Adjust based on response time
      cy.get('.countryCard').each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find("h2").should("exist");
      });
    });
  
    // Test Search Functionality and Clearing Search
    it("Search Functionality - should filter countries based on search and show results accordingly", () => {
      cy.visit("/");
      const searchTerm = "Canada";
      cy.get('input[type="text"]').type(searchTerm);
      cy.get('.countryCard').should("contain", searchTerm);
  
      cy.get('input[type="text"]').clear();
      cy.get('.countryCard').should("have.length.at.least", 1);
    });
  
    // Test for No Results on Search
    it("Search Functionality - should show no results when no matching countries are found", () => {
      cy.visit("/");
      cy.get('input[type="text"]').type("xyz123");
      cy.get('.countryCard').should("have.length", 0);
    });
  
    // Test for Specific Search Result
    it('Search Functionality - should show 2 containers when searching for "ind"', () => {
      cy.visit("/");
      cy.get('input[type="text"]').type("ind");
      cy.get('.countryCard').should("have.length", 2);
    });
  });
  