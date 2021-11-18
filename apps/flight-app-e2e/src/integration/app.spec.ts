describe('flight-app', () => {
  beforeEach(() => cy.visit('/flight-booking/flight-search'));

  it('should do a sanity check', () => {
    cy.visit('/');
  });

  it('should have UTF-8 as charset', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('should do an implicit subject assertion', () => {
    cy.get('.sidebar-wrapper ul.nav li:last a').should('contain.text', 'Basket');
  });

  it('should do an explicit subject assertion', () => {
    cy.get('.sidebar-wrapper ul.nav li:nth-child(2) a').should(($a) => {
      expect($a).to.contain.text('Flights');
      expect($a).to.have.attr('href', '/flight-booking/flight-search');
    });
  });

  it('should count the nav entries', () => {
    cy.get('.sidebar-wrapper ul.nav li').should('have.length', '5');
  });

  it('should display 11 flights on search', () => {
    cy.get('flight-search form button:first').contains('Search').click();

    cy.get('div.row > div').should('have.length', '11');
  });

  it('should remove flight from basket', () => {
    cy.get('flight-search form button:first').contains('Search').click();

    cy.get('div.row > div:first button:first').contains('Select').click();

    cy.get('flight-search div.card:last').contains('"3": true');
  });
});
