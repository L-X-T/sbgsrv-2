describe('flight-app sidebar', () => {
  beforeEach(() => cy.visit('/'));

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
});
