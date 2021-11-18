describe('flight-app flight-search', () => {
  beforeEach(() => cy.visit('/flight-booking/flight-search'));

  it('should display 10 flights on search', () => {
    cy.get('flight-search form button:first').contains('Search').click();

    cy.get('div.row > div').should('have.length', '10');
  });

  it('should remove flight from basket', () => {
    cy.get('flight-search form button:first').contains('Search').click();

    cy.get('div.row > div:first button:first').contains('Select').click();

    cy.get('flight-search div.card:last').contains('"3": true');
  });
});
