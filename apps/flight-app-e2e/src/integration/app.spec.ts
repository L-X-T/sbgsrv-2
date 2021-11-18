describe('flight-app app', () => {
  beforeEach(() => cy.visit('/'));

  it('should do a sanity check', () => {
    cy.visit('/');
  });

  it('should have UTF-8 as charset', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });
});
