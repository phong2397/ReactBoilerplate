/* eslint-disable no-undef */
describe('Test home apge', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/login');
    cy.get(
      '*[class^="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]',
    ).click();
    cy.contains('HAI1').click();
    cy.get('#phone')
      .click()
      .type('0666 666 666');
    cy.contains('Gửi mã xác nhận').click();
    cy.get('[aria-label="Please enter verification code. Digit 1"]')
      .click()
      .type('000000');
    cy.contains('Đăng nhập').click();
  });
  it('Submit order - Success', () => {
    cy.wait(1000);
    cy.visit('/yeucau');
    cy.url().should('include', '/yeucau/thong-tin-co-ban');
    cy.contains('Tiếp tục').click();
    cy.wait(1000);
    cy.url().should('include', '/yeucau/tai-lieu');
    cy.contains('Tiếp tục').click();
    cy.wait(1000);
    cy.url().should('include', '/yeucau/chon-muc-ung');
    cy.wait(1000);
    cy.contains('Tiếp tục').click();
    cy.wait(1000);
    cy.url().should('include', '/yeucau/chi-tiet');

    cy.get('[type=checkbox]').click();
    cy.wait(1000);
    cy.contains('Tiếp tục').click();
    cy.get('[aria-label="Please enter verification code. Digit 1"]')
      .click()
      .type('000000');
    cy.get('.MuiButton-contained:nth-child(2) > .MuiButton-label').click();
    cy.url().should('include', '/yeucau/hoan-thanh');
  });
});
