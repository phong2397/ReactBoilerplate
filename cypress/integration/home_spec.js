/* eslint-disable no-undef */
describe('Test home apge', () => {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('/');
    cy.get(
      '*[class^="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]',
    ).click();
    cy.contains('SGF123').click();
    cy.get('#phone')
      .click()
      .type('0973 154 950');
    cy.contains('Gửi mã xác nhận').click();
    cy.get('[aria-label="Please enter verification code. Digit 1"]')
      .click()
      .type('000000');
    cy.contains('Đăng nhập').click();
    cy.wait(1000);
  });
  it('Visit home', () => {
    cy.visit('/');
    cy.url().should('include', '/yeucau/thong-tin-co-ban');
  });
  it('Visit "Giới thiệu"', () => {
    cy.visit('/yeucau/gioi-thieu');
    cy.url().should('include', '/yeucau/gioi-thieu');
  });
  it('Visit "Hướng dẫn"', () => {
    cy.visit('/yeucau/huong-dan');
    cy.url().should('include', '/yeucau/huong-dan');
  });
  it('Visit "Hỏi đáp"', () => {
    cy.visit('/yeucau/hoi-dap');
    cy.url().should('include', '/yeucau/hoi-dap');
  });
  it('Visit "Danh sách"', () => {
    cy.visit('/yeucau/danh-sach');
    cy.url().should('include', '/danh-sach');
  });
});
