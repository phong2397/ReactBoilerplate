/* eslint-disable no-undef */
describe('Login Page', () => {
  it('Login test - Success', () => {
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
  });
  it('Login test - Wrong OTP', () => {
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
      .type('000001');
    cy.contains('Đăng nhập').click();
    cy.contains('Mã OTP không chính xác. Bạn vui lòng nhập lại');
  });
  it('Login test - Wrong phone numbers', () => {
    cy.visit('/');
    cy.get(
      '*[class^="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]',
    ).click();
    cy.contains('SGF123').click();
    cy.get('#phone')
      .click()
      .type('0973 154 951');
    cy.contains('Gửi mã xác nhận').click();
    cy.contains('Số điện thoại không hợp lệ');
  });
  it('Login test - Wrong company Id', () => {
    cy.visit('/');
    cy.get(
      '*[class^="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]',
    ).click();
    cy.contains('VTL012').click();
    cy.get('#phone')
      .click()
      .type('0973 154 950');
    cy.contains('Gửi mã xác nhận').click();
    cy.contains('Mã công ty không hợp lệ');
  });
  it('Login test - Empty check', () => {
    cy.visit('/');
    // cy.get(
    //   '*[class^="MuiInputBase-input MuiOutlinedInput-input MuiAutocomplete-input MuiAutocomplete-inputFocused MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"]',
    // ).click();
    //   cy.contains('VTL012').click();
    // cy.get('#phone')
    //   .click()
    //   .type('');
    cy.contains('Gửi mã xác nhận').click();
    cy.contains('Không được để trống');
    cy.contains('Số điện thoại gồm 10 chữ số');
  });
});
