it("cypress demo", () => {
  cy.visit("https://example.cypress.io/");
  cy
    .get('a[href="/commands/actions"]')
    .contains("type")
    .should("contain", "type")
    .click();

  cy
    .get("#couponCode1")
    .type("greaCouponCode")
    .should("have.value", "greaCouponCode");

  cy
    .get("button")
    .contains("Submit")
    .click();
});
