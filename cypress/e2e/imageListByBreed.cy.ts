describe("Image List By Breed", () => {
  const route = "http://localhost:3000/";
  it("should find a dropdown element", () => {
    cy.visit(route).wait(1000);
    cy.get("#list_content_1")
      .should("have.text", "Images list by breed")
      .click()
      .wait(1000);
    cy.get('[data-testid="images_dropdown"]').should("be.visible");
  });

  it("should click on the dropdown element, retrieve a list of breed and select one breed to display the images", () => {
    cy.visit(route).wait(1000);
    cy.get("#list_content_1")
      .should("have.text", "Images list by breed")
      .click()
      .wait(1000);
    cy.get('[data-testid="images_dropdown"]')
      .should("be.visible")
      .click()
      .wait(500);
    cy.findByText(/african/i)
      .click()
      .wait(1000);
  });
});
