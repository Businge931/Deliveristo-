describe('Radom Image by Breed',()=>{
    const route = 'http://localhost:3000/'
    it('should test that the bread name is displayed',()=>{
        cy.visit(route)
        cy.get('[data-testid="bread_name"]').should('not.be.empty')
    })

    it("should test that the image is displayed and the user can navigate to the next image",()=>{
        cy.visit(route)
        cy.findByRole('img', {
            name: /random dog by breed/i
        }).should('be.visible')

        cy.findByRole('img', {
            name: /next icon/i
        }).click().wait(1000)

        cy.findByRole('img', {
            name: /random dog by breed/i
        }).should('be.visible')
    })


    it("should display an image when a user clicks the previous button",()=>{
        cy.visit(route)
        cy.findByRole('img', {
            name: /prev icon/i
        }).click().wait(1000)

        cy.findByRole('img', {
            name: /random dog by breed/i
        }).should('be.visible')
    })

    
})