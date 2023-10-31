describe('Image List By Breed and Sub Breed',()=>{
    const route = 'http://localhost:3000/'

    it("should click on the dropdown element, retrieve a list of breed and select one breed to display the images",()=>{
        cy.visit(route).wait(1000)
        cy.get('#list_content_3').should('have.text','Images list by breed and sub breed').click().wait(1000)
        cy.get('[data-testid="images_dropdown"]').should('be.visible').click().wait(500)
        cy.findByText(/australian/i).contains('Australian', { matchCase: false }).should(
            'have.css',
            'text-transform',
            'capitalize'
          ).click().wait(1000)
        cy.get('#image_title').should('not.be.hidden')
        cy.get('#image').should('be.visible')
    })


    
})