describe('Random Image By Breed and Sub breed',()=>{
    const route = 'http://localhost:3000/'

    it("should click on select random image button and get a list of random images",()=>{
        cy.visit(route).wait(1000)
        cy.get('#list_content_2').should('have.text','Random image by breed and sub breed').click().wait(1000)
        cy.findByRole('button', {
            name: /click here to select random breed/i
        }).contains('Click Here To Select Random Breed', { matchCase: false }).should(
            'have.css',
            'text-transform',
            'capitalize'
          ).click().wait(1000)
      
        cy.get('#random_image_title').should('not.be.hidden')
        cy.get('#random_image').should('be.visible')
        // cy.findByRole('heading', {
        //     name: /sub\-breed images/i
        // }).should('be.visible')
    })


    
})