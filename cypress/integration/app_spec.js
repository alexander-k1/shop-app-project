describe('app', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('renders app and allows filtering products by category', () => {
    //by default 16 products are shown on the home page
    cy.findAllByRole('article').should('have.length', 16)
    //click on category 'fruit'
    cy.findByText(/^fruit$/i).click()
    //there are 8 products in this category
    cy.findAllByRole('article').should('have.length', 8)
    //back to 'all'
    cy.findByText(/all/i).click()
    //again all 16 products are on the page
    cy.findAllByRole('article').should('have.length', 16)
    //now choose 'vegetables'
    cy.findByText(/vegetables/i).click()
    //8 products from this category are on the page
    cy.findAllByRole('article').should('have.length', 8)
  })
  it('allows adding products to basket as well as increasing or decreasing products quantities in basket', () => {
    //go to 'apples' page
    cy.findByRole('link', { name: /apples/i }).click()
    cy.findByText(/apples/i).should('exist')
    cy.findByText(/2\.95 eur\/kg/i).should('exist')
    //add 2 kgs to basket
    cy.findByRole('spinbutton', {
      name: /you can buy up to 10 kg of each product/i,
    }).type('2')
    cy.findByRole('button', {
      name: /add to basket/i,
    }).click()
    //continue shopping
    cy.findByRole('button', { name: /continue shopping/i }).click()
    //make sure number of products in basket is 1
    cy.findByRole('link', {
      name: /basket/i,
    }).contains('1')
    // go to home page
    cy.findByRole('link', { name: /home/i }).click()
    //go to 'pears' page
    cy.findByRole('link', { name: /pears/i }).click()
    cy.findByText(/pears/i).should('exist')
    cy.findByText(/3\.75 eur\/kg/i).should('exist')
    //add 3 kgs to basket
    cy.findByRole('spinbutton', {
      name: /you can buy up to 10 kg of each product/i,
    }).type('3')
    cy.findByRole('button', {
      name: /add to basket/i,
    }).click()
    //go to basket
    cy.findByRole('link', { name: /go to basket/i }).click()
    //make sure number of products in basket is 2
    cy.findByRole('link', {
      name: /basket/i,
    }).contains('2')
    cy.findAllByRole('article').should('have.length', 2)
    //check for 'apples'
    cy.findAllByRole('article').eq(0).contains('Apples')
    //check for 'pears'
    cy.findAllByRole('article').eq(1).contains('Pears')
    //total sum should be 17.15 EUR
    cy.findByText(/17\.15 eur/i).should('exist')
    //decrease apples quantity by 1kg
    cy.get('[data-cy=product-1').within(() => {
      cy.findByRole('button', { name: /decrease by 1 kg/i }).click()
      cy.findByText(/^1 kg$/i).should('exist')
      cy.findByText(/^2 kg$/i).should('not.exist')
    })
    //increase pears quantity by 1kg
    cy.get('[data-cy=product-11').within(() => {
      cy.findByRole('button', { name: /increase by 1 kg/i }).click()
      cy.findByText(/^4 kg$/i).should('exist')
      cy.findByText(/^3 kg$/i).should('not.exist')
    })
    //new total sum
    cy.findByText(/17\.95 eur/i).should('exist')
  })
})
