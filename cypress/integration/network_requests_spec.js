describe('network requests', () => {
  it('sends requests and receives necessary data', () => {
    cy.request('GET', 'https://vintage-carp.glitch.me/api/products').then(
      (response) => {
        //16 products are supposed to be returned
        expect(response.body).to.have.length(16)
        //they must have the following properties
        response.body.forEach((item) => {
          expect(item).to.have.all.keys(
            'id',
            'name',
            'category',
            'price',
            'info',
            'img'
          )
        })
      }
    )
    cy.request('GET', 'https://vintage-carp.glitch.me/api/product/1').then(
      (response) => {
        //apples
        expect(response.body).to.include({
          name: 'Apples',
          category: 'fruit',
          price: 2.95,
        })
      }
    )
    cy.request('GET', 'https://vintage-carp.glitch.me/api/product/11').then(
      (response) => {
        //pears
        expect(response.body).to.include({
          name: 'Pears',
          category: 'fruit',
          price: 3.75,
        })
      }
    )
  })
})
