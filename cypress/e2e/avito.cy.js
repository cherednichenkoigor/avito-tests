describe('avito tests', () => {
  it.skip('test 1', () => {
    cy.visit('https://www.avito.ru')
    cy.get('select#category').select('Автомобили')
    cy.url().should('contain', '/avtomobili')
    cy.get('div[data-marker="search-form/region"]').click()
    cy.get('input[data-marker="popup-location/region/input"]').type('Московская область')
    cy.wait(2000)
    cy.get('button[data-marker="popup-location/save-button"]').click()
    cy.url().should('contain', '/moskovskaya_oblast')
    cy.wait(2000)
    cy.get('input[data-marker="search-form/with-images"]').parent().click()
    cy.get('input[data-marker="search-form/suggest"]').type('kia k5')
    cy.get('button[data-marker="search-form/submit-button"]').click()
    cy.url().should('contain', '/kia')
    cy.get('div[data-marker="item"]').eq(0).find('h3').invoke('text').then(text => {
      cy.log(text)
    })
    cy.get('div[data-marker="item"]').eq(0).find('a').invoke('attr', 'href').then(href => {
      cy.log('https://www.avito.ru/' + href)
    })
  })

  it('test 2', () => {
    cy.visit('https://www.avito.ru')
    let name
    cy.get('div[data-marker*="block-item"]').eq(0).find('h3').invoke('text').then(text => {
      name = text
    })
    cy.get('div[data-marker*="block-item"]').eq(0).find('div[data-marker="favorite"]').eq(0).click()
    cy.visit('https://www.avito.ru/favorites')
    cy.get('div[data-marker^="item"]').eq(0).find('h3').invoke('text').then(text => {
      expect(text).to.equal(name)
    })
  })
})