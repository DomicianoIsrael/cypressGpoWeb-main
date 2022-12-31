describe('GPO WEB', () => {

    beforeEach(() => {
        cy.visit('https://teste.cesgranrio.com.br/')
        
    })
    
    it.only('Validar minha conta', () => {
        cy.login('15275162707', 'Miguel2504');
        cy.get('button[id="dropdownManual"]').click();
        cy.contains('button', 'MINHA CONTA').click();
        cy.get('button[type="submit"]').click();
        cy.get('.success')
        cy.contains('div', 'Alterações salvas com sucesso.').should('be.visible');
        
    })
    
})