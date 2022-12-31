//login sucesso
Cypress.Commands.add('login', (nome, senha) => {
    cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type(nome);
        cy.get('input[type="password"]').type(senha);
        cy.get('.form-signin > .btn').click();
        cy.contains('button', 'CONTINUAR').click();
        cy.url().should('contain', 'https://avaliacaodigital.cesgranrio.org.br/#/');
})

//login co