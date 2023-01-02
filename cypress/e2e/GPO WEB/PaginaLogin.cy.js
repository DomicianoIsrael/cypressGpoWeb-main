/// <reference types="cypress" />

describe('GPO WEB', () => {

    beforeEach(() => {
        cy.visit('https://avaliacaodigital.cesgranrio.org.br/');
    })
    //#########pra começar o teste completo, remove esse only!##########
    it.only('Autenticação sucesso', () => {
        cy.login('15275162707', 'Miguel2504'); 
        
    })

    it('Usuário e senha errada', () => {
        cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type('usuário errado');
        cy.get('input[type="password"]').type('senha errada');
        cy.get('.form-signin > .btn').click();
        cy.contains('div', 'Usuário ou senha inválido. Por favor, verifique suas informações e tente novamente.').should('be.visible');
        
    })

    it('usuário certo e senha errada', () => {
        cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type('15275162707');
        cy.get('input[type="password"]').type('senha errada');
        cy.get('.form-signin > .btn').click();
        cy.contains('div', 'Usuário ou senha inválido. Por favor, verifique suas informações e tente novamente.').should('be.visible');
    })
    
    it('bloqueio de usuário após 10 tentativas de acesso com senha errada', () => {
        cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type('15275162707');
        cy.get('input[type="password"]').type('senha errada');
        for (let i = 0; i < 10; i++) {
        cy.get('.form-signin > .btn').click();
        cy.wait(3000);
        cy.contains('div', 'Usuário ou senha inválido. Por favor, verifique suas informações e tente novamente.').should('be.visible');
        }
    });
    it('usuário bloqueado', () => {
        cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type('15275162707');
        cy.get('input[type="password"]').type('Miguel2504');
        cy.get('.form-signin > .btn').click();
        cy.contains('div', ' Este usuário encontra-se com acesso bloqueado. Foi enviado instruções de recuperação de acesso ao E-mail cadastrado. ').should('be.visible');
    })

    it('Usuário bloqueado com senha incorreta deve exibir mensagem "Usuário ou senha inválido"', () => {
        cy.contains('button', 'ENTRAR').click();
        cy.get('input[type="text"]').type('15275162707');
        cy.get('input[type="password"]').type('senha errada');
        cy.get('.form-signin > .btn').click();
        cy.contains('div', 'Usuário ou senha inválido. Por favor, verifique suas informações e tente novamente.').should('be.visible');
    })
})