declare namespace Cypress {
    interface Chainable<Subject> {
        /*login sucesso*/
        login(nome: any, senha: any): Chainable<any>
  }
}