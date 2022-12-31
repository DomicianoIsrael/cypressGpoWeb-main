describe('BUSCAR AUTENTICAÇÃO 200', () => {
    it.only('AUTENTEICAÇÃO 200', () => {
        cy.request({
        method: 'GET',
        url: "https://avaliacaodigital.cesgranrio.org.br/"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
    
        })
    })
})