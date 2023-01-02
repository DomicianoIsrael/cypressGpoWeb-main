describe('testando api', () => {
    it('TELA PORTAL - VERIFICAÇÃO DE CONEXÃO DIRETA A API É 200', () => {
        cy.request({
        method: 'GET',
        url: "https://avaliacaodigital.cesgranrio.org.br/"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
        })
    })
    it('TELA PORTAL - VERIFICA SE A LISTAGEM DE EVENTO NO PORTAL É 200', () => {
        cy.request({
        method: 'GET',
        url: "https://avaliacaodigital.cesgranrio.org.br/api/event/next-events/"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
        })  
    })
    it('TELA AVALIAÇÕES - VERIFICA SE PÁGINA 1 SE RECEBE 200 AO LISTAR', () => {
        cy.request({
        method: 'GET',
        url: "https://avaliacaodigital.cesgranrio.org.br/api/event/paged/1"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
        })
    })
    it('TELA SOBRE EVENTO - VERIFICA SE CONTEÚDO RECEBE 200', () => {
        cy.request({
        method: 'GET',
        url: "https://avaliacaodigital.cesgranrio.org.br/api/event/portal-event/80a6346c-370f-4952-908f-0caefe6e32cb"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
        })
    })
    it.skip('VALIDETED CODE EMAIL - VERIFICA SE CONTEÚDO RECEBE 200', () => {
        cy.request({
        method: 'POST',
        url: "https://avaliacaodigital.cesgranrio.org.br/api/Candidate/validate-confirmation-code"
        }).then((res) => {
        expect(res.status).to.be.equal(200)
        })
    })
})



//{"message":"Código enviado com sucesso.","status":null}