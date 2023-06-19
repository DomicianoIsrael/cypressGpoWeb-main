describe('testando api', () => {

    it('/api/check', () => {
        cy.request({
            method: 'GET',
            url: "https://homologacaodigital.cesgranrio.com.br/api/check"
        }).then((res) => {
            expect(res.status).to.be.equal(200)
        })
    })
    it('/api/PortalEventos', () => {
        cy.request({
            method: 'GET',
            url: "https://homologacaodigital.cesgranrio.com.br/api/PortalEventos"
        }).then((res) => {
            expect(res.status).to.be.equal(200)
        })
    })
    it('/api/contatos/', () => {
        cy.request({
            method: 'GET',
            url: "https://homologacaodigital.cesgranrio.com.br/api/contatos/"
        }).then((res) => {
            expect(res.status).to.be.equal(200)
        })
    })
    it('/api/login/authenticati (Login e senha inválido)', () => {
        cy.request({
            method: 'POST',
            url: 'https://homologacaodigital.cesgranrio.com.br/api/login/authentication',
            body: {
                login: "Inválido",
                loginPortal: true,
                senha: "Inválido"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].message).to.eq('Login/Senha inválidos.')
            expect(response.body.success).to.be.false
        })
    })
    it('/api/login/authenticati (Login certo e senha inválido)', () => {
        cy.request({
            method: 'POST',
            url: 'https://homologacaodigital.cesgranrio.com.br/api/login/authentication',
            body: {
                login: "43820995013",
                loginPortal: true,
                senha: "Inválido"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.errors[0].message).to.eq('Login/Senha inválidos.')
            expect(response.body.success).to.be.false
        })
    })
    it.only('/api/login/authenticati (Login certo e senha Certo)', () => {
        cy.request({
            method: 'POST',
            url: 'https://homologacaodigital.cesgranrio.com.br/api/login/authentication',
            body: {
                login: "43820995013",
                loginPortal: true,
                senha: "Cesgran123"
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.success).to.be.true
            expect(response.body.data.accessToken).to.exist

            cy.wrap(response.body.data.accessToken).as('accessToken')
        })
    })

    it.only('/api/check', () => {
        cy.request({
            method: 'GET',
            url: "https://homologacaodigital.cesgranrio.com.br/api/usuarios/current",
            headers: {
                Authorization: `Bearer ${Cypress.env('accessToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            // Fazer asserções adicionais
        })
    })
})      
