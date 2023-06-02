describe('Autenticação', () => {
    let accessToken;
    let baseUrl = 'https://homologacaodigital.cesgranrio.com.br/api';

    beforeEach(() => {
        cy.request('POST', `${baseUrl}/login/authentication`, {
            login: '15275162707',
            loginPortal: false,
            senha: 'Cesgran123'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('success', true);
            expect(response.body.data).to.have.property('accessToken');

            accessToken = response.body.data.accessToken;
        });
    });

    describe('Deletar usuários com atributo "nome" igual a "Teste"', () => {
        it('Deve deletar os usuários', () => {
            const deleteUsers = () => {
                cy.request({
                    method: 'GET',
                    url: `${baseUrl}/usuarios`,
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200);

                    const users = response.body.data.items;

                    const usersToDelete = users.filter((user) => user.nome.includes('Teste'));

                    if (usersToDelete.length > 0) {
                        cy.wrap(usersToDelete).each((user) => {
                            cy.request({
                                method: 'DELETE',
                                url: `${baseUrl}/usuarios/${user.id}`,
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            }).then((deleteResponse) => {
                                expect(deleteResponse.status).to.eq(200);
                            });
                        });

                        deleteUsers(); // Faz outro get e repete o processo
                    }
                });
            };

            deleteUsers(); // Inicia o processo
        });
    });
});
