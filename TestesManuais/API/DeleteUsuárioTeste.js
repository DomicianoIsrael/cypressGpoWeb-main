const axios = require('axios');

const baseUrl = 'https://homologacaodigital.cesgranrio.com.br/api';
let accessToken;

// Função para autenticar e obter o token de acesso
function authenticate() {
    return axios.post(`${baseUrl}/login/authentication`, {
        login: '15275162707',
        loginPortal: false,
        senha: 'Cesgran123'
    })
        .then((response) => {
            console.log('Autenticação bem-sucedida');
            accessToken = response.data.data.accessToken;
        })
        .catch((error) => {
            console.error('Erro na autenticação:', error);
        });
}

// Função para obter usuários com nome "Teste" e excluir
function getUsersAndDelete() {
    let totalUsersDeleted = 0;

    function deleteUsers(usersToDelete) {
        console.log(`Número de usuários a serem excluídos: ${usersToDelete.length}`);

        const deleteUserPromises = usersToDelete.map((user) => {
            return axios.delete(`${baseUrl}/usuarios/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(() => {
                    totalUsersDeleted++;
                    console.log(`Usuário ${totalUsersDeleted} excluído com sucesso`);
                })
                .catch((error) => {
                    console.error(`Erro ao excluir usuário ${user.id}:`, error);
                });
        });

        return Promise.all(deleteUserPromises);
    }

    function getAllUsersToDelete() {
        axios.get(`${baseUrl}/usuarios`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                const users = response.data.data.items;
                const usersToDelete = users.filter((user) => user.nome.includes('Teste'));

                if (usersToDelete.length > 0) {
                    deleteUsers(usersToDelete)
                        .then(() => {
                            getAllUsersToDelete(); // Faz outro GET e repete o processo
                        });
                } else {
                    console.log('Condição atendida. Encerrando o script.');
                    console.log(`Total de usuários deletados: ${totalUsersDeleted}`);
                }
            })
            .catch((error) => {
                console.error('Erro na requisição GET:', error);
            });
    }

    getAllUsersToDelete();
}

// Fluxo principal
authenticate()
    .then(() => {
        getUsersAndDelete(); // Inicia o processo de exclusão
    });