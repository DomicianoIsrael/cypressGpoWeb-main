const faker = require('faker-br');
const fs = require('fs');
const readline = require('readline');

// Função para formatar o nome removendo abreviações
function formatarNome(nome) {
    return nome.replace(/^(?:Dra?\.?|Sr\.?a?\.?|S?en?h?o?r?i?t?a?\.?|Missa|Padre|Srta?\.?|Jr\.?)\s+/i, '') + ' Teste';
}

// Função para validar se o nome possui pelo menos um nome e sobrenome e não contém hífen
function validarNome(nome) {
    const partesNome = nome.split(' ');
    return partesNome.length >= 2 && !nome.includes('-');
}

// Função para gerar um nome completo válido
function gerarNomeCompletoSemErro() {
    let nomeCompleto = '';
    let tentativas = 0;

    // Realiza até 10 tentativas para gerar um nome completo válido
    while (!validarNome(nomeCompleto) && tentativas < 10) {
        nomeCompleto = formatarNome(faker.name.findName());
        tentativas++;

        // Remover a abreviação "Jr." do nome gerado
        nomeCompleto = nomeCompleto.replace(/Jr\.?\s*/i, '');
    }

    return nomeCompleto;
}

// Função para gerar a senha fixa
function gerarSenhaFixa() {
    return 'Cesgran123';
}

// Função para gerar um código alfanumérico de 6 caracteres
function gerarCodigoAleatorio() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }

    return codigo;
}


// Criar uma interface de leitura do console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Perguntar ao usuário quantas linhas deseja gerar
rl.question('Quantas linhas você deseja gerar? ', (numeroDeLinhas) => {
    // Fechar a interface de leitura do console
    rl.close();

    // Verificar se o arquivo já existe
    const arquivoCSV = numeroDeLinhas + ' LinhasGeradas.csv';

    // Conjunto para armazenar os códigos gerados
    const codigosGerados = new Set();

    for (let i = 0; i < numeroDeLinhas; i++) {
        let codigo = gerarCodigoAleatorio();

        // Verificar se o código já foi gerado
        while (codigosGerados.has(codigo)) {
            codigo = gerarCodigoAleatorio();
        }

        // Adicionar o código ao conjunto de códigos gerados
        codigosGerados.add(codigo);

        // Gerar dados aleatórios para cada campo
        const nome = gerarNomeCompletoSemErro();
        const senha = gerarSenhaFixa();

        // Montar a linha do CSV com os campos desejados
        const linhaCSV = `${nome};${codigo};${senha}\n`;

        if (fs.existsSync(arquivoCSV)) {
            // Se o arquivo já existe, apenas adiciona a nova linha
            fs.appendFileSync(arquivoCSV, linhaCSV);
        } else {
            // Se o arquivo não existe, cria o arquivo diretamente com a nova linha
            fs.writeFileSync(arquivoCSV, linhaCSV);
        }
    }

    console.log('Arquivo CSV gerado com sucesso!');
});
