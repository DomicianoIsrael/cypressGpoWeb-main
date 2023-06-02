const faker = require('faker-br');
const fs = require('fs');

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

// Definir o número de linhas que deseja gerar
const numeroDeLinhas = 1000; // Altere para o número desejado

// Verificar se o arquivo já existe
const arquivoCSV = numeroDeLinhas + ' LinhasGeradas.csv';

// Conjunto para armazenar os e-mails gerados
const emailsGerados = new Set();

for (let i = 0; i < numeroDeLinhas; i++) {
    let email = faker.internet.email();

    // Verificar se o e-mail já foi gerado
    while (emailsGerados.has(email)) {
        email = faker.internet.email();
    }

    // Adicionar o e-mail ao conjunto de e-mails gerados
    emailsGerados.add(email);

    // Gerar dados aleatórios para cada campo (alguns campos não estão sendo utilizados, mas se for utilizar já está aqui)
    const nome = gerarNomeCompletoSemErro();
    const cpf = faker.br.cpf();
    const nomeMae = gerarNomeCompletoSemErro();
    const nomePai = gerarNomeCompletoSemErro();
    const sobrenomeMae = faker.name.lastName();
    const sobrenomePai = faker.name.lastName();
    const nomeCompletoMae = `${nomeMae} ${sobrenomeMae}`;
    const nomeCompletoPai = `${nomePai} ${sobrenomePai}`;
    const telefone = faker.phone.phoneNumber().replace(/\D/g, '');
    const dataNascimento = faker.date.past().toLocaleDateString('pt-BR');
    const numeroInscricao = cpf;
    const senha = gerarSenhaFixa();

    // Montar a linha do CSV com os campos desejados
    const linhaCSV = `${'Teste ' + nome},${cpf},${cpf},'${nomeMae} Teste','${nomePai} Teste',${email},${telefone},${dataNascimento},${numeroInscricao},${senha},semfoto.jpg\n`;

    const linhaCSVComVirgulas = linhaCSV.replace(/,/g, ';');

    if (fs.existsSync(arquivoCSV)) {
        // Se o arquivo já existe, apenas adiciona a nova linha
        fs.appendFileSync(arquivoCSV, linhaCSVComVirgulas);
    } else {
        // Se o arquivo não existe, cria o arquivo diretamente com a nova linha
        fs.writeFileSync(arquivoCSV, linhaCSVComVirgulas);
    }
}

console.log('Arquivo CSV gerado com sucesso!');