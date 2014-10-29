var GuiaMais = require('./../lib/guia_mais');

exports.testBuscaPorNumeroTelefone = function (test) {
  GuiaMais.buscar("8632222222", function (resultados) {
    test.equal(2, resultados.length);

    test.equal("COOTAC - COOPERATIVA MISTA CONDUTORES AUTON VEICULOS PASSAGEIROS E CARGAS PIAUI", resultados[0].nome);
    test.equal("R Professor Álvaro Ferreira, 60", resultados[0].endereco.logradouro);
    test.equal("Teresina", resultados[0].endereco.cidade);
    test.equal("Piauí", resultados[0].endereco.estado.nome);
    test.equal("PI", resultados[0].endereco.estado.sigla);
    test.equal("Monte Castelo", resultados[0].endereco.bairro);
    test.equal("64017-380", resultados[0].endereco.cep);
    test.equal("Táxi", resultados[0].categoria);

    test.equal("RADIO TAXI", resultados[1].nome);
    test.equal("R Professor Álvaro Ferreira, 60", resultados[1].endereco.logradouro);
    test.equal("Teresina", resultados[1].endereco.cidade);
    test.equal("Piauí", resultados[1].endereco.estado.nome);
    test.equal("PI", resultados[1].endereco.estado.sigla);
    test.equal("Monte Castelo", resultados[1].endereco.bairro);
    test.equal("64017-380", resultados[1].endereco.cep);
    test.equal("Táxi", resultados[1].categoria);
  });

  GuiaMais.buscar("8632325151", function (resultados) {
    test.equal(1, resultados.length);

    test.equal("ARTTE DOS PES", resultados[0].nome);
    test.equal("Av Elias João Tajra, 1684 - Jóquei", resultados[0].endereco.logradouro);
    test.equal("Teresina", resultados[0].endereco.cidade);
    test.equal("Piauí", resultados[0].endereco.estado.nome);
    test.equal("PI", resultados[0].endereco.estado.sigla);
    test.equal("", resultados[0].endereco.bairro);
    test.equal("64049-300", resultados[0].endereco.cep);
    test.equal("Clínicas de Estética", resultados[0].categoria);

    test.done();
  });
};

exports.testBuscaPorNome = function (test) {
  GuiaMais.buscar("Pizzarina", function (resultados) {
    test.equal(1, resultados.length);

    test.equal("PIZZARINA", resultados[0].nome);
    test.equal("Av Dom Severino, 2244", resultados[0].endereco.logradouro);
    test.equal("Teresina", resultados[0].endereco.cidade);
    test.equal("Piauí", resultados[0].endereco.estado.nome);
    test.equal("PI", resultados[0].endereco.estado.sigla);
    test.equal("Fátima", resultados[0].endereco.bairro);
    test.equal("64049-370", resultados[0].endereco.cep);
    test.equal("Pizzarias", resultados[0].categoria);

    test.done();
  });
};

exports.testBuscaPorTermo = function (test) {
  GuiaMais.buscar("hospital veterinario", function (resultados) {
    test.equal(9, resultados.length);

    test.equal("HOSPITAL E CLINICA VETERINARIA SANTA MONICA", resultados[0].nome);
    test.equal("R Brigadeiro Franco, 4029", resultados[0].endereco.logradouro);
    test.equal("Curitiba", resultados[0].endereco.cidade);
    test.equal("Paraná", resultados[0].endereco.estado.nome);
    test.equal("PR", resultados[0].endereco.estado.sigla);
    test.equal("Rebouças", resultados[0].endereco.bairro);
    test.equal("80220-100", resultados[0].endereco.cep);
    test.equal("Hospitais Veterinários", resultados[0].categoria);
    test.equal("41", resultados[0].telefones[0].ddd);
    test.equal("33325590", resultados[0].telefones[0].numero);

    test.done();
  });
};