var request = require('request');
var cheerio = require('cheerio');
var random_ua = require('random-ua');

var ESTADOS = {
  'ac': 'Acre',
  'al': 'Alagoas',
  'am': 'Amazonas',
  'ap': 'Amapá',
  'ba': 'Bahia',
  'ce': 'Ceará',
  'df': 'Distrito Federal',
  'es': 'Espirito Santo',
  'go': 'Goiás',
  'ma': 'Maranhão',
  'mg': 'Minas Gerais',
  'ms': 'Mato Grosso do Sul',
  'mt': 'Mato Grosso',
  'pa': 'Pará',
  'pb': 'Paraíba',
  'pe': 'Pernambuco',
  'pi': 'Piauí',
  'pr': 'Paraná',
  'rj': 'Rio de Janeiro',
  'rn': 'Rio Grande do Norte',
  'ro': 'Rondonia',
  'rr': 'Roraima',
  'rs': 'Rio Grande do Sul',
  'sc': 'Santa Catarina',
  'se': 'Sergipe',
  'sp': 'São Paulo',
  'to': 'Tocantins'
};

var GuiaMais = {};

GuiaMais.buscar = function (consulta, sucesso, erro) {
  request(
    {
      url: 'http://www.guiamais.com.br/busca/' + encodeURIComponent(consulta),
      headers: {
        'User-Agent': random_ua.generate()
      }
    },
    function (error, response, body) {
      if (error !== null) {
        if (erro) {
          erro(error);
        }
        return;
      }

      var $ = cheerio.load(body);
      var resultados = [];

      $('.vcard').each(function (i, card) {
        var vcard = $(card);

        var nome = vcard.find('h2').text();
        var categoria = vcard.find('.categoria a').text();
        var logradouro = vcard.find('.adr .street-address').text();
        var cidade = vcard.find('.adrP .locality').text();
        var estado = vcard.find('.adrP .region').text();
        var bairro = vcard.find('.adr .district').text();
        var cep = vcard.find('.adr .postal-code').text();
        var telefones = [];

        vcard.find('.listPhone .tel').each(function (j, phone) {
          var telefone = $(phone).find("script").text().match(/document\.write\('(.+)'\)/)[1];
          var ddd = telefone.match(/\((\d+)\)/)[1];
          var numero = telefone.match(/\((\d+)\)[ ]*(\d+)[\-]?(\d+)/);

          telefones.push({
            ddd: ddd,
            numero: numero[2] + numero[3]
          });
        });

        resultados.push(
          {
            nome: nome,
            endereco: {
              logradouro: logradouro,
              cidade: cidade,
              estado: {
                nome: ESTADOS[estado.toLowerCase()],
                sigla: estado.toUpperCase()
              },
              bairro: bairro,
              cep: cep
            },
            categoria: categoria,
            telefones: telefones
          }
        );

      });

      if (sucesso) {
        sucesso(resultados);
      }
    }
  );
};

module.exports = GuiaMais;