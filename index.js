var GuiaMais = require('./lib/guia_mais');

GuiaMais.buscar("8632325151-pi",
  function (resultados) {
    console.log(JSON.stringify(resultados, null, " "));
  }
);
