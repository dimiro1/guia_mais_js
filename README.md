GuiaMais
========

Realiza busca no site guiamais.com.br.

Exemplo:

```
var GuiaMais = require('guia_mais');

GuiaMais.buscar('pizza', function(resultados) {
    console.log(JSON.stringify(resultados));
});
```

[![Build Status](https://travis-ci.org/dimiro1/guia_mais_js.svg?branch=master)](https://travis-ci.org/dimiro1/guia_mais_js)