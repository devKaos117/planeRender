# planeRender ![v1.1](https://img.shields.io/badge/version-1.1-informational)

## Índice

- [Sobre](#about)
- [Detalhes técnicos](#technical_analysis)
- [Usando](#using)

---

## Sobre <a name = "about"></a>

Uma classe simples desenvolvida para montar um plano cartesiano e dispor os pontos definidos no plano.

No arquivo `./index.html` é possível ver algumas demonstrações do uso das funções da classe `Plane`.

---

## Detalhes técnicos <a name = "technical_analysis"></a>

### Ambiente de desenvolvimento usado

- Windows 11
- Visual Studio Code
- Firefox Developer Edition

### Tecnologias usadas

- HTML5
- CSS
- JavaScript
- Bootstrap Framework
- Google Fonts
- jQuery

---

## Usando <a name = "using"></a>

### Inicializando o objeto do plano

Um objeto deverá ser inicializado para cada plano a ser desenvolvido, recebendo como parâmetro o objeto de elemento DOM de seu respectivo canvas

```js
var plano = new Plane(document.getElementById("plane"));
```

### Métodos da classe `Plane`

```js
// define o pixel ratio do canvas
plano.setPixelRatio(1);
// define a cor dos eixos principais
plano.setAxisColor(0, 0, 0, 1);
// define a cor da grade auxiliar
plano.setGridColor(0, 0, 0, 0.5);
// define a fonte usada nos números
plano.setFont("arial");
// define o tamanho da fonte usada nos números
plano.setFontSize(8);
// define o índice de crescimento dos eixos
plano.setNumberStep(1);
// define a distância entre os "passos" dos eixos
plano.setPixelStep(25);
// converte a distância em pixels para coordenada em X
plano.pixelsToGridX(100);
// converte a distância em pixels para coordenada em Y
plano.pixelsToGridY(100);
// adiciona um ponto no plano
plano.addPoint(0, 0);
// remove um ponto no plano
plano.removePoint(0, 0);
// remove todos os pontos no plano
plano.clearPoints();
// desenha os eixos principais e a grade auxiliar
plano.drawGrid();
// marca os pontos do plano
plano.drawPoints();
// conecta os pontos do plano
plano.connectPoints();
// redefine os desenhos do plano
plano.clearAll();
```