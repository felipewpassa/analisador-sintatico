modo = 0;
tabelaParsing = [];

parsingTable = {S:{c:'cAa'}, 
                A:{a:'aCb', c:'c', d:'dBa'},
                B:{b:'bSa', d:'dAc'},
                C:{a:'aAb', b:'E'}
              }

$("select").change(function() {
  tabelaParsing = []
  exibirTabelaParsing();
  $('#sentenca').val('');
  modo = $('#modo').val();
  if (modo=='1') {
    $("#resolver").hide();
  } else {
    $("#resolver").show();
  }
});

$("#resolver").click(function() {
  if (modo=='0') {
    var entrada = $("#sentenca").val()
    calcular(entrada);
  } 
});

$("#sentenca").keyup(function() {
  if (modo=='1') {
    var entrada = $("#sentenca").val()
    calcular(entrada);
    window.scrollTo(0,document.body.scrollHeight);
  } 
});

function inicializaTabelaParsing(sentenca) {
  if (!tabelaParsing.length) {
    pilha = '$S'
    entrada = sentenca + '$'
    if(parsingTable['S'][sentenca[0]]) {
      acao = parsingTable['S'][sentenca[0]]
    } else {
      acao = "Rejeitada em " + tabelaParsing.length + "iterações"
    }
    var aux = {pilha: pilha, entrada: entrada, acao: acao}
    tabelaParsing.push(aux);
  }
}

function reverseString(str) {
  var splitString = str.split("");
  var reverseArray = splitString.reverse();
  var joinArray = reverseArray.join("");
  return joinArray;
}

function calcular(sentenca) {
  tabelaParsing = []
  inicializaTabelaParsing(sentenca);
  ultimaPosicaoTabela = tabelaParsing[tabelaParsing.length-1];
  isRunning = true
  while(ultimaPosicaoTabela.pilha.length && isRunning) {
    ultimaLetraPilha = ultimaPosicaoTabela.pilha[ultimaPosicaoTabela.pilha.length-1]
    primeiraLetraEntrada = ultimaPosicaoTabela.entrada[0];
    if (ultimaPosicaoTabela.pilha.length >= 1 || ultimaPosicaoTabela.entrada >= 1) {
      if (ultimaLetraPilha != primeiraLetraEntrada) {
        if (!(ultimaLetraPilha == ultimaLetraPilha.toUpperCase())) break;
        if (parsingTable[ultimaLetraPilha][primeiraLetraEntrada]) {
          acao = parsingTable[ultimaLetraPilha][primeiraLetraEntrada]
          ultimaPosicaoTabela.acao = acao;
          reverseAcao = reverseString(acao)
          entrada = ultimaPosicaoTabela.entrada
          if (acao != "E") novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1) + reverseAcao
          else novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1)
          var aux = {pilha: novaPilha, entrada: entrada, acao: ''}
          tabelaParsing.push(aux);
        } else {
          acao = "Erro em " + tabelaParsing.length + ' iterações';
          isRunning = false;
        }    
      } else {
        if (primeiraLetraEntrada=="$" && ultimaLetraPilha=="$") break;
        acao = "Lê " + primeiraLetraEntrada
        ultimaPosicaoTabela.acao = acao
        novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1);
        entrada = ultimaPosicaoTabela.entrada.substr(1);
        var aux = {pilha: novaPilha, entrada: entrada, acao: ''}
        tabelaParsing.push(aux);
      }
      ultimaPosicaoTabela = tabelaParsing[tabelaParsing.length-1];
    }
  }

  ultimaLetraPilha = ultimaPosicaoTabela.pilha[ultimaPosicaoTabela.pilha.length-1]
  primeiraLetraEntrada = ultimaPosicaoTabela.entrada[0];
  if (ultimaLetraPilha == "$" && primeiraLetraEntrada == "$") {
    ultimaPosicaoTabela.acao = "Aceito em " + tabelaParsing.length + ' iterações';
  } else {
    ultimaPosicaoTabela.acao = "Erro em " + tabelaParsing.length + ' iterações';
    
  }
  exibirTabelaParsing();
}

function exibirTabelaParsing() {
  $('.addWithJquery').remove();
  for(var i=0; i<tabelaParsing.length; i++) {
    linhaTabela = '';
    ultimaLetraPilha = tabelaParsing[i].pilha[tabelaParsing[i].pilha.length-1]
    if (ultimaLetraPilha == ultimaLetraPilha.toUpperCase() && i < tabelaParsing.length-1) {
      var linhaTabela = 
      `<tr class="addWithJquery">
        <td>${tabelaParsing[i].pilha}</td>
        <td>${tabelaParsing[i].entrada}</td>
        <td>${ultimaLetraPilha}➜${tabelaParsing[i].acao}</td>
      </tr>`
    } else {
      var linhaTabela = 
      `<tr class="addWithJquery">
        <td>${tabelaParsing[i].pilha}</td>
        <td>${tabelaParsing[i].entrada}</td>
        <td>${tabelaParsing[i].acao}</td>
      </tr>`
    }
    $('#tabela').append(linhaTabela);
  }
}


