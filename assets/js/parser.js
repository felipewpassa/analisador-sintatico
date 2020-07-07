modo = 0;
tabelaParsing = [];

parsingTable = {S:{c:'cAa'}, 
                A:{a:'aCb', c:'c', d:'dBa'},
                B:{b:'bSa', d:'dAc'},
                C:{a:'aAb', b:'E'}
              }
/*parsingTable = {S:{a:'aBc',c:'cCb'}, 
                A:{b:'bCc', c:'cB'},
                B:{a:'aC', b:'baA', c:'E'},
                C:{a:'aAc', c:'caS'}
              }*/

$("select").change(function() { //Controle botão
  tabelaParsing = []
  exibirTabelaParsing();
  $('#sentenca').val('');
  modo = $('#modo').val();
  console.log('SELECT MODO --> ' + modo)
  if (modo=='1') {
    $("#resolver").hide();
  } else {
    $("#resolver").show();

  }
});

$("#resolver").click(function() {
  if (modo=='0') { // MODO DE SER 0
    console.log("MODO 0 ----> " + modo)
    var entrada = $("#sentenca").val()
    calcular(entrada);
  } 
});

$("#sentenca").keyup(function() {
  if (modo=='1') { // MODO DE SER 1
    console.log("MODO 1 ----> " + modo)
    //console.log("MODO AO VIVO KEYUP")
    var entrada = $("#sentenca").val()
    console.log("MODO AO VIVO KEYUP -> " + entrada)
    calcular(entrada);
    window.scrollTo(0,document.body.scrollHeight);
  } 
});

/*$("#sentenca").keyup(function() {
  if (modo) {
    var entrada = $("#sentenca").val()
    parser = []

    
    /*let aux = {pilha: 'S', entrada: entrada, acao: parsingTable['S']['c']}
    parser.push(aux);
    console.log(aux)

    printTable();
  }
});*/

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
  //console.log(ultimaPosicaoTabela.pilha + ' - '+ ultimaPosicaoTabela.entrada + ' - ' + ultimaPosicaoTabela.acao)
  isRunning = true
  while(ultimaPosicaoTabela.pilha.length && isRunning) {
    ultimaLetraPilha = ultimaPosicaoTabela.pilha[ultimaPosicaoTabela.pilha.length-1]
    primeiraLetraEntrada = ultimaPosicaoTabela.entrada[0];
    if (ultimaPosicaoTabela.pilha.length >= 1 || ultimaPosicaoTabela.entrada >= 1) {
      if (ultimaLetraPilha != primeiraLetraEntrada) {
        if (!(ultimaLetraPilha == ultimaLetraPilha.toUpperCase())) break;
        //console.log("DIFERENTE")
        //console.log("Buscar -> " + ultimaLetraPilha + ' - ' + primeiraLetraEntrada)
        if (parsingTable[ultimaLetraPilha][primeiraLetraEntrada]) {
          acao = parsingTable[ultimaLetraPilha][primeiraLetraEntrada]
          //verificar se acao igual a EPSILON
          //console.log(ultimaLetraPilha + ' --> ' + primeiraLetraEntrada)
          ultimaPosicaoTabela.acao = acao;
          reverseAcao = reverseString(acao)
          //console.log(acao + ' - ' + reverseAcao)
          entrada = ultimaPosicaoTabela.entrada
          //if (entrada == "$") break;
          if (acao != "E") novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1) + reverseAcao
          else novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1)
          var aux = {pilha: novaPilha, entrada: entrada, acao: ''}
          tabelaParsing.push(aux);
          //console.table(tabelaParsing); 
        } else {
          acao = "Erro em " + tabelaParsing.length + ' iterações';
          isRunning = false;
        }
        
      } else {
        //console.log("IGUAL");
        if (primeiraLetraEntrada=="$" && ultimaLetraPilha=="$") break;
        acao = "Lê " + primeiraLetraEntrada
        //console.log(acao)
        ultimaPosicaoTabela.acao = acao
        novaPilha = ultimaPosicaoTabela.pilha.slice(0, -1); // remove ultimo
        entrada = ultimaPosicaoTabela.entrada.substr(1);
        var aux = {pilha: novaPilha, entrada: entrada, acao: ''}
        tabelaParsing.push(aux);
      }
      ultimaPosicaoTabela = tabelaParsing[tabelaParsing.length-1];
      //console.table(tabelaParsing)
    }
  }

  ultimaLetraPilha = ultimaPosicaoTabela.pilha[ultimaPosicaoTabela.pilha.length-1]
  primeiraLetraEntrada = ultimaPosicaoTabela.entrada[0];
  if (ultimaLetraPilha == "$" && primeiraLetraEntrada == "$") {
    ultimaPosicaoTabela.acao = "Aceito em " + tabelaParsing.length + ' iterações';
  } else {
    ultimaPosicaoTabela.acao = "Erro em " + tabelaParsing.length + ' iterações';
    
  }

  console.table(tabelaParsing)
  
  exibirTabelaParsing();
}
/*for(var i=0; i<parser.pilha.length; i++) {
  console.log(sentenca)
  //verificar se ultimo da pilha == primeiro da entrada
    //se sim
    //remove o ultimo da fila e o primeiro da entrada
    //acao = 'Lê + char'
  //else
    //pegar valor da pilha
    //pegar valor da entrada
    //verificar a acao na tabela
    //gravar acao
    //reverse acao e gravar na pilha
    //verificar se ultimo da pilha == primeiro da entrada
}*/


  /*
  PSEUDO 

  for(var i=0; i<parser.entrada.length; i++) {
      //verificar se ultimo da pilha == primeiro da entrada
        //se sim
        //remove o ultimo da fila e o primeiro da entrada
        //acao = 'Lê + char'
      //else
        //pegar valor da pilha
        //pegar valor da entrada
        //verificar a acao na tabela
        //gravar acao
        //reverse acao e gravar na pilha
        //verificar se ultimo da pilha == primeiro da entrada
    }
  */

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


