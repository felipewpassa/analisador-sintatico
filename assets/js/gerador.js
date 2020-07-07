proximo = 'S';
resultado = '';

$("body").ready(function() {
  reset();
});

$("#limpar").click(function() {
  reset();
});

function reset () {
  $("#sentenca").val("");
  proximo = 'S';
  resultado = '';
  $(`th, tr`).css('background-color', 'white');
  $(`.${proximo}`).css('background-color', 'gainsboro');
}

$("td").click(function() {
  var producao = $(this).text();
  var regra = producao.substring(0, 1);
  var acao = producao.substring(2, producao.length);
  
  
  var sentenca =  $("#sentenca").val();

  if (acao != 'ε') {
    if (resultado == "" ) {
      resultado = acao;
    } else {
      resultado = sentenca.replace(regra, acao);
    }
  } else {
    resultado = sentenca.replace(regra, "");
    proximo = "";
  }
  

  $("#sentenca").val(resultado);
  
  
  for (var i=0; i<resultado.length;i++) {
    if (resultado[i] == resultado[i].toUpperCase()) {
      proximo = resultado[i];
      break;
    } else {
      proximo = "";
    }
  }
  console.log("Proximo -> " + proximo)

  $(`th, tr`).css('background-color', 'white');
  if (proximo) $(`.${proximo}`).css('background-color', 'gainsboro');
});

$('#copyText').click(function() {
     var clipboardText = "";
     clipboardText = $('#sentenca').val(); 
     copyToClipboard(clipboardText);
     alert(`A sentença '${clipboardText}' foi copiada com sucesso!`);
});


function copyToClipboard(text) {

  var textArea = document.createElement( "textarea" );
  textArea.value = text;
  document.body.appendChild( textArea );       
  textArea.select();

  try {
     var successful = document.execCommand( 'copy' );
     var msg = successful ? 'successful' : 'unsuccessful';
     console.log('Copying text command was ' + msg);
  } catch (err) {
     console.log('Oops, unable to copy',err);
  }    
  document.body.removeChild( textArea );
}



