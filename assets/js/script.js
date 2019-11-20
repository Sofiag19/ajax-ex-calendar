// Per oggi però “solo” MIlestone:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività, recuperate interrogando l’API
//  STEP:
// Controllare quanti giorni ha il mese  formando così una lista;
// Chiedere all’api quali sono le festività per il mese ;
// Evidenziare le festività nella lista

$(document).ready(function(){

  $.ajax({
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method:'GET',
      success: function(feste){
        var respo = feste.response;
        // console.log(respo);

        var giorniGenn2018 = moment("2018-01","YYYY-MM").daysInMonth();
        // console.log(giorniGenn2018);

        var mese = moment().month(0).format("MMMM");
        // console.log(mese);

        var data;
        var giorno;
        var i = 1;

        while (i <= giorniGenn2018) {
          
          if (i<10) {
            giorno= "0"+i;
            // console.log(giorno);
          } else {
            giorno = i;
            // console.log(giorno);
          }

          var date = "2018-01-"+giorno;
          // console.log(date);
          $("#elencoGiorni").append("<li date-day='2018-01-"+ giorno +"'>"+i+" "+mese+"</li>");

          var attributo;
          $("#elencoGiorni li").each(function(){
            attributo = $(this).attr("date-day");
            // console.log("attr: "+attributo);
            for (var j = 0; j < respo.length; j++) {
              var festivita = respo[j].date;
              // console.log(festivita);
            }
            if (attributo === festivita) {
              console.log("festa");
              $(this).addClass("red");
            } else {
              console.log("non festivo");
            }

          })

          i++;
        }
      },
      error:function(){
        alert("Si è verificato un errore")
      }
  })





})
