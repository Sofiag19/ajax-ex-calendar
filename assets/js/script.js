// Per oggi però “solo” MIlestone:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività, recuperate interrogando l’API
//  STEP:
// Controllare quanti giorni ha il mese  formando così una lista;
// Chiedere all’api quali sono le festività per il mese ;
// Evidenziare le festività nella lista

$(document).ready(function(){

  // fare una funzione che abbia come paramentro il numero del mese che parte da zero
  function ggMese(month){
    // quanti giorni nel mese
    var giorniInMese = moment("2018-0"+month,"YYYY-MM").daysInMonth();
    // console.log(giorniGenn2018);

    // ciclo per stampare
    var i = 1;

    while (i <= giorniInMese) {

      // definizione data completa
      var date = moment("2018-"+month+"-"+i, "YYYY-MM-D").format("YYYY-MM-DD");
      // console.log(date);

      // giorno della settimana relativo al giorno e nome mese
      var giornoSettMese = moment(date).format("DD ddd MMMM");
      // console.log(giornoSett);

      // stampa elenco con nuovo attributo
      $("#elencoGiorni").append("<li date-day='"+ date +"'>"+giornoSettMese+"</li>");

      i++;
    }

    $.ajax({
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018",
      method:'GET',
      data: {month : month-1},
      success: function(feste){
        var respo = feste.response;
        // console.log(respo);

        // ciclo per estrazione e comparazione con giorni festivi
        for (var j = 0; j < respo.length; j++) {

          // estrapolazione giorno festivo
          var festivita = respo[j].date;
          // console.log("ogg: "+festivita);

          // estrapolazione nome giorno festivo
          var tipoFesta = respo[j].name;

          var giornoFesta = $("li[date-day='"+festivita+"']");
          if (giornoFesta) {
            giornoFesta.addClass("red").append(" "+tipoFesta);
          }
          // console.log(giornoFesta);

        }

      },
      error:function(){
        alert("Si è verificato un errore")
      }
    })

  }

  ggMese(4);

  // $("#prima").click(function(){
  //
  //   ggMese(3);
  //
  // })
  //
  // $("#dopo").click(function(){
  //
  //   ggMese(5);
  //
  // })



})
