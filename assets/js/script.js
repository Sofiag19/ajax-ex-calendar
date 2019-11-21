// Per oggi però “solo” MIlestone:
// stampare gennaio 2018 (E SOLO QUELLO) con caratterizzazione delle relative festività, recuperate interrogando l’API
//  STEP:
// Controllare quanti giorni ha il mese  formando così una lista;
// Chiedere all’api quali sono le festività per il mese ;
// Evidenziare le festività nella lista

$(document).ready(function(){

    // quanti giorni nel mese
    var giorniGenn2018 = moment("2018-01","YYYY-MM").daysInMonth();
    // console.log(giorniGenn2018);

    // ciclo per stampare
    var giorno;
    var i = 1;

    while (i <= giorniGenn2018) {

      // definizione data completa
      var date = moment("2018-01-"+i, "YYYY-MM-D").format("YYYY-MM-DD");
      // console.log(date);

      // giorno della settimana relativo al giorno e nome mese
      var giornoSettMese = moment(date).format("DD dddd MMMM");
      // console.log(giornoSett);

      // stampa elenco con nuovo attributo
      $("#elencoGiorni").append("<li date-day='"+ date +"'>"+giornoSettMese+"</li>");

      i++;
    }

    $.ajax({
        url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method:'GET',
        success: function(feste){
          var respo = feste.response;
          console.log(respo);

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
            console.log(giornoFesta);

          }

        },
        error:function(){
          alert("Si è verificato un errore")
        }
    })





})
