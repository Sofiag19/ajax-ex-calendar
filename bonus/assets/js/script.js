// inizializzo il mese
var meseCorrente = 1;

// fare una funzione che abbia come paramentro il numero del mese che parte da zero(1)
function ggMese(month){
  // quanti giorni nel mese
  var giorniInMese = moment("2018-"+month,"YYYY-MM").daysInMonth();
  // console.log(giorniInMese);

  // ciclo per stampare in html
  var i = 1;
  while (i <= giorniInMese) {

    // definizione data completa
    var date = moment("2018-"+month+"-"+i, "YYYY-MM-D").format("YYYY-MM-DD");
    // console.log(date);

    // giorno della settimana relativo al giorno e nome mese
    var giornoSett = moment(date).format("DD ddd");
    // console.log(giornoSett);

    // giorno della settimana
    var dayWeek = moment(date).format("e");
    // console.log(dayWeek);

    // stampa elenco con nuovo attributo
    var copiaTempl = $("#hb-cella").html();
    var templReady = Handlebars.compile(copiaTempl);
    var createObj = {printDate : giornoSett, attrday: date, ggsett: dayWeek };
    var createEl = templReady(createObj);
    $(".griglia-mese").append(createEl);

    // colorazione differente domenica
    var domenica = $(".cella-giorno[ggsett='6']");
    if (domenica){
      domenica.addClass("pink");
    }


    // si parte dal lunedì
    // var lunedi = $(".cella-giorno[ggsett='0']");
    // console.log(lunedi);

    // console.log($(".cella-giorno[ggsett]"));

    // stampa nome meseCorrente
    $("#mese").empty();
    var mese = moment("2018-"+month,"YYYY-MM").format("MMMM");
    $("#mese").text(mese).addClass("capitalize");

    i++;
  }
  var primoGg= $(".cella-giorno:first-of-type").attr("ggsett");
  // console.log(primoGg);
  if (primoGg == 1) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
  } else if (primoGg == 2) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");

  }else if (primoGg == 3) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");

  } else if (primoGg == 4) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");

  }else if (primoGg == 5) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");

  } else if (primoGg == 6) {
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");
    $(".griglia-mese").prepend("<div class='cella-vuota'></div>");

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

        var giornoFesta = $(".cella-giorno[data-day='"+festivita+"']");
        // console.log(giornoFesta);
        if (giornoFesta) {
          giornoFesta.addClass("red");
          giornoFesta.find(".festa").append(" "+tipoFesta);
        }
      }

    },
    error:function(){
      alert("Si è verificato un errore")
    }
  })

}
$(document).ready(function(){


  ggMese(meseCorrente);

  $("#prima").click(function(){
    if (meseCorrente == 1) {
      meseCorrente = 12;
      $("div[data-day]").remove();
      $("div.cella-vuota").remove();
      ggMese(meseCorrente);
    }else {
      meseCorrente--;
      $("div[data-day]").remove();
      $("div.cella-vuota").remove();
      ggMese(meseCorrente);
    }
  })

  $("#dopo").click(function(){
    if (meseCorrente == 12) {
      meseCorrente = 1;
      $("div[data-day]").remove();
      $("div.cella-vuota").remove();
      ggMese(meseCorrente);
    } else {
      meseCorrente++;
      $("div[data-day]").remove();
      $("div.cella-vuota").remove();
      ggMese(meseCorrente);
    }

  })



})
