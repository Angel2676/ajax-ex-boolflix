// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto




$(document).ready(function(){



    //  1 Step - Creazione searchbar che al click prende il valore
            $("button#button").click(function(){
                attiva()
            }) // Fine funzione
            $("#valoriInput").keydown(function(){
                if (event.which==13 || event.keyCode==13) {
                    attiva()
                }

            }) // fine keydown
}); // Fine document


// ************FUNZIONI**************

        function attiva(){ // Chiudere funzione
            var input = $("#valoriInput").val();
            $("#lista").empty();
            // console.log(input); // Passaggio ok

            $.ajax(
                {
            url: "https://api.themoviedb.org/3/search/movie",
            method : "GET",
            data: {
                api_key : "86441f8205c2837900332bf796f193e9",
                query: input,
                language: "it-IT"

                    }, // fine data

            success: function(risposta){
        for (var i = 0; i < risposta.results.length; i++) {
            var source = $("#entry-template").html();
            var template = Handlebars.compile(source);
            var context =
                        {
                            title: risposta.results[i].title,
                            original_title : risposta.results[i].original_title,
                            original_language : risposta.results[i].original_language,
                            vote_average : risposta.results[i].vote_average,


                        };
            var html = template(context);
            $("#lista").append(html);



            } // fine del for
        }, // Fine success function
            error: function(){
                alert("Si è verificato un errore");
                }
    }); // Fine ajax

    }; // fine presa valore
