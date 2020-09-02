// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto




$(document).ready(function(){
        $("button#button").click(function(){
            attiva()
        })
        $("#valoriInput").keydown(function(){
            if (event.which==13 || event.keyCode==13) {
                attiva()
        }
    })
});

// ************FUNZIONI**************
        function attiva(){
            var input = $("#valoriInput").val();
            $("#lista").empty();
            $.ajax(
                {
            url: "https://api.themoviedb.org/3/search/movie",
            method : "GET",
            data: {
                api_key : "86441f8205c2837900332bf796f193e9",
                query: input,
                language: "it-IT"
                    },
            success: function(risposta){
                for (var i = 0; i < risposta.results.length; i++) {
                var source = $("#entry-template").html();
                var template = Handlebars.compile(source);
                var context =
                        {
                            title: "TITOLO: " + risposta.results[i].title,
                            original_title : "TITOLO ORIGINALE " + risposta.results[i].original_title,
                            original_language : "LINGUA " + risposta.results[i].original_language,
                            vote_average : "VOTO " + risposta.results[i].vote_average,
                        };
                var html = template(context);
                $("#lista").append(html);
                $("#valoriInput").val(" ");
                }
            },
            error: function(){
                alert("Si è verificato un errore");
                }
            });

};
