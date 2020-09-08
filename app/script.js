// *******Milestone 1
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto
// // ***************SECONDA MILESTONE****************
// // Milestone 2:
// // ******STEP 1 **************
// // Trasformiamo il voto da 1 a 10 decimale
// // in un numero intero da 1 a 5,
// // così da permetterci di stampare a schermo
// // un numero di stelle piene che vanno da 1 a 5,
// // lasciando le restanti vuote
// // (troviamo le icone in FontAwesome).
//
// // ******STEP 2 **************
// // Arrotondiamo sempre per eccesso all’unità successiva,
// // non gestiamo icone mezze piene (o mezze vuote :P)
//
// // ******STEP 3 **************
// // Trasformiamo poi la stringa statica della lingua in una
// //vera e propria bandiera della nazione corrispondente,
// // gestendo il caso in cui non abbiamo la bandiera della nazione
// //  ritornata dall’API (le flag non ci sono in FontAwesome).
//
// // ******STEP 4 **************
// // Allarghiamo poi la ricerca anche alle serie tv.
// // Con la stessa azione di ricerca dovremo prendere sia i film che
// // corrispondono alla query, sia le serie tv, stando attenti ad avere
// // alla fine dei valori simili (le serie e i film hanno campi nel JSON
// // di risposta diversi, simili ma non sempre identici)
// // Qui un esempio di chiamata per le serie tv:
// // https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs



$(document).ready(function(){
    $("#button").click(function(){
        init();
    });

    $("#valoriInput").keydown(function(){
        if (event.which == 13 || event.keyCode == 13) {
        init();
    }
    });

}); // Fine JQuery


// // *********FUNZIIONI*****************
    // 1 FUNCTION - CLICK E keydown
function init(){
    var queryInput = $("#valoriInput").val(); // preso valore
    reset();
    var url1 = "https://api.themoviedb.org/3/search/movie";
    var url2 = "https://api.themoviedb.org/3/search/tv";
    chiamata(queryInput,url1,"Film");
    chiamata(queryInput,url2,"Tv");

};

    // 2 FUNCTION - CHIAMATA JSON
function chiamata(data,url,type){
        $.ajax(
            {
            url: url,
            method: "GET",
            data:
            {
                api_key: "86441f8205c2837900332bf796f193e9",
                query: data,
                language: "it-IT"

            },
            success: function(risposta){
                if (risposta.total_results > 0 ) {
                    printResult(risposta.results,type);

                } else {
                    noResult(type);
                }

            },
            error: function(){
                alert("CI sono errori")
            }
        }
    );
};

// Viene presa una sola chimamata API success
// function insertTv(data){
//         $.ajax({
//             url:"https://api.themoviedb.org/3/search/tv",
//             method: "GET",
//             data:
//             {
//                 api_key: "86441f8205c2837900332bf796f193e9",
//                 query: data,
//                 language: "it-IT"
//
//             },
//             success: function(risposta){
//                 if (risposta.total_results > 0 ) {
//                     printResult(risposta.results,"Tv");
//
//                 } else{
//                     noResult("Tv")
//                 }
//
//             },
//             error: function(){
//                 alert("CI sono errori")
//             }
//         }
//     );
// };

// **************FUNZIONI************
// 1 FUNZIONE - SUCCESS DELL'API
function printResult(data,type){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var immagini = " ";
    var imagePath = "https://image.tmdb.org/t/p/w342"
        for (var i = 0; i < data.length; i++) {
        if (type == "Film") {
            var title = data[i].title;
            var original_title = data[i].original_title;
            var immagini = data[i].poster_path;

        } else if (type == "Tv") {
            var title = data[i].name;
            var original_title = data[i].original_name;
            var immagini = data[i].backdrop_path
        }
        var context = {
            tipo: type,
            title: title,
            original_title: original_title,
            original_language: flag(data[i].original_language),
            vote_average: starS(data[i].vote_average),
            image: getImage(immagini,imagePath),
            overview: data[i].overview.substring(0,250) + "[......]"


        };
        var html = template(context);
        if (type == "Film") {
        $("#covers-film").append(html);
        } else if (type == "Tv") {
        $("#covers-tv").append(html);
        }

        }
};
// Funzione no image
function getImage(path, prefix) {
    var img;
    if (path == null) {
        img = "https://i.ibb.co/hKqm2mZ/Untitled-1.png";
    } else {
        img = prefix + path
    }
    return img
}


// 2 FUNZIONE - FUNZIONE DI NON RISULTATI
function noResult(type){
    var source = $("#no-result-template").html();
    var template = Handlebars.compile(source);
    var context = {
        noResult : "Non ci sono risultati nella sezione " + type,
    };
    var html = template(context);
    if (type == "Film") {
        $("#covers-film").append(html);
    } else if(type== "Tv") {
        $("#covers-tv").append(html);
    }

};

// 3 FUNZIONE - SVOUTAMENTO CAMPO INPUT CON VAL E SVUOTAMENTO COVERS
function reset(){
    $("#covers-film").empty();
    $("#covers-tv").empty();
    $("#valoriInput").val(" "); // preso valore
};

// 4 FUNZIONE - GENERAZIONE DELLE STELLINE
function starS(stella){
    var arrow  = "";
    var resto = stella % 2
    stella = Math.floor(stella/2);
    for (var i = 0; i < 5; i++) {
        if (i < stella) {
            arrow += '<i class="fas fa-star"></i>';
        } else if (resto != 0) {
            arrow += '<i class="fas fa-star-half-alt"></i>';
            resto = 0;
        } else {
            arrow += '<i class="far fa-star"></i>';
        }

    } return arrow
};

// 5 FUNZIONE - BANDIERINE

function flag(lingua){
    var language =["en","it"];
    if (language.includes(lingua)){
        return '<img src="img/'+lingua+'.svg"class="flag">';
    }
    return lingua;

};
