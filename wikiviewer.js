$(document).ready(function(){


//event listener that generates a random Wiki page (opens in new window)
/*$('#randomButton').on('click', function(e){

  function openRandomPage(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  }
  openRandomPage();

});*/

//button that generates random wiki page content
$('#randomButton').on('click', function(e){
  //$(this).animate({translate(10)},500);
  getRandomArticle();

});

//button that clears the results generated
$('#clearButton').on('click', function(e){
  clearResults();
});

//button that returns search results
$('#searchButton2').on('click', function(e){
  searchArticle();
});

//function to clear results
function clearResults(){
  $('.article').fadeOut(400);
}

//function to generate a random Wiki page content below content area
//need to implement function that removes previously generated result
function getRandomArticle(){
$.ajax({
  type:"GET",
  url:"https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=8&format=json",
  dataType:"jsonp",
  beforeSend: function(){
    $('#searchResults').append('<div class="loader">Loading...</div');
  },
  success: function(data){
    //console.log(data.query.random[0].id);
    $('.loader').fadeOut(400);
    $('.article').fadeOut(400);
    $(data.query.random).each(function(x){
      $('#searchResults').append('<div class="article">' + /*'<h4 class="title">' + data.query.random[x].title +'</h4>'+ '<br/>'+*/'<a href="https://en.wikipedia.org/?curid='+ data.query.random[x].id +'" class="randomLink">'+ data.query.random[x].title+'</a>' + '</div>');
      //$('#searchResults').append('<div class="article">' + '<p>'+ data.query.random[x].id + '</p>'+'</div>');
    });
  },
  error: function(){
    console.log("unable to retrieve datas");
  }
});
}

//function to generate a page specific to search terms
function searchArticle(){
  var searchValue=$('#searchBar2').val().replace(/\s/gi, '%20');
  //console.log(searchValue);
$.ajax({
  type:"GET",
  url:"https://en.wikipedia.org/w/api.php?action=query&list=search&srwhat=text&format=json&srsearch=" + encodeURIComponent(searchValue),
  //url:"https://en.wikipedia.org/w/api.php?action=query&list=search&srwhat=text&format=json&srsearch=iron%20man",
  dataType:"jsonp",
  beforeSend: function(){
    $('#searchResults').append('<div class="loader">Loading...</div');
  },
  success: function(data){
    /*console.log(data.query.search[0].title);
    console.log(data.query.search[0].wordcount);
    console.log(data.query.search[3].title);
    console.log(data.query.search[3].wordcount);
    console.log(data.query.search);*/
    $('.loader').fadeOut(400);
    $('.article').fadeOut(400);
    $(data.query.search).each(function(y){
      /*$('#searchResults').append('<div class="article">' + '<h4 class="title">' + data.query.search[y].title +'</h4>'+ '<br/>'+'<a href="https://en.wikipedia.org/wiki/'+ data.query.search[y].title +'" class="randomLink">'+ data.query.search[y].title+'</a>'+ '</div>');*/
      //$('#searchResults').append('<div class="article">' + '<p>'+ data.query.random[x].id + '</p>'+'</div>');
      $('#searchResults').append('<div class="article">' + '<a href="https://en.wikipedia.org/wiki/'+ data.query.search[y].title +'" class="searchLink">'+ data.query.search[y].title+'</a>'+ '<br/>' + '<p>'+ data.query.search[y].snippet + '</p>' + '</div>');
    });
  },
  error: function(){
    console.log("unable to retrieve data");
  }
});
}

});
