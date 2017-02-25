window.onload = documentLoadedHandler;
var searchInput = null;
var searchButton = null;
var searchResults = null;

function documentLoadedHandler () {
  setElements();
  searchButton.addEventListener('click', searchGifs);
}

function setElements () {
  searchInput = document.querySelector('.search__input');
  if (searchInput === null) {
    throw new Error ('could not find search input');
  }
  searchButton = document.querySelector('.search__btn');
  if (searchButton === null) {
    throw new Error ('could not find search button');
  }
  searchResults = document.querySelector('.gifs');
  if (searchResults === null) {
    throw new Error ('could not find search results');
  }
}

function searchGifs () {
  var myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if ( myRequest.readyState === 4 && myRequest.status === 200 ) {
      var response = JSON.parse(myRequest.responseText);

      for (var i = 0; i < response.data.length; i++) {
        var gif = response.data[i];
        var gifUrl = gif.images.original.url
        // console.log(gifUrl);

        var img = document.createElement('img');
         img.src = gifUrl;
        //  console.log(img);
        searchResults.appendChild(img);
        // console.log(response.data[i]);
      }
    }
  };
  myRequest.open('GET', 'http://api.giphy.com/v1/gifs/search?q=' + searchInput.value + '&limit=8' +'&api_key=dc6zaTOxFJmzC');
  myRequest.send();
}
