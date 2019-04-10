'use strict';

const baseUrl = 'https://tastedive.com/api/similar';
const key = '333241-KhariRiv-IRPUEHGK';

/*______________________________________________________
                        MUSIC TAB
________________________________________________________*/

function musicForm(){
  $('#music-form').submit(event =>{
    event.preventDefault();
    console.log('music submitted');
    const newTaste = $('#js-music-taste').val();
    taste.music.push(newTaste);

    console.log(taste.music.join(','));

    const section = '#music-results';
    const params = {
      q: taste.music.join(','),
      type: 'music',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };

    getSugg(params, section);
  });
}
/*______________________________________________________
                        SHOWS TAB
________________________________________________________*/
  
function showsForm(){
  $('#show-form').submit(event =>{
    event.preventDefault();
    console.log('shows submitted');
    const newTaste = $('#js-show-taste').val();
    taste.shows.push(newTaste);
  
    console.log(taste.shows.join(','));
  
    const section = '#show-results';
    const params = {
      q: taste.shows.join(','),
      type: 'shows',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };
  
    getSugg(params, section);
  });
}

/*______________________________________________________
                        MOVIES TAB
________________________________________________________*/
    
function moviesForm(){
  $('#movie-form').submit(event =>{
    event.preventDefault();
    console.log('movies submitted');
    const newTaste = $('#js-movie-taste').val();
    taste.movies.push(newTaste);
    
    console.log(taste.movies.join(','));

    const section = '#movie-results';
    const params = {
      q: taste.movies.join(','),
      type: 'movies',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };
    
    getSugg(params, section);
  });
}

/*______________________________________________________
                        BOOK TAB
________________________________________________________*/

    
function booksForm(){
  $('#book-form').submit(event =>{
    event.preventDefault();
    console.log('books submitted');
    const newTaste = $('#js-book-taste').val();
    taste.books.push(newTaste);
    
    console.log(taste.books.join(','));
    
    const section = '#book-results';
    const params = {
      q: taste.books.join(','),
      type: 'books',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };
    
    getSuggAlt(params, section);
  });
}

/*______________________________________________________
                        AUTHORS TAB
________________________________________________________*/

    
function authorsForm(){
  $('#author-form').submit(event =>{
    event.preventDefault();
    console.log('authors submitted');
    const newTaste = $('#js-author-taste').val();
    taste.authors.push(newTaste);
    
    console.log(taste.authors.join(','));
    
    const section = '#author-results';
    const params = {
      q: taste.authors.join(','),
      type: 'authors',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };
    
    getSuggAlt(params, section);
  });
}

/*______________________________________________________
                        GAMES TAB
________________________________________________________*/

    
function gamesForm(){
  $('#game-form').submit(event =>{
    event.preventDefault();
    console.log('games submitted');
    const newTaste = $('#js-game-taste').val();
    taste.games.push(newTaste);
    
    console.log(taste.games.join(','));
    
    const section = '#game-results';
    const params = {
      q: taste.games.join(','),
      type: 'games',
      info: 1,
      limit: 5,
      format: 'json',
      k: key
    };
    
    getSugg(params, section);
  });
}
/*______________________________________________________
                        API Calls
________________________________________________________*/
function getSugg(params, section){
  $.ajax({
    url: baseUrl,
      
    jsonp: 'callback',
      
    dataType: 'jsonp',
      
    data: params,
      
    success: function(response){
      console.log(response);
      populate(response, section);
    }
  }); 
}

function getSuggAlt(params, section){
  $.ajax({
    url: baseUrl,
      
    jsonp: 'callback',
      
    dataType: 'jsonp',
      
    data: params,
      
    success: function(response){
      for(let i=0; i<response.Similar.Results.length; i++){
        getCover(response.Similar.Results[i], section);
      }
    }
  });
}

function getCover(item, section){
  const params = {
    cx: '011351822505368343680:lpxwsruoxny',
    key: 'AIzaSyAM35hc9FInCfrhcbkIqrkEFGM5YnzYUYU',
    q: `${item.Name} book`,
    prettyPrint: true,
    searchType: 'image',
    num: 1
  };
  const queryString = formatQueryParams(params);
  const url = 'https://www.googleapis.com/customsearch/v1?' + queryString;

  return fetch(url)
    .then(response => {
      if(response.ok) return response.json();
      else throw new Error(response.statusText);
    })
    .then(data => {
      let cover = data.items[0].image.thumbnailLink;

      const itemHTML = `<div class="sugg"><h2>${item.Name}</h2>
        <img alt="${item.Name}" src="${cover}"></ br>
        <p>${item.wTeaser}</p></div>`;
      return itemHTML;
    })
    .then(webItem => {
      $(section).append(webItem);
    })
    .catch(err => {
      console.log(err.message);
    });
}
/*______________________________________________________
                        HTML GENERATION
________________________________________________________*/
function populate(response, section){
  $(section).empty();
  if(!response.Similar.Results.length){
    $(section).append('<h1>No results found</h1>');

  }
  else for(let i=0; i<response.Similar.Results.length; i++){
    $(section).append(generateHTML(response.Similar.Results[i]));
  }
}

function generateHTML(item){
  const itemHTML = `<div class="sugg"><h2>${item.Name}</h2>
    <iframe width="420" height="315"
        src="${item.yUrl}">
    </iframe></ br>
    <p>${item.wTeaser}</p></div>`;
  console.log(itemHTML);
  return itemHTML;
}


function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => 
    `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);    
  return queryItems.join('&');
}




/*_______________________________________________________ 
                User interaction
_______________________________________________________ */

function navigate(){
  $('.menu').on('click', 'li', function(event){
    console.log('\'navigate\' ran');
  
    var tab = event.currentTarget;
    $('ul.menu').find('li.current').removeClass('current');
    $(tab).addClass('current');
    $('.menu').removeClass('active');
    //console.log(tab);
  });
}

function menuToggle(){
  $('#hamburger').on('click', function(event){
    console.log('menu toggled');
    event.preventDefault();
    $('.menu').toggleClass('active', { direction: 'left' }, 1000);
  });
}


$(function (){
  musicForm();
  showsForm();
  moviesForm();
  booksForm();
  authorsForm();
  gamesForm();
  navigate();
  menuToggle();
});