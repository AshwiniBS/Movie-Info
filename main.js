$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let srcTxt = $("#searchText").val();
    getMovies(srcTxt);
    e.preventDefault();
  });
});

function getMovies(srcTxt) {
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=5961ee750912881d005267d938745ff3&language=en-US&query=" + srcTxt + "&page=1&include_adult=false")
    .then((response) => {
    console.log(response.data.results[0]);
    let movies = response.data.results;
    let result = "";
    $.each(movies, (i, movie) => {
      result += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="thumbnail">
            <h5>${movies[i].title}</h5>
            <a class="btn btn-primary" onclick="movieSelected(${movies[i].id})" href="#">Movie Details</a>
          </div>
        </div>
      `;
    });
    $("#movies").html(result);
  })
    .catch((err) => {
      console.log(error);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
  }

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=5961ee750912881d005267d938745ff3")
    .then((response) => {
    console.log(response);
    let movie = response.data;
    
    let result = `
      <div class="row">
          <div class="col-md-4 responsive-img">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8 truncate card-panel hoverable">
            <h3>${movie.original_title}</h3>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="index.html" class="btn btn-default purple darken-3 waves-effect waves-light"><i class="fas fa-chevron-circle-left"></i> Go Back To Search</a>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary blue darken-3 waves-effect waves-light">View IMDB <i class="fas fa-chevron-circle-right"></i></a>
            
          </div>
        </div>
    `;
    
    $("#movie").html(result);
  })
    .catch((err) => {
      console.log(err);
    });
}