const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzk5ZDNkOTkyN2ZmZjZhMzk5MjdhMDZkNjFhNDRhZiIsInN1YiI6IjY0NzViNGEzZGQyNTg5MDBlMjBjYjZhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bi1e5A7NcsbeFyfdrKSbYSD1oBwJFEU0pk0OVi1lypU'
  }
};

const moviesContainer = document.getElementById('movies');

// 영화 정보 카드를 생성하는 함수
function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('card');

  const movieImage = document.createElement('img');
  movieImage.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  movieImage.alt = movie.title;
  movieImage.classList.add('card-image');

  const movieTitle = document.createElement('div');
  movieTitle.classList.add('card-title');
  movieTitle.textContent = movie.title;

  const movieOverview = document.createElement('div');
  movieOverview.classList.add('card-text');
  movieOverview.textContent = movie.overview;

  const movieAverage = document.createElement('div');
  movieAverage.classList.add('card-average');
  movieAverage.textContent = "평점 - " + movie.vote_average;

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieOverview);
  movieCard.appendChild(movieAverage)


  // 영화 포스터 클릭 시 팝업으로 id 보여주기
  movieImage.addEventListener('click', () => {
    alert(`영화 ID: ${movie.id}`);
  });

  return movieCard;
}

// API 요청 및 영화 정보 카드 생성
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    const movies = response.results;
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });
  })
  .catch(err => console.error(err));

// 영화 검색 기능 구현
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

function fetchMovies(url) {
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      const movies = response.results; 

      // 기존의 영화 카드 제거
      moviesContainer.innerHTML = ''; 
      movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
      });
    })
    .catch(err => console.error(err));
}

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US&page=1&include_adult=false`;
  if (searchTerm.trim() !== '') {
    fetchMovies(searchUrl);
  } else {
    const initialUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    fetchMovies(initialUrl); 
  }
});