export function filterByNameMovie(movies, name) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(name.toLowerCase());
  });
}

export function filterMovieDuration(movies) {
  return movies.filter((movie) => {
    return movie.duration <= 40;
  });
}
