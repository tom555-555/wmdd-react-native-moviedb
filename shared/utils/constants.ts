export const API_ENDPOINTS = {
  MOVIE: {
    GET_MOVIES: "/discover/movie",
    GET_MOVIES_BY_NOW_PLAYING: "/movie/now_playing",
    GET_MOVIES_BY_POPULAR: "/movie/popular",
    GET_MOVIES_BY_TOP_RATED: "/movie/top_rated",
    GET_MOVIES_BY_UPCOMING: "/movie/upcoming",
  },
  TV_SHOW: {
    GET_TV_SHOWS: "/discover/tv",
    GET_TV_SHOWS_BY_AIRING_TODAY: "/tv/airing_today",
    GET_TV_SHOWS_BY_ON_THE_AIR: "/tv/on_the_air",
    GET_TV_SHOWS_BY_POPULAR: "/tv/popular",
    GET_TV_SHOWS_BY_TOP_RATED: "/tv/top_rated",
  },
  SEARCH: {
    SEARCH_MOVIES: "/search/movie",
    SEARCH_TV_SHOWS: "/search/tv",
    SEARCH_MULTI: "/search/multi",
  },
  GET_MOVIE_DETAIL: (id: string) => `/movie/${id}`,
  GET_TV_SHOW_DETAIL: (id: string) => `/tv/${id}`,
};

export const API_ROOT = "https://api.themoviedb.org/3";
export const IMAGE_ROOT = "https://image.tmdb.org/t/p/w500";

export const MOVIE_SEARCH_BY_MAP = {
  now_playing: API_ENDPOINTS.MOVIE.GET_MOVIES_BY_NOW_PLAYING,
  popular: API_ENDPOINTS.MOVIE.GET_MOVIES_BY_POPULAR,
  top_rated: API_ENDPOINTS.MOVIE.GET_MOVIES_BY_TOP_RATED,
  upcoming: API_ENDPOINTS.MOVIE.GET_MOVIES_BY_UPCOMING,
};

export const TV_SHOW_SEARCH_BY_MAP = {
  airing_today: API_ENDPOINTS.TV_SHOW.GET_TV_SHOWS_BY_AIRING_TODAY,
  on_the_air: API_ENDPOINTS.TV_SHOW.GET_TV_SHOWS_BY_ON_THE_AIR,
  popular: API_ENDPOINTS.TV_SHOW.GET_TV_SHOWS_BY_POPULAR,
  top_rated: API_ENDPOINTS.TV_SHOW.GET_TV_SHOWS_BY_TOP_RATED,
};

export const SEARCH_BY_MAP = {
  movies: API_ENDPOINTS.SEARCH.SEARCH_MOVIES,
  tv_shows: API_ENDPOINTS.SEARCH.SEARCH_TV_SHOWS,
  multi: API_ENDPOINTS.SEARCH.SEARCH_MULTI,
};
