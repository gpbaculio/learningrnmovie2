import { API_KEY } from "./config";

interface Genres {
  12: string;
  14: string;
  16: string;
  18: string;
  27: string;
  28: string;
  35: string;
  36: string;
  37: string;
  53: string;
  80: string;
  99: string;
  878: string;
  9648: string;
  10402: string;
  10749: string;
  10751: string;
  10752: string;
  10770: string;
}

interface ResultType {
  id: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  overview: string;
  release_date: string;
  genre_ids: (keyof Genres)[];
}

interface ResultstType {
  results: ResultType[];
}

interface ResponseType {
  key: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: string;
  description: string;
  releaseDate: string;
  genres: string[];
}

const genres: Genres = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  27: "Horror",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "TV Movie",
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async (): Promise<ResponseType[]> => {
  const { results }: ResultstType = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );
  return movies;
};
