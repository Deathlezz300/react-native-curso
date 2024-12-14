import { IResult, IMovie } from "@/interface";

class MovieMapper {
  static fromMovieDBToMovie(movieDB: IResult): IMovie {
    return {
      id: movieDB.id,
      title: movieDB.title,
      description: movieDB.overview,
      releaseDate: new Date(movieDB.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movieDB.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movieDB.backdrop_path}`,
      rating: movieDB.vote_average,
    };
  }
}

export default MovieMapper;
