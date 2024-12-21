import { IResult, IMovie, IMovieDetails, CompleteMovie } from "@/interface";

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

  static fromTheMovieDBToCompleteMovie(movieDB:IMovieDetails):CompleteMovie{
    return {
      id: movieDB.id,
      title: movieDB.title,
      description: movieDB.overview,
      releaseDate: new Date(movieDB.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movieDB.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movieDB.backdrop_path}`,
      rating: movieDB.vote_average,
      budget:movieDB.budget,
      duration:movieDB.runtime,
      generes:movieDB.genres.map((genre)=>genre.name),
      originalTitle:movieDB.original_title,
      productionCompanies:movieDB.production_companies.map((company)=>company.name),
    }
  }

}

export default MovieMapper;
