import MoviesApi from "@/api/MoviesApi";
import {
  CompleteMovie,
  IMovie,
  IMovieDetails,
  INowPlayingResponse,
} from "@/interface";
import MovieMapper from "@/Mappers/MovieMapper";

interface IMoviesResponse {
  Movies: IMovie[];
  nextPage: number | null;
}

class MoviesService {
  static async getNowPlayingMovies(page = 1): Promise<IMoviesResponse | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/now_playing?page=${page}`
      );

      return {
        Movies: response.data.results.map(MovieMapper.fromMovieDBToMovie),
        nextPage: page + 1,
      };
    } catch (error) {
      return null;
    }
  }

  static async getPopularMovies(page = 1): Promise<IMoviesResponse | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/popular?page=${page}`
      );

      return {
        Movies: response.data.results.map(MovieMapper.fromMovieDBToMovie),
        nextPage: page + 1,
      };
    } catch (error) {
      return null;
    }
  }

  static async getTopRatedMovies(page = 1): Promise<IMoviesResponse | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/top_rated?page=${page}`
      );

      return {
        Movies: response.data.results.map(MovieMapper.fromMovieDBToMovie),
        nextPage: page + 1,
      };
    } catch (error) {
      return null;
    }
  }

  static async getUpcomingMovies(page = 1): Promise<IMoviesResponse | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/upcoming?page=${page}`
      );

      return {
        Movies: response.data.results.map(MovieMapper.fromMovieDBToMovie),
        nextPage: page + 1,
      };
    } catch (error) {
      return null;
    }
  }

  static async getMovieDetails(id: number): Promise<CompleteMovie> {
    try {
      const response = await MoviesApi.get<IMovieDetails>(
        `/${id}?language=en-US`
      );

      
      return MovieMapper.fromTheMovieDBToCompleteMovie(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export default MoviesService;
