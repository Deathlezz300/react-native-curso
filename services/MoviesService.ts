import MoviesApi from "@/api/MoviesApi";
import { IMovie, INowPlayingResponse } from "@/interface";
import MovieMapper from "@/Mappers/MovieMapper";

class MoviesService {
  static async getNowPlayingMovies(page = 1): Promise<IMovie[] | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/now_playing?page=${page}`
      );

      return response.data.results.map(MovieMapper.fromMovieDBToMovie);
    } catch (error) {
      return null;
    }
  }

  static async getPopularMovies(page = 1): Promise<IMovie[] | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/popular?page=${page}`
      );

      return response.data.results.map(MovieMapper.fromMovieDBToMovie);
    } catch (error) {
      return null;
    }
  }

  static async getTopRatedMovies(page = 1): Promise<IMovie[] | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/top_rated?page=${page}`
      );

      return response.data.results.map(MovieMapper.fromMovieDBToMovie);
    } catch (error) {
      return null;
    }
  }

  static async getUpcomingMovies(page = 1): Promise<IMovie[] | null> {
    try {
      const response = await MoviesApi.get<INowPlayingResponse>(
        `/upcoming?page=${page}`
      );

      return response.data.results.map(MovieMapper.fromMovieDBToMovie);
    } catch (error) {
      return null;
    }
  }
}

export default MoviesService;
