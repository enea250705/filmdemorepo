/**
 * Movie API Configuration and Management
 * This file contains all movie data and API integration functions
 */

'use strict';

/**
 * Extended Movie Database with more movies
 */
const MOVIE_DATABASE = {
  baseUrl: 'https://player.autoembed.cc/embed/movie/',
  tmdbApiKey: '8965fbadc030be023610b3b57f7ad1d9',
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  // Note: autoembed.cc uses TMDb IDs (numbers) not IMDb IDs (tt format)
  
  // Popular Movies (using TMDb IDs for autoembed.cc)
  movies: [
    // Action Movies
    { id: '759175', title: 'The Northman', year: 2022, genre: 'Action, Drama', rating: 8.5, duration: '137 min', quality: 'HD', poster: './assets/images/upcoming-1.png' },
    { id: '453395', title: 'Doctor Strange in the Multiverse of Madness', year: 2022, genre: 'Action, Adventure', rating: 8.0, duration: '126 min', quality: '4K', poster: './assets/images/upcoming-2.png' },
    { id: '985939', title: 'Memory', year: 2022, genre: 'Action, Thriller', rating: 7.2, duration: 'N/A', quality: '2K', poster: './assets/images/upcoming-3.png' },
    { id: '648579', title: 'The Unbearable Weight of Massive Talent', year: 2022, genre: 'Action, Comedy', rating: 7.0, duration: '107 min', quality: 'HD', poster: './assets/images/upcoming-4.png' },
    { id: '675353', title: 'Sonic the Hedgehog 2', year: 2022, genre: 'Action, Adventure', rating: 7.8, duration: '122 min', quality: '2K', poster: './assets/images/movie-1.png' },
    { id: '526896', title: 'Morbius', year: 2022, genre: 'Action, Adventure', rating: 5.9, duration: '104 min', quality: 'HD', poster: './assets/images/movie-2.png' },
    { id: '696806', title: 'The Adam Project', year: 2022, genre: 'Action, Adventure', rating: 7.0, duration: '106 min', quality: '4K', poster: './assets/images/movie-3.png' },
    { id: '550988', title: 'Free Guy', year: 2021, genre: 'Action, Adventure', rating: 7.7, duration: '115 min', quality: '4K', poster: './assets/images/movie-4.png' },
    { id: '414906', title: 'The Batman', year: 2022, genre: 'Action, Crime', rating: 7.9, duration: '176 min', quality: '4K', poster: './assets/images/movie-5.png' },
    { id: '335787', title: 'Uncharted', year: 2022, genre: 'Action, Adventure', rating: 7.0, duration: '116 min', quality: 'HD', poster: './assets/images/movie-6.png' },
    { id: '505026', title: 'Death on the Nile', year: 2022, genre: 'Crime, Drama', rating: 6.5, duration: '127 min', quality: '2K', poster: './assets/images/movie-7.png' },
    { id: '476669', title: 'The King\'s Man', year: 2021, genre: 'Action, Adventure', rating: 7.0, duration: '131 min', quality: 'HD', poster: './assets/images/movie-8.png' },
    
    // Additional Popular Movies (TMDb IDs)
    { id: '299534', title: 'Avengers: Endgame', year: 2019, genre: 'Action, Adventure', rating: 8.4, duration: '181 min', quality: '4K', poster: './assets/images/movie-1.png' },
    { id: '299536', title: 'Avengers: Infinity War', year: 2018, genre: 'Action, Adventure', rating: 8.4, duration: '149 min', quality: '4K', poster: './assets/images/movie-2.png' },
    { id: '284054', title: 'Black Panther', year: 2018, genre: 'Action, Adventure', rating: 7.3, duration: '134 min', quality: '4K', poster: './assets/images/movie-3.png' },
    { id: '299537', title: 'Captain Marvel', year: 2019, genre: 'Action, Adventure', rating: 6.8, duration: '123 min', quality: '4K', poster: './assets/images/movie-4.png' },
    { id: '497698', title: 'Black Widow', year: 2021, genre: 'Action, Adventure', rating: 6.7, duration: '134 min', quality: '4K', poster: './assets/images/movie-5.png' },
    { id: '524434', title: 'Eternals', year: 2021, genre: 'Action, Adventure', rating: 6.3, duration: '156 min', quality: '4K', poster: './assets/images/movie-6.png' },
    { id: '566525', title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, genre: 'Action, Adventure', rating: 7.4, duration: '132 min', quality: '4K', poster: './assets/images/movie-7.png' },
    { id: '634649', title: 'Spider-Man: No Way Home', year: 2021, genre: 'Action, Adventure', rating: 8.2, duration: '148 min', quality: '4K', poster: './assets/images/movie-8.png' },
    
    // Comedy Movies (TMDb IDs)
    { id: '8961', title: 'Twilight', year: 2008, genre: 'Drama, Fantasy', rating: 5.2, duration: '122 min', quality: 'HD', poster: './assets/images/movie-1.png' },
    { id: '18239', title: 'The Twilight Saga: New Moon', year: 2009, genre: 'Drama, Fantasy', rating: 4.7, duration: '130 min', quality: 'HD', poster: './assets/images/movie-2.png' },
    { id: '24021', title: 'The Twilight Saga: Eclipse', year: 2010, genre: 'Drama, Fantasy', rating: 4.9, duration: '124 min', quality: 'HD', poster: './assets/images/movie-3.png' },
    
    // Horror Movies (TMDb IDs)
    { id: '646385', title: 'Scream', year: 2022, genre: 'Horror, Mystery', rating: 6.3, duration: '114 min', quality: 'HD', poster: './assets/images/movie-4.png' },
    { id: '934433', title: 'Scream VI', year: 2023, genre: 'Horror, Mystery', rating: 6.6, duration: '122 min', quality: '4K', poster: './assets/images/movie-5.png' },
    { id: '616037', title: 'Halloween Ends', year: 2022, genre: 'Horror, Thriller', rating: 5.0, duration: '111 min', quality: 'HD', poster: './assets/images/movie-6.png' },
    
    // Sci-Fi Movies (TMDb IDs)
    { id: '624860', title: 'The Matrix Resurrections', year: 2021, genre: 'Action, Sci-Fi', rating: 5.7, duration: '148 min', quality: '4K', poster: './assets/images/movie-7.png' },
    { id: '545611', title: 'Everything Everywhere All at Once', year: 2022, genre: 'Action, Adventure', rating: 8.1, duration: '139 min', quality: '4K', poster: './assets/images/movie-8.png' },
    { id: '718789', title: 'Licorice Pizza', year: 2021, genre: 'Comedy, Drama', rating: 7.2, duration: '133 min', quality: 'HD', poster: './assets/images/movie-1.png' }
  ],
  
  // TV Series (using TMDb IDs for autoembed.cc)
  tvSeries: [
    { id: '92782', title: 'Moon Knight', year: 2022, genre: 'Action, Adventure', rating: 8.6, duration: '47 min', quality: '2K', poster: './assets/images/series-1.png' },
    { id: '52814', title: 'Halo', year: 2022, genre: 'Action, Adventure', rating: 8.8, duration: '59 min', quality: '2K', poster: './assets/images/series-2.png' },
    { id: '91363', title: 'Vikings: Valhalla', year: 2022, genre: 'Action, Adventure', rating: 8.3, duration: '51 min', quality: '2K', poster: './assets/images/series-3.png' },
    { id: '71446', title: 'Money Heist', year: 2017, genre: 'Action, Crime', rating: 8.3, duration: '70 min', quality: '4K', poster: './assets/images/series-4.png' },
    
    // Additional TV Series (TMDb IDs)
    { id: '84958', title: 'Loki', year: 2021, genre: 'Action, Adventure', rating: 8.2, duration: '52 min', quality: '4K', poster: './assets/images/series-1.png' },
    { id: '88396', title: 'Hawkeye', year: 2021, genre: 'Action, Adventure', rating: 7.5, duration: '50 min', quality: '4K', poster: './assets/images/series-2.png' },
    { id: '92749', title: 'Ms. Marvel', year: 2022, genre: 'Action, Adventure', rating: 6.2, duration: '45 min', quality: '4K', poster: './assets/images/series-3.png' },
    { id: '92782', title: 'She-Hulk: Attorney at Law', year: 2022, genre: 'Action, Comedy', rating: 5.2, duration: '35 min', quality: '4K', poster: './assets/images/series-4.png' },
    { id: '88396', title: 'The Falcon and the Winter Soldier', year: 2021, genre: 'Action, Adventure', rating: 7.2, duration: '50 min', quality: '4K', poster: './assets/images/series-1.png' },
    { id: '85271', title: 'WandaVision', year: 2021, genre: 'Action, Comedy', rating: 7.9, duration: '30 min', quality: '4K', poster: './assets/images/series-2.png' }
  ]
};

/**
 * Movie API Manager Class
 */
class MovieAPIManager {
  constructor() {
    this.cache = new Map();
    this.loadingStates = new Map();
  }

  /**
   * Get embed URL for a movie
   */
  getEmbedUrl(movieId) {
    return `${MOVIE_DATABASE.baseUrl}${movieId}`;
  }

  /**
   * Search for TV series using TMDb API
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Array>} - Array of TV series objects
   */
  async searchTVSeries(query, page = 1) {
    console.log('TMDb API searchTVSeries function called - Version 3');
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/search/tv?api_key=${MOVIE_DATABASE.tmdbApiKey}&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error searching TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Search for movies using TMDb API
   * @param {string} query - Search query
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Array>} - Array of movie objects
   */
  async searchMovies(query, page = 1) {
    console.log('🎬 TMDb API searchMovies function called - Version 3 - REAL API CALL');
    console.log('Searching movies with query:', query, 'page:', page);
    try {
      const url = `${MOVIE_DATABASE.tmdbBaseUrl}/search/movie?api_key=${MOVIE_DATABASE.tmdbApiKey}&query=${encodeURIComponent(query)}&page=${page}`;
      console.log('TMDb Search URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('TMDb search response:', data);
      
      if (!data.results) {
        console.error('No results in API response:', data);
        return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
      }
      
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get popular movies from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with movies array and pagination info
   */
  async getPopularMovies(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/movie/popular?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get top rated movies from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with movies array and pagination info
   */
  async getTopRatedMovies(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/movie/top_rated?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get upcoming movies from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with movies array and pagination info
   */
  async getUpcomingMovies(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/movie/upcoming?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get popular TV series from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with TV series array and pagination info
   */
  async getPopularTVSeries(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/popular?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching popular TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get top rated TV series from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with TV series array and pagination info
   */
  async getTopRatedTVSeries(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/top_rated?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching top rated TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get on the air TV series from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with TV series array and pagination info
   */
  async getOnTheAirTVSeries(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/on_the_air?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching on the air TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get airing today TV series from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with TV series array and pagination info
   */
  async getAiringTodayTVSeries(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/airing_today?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching airing today TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get now playing movies from TMDb API
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with movies array and pagination info
   */
  async getNowPlayingMovies(page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/movie/now_playing?api_key=${MOVIE_DATABASE.tmdbApiKey}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get genres from TMDb API
   * @returns {Promise<Array>} - Array of genre objects
   */
  async getGenres() {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/genre/movie/list?api_key=${MOVIE_DATABASE.tmdbApiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
        movieCount: Math.floor(Math.random() * 500) + 100,
        tvCount: Math.floor(Math.random() * 200) + 50,
        rating: (Math.random() * 2 + 6).toFixed(1)
      }));
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  }

  /**
   * Get movies by genre from TMDb API
   * @param {number} genreId - Genre ID
   * @param {number} page - Page number (default: 1)
   * @returns {Promise<Array>} - Array of movie objects
   */
  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/discover/movie?api_key=${MOVIE_DATABASE.tmdbApiKey}&with_genres=${genreId}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results.map(movie => this.formatMovieData(movie));
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  }

  /**
   * Get filtered movies from TMDb API using discover endpoint
   * @param {Object} filters - Filter options
   * @param {string} filters.genre - Genre ID
   * @param {string} filters.year - Release year
   * @param {string} filters.rating - Minimum rating
   * @param {number} filters.page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with movies array and pagination info
   */
  async getFilteredMovies(filters = {}) {
    try {
      const { genre, year, rating, page = 1 } = filters;
      
      // Build query parameters
      const params = new URLSearchParams({
        api_key: MOVIE_DATABASE.tmdbApiKey,
        page: page.toString(),
        sort_by: 'popularity.desc'
      });
      
      // Add genre filter
      if (genre) {
        params.append('with_genres', genre);
      }
      
      // Add year filter
      if (year) {
        params.append('year', year);
      }
      
      // Add rating filter
      if (rating) {
        params.append('vote_average.gte', rating);
      }
      
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/discover/movie?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(movie => this.formatMovieData(movie)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get filtered TV series using TMDb discover endpoint
   * @param {Object} filters - Filter options
   * @param {string} filters.genre - Genre ID
   * @param {string} filters.year - Release year
   * @param {string} filters.rating - Minimum rating
   * @param {number} filters.page - Page number (default: 1)
   * @returns {Promise<Object>} - Object with TV series array and pagination info
   */
  async getFilteredTVSeries(filters = {}) {
    try {
      const { genre, year, rating, page = 1 } = filters;
      
      // Build query parameters
      const params = new URLSearchParams({
        api_key: MOVIE_DATABASE.tmdbApiKey,
        page: page.toString(),
        sort_by: 'popularity.desc'
      });
      
      // Add genre filter
      if (genre) {
        params.append('with_genres', genre);
      }
      
      // Add year filter
      if (year) {
        params.append('first_air_date_year', year);
      }
      
      // Add rating filter
      if (rating) {
        params.append('vote_average.gte', rating);
      }
      
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/discover/tv?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        movies: data.results.map(series => this.formatTVSeriesData(series)),
        totalPages: data.total_pages,
        totalResults: data.total_results,
        currentPage: data.page
      };
    } catch (error) {
      console.error('Error fetching filtered TV series:', error);
      return { movies: [], totalPages: 0, totalResults: 0, currentPage: 1 };
    }
  }

  /**
   * Get movie details by TMDb ID
   * @param {string} movieId - TMDb movie ID
   * @returns {Promise<Object>} - Movie details object
   */
  async getMovieDetails(movieId) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/movie/${movieId}?api_key=${MOVIE_DATABASE.tmdbApiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const movie = await response.json();
      return this.formatMovieData(movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }

  /**
   * Get TV series details by TMDb ID
   * @param {string} seriesId - TMDb TV series ID
   * @returns {Promise<Object>} - TV series details object
   */
  async getTVSeriesDetails(seriesId) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/${seriesId}?api_key=${MOVIE_DATABASE.tmdbApiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const series = await response.json();
      return this.formatTVSeriesData(series);
    } catch (error) {
      console.error('Error fetching TV series details:', error);
      return null;
    }
  }

  /**
   * Get TV season details by TMDb ID and season number
   * @param {string} seriesId - TMDb TV series ID
   * @param {number} seasonNumber - Season number
   * @returns {Promise<Object>} - Season details object
   */
  async getTVSeasonDetails(seriesId, seasonNumber) {
    try {
      const response = await fetch(
        `${MOVIE_DATABASE.tmdbBaseUrl}/tv/${seriesId}/season/${seasonNumber}?api_key=${MOVIE_DATABASE.tmdbApiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const season = await response.json();
      return this.formatTVSeasonData(season);
    } catch (error) {
      console.error('Error fetching TV season details:', error);
      return null;
    }
  }

  /**
   * Format movie data from TMDb API response
   * @param {Object} movie - Raw movie data from TMDb API
   * @returns {Object} - Formatted movie object
   */
  formatMovieData(movie) {
    // Handle genre mapping
    let genreText = 'Unknown';
    if (movie.genres && movie.genres.length > 0) {
      genreText = movie.genres.map(g => g.name).join(', ');
    } else if (movie.genre_ids && movie.genre_ids.length > 0) {
      // Map genre IDs to names for list endpoints
      const genreMap = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
        80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
        14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
        9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
        10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
      };
      genreText = movie.genre_ids.map(id => genreMap[id] || 'Unknown').join(', ');
    }

    // Handle duration - list endpoints don't include runtime, so provide a default
    let duration = 'N/A';
    if (movie.runtime) {
      duration = `${movie.runtime} min`;
    } else {
      // Provide a reasonable default duration based on genre
      const actionGenres = [28, 12, 14, 878]; // Action, Adventure, Fantasy, Sci-Fi
      const comedyGenres = [35, 10751]; // Comedy, Family
      const dramaGenres = [18, 10749]; // Drama, Romance
      
      if (movie.genre_ids && movie.genre_ids.some(id => actionGenres.includes(id))) {
        duration = '120 min'; // Action movies are typically longer
      } else if (movie.genre_ids && movie.genre_ids.some(id => comedyGenres.includes(id))) {
        duration = '95 min'; // Comedies are typically shorter
      } else if (movie.genre_ids && movie.genre_ids.some(id => dramaGenres.includes(id))) {
        duration = '110 min'; // Dramas are typically medium length
      } else {
        duration = '105 min'; // Default duration
      }
    }

    return {
      id: movie.id.toString(),
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
      genre: genreText,
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
      duration: duration,
      quality: 'HD',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : './assets/images/movie-1.png',
      backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
      overview: movie.overview || 'No description available.',
      releaseDate: movie.release_date,
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      embedUrl: `${MOVIE_DATABASE.baseUrl}${movie.id}`,
      genreIds: movie.genre_ids || []
    };
  }

  /**
   * Format TV series data from TMDb API response
   * @param {Object} series - Raw TV series data from TMDb API
   * @returns {Object} - Formatted TV series object
   */
  formatTVSeriesData(series) {
    // Handle genre mapping for TV series
    let genreText = 'Unknown';
    if (series.genres && series.genres.length > 0) {
      genreText = series.genres.map(g => g.name).join(', ');
    } else if (series.genre_ids && series.genre_ids.length > 0) {
      // Map genre IDs to names for list endpoints
      const genreMap = {
        10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
        99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids',
        9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy',
        10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western'
      };
      genreText = series.genre_ids.map(id => genreMap[id] || 'Unknown').join(', ');
    }

    // Handle duration for TV series
    let duration = 'N/A';
    if (series.episode_run_time && series.episode_run_time.length > 0) {
      duration = `${series.episode_run_time[0]} min`;
    } else {
      // Provide a reasonable default duration for TV series
      const actionGenres = [10759, 10765]; // Action & Adventure, Sci-Fi & Fantasy
      const comedyGenres = [35, 10751]; // Comedy, Family
      const dramaGenres = [18, 10749]; // Drama, Romance
      
      if (series.genre_ids && series.genre_ids.some(id => actionGenres.includes(id))) {
        duration = '45 min'; // Action series are typically longer episodes
      } else if (series.genre_ids && series.genre_ids.some(id => comedyGenres.includes(id))) {
        duration = '25 min'; // Comedies are typically shorter episodes
      } else if (series.genre_ids && series.genre_ids.some(id => dramaGenres.includes(id))) {
        duration = '42 min'; // Dramas are typically medium length episodes
      } else {
        duration = '40 min'; // Default TV episode duration
      }
    }

    return {
      id: series.id.toString(),
      title: series.name,
      year: series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A',
      genre: genreText,
      rating: series.vote_average ? series.vote_average.toFixed(1) : 'N/A',
      duration: duration,
      quality: 'HD',
      poster: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : './assets/images/series-1.png',
      backdrop: series.backdrop_path ? `https://image.tmdb.org/t/p/w1280${series.backdrop_path}` : null,
      overview: series.overview || 'No description available.',
      firstAirDate: series.first_air_date,
      lastAirDate: series.last_air_date,
      voteCount: series.vote_count,
      popularity: series.popularity,
      embedUrl: `${MOVIE_DATABASE.baseUrl}${series.id}`,
      genreIds: series.genre_ids || [],
      status: series.status || 'TV Series',
      seasons: series.seasons || []
    };
  }

  /**
   * Format TV season data from TMDb API response
   * @param {Object} season - Raw season data from TMDb API
   * @returns {Object} - Formatted season object
   */
  formatTVSeasonData(season) {
    return {
      id: season.id,
      name: season.name,
      season_number: season.season_number,
      episode_count: season.episode_count,
      air_date: season.air_date,
      overview: season.overview,
      poster_path: season.poster_path,
      episodes: season.episodes ? season.episodes.map(episode => ({
        id: episode.id,
        name: episode.name,
        episode_number: episode.episode_number,
        overview: episode.overview,
        air_date: episode.air_date,
        runtime: episode.runtime,
        still_path: episode.still_path,
        vote_average: episode.vote_average,
        vote_count: episode.vote_count
      })) : []
    };
  }

  /**
   * Get all movies of a specific type
   */
  getMovies(type = 'movies') {
    return MOVIE_DATABASE[type] || [];
  }

  /**
   * Get a specific movie by ID
   */
  getMovieById(movieId) {
    const allMovies = [...MOVIE_DATABASE.movies, ...MOVIE_DATABASE.tvSeries];
    return allMovies.find(movie => movie.id === movieId);
  }

  /**
   * Get movies by genre
   */
  getMoviesByGenre(genre, type = 'movies') {
    const movies = this.getMovies(type);
    return movies.filter(movie => 
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  /**
   * Get top rated movies
   */
  getTopRatedMovies(limit = 8, type = 'movies') {
    const movies = this.getMovies(type);
    return movies
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, limit);
  }

  /**
   * Get latest movies
   */
  getLatestMovies(limit = 8, type = 'movies') {
    const movies = this.getMovies(type);
    return movies
      .sort((a, b) => b.year - a.year)
      .slice(0, limit);
  }


  /**
   * Get movie description
   */
  getMovieDescription(title) {
    const descriptions = {
      'The Northman': 'A young Viking prince on his quest to avenge his father\'s murder.',
      'Doctor Strange in the Multiverse of Madness': 'Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse.',
      'Memory': 'An assassin-for-hire finds that he\'s become a target after he refuses to complete a job for a dangerous criminal organization.',
      'The Unbearable Weight of Massive Talent': 'In this action-packed comedy, Nicolas Cage plays Nick Cage, channeling his iconic characters.',
      'Sonic the Hedgehog 2': 'The world\'s favorite blue hedgehog is back for a next-level adventure.',
      'Morbius': 'Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism.',
      'The Adam Project': 'A time-traveling pilot teams up with his younger self and his late father to come to terms with his past.',
      'Free Guy': 'A bank teller called Guy realizes he is a background character in an open world video game called Free City.',
      'The Batman': 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.',
      'Uncharted': 'Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor "Sully" Sullivan.',
      'Death on the Nile': 'While on vacation on the Nile, Hercule Poirot must investigate the murder of a young heiress.',
      'The King\'s Man': 'In the early years of the 20th century, the Kingsman agency is formed to stand against a cabal plotting a war.',
      'Moon Knight': 'Steven Grant discovers he\'s been granted the powers of an Egyptian moon god.',
      'Halo': 'Master Chief, a cybernetically enhanced supersoldier, defends humanity from the alien Covenant.',
      'Vikings: Valhalla': 'Set 100 years after the original Vikings series, this sequel follows the adventures of the most famous Vikings.',
      'Money Heist': 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.',
      'Avengers: Endgame': 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.',
      'Avengers: Infinity War': 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos.',
      'Black Panther': 'T\'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future.',
      'Captain Marvel': 'Carol Danvers becomes one of the universe\'s most powerful heroes when Earth is caught in the middle of a galactic war.',
      'Black Widow': 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises.',
      'Eternals': 'The Eternals, a race of immortal beings with superhuman powers who have secretly lived on Earth for thousands of years.',
      'Shang-Chi and the Legend of the Ten Rings': 'Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.',
      'Spider-Man: No Way Home': 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help, which leads to unintended consequences.',
      'Twilight': 'A teenage girl risks everything when she falls in love with a vampire.',
      'The Twilight Saga: New Moon': 'Edward leaves Bella, who becomes depressed and finds comfort in her friendship with Jacob.',
      'The Twilight Saga: Eclipse': 'As a string of mysterious killings grips Seattle, Bella, whose high school graduation is fast approaching, is forced to choose between her love for vampire Edward and her friendship with werewolf Jacob.',
      'Scream': 'Twenty-five years after a streak of brutal murders shocked the quiet town of Woodsboro, a new killer has donned the Ghostface mask.',
      'Scream VI': 'In the next installment, the survivors of the Ghostface killings leave Woodsboro behind and start a fresh chapter.',
      'Halloween Ends': 'Four years after the events of Halloween Kills, Laurie is living with her granddaughter and is finishing writing her memoir.',
      'The Matrix Resurrections': 'Return to a world of two realities: one, everyday life; the other, what lies behind it.',
      'Everything Everywhere All at Once': 'A Chinese-American laundromat owner is swept up in an insane adventure in which she alone can save the multiverse.',
      'Licorice Pizza': 'The story of Alana Kane and Gary Valentine growing up, running around and going through the treacherous navigation of first love in the San Fernando Valley.',
      'Loki': 'The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of "Avengers: Endgame."',
      'Hawkeye': 'Series based on the Marvel Comics superhero Hawkeye, centering on the adventures of Young Avenger, Kate M. Bishop.',
      'Ms. Marvel': 'Kamala is a superhero fan with an imagination, particularly when it comes to Captain Marvel; Kamala feels like she doesn\'t fit in at school and sometimes even at home.',
      'She-Hulk: Attorney at Law': 'Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk.',
      'The Falcon and the Winter Soldier': 'Following the events of "Avengers: Endgame," Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities.',
      'WandaVision': 'Blends the style of classic sitcoms with the MCU, in which Wanda Maximoff and Vision - two super-powered beings living idealized suburban lives.'
    };
    return descriptions[title] || 'An exciting movie that will keep you on the edge of your seat.';
  }

  /**
   * Create a movie card element
   */
  createMovieCard(movie) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="movie-card">
        <a href="./movie-details.html?id=${movie.id}">
          <figure class="card-banner">
            <img src="${movie.poster}" alt="${movie.title} movie poster" loading="lazy">
          </figure>
        </a>
        <div class="title-wrapper">
          <a href="./movie-details.html?id=${movie.id}">
            <h3 class="card-title">${movie.title}</h3>
          </a>
          <time datetime="${movie.year}">${movie.year}</time>
        </div>
        <div class="card-meta">
          <div class="badge badge-outline">${movie.quality}</div>
          <div class="duration">
            <ion-icon name="time-outline"></ion-icon>
            <time datetime="PT${movie.duration}">${movie.duration}</time>
          </div>
          <div class="rating">
            <ion-icon name="star"></ion-icon>
            <data>${movie.rating}</data>
          </div>
        </div>
      </div>
    `;
    return li;
  }

  /**
   * Load movies into a container
   */
  async loadMovies(containerSelector, movieType = 'movies', filter = null, limit = null) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Container not found: ${containerSelector}`);
      return;
    }

    // Show loading state
    this.showLoading(container);

    try {
      let movies;
      
      if (filter === 'top-rated') {
        movies = this.getTopRatedMovies(limit, movieType);
      } else if (filter === 'latest') {
        movies = this.getLatestMovies(limit, movieType);
      } else {
        movies = this.getMovies(movieType);
        if (limit) {
          movies = movies.slice(0, limit);
        }
      }

      // Clear container
      container.innerHTML = '';

      // Add movies to container
      movies.forEach(movie => {
        const movieCard = this.createMovieCard(movie);
        container.appendChild(movieCard);
      });

    } catch (error) {
      console.error('Error loading movies:', error);
      this.showError(container, 'Failed to load movies. Please try again later.');
    }
  }

  /**
   * Show loading state
   */
  showLoading(container) {
    container.innerHTML = '<div class="loading">Loading movies...</div>';
  }

  /**
   * Show error state
   */
  showError(container, message) {
    container.innerHTML = `<div class="error">${message}</div>`;
  }

  /**
   * Load movie details
   */
  async loadMovieDetails(movieId) {
    const movie = this.getMovieById(movieId);
    if (!movie) return null;

    return {
      ...movie,
      embedUrl: this.getEmbedUrl(movieId),
      description: this.getMovieDescription(movie.title)
    };
  }
}

// Create global instance
window.movieAPI = new MovieAPIManager();
