# FilmHaven - Autoembed.cc API Integration Guide

## Overview

Your FilmHaven movie website has been successfully integrated with autoembed.cc API to dynamically load movies and TV series. The system now supports:

- **Dynamic movie loading** from a comprehensive database
- **Autoembed.cc integration** for streaming movies
- **Responsive video player** with modal functionality
- **Search and filtering** capabilities
- **Loading states and error handling**

## How It Works

### 1. Movie Database Structure

Movies are stored in `assets/js/movie-api.js` with the following structure:

```javascript
{
  id: 'tt1234567',           // IMDb ID (required for autoembed.cc)
  title: 'Movie Title',      // Display name
  year: 2022,               // Release year
  genre: 'Action, Drama',   // Genres (comma-separated)
  rating: 8.5,              // IMDB rating
  duration: '137 min',      // Runtime
  quality: 'HD',            // Video quality (HD, 2K, 4K)
  poster: './path/to/poster.png' // Poster image path
}
```

### 2. Autoembed.cc Integration

Each movie uses its IMDb ID to generate streaming URLs:
- **Format**: `https://player.autoembed.cc/embed/movie/{imdb_id}`
- **Example**: `https://player.autoembed.cc/embed/movie/tt1234567`

### 3. Dynamic Loading

The website automatically loads movies into different sections:
- **Upcoming Movies**: Latest 4 movies
- **Top Rated Movies**: Highest rated 8 movies
- **TV Series**: All available TV series

## Adding New Movies

### Method 1: Add to Movie Database

1. Open `assets/js/movie-api.js`
2. Find the `movies` array in `MOVIE_DATABASE`
3. Add your new movie object:

```javascript
{
  id: 'tt1234567',                    // Get from IMDb
  title: 'Your Movie Title',
  year: 2023,
  genre: 'Action, Adventure',
  rating: 8.0,
  duration: '120 min',
  quality: '4K',
  poster: './assets/images/your-movie-poster.png'
}
```

4. Add a description in the `getMovieDescription()` method:

```javascript
'Your Movie Title': 'Brief description of the movie plot and story.',
```

### Method 2: Add TV Series

1. Find the `tvSeries` array in `MOVIE_DATABASE`
2. Add your series:

```javascript
{
  id: 'tt1234567',
  title: 'Your TV Series',
  year: 2023,
  genre: 'Drama, Thriller',
  rating: 8.5,
  duration: '45 min',
  quality: '4K',
  poster: './assets/images/your-series-poster.png'
}
```

## Getting IMDb IDs

### For Movies:
1. Go to [IMDb.com](https://www.imdb.com)
2. Search for your movie
3. Copy the ID from the URL (e.g., `tt1234567`)

### For TV Series:
1. Go to [IMDb.com](https://www.imdb.com)
2. Search for your TV series
3. Copy the ID from the URL

## Adding Movie Posters

1. Add your poster images to `assets/images/`
2. Update the `poster` field in your movie object
3. Recommended size: 300x450px (2:3 aspect ratio)

## Features

### 🎬 Video Player
- **Modal player** opens when clicking "Watch Now"
- **Responsive design** works on all devices
- **Fullscreen support** with keyboard controls
- **ESC key** to close the player

### 🔍 Search & Filter
- **Genre filtering** (Action, Comedy, Drama, etc.)
- **Rating sorting** (highest to lowest)
- **Year sorting** (newest to oldest)
- **Quality indicators** (HD, 2K, 4K)

### 📱 Responsive Design
- **Mobile-first** approach
- **Touch-friendly** controls
- **Optimized loading** with lazy loading
- **Error handling** with user-friendly messages

## API Endpoints Used

### Autoembed.cc
- **Base URL**: `https://player.autoembed.cc/embed/movie/`
- **Format**: `{base_url}{imdb_id}`
- **Example**: `https://player.autoembed.cc/embed/movie/tt1234567`

## File Structure

```
filmhaven/
├── assets/
│   ├── js/
│   │   ├── movie-api.js      # Movie database and API functions
│   │   └── script.js         # Main JavaScript functionality
│   ├── css/
│   │   └── style.css         # Updated with video modal styles
│   └── images/               # Movie posters and assets
├── index.html                # Homepage (updated for dynamic loading)
├── movie-details.html        # Movie details page (updated)
└── API_INTEGRATION.md        # This guide
```

## Usage Examples

### Load Specific Movies
```javascript
// Load top 10 action movies
window.movieAPI.loadMovies('.container', 'movies', 'top-rated', 10);

// Load latest movies
window.movieAPI.loadMovies('.container', 'movies', 'latest', 5);

// Load all TV series
window.movieAPI.loadMovies('.container', 'tvSeries');
```

### Search Movies
```javascript
// Search for movies by title
const results = window.movieAPI.searchMovies('batman', 'movies');

// Get movies by genre
const actionMovies = window.movieAPI.getMoviesByGenre('action', 'movies');
```

### Get Movie Details
```javascript
// Get movie by ID
const movie = window.movieAPI.getMovieById('tt1234567');

// Get embed URL
const embedUrl = window.movieAPI.getEmbedUrl('tt1234567');
```

## Troubleshooting

### Movies Not Loading
1. Check browser console for errors
2. Verify `movie-api.js` is loaded before `script.js`
3. Ensure IMDb IDs are correct
4. Check poster image paths

### Video Not Playing
1. Verify the IMDb ID exists on autoembed.cc
2. Check if the movie is available in your region
3. Try a different browser
4. Check internet connection

### Performance Issues
1. Images are lazy-loaded automatically
2. Consider reducing the number of movies loaded at once
3. Optimize poster images (compress to reduce file size)

## Future Enhancements

### Potential Additions:
- **User accounts** and watchlists
- **Movie recommendations** based on viewing history
- **Advanced search** with multiple filters
- **Social features** (reviews, ratings, sharing)
- **Mobile app** version
- **Offline viewing** capabilities

### API Improvements:
- **Real-time movie data** from external APIs
- **Automatic poster fetching** from TMDB/OMDB
- **Dynamic pricing** and availability
- **Multi-language support**

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify all files are properly linked
3. Test with different browsers
4. Ensure stable internet connection

## License

This integration maintains the original project's free-to-use license. The autoembed.cc service has its own terms of use that should be respected.


