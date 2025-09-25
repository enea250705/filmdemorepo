# TMDb ID Guide for autoembed.cc

## Overview
autoembed.cc uses **TMDb (The Movie Database) IDs** instead of IMDb IDs for streaming movies and TV shows.

## How to Find TMDb IDs

### Method 1: TMDb Website
1. Go to [themoviedb.org](https://www.themoviedb.org)
2. Search for your movie/TV show
3. The TMDb ID is in the URL: `https://www.themoviedb.org/movie/550988-free-guy`
   - The ID is: `550988`

### Method 2: TMDb API
1. Get a free API key from [TMDb](https://www.themoviedb.org/settings/api)
2. Use the search endpoint:
   ```
   https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=Free%20Guy
   ```

### Method 3: Browser Developer Tools
1. Go to the movie page on TMDb
2. Open Developer Tools (F12)
3. Look for API calls in the Network tab
4. Find the movie ID in the response

## ID Format Differences

| Service | Format | Example |
|---------|--------|---------|
| **IMDb** | `tt` + numbers | `tt6264654` |
| **TMDb** | Numbers only | `550988` |

## Current Movie Database

### Movies (TMDb IDs)
- **Free Guy**: `550988`
- **The Batman**: `414906`
- **Spider-Man: No Way Home**: `634649`
- **Avengers: Endgame**: `299534`
- **Black Panther**: `284054`
- **Doctor Strange 2**: `453395`
- **The Northman**: `759175`
- **Sonic 2**: `675353`
- **Morbius**: `526896`
- **The Adam Project**: `696806`
- **Uncharted**: `335787`
- **Death on the Nile**: `505026`
- **The King's Man**: `476669`
- **Memory**: `985939`
- **The Unbearable Weight**: `648579`
- **Captain Marvel**: `299537`
- **Black Widow**: `497698`
- **Eternals**: `524434`
- **Shang-Chi**: `566525`
- **Twilight**: `8961`
- **New Moon**: `18239`
- **Eclipse**: `24021`
- **Scream (2022)**: `646385`
- **Scream VI**: `934433`
- **Halloween Ends**: `616037`
- **Matrix Resurrections**: `624860`
- **Everything Everywhere**: `545611`
- **Licorice Pizza**: `718789`

### TV Series (TMDb IDs)
- **Moon Knight**: `92782`
- **Halo**: `52814`
- **Vikings: Valhalla**: `91363`
- **Money Heist**: `71446`
- **Loki**: `84958`
- **Hawkeye**: `88396`
- **Ms. Marvel**: `92749`
- **She-Hulk**: `92782`
- **Falcon & Winter Soldier**: `88396`
- **WandaVision**: `85271`

## Adding New Movies

### Step 1: Find TMDb ID
1. Search on [themoviedb.org](https://www.themoviedb.org)
2. Copy the ID from the URL

### Step 2: Add to Database
```javascript
// In assets/js/movie-api.js
{ 
  id: 'TMDb_ID_HERE', 
  title: 'Movie Title', 
  year: 2022, 
  genre: 'Action, Adventure', 
  rating: 8.0, 
  duration: '120 min', 
  quality: '4K', 
  poster: './assets/images/movie-X.png' 
}
```

### Step 3: Test the Stream
The embed URL will be:
```
https://player.autoembed.cc/embed/movie/TMDb_ID_HERE
```

## Troubleshooting

### Common Issues
1. **Wrong ID Format**: Make sure you're using TMDb IDs (numbers only), not IMDb IDs (tt format)
2. **Movie Not Found**: The movie might not be available on autoembed.cc
3. **Streaming Issues**: Try alternative servers (VidSrc, SuperEmbed, etc.)

### Alternative Streaming Sources
If autoembed.cc doesn't work, try:
- **VidSrc**: `https://vidsrc.me/embed/movie/TMDb_ID`
- **SuperEmbed**: `https://superembed.stream/e/TMDb_ID`
- **VidCloud**: `https://vidcloud.icu/embed/movie/TMDb_ID`

## API Integration

### TMDb API Endpoints
```javascript
// Search movies
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`;

// Get movie details
const detailsUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}`;

// Get TV show details
const tvUrl = `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${API_KEY}`;
```

### Example API Response
```json
{
  "id": 550988,
  "title": "Free Guy",
  "release_date": "2021-08-11",
  "vote_average": 7.7,
  "overview": "A bank teller called Guy realizes he is a background character...",
  "poster_path": "/xmbU4JTUm8rsdtn7Y3Fcm30GxvT.jpg"
}
```

## Best Practices

1. **Always use TMDb IDs** for autoembed.cc
2. **Test streams** before adding to database
3. **Provide fallback options** (multiple streaming sources)
4. **Keep IDs updated** as new movies are released
5. **Use proper error handling** for failed streams

## Resources

- [TMDb Website](https://www.themoviedb.org)
- [TMDb API Documentation](https://developers.themoviedb.org/3)
- [autoembed.cc](https://autoembed.cc)
- [VidSrc](https://vidsrc.me)
- [SuperEmbed](https://superembed.stream)


