'use strict';

// Movie API is now loaded from movie-api.js

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});



/**
 * Initialize movie loading when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait for movie API to be loaded
  if (typeof window.movieAPI === 'undefined') {
    console.error('Movie API not loaded. Make sure movie-api.js is included.');
    return;
  }

  // Load movies using TMDb API
  console.log('Loading movies from API...');
  loadMoviesFromAPI('.upcoming .movies-list', 'popular', 8);
  loadMoviesFromAPI('.top-rated .movies-list', 'top-rated', 8);
  loadMoviesFromAPI('.tv-series .movies-list', 'tv-series', 8);
  
  // Handle movie details page
  if (window.location.pathname.includes('movie-details.html')) {
    loadMovieDetailsPage();
  }
});

/**
 * Load movies from TMDb API and display them
 */
async function loadMoviesFromAPI(containerSelector, type, limit) {
  console.log(`Loading ${type} movies into ${containerSelector}`);
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container not found: ${containerSelector}`);
    return;
  }

  // Show loading state
  container.innerHTML = '<div class="loading">Loading movies...</div>';

  try {
    let apiResponse = null;

    // Get movies from TMDb API based on type
    switch (type) {
      case 'popular':
        console.log('Fetching popular movies...');
        apiResponse = await window.movieAPI.getPopularMovies(1);
        break;
      case 'upcoming':
        console.log('Fetching upcoming movies...');
        apiResponse = await window.movieAPI.getUpcomingMovies(1);
        break;
      case 'top-rated':
        console.log('Fetching top-rated movies...');
        apiResponse = await window.movieAPI.getTopRatedMovies(1);
        break;
      case 'tv-series':
        console.log('Fetching TV series...');
        apiResponse = await window.movieAPI.getPopularTVSeries(1);
        break;
      default:
        console.log('Fetching default movies...');
        apiResponse = await window.movieAPI.getPopularMovies(1);
    }

    console.log('API Response:', apiResponse);

    if (!apiResponse || !apiResponse.movies || apiResponse.movies.length === 0) {
      console.error('No movies found in API response, trying fallback...');
      // Fallback to local database
      const fallbackMovies = getFallbackMovies(type, limit);
      if (fallbackMovies.length > 0) {
        console.log(`Using fallback movies: ${fallbackMovies.length} movies`);
        container.innerHTML = '';
        fallbackMovies.forEach(movie => {
          const movieCard = createMovieCard(movie);
          container.appendChild(movieCard);
        });
        return;
      }
      container.innerHTML = '<div class="error">No movies found</div>';
      return;
    }

    let movies = apiResponse.movies;
    console.log(`Found ${movies.length} movies, limiting to ${limit}`);

    // Limit the number of movies
    movies = movies.slice(0, limit);

    // Clear loading state
    container.innerHTML = '';

    // Create movie cards
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      container.appendChild(movieCard);
    });

    console.log(`Successfully loaded ${movies.length} movies into ${containerSelector}`);

  } catch (error) {
    console.error('Error loading movies:', error);
    container.innerHTML = '<div class="error">Error loading movies</div>';
  }
}

/**
 * Get fallback movies from local database
 */
function getFallbackMovies(type, limit) {
  const allMovies = [
    // Popular Movies
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
    
    // Top Rated Movies
    { id: '299534', title: 'Avengers: Endgame', year: 2019, genre: 'Action, Adventure', rating: 8.4, duration: '181 min', quality: '4K', poster: './assets/images/movie-1.png' },
    { id: '299536', title: 'Avengers: Infinity War', year: 2018, genre: 'Action, Adventure', rating: 8.4, duration: '149 min', quality: '4K', poster: './assets/images/movie-2.png' },
    { id: '284054', title: 'Black Panther', year: 2018, genre: 'Action, Adventure', rating: 7.3, duration: '134 min', quality: '4K', poster: './assets/images/movie-3.png' },
    { id: '299537', title: 'Captain Marvel', year: 2019, genre: 'Action, Adventure', rating: 6.8, duration: '123 min', quality: '4K', poster: './assets/images/movie-4.png' },
    { id: '497698', title: 'Black Widow', year: 2021, genre: 'Action, Adventure', rating: 6.7, duration: '134 min', quality: '4K', poster: './assets/images/movie-5.png' },
    { id: '524434', title: 'Eternals', year: 2021, genre: 'Action, Adventure', rating: 6.3, duration: '156 min', quality: '4K', poster: './assets/images/movie-6.png' },
    { id: '566525', title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, genre: 'Action, Adventure', rating: 7.4, duration: '132 min', quality: '4K', poster: './assets/images/movie-7.png' },
    { id: '634649', title: 'Spider-Man: No Way Home', year: 2021, genre: 'Action, Adventure', rating: 8.2, duration: '148 min', quality: '4K', poster: './assets/images/movie-8.png' },
    
    // TV Series
    { id: '92782', title: 'Moon Knight', year: 2022, genre: 'Action, Adventure', rating: 8.6, duration: '47 min', quality: '2K', poster: './assets/images/series-1.png' },
    { id: '52814', title: 'Halo', year: 2022, genre: 'Action, Adventure', rating: 8.8, duration: '59 min', quality: '2K', poster: './assets/images/series-2.png' },
    { id: '91363', title: 'Vikings: Valhalla', year: 2022, genre: 'Action, Adventure', rating: 8.3, duration: '51 min', quality: '2K', poster: './assets/images/series-3.png' },
    { id: '71446', title: 'Money Heist', year: 2017, genre: 'Action, Crime', rating: 8.3, duration: '70 min', quality: '4K', poster: './assets/images/series-4.png' },
    { id: '84958', title: 'Loki', year: 2021, genre: 'Action, Adventure', rating: 8.2, duration: '52 min', quality: '4K', poster: './assets/images/series-1.png' },
    { id: '88396', title: 'Hawkeye', year: 2021, genre: 'Action, Adventure', rating: 7.5, duration: '50 min', quality: '4K', poster: './assets/images/series-2.png' },
    { id: '92749', title: 'Ms. Marvel', year: 2022, genre: 'Action, Adventure', rating: 6.2, duration: '45 min', quality: '4K', poster: './assets/images/series-3.png' },
    { id: '92782', title: 'She-Hulk: Attorney at Law', year: 2022, genre: 'Action, Comedy', rating: 5.2, duration: '35 min', quality: '4K', poster: './assets/images/series-4.png' }
  ];

  let filteredMovies = allMovies;

  // Filter by type
  if (type === 'top-rated') {
    filteredMovies = allMovies.filter(movie => parseFloat(movie.rating) >= 7.5);
    filteredMovies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (type === 'popular') {
    filteredMovies = allMovies.filter(movie => parseFloat(movie.rating) >= 7.0);
    filteredMovies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (type === 'tv-series') {
    filteredMovies = allMovies.filter(movie => movie.duration.includes('min') && parseFloat(movie.duration) <= 60);
  }

  return filteredMovies.slice(0, limit);
}

/**
 * Create a movie card element
 */
function createMovieCard(movie) {
  const card = document.createElement('li');
  card.className = 'movie-card';
  card.innerHTML = `
    <a href="./movie-details.html?id=${movie.id}">
      <figure class="card-banner">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
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
  `;
  return card;
}

/**
 * Load movie details page
 */
async function loadMovieDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  
  if (!movieId) {
    console.log('No movie ID provided, showing default movie');
    handleDefaultMovieDetails();
    return;
  }
  
  try {
    const movie = await window.movieAPI.getMovieDetails(movieId);
    if (movie) {
      updateMovieDetailsPage(movie);
    } else {
      console.error('Movie not found, showing default movie');
      handleDefaultMovieDetails();
    }
  } catch (error) {
    console.error('Error loading movie details:', error);
    handleDefaultMovieDetails();
  }
}

/**
 * Update movie details page with movie data
 */
function updateMovieDetailsPage(movie) {
  // Update page title
  document.title = `${movie.title} ${movie.year}`;
  
  // Update movie poster
  const posterImg = document.querySelector('.movie-detail-banner img');
  if (posterImg) {
    posterImg.src = movie.poster;
    posterImg.alt = `${movie.title} movie poster`;
  }
  
  // Update movie title
  const titleElement = document.querySelector('.detail-title');
  if (titleElement) {
    titleElement.innerHTML = movie.title.replace(/\s+(\w+)$/, ' <strong>$1</strong>');
  }
  
  // Update movie metadata
  const badgeFill = document.querySelector('.badge-fill');
  if (badgeFill) {
    badgeFill.textContent = `PG ${Math.floor(Math.random() * 5) + 13}`;
  }
  
  const badgeOutline = document.querySelector('.badge-outline');
  if (badgeOutline) {
    badgeOutline.textContent = movie.quality;
  }
  
  // Update genre
  const genreWrapper = document.querySelector('.ganre-wrapper');
  if (genreWrapper) {
    const genres = movie.genre.split(', ');
    genreWrapper.innerHTML = genres.map(genre => `<a href="#">${genre}</a>`).join(', ');
  }
  
  // Update year and duration
  const yearElement = document.querySelector('.date-time time[datetime]');
  if (yearElement) {
    yearElement.textContent = movie.year;
    yearElement.setAttribute('datetime', movie.year);
  }
  
  const durationElement = document.querySelector('.date-time time[datetime^="PT"]');
  if (durationElement) {
    durationElement.textContent = movie.duration;
    durationElement.setAttribute('datetime', `PT${movie.duration}`);
  }
  
  // Update storyline
  const storylineElement = document.querySelector('.storyline');
  if (storylineElement) {
    storylineElement.textContent = movie.description;
  }
  
  // Load movie servers
  loadMovieServers(movie);
  
  // Update watch now button to use embed URL
  const watchBtn = document.getElementById('watch-now-btn');
  if (watchBtn) {
    watchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMoviePlayer(movie.embedUrl, movie.title);
    });
  }
  
  // Update main play button
  const mainPlayBtn = document.getElementById('main-play-btn');
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMoviePlayer(movie.embedUrl, movie.title);
    });
  }
  
  // Update main fullscreen button
  const mainFullscreenBtn = document.getElementById('main-fullscreen-btn');
  if (mainFullscreenBtn) {
    mainFullscreenBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openFullscreenVideo(movie.embedUrl, movie.title);
    });
  }
  
  // Update download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.href = movie.poster;
    downloadBtn.download = `${movie.title.replace(/\s+/g, '_')}_poster.jpg`;
  }
}

/**
 * Load movie servers
 */
function loadMovieServers(movie) {
  const serversList = document.getElementById('servers-list');
  if (!serversList) return;

  // Create different server options with multiple streaming sources
  const servers = [
    {
      name: 'Autoembed.cc',
      type: 'Primary Server (May have ads)',
      quality: movie.quality,
      status: 'online',
      url: movie.embedUrl,
      icon: 'A',
      hasAds: true
    },
    {
      name: 'VidSrc',
      type: 'Alternative Server',
      quality: 'HD',
      status: 'online',
      url: `https://vidsrc.me/embed/movie/${movie.id}`,
      icon: 'V',
      hasAds: false
    },
    {
      name: 'SuperEmbed',
      type: 'Fast Streaming',
      quality: 'HD',
      status: 'online',
      url: `https://www.2embed.to/embed/${movie.id}`,
      icon: 'S',
      hasAds: false
    },
    {
      name: 'VidCloud',
      type: 'High Quality',
      quality: '4K',
      status: 'online',
      url: `https://vidsrc.to/embed/movie/${movie.id}`,
      icon: 'VC',
      hasAds: false
    },
    {
      name: 'Direct Link',
      type: 'External Player',
      quality: movie.quality,
      status: 'online',
      url: `https://www.imdb.com/title/${movie.id}`,
      icon: 'IM',
      hasAds: false,
      external: true
    }
  ];

  serversList.innerHTML = '';

  servers.forEach((server, index) => {
    const serverItem = document.createElement('div');
    serverItem.className = 'server-item';
    
    const adWarning = server.hasAds ? '<span class="ad-warning">⚠️ May show ads</span>' : '';
    const externalIcon = server.external ? '<ion-icon name="open-outline"></ion-icon>' : '';
    
    serverItem.innerHTML = `
      <div class="server-info">
        <div class="server-icon">${server.icon}</div>
        <div class="server-details">
          <h4>${server.name} ${adWarning}</h4>
          <p>${server.type}</p>
        </div>
        <div class="server-quality">
          <span class="quality-badge">${server.quality}</span>
          <div class="server-status ${server.status === 'online' ? 'status-online' : 'status-offline'}">
            <span class="status-dot"></span>
            ${server.status === 'online' ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
      <button class="server-btn" onclick="openMoviePlayer('${server.url}', '${movie.title} - ${server.name}', ${server.external})">
        <ion-icon name="play"></ion-icon>
        ${server.external ? 'Open' : 'Watch'}
        ${externalIcon}
      </button>
    `;
    serversList.appendChild(serverItem);
  });
}

/**
 * Open movie player in modal or new window
 */
function openMoviePlayer(embedUrl, title, isExternal = false) {
  // If it's an external link, open in new tab
  if (isExternal) {
    window.open(embedUrl, '_blank');
    return;
  }

  // Create modal for video player
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  
  // Determine the streaming service
  let serviceName = 'Streaming Service';
  let adWarning = '';
  
  if (embedUrl.includes('autoembed.cc')) {
    serviceName = 'Autoembed.cc';
    adWarning = '⚠️ This server may show ads before the movie starts. Please wait for the ad to finish.';
  } else if (embedUrl.includes('vidsrc.me')) {
    serviceName = 'VidSrc';
    adWarning = '✅ Ad-free streaming service';
  } else if (embedUrl.includes('2embed.to')) {
    serviceName = 'SuperEmbed';
    adWarning = '✅ Fast, ad-free streaming';
  } else if (embedUrl.includes('vidsrc.to')) {
    serviceName = 'VidCloud';
    adWarning = '✅ High quality, ad-free streaming';
  }
  
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <h3>${title}</h3>
        <div class="video-container">
          <iframe id="video-iframe" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
          <div class="video-overlay">
            <div class="video-controls-overlay">
              <button class="control-btn" id="play-pause-btn" title="Play/Pause">
                <ion-icon name="play"></ion-icon>
              </button>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" id="progress-fill"></div>
                  <div class="progress-handle" id="progress-handle"></div>
                </div>
                <div class="time-display">
                  <span id="current-time">0:00</span> / <span id="total-time">0:00</span>
                </div>
              </div>
              <button class="control-btn" id="volume-btn" title="Volume">
                <ion-icon name="volume-high"></ion-icon>
              </button>
              <button class="control-btn" id="fullscreen-btn" title="Fullscreen">
                <ion-icon name="expand"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="video-info">
          <p>Streaming via ${serviceName}</p>
          <p class="ad-warning-text">${adWarning}</p>
          <p>If the video doesn't load, try a different server or check your internet connection.</p>
          <div class="video-controls">
            <button class="btn btn-secondary" onclick="this.closest('.video-modal').remove()">Close</button>
            <button class="btn btn-primary" onclick="window.open('${embedUrl}', '_blank')">Open in New Tab</button>
            <button class="btn btn-primary" id="fullscreen-modal-btn">Fullscreen Player</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal functionality
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(modal);
    }
  });
  
  // ESC key to close
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(modal);
      document.removeEventListener('keydown', escHandler);
    }
  });

  // Initialize video controls
  initializeVideoControls(modal, embedUrl);
}

/**
 * Initialize video controls and fullscreen functionality
 */
function initializeVideoControls(modal, embedUrl) {
  const iframe = modal.querySelector('#video-iframe');
  const fullscreenBtn = modal.querySelector('#fullscreen-btn');
  const fullscreenModalBtn = modal.querySelector('#fullscreen-modal-btn');
  const progressBar = modal.querySelector('.progress-bar');
  const progressFill = modal.querySelector('#progress-fill');
  const progressHandle = modal.querySelector('#progress-handle');
  const currentTimeSpan = modal.querySelector('#current-time');
  const totalTimeSpan = modal.querySelector('#total-time');
  const playPauseBtn = modal.querySelector('#play-pause-btn');
  const volumeBtn = modal.querySelector('#volume-btn');

  // Fullscreen functionality
  fullscreenBtn.addEventListener('click', () => {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  });

  // Fullscreen modal functionality
  fullscreenModalBtn.addEventListener('click', () => {
    openFullscreenPlayer(embedUrl, modal.querySelector('h3').textContent);
  });

  // Progress bar functionality
  let isDragging = false;
  let currentTime = 0;
  let totalTime = 0;

  // Simulate video progress (since we can't access iframe content directly)
  const progressInterval = setInterval(() => {
    if (!isDragging && totalTime > 0) {
      currentTime += 1;
      if (currentTime > totalTime) currentTime = totalTime;
      
      const progress = (currentTime / totalTime) * 100;
      progressFill.style.width = progress + '%';
      progressHandle.style.left = progress + '%';
      
      currentTimeSpan.textContent = formatTime(currentTime);
    }
  }, 1000);

  // Set total time (simulate movie duration)
  totalTime = 7200; // 2 hours default
  totalTimeSpan.textContent = formatTime(totalTime);

  // Progress bar click/drag functionality
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = (clickX / rect.width) * 100;
    
    currentTime = (progress / 100) * totalTime;
    progressFill.style.width = progress + '%';
    progressHandle.style.left = progress + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
  });

  // Drag functionality for progress handle
  progressHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = progressBar.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const progress = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
      
      currentTime = (progress / 100) * totalTime;
      progressFill.style.width = progress + '%';
      progressHandle.style.left = progress + '%';
      currentTimeSpan.textContent = formatTime(currentTime);
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Play/Pause button
  playPauseBtn.addEventListener('click', () => {
    const icon = playPauseBtn.querySelector('ion-icon');
    if (icon.name === 'play') {
      icon.name = 'pause';
      // In a real implementation, you would control the iframe video here
    } else {
      icon.name = 'play';
    }
  });

  // Volume button
  volumeBtn.addEventListener('click', () => {
    const icon = volumeBtn.querySelector('ion-icon');
    if (icon.name === 'volume-high') {
      icon.name = 'volume-mute';
    } else {
      icon.name = 'volume-high';
    }
  });

  // Clean up interval when modal is closed
  modal.addEventListener('remove', () => {
    clearInterval(progressInterval);
  });
}

/**
 * Format time in MM:SS or HH:MM:SS format
 */
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

/**
 * Open fullscreen video player
 */
function openFullscreenPlayer(embedUrl, title) {
  // Create fullscreen video page
  const fullscreenPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Fullscreen</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          background: #000; 
          color: #fff; 
          font-family: 'Poppins', sans-serif;
          overflow: hidden;
        }
        .fullscreen-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
        }
        .video-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .video-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .fullscreen-container:hover .controls {
          opacity: 1;
        }
        .control-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
        }
        .progress-container {
          flex: 1;
          position: relative;
        }
        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
          cursor: pointer;
        }
        .progress-fill {
          height: 100%;
          background: #ffd700;
          border-radius: 3px;
          width: 0%;
          transition: width 0.1s ease;
        }
        .time-display {
          color: #fff;
          font-size: 14px;
          white-space: nowrap;
        }
        .control-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        .control-btn:hover {
          background: rgba(255,255,255,0.1);
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.7);
          color: #fff;
          border: none;
          font-size: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .title {
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 18px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="fullscreen-container">
        <div class="title">${title}</div>
        <button class="close-btn" onclick="window.close()">&times;</button>
        <div class="video-wrapper">
          <iframe class="video-iframe" src="${embedUrl}" allowfullscreen></iframe>
          <div class="controls">
            <div class="control-row">
              <button class="control-btn" onclick="togglePlay()">⏸️</button>
              <div class="progress-container">
                <div class="progress-bar" onclick="seek(event)">
                  <div class="progress-fill" id="progress-fill"></div>
                </div>
              </div>
              <div class="time-display">
                <span id="current-time">0:00</span> / <span id="total-time">2:00:00</span>
              </div>
              <button class="control-btn" onclick="toggleVolume()">🔊</button>
              <button class="control-btn" onclick="toggleFullscreen()">⛶</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let isPlaying = true;
        let isMuted = false;
        let currentTime = 0;
        let totalTime = 7200; // 2 hours
        
        function togglePlay() {
          isPlaying = !isPlaying;
          // In real implementation, control iframe video
        }
        
        function toggleVolume() {
          isMuted = !isMuted;
          // In real implementation, control iframe volume
        }
        
        function toggleFullscreen() {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }
        
        function seek(event) {
          const rect = event.target.getBoundingClientRect();
          const clickX = event.clientX - rect.left;
          const progress = (clickX / rect.width) * 100;
          currentTime = (progress / 100) * totalTime;
          // In real implementation, seek iframe video
        }
        
        // Simulate progress
        setInterval(() => {
          if (isPlaying) {
            currentTime += 1;
            if (currentTime > totalTime) currentTime = totalTime;
            const progress = (currentTime / totalTime) * 100;
            document.getElementById('progress-fill').style.width = progress + '%';
            document.getElementById('current-time').textContent = formatTime(currentTime);
          }
        }, 1000);
        
        function formatTime(seconds) {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = Math.floor(seconds % 60);
          if (hours > 0) {
            return hours + ':' + minutes.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0');
          } else {
            return minutes + ':' + secs.toString().padStart(2, '0');
          }
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') window.close();
          if (e.key === ' ') { e.preventDefault(); togglePlay(); }
          if (e.key === 'f' || e.key === 'F') toggleFullscreen();
          if (e.key === 'm' || e.key === 'M') toggleVolume();
        });
      </script>
    </body>
    </html>
  `;
  
  // Open in new window
  const newWindow = window.open('', '_blank', 'width=1920,height=1080,fullscreen=yes');
  newWindow.document.write(fullscreenPage);
  newWindow.document.close();
}

/**
 * Open fullscreen video directly on the page
 */
function openFullscreenVideo(embedUrl, title) {
  const fullscreenContainer = document.getElementById('fullscreen-video-container');
  const fullscreenIframe = document.getElementById('fullscreen-video-iframe');
  const fullscreenTitle = document.getElementById('fullscreen-title');
  const closeBtn = document.getElementById('fullscreen-close-btn');
  const exitBtn = document.getElementById('fullscreen-exit-btn');
  const playBtn = document.getElementById('fullscreen-play-btn');
  const volumeBtn = document.getElementById('fullscreen-volume-btn');
  const progressBar = document.getElementById('fullscreen-progress-bar');
  const progressFill = document.getElementById('fullscreen-progress-fill');
  const currentTimeSpan = document.getElementById('fullscreen-current-time');
  const totalTimeSpan = document.getElementById('fullscreen-total-time');

  if (!fullscreenContainer) return;

  // Set video source and title
  fullscreenIframe.src = embedUrl;
  fullscreenTitle.textContent = title;

  // Show fullscreen container
  fullscreenContainer.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Initialize fullscreen controls
  let isPlaying = true;
  let isMuted = false;
  let currentTime = 0;
  let totalTime = 7200; // 2 hours default

  // Set total time
  totalTimeSpan.textContent = formatTime(totalTime);

  // Progress simulation
  const progressInterval = setInterval(() => {
    if (isPlaying && totalTime > 0) {
      currentTime += 1;
      if (currentTime > totalTime) currentTime = totalTime;
      
      const progress = (currentTime / totalTime) * 100;
      progressFill.style.width = progress + '%';
      currentTimeSpan.textContent = formatTime(currentTime);
    }
  }, 1000);

  // Close button functionality
  const closeFullscreen = () => {
    fullscreenContainer.classList.remove('active');
    document.body.style.overflow = '';
    fullscreenIframe.src = '';
    clearInterval(progressInterval);
  };

  closeBtn.addEventListener('click', closeFullscreen);
  exitBtn.addEventListener('click', closeFullscreen);

  // Play/Pause button
  playBtn.addEventListener('click', () => {
    const icon = playBtn.querySelector('ion-icon');
    isPlaying = !isPlaying;
    icon.name = isPlaying ? 'pause' : 'play';
  });

  // Volume button
  volumeBtn.addEventListener('click', () => {
    const icon = volumeBtn.querySelector('ion-icon');
    isMuted = !isMuted;
    icon.name = isMuted ? 'volume-mute' : 'volume-high';
  });

  // Progress bar click
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = (clickX / rect.width) * 100;
    
    currentTime = (progress / 100) * totalTime;
    progressFill.style.width = progress + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
  });

  // Keyboard controls
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closeFullscreen();
      document.removeEventListener('keydown', handleKeydown);
    } else if (e.key === ' ') {
      e.preventDefault();
      playBtn.click();
    } else if (e.key === 'f' || e.key === 'F') {
      // Toggle fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        fullscreenContainer.requestFullscreen();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      volumeBtn.click();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // Clean up when container is closed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (!fullscreenContainer.classList.contains('active')) {
          clearInterval(progressInterval);
          document.removeEventListener('keydown', handleKeydown);
          observer.disconnect();
        }
      }
    });
  });

  observer.observe(fullscreenContainer, { attributes: true });
}

/**
 * Handle movie details page when no ID is provided
 */
function handleDefaultMovieDetails() {
  // If no movie ID in URL, show a default movie (Free Guy)
  const defaultMovie = {
    id: 'tt6264654',
    title: 'Free Guy',
    year: 2021,
    genre: 'Action, Adventure, Comedy',
    rating: 7.7,
    duration: '115 min',
    quality: '4K',
    poster: './assets/images/movie-4.png',
    embedUrl: 'https://player.autoembed.cc/embed/movie/tt6264654',
    description: 'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.'
  };
  
  updateMovieDetailsPage(defaultMovie);
}