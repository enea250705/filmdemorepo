'use strict';

/**
 * Movie Details Page Script
 * This script only contains functions needed for the movie-details page
 * to avoid conflicts with the main script.js
 */

/**
 * Load movie details page
 */
async function loadMovieDetailsPageCustom() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  const type = urlParams.get('type');
  
  if (!movieId) {
    console.log('No movie ID provided, showing default movie');
    handleDefaultMovieDetails();
    return;
  }
  
  try {
    let movie;
    if (type === 'tv') {
      movie = await window.movieAPI.getTVSeriesDetails(movieId);
    } else {
      movie = await window.movieAPI.getMovieDetails(movieId);
    }
    
    if (movie) {
      updateMovieDetailsPage(movie, type);
    } else {
      console.error('Movie/TV show not found, showing default movie');
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
function updateMovieDetailsPage(movie, type = 'movie') {
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
  
  const ratingElement = document.querySelector('.rating');
  if (ratingElement) {
    ratingElement.textContent = movie.rating;
  }
  
  const yearElement = document.querySelector('.year');
  if (yearElement) {
    yearElement.textContent = movie.year;
  }
  
  const durationElement = document.querySelector('.duration');
  if (durationElement) {
    durationElement.textContent = movie.duration;
  }
  
  const qualityElement = document.querySelector('.quality');
  if (qualityElement) {
    qualityElement.textContent = movie.quality;
  }
  
  // Update movie description
  const descriptionElement = document.querySelector('.movie-detail-description');
  if (descriptionElement) {
    descriptionElement.textContent = movie.overview || movie.description;
  }
  
  // Update video player
  const iframe = document.getElementById('video-player-iframe');
  if (iframe && movie.embedUrl) {
    iframe.src = movie.embedUrl;
  }
  
  // Update watch buttons
  const watchBtn = document.getElementById('watch-now-btn');
  if (watchBtn) {
    watchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMoviePlayer(movie.embedUrl, movie.title);
    });
  }
  
  const mainPlayBtn = document.getElementById('main-play-btn');
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openMoviePlayer(movie.embedUrl, movie.title);
    });
  }
  
  const mainFullscreenBtn = document.getElementById('main-fullscreen-btn');
  if (mainFullscreenBtn) {
    mainFullscreenBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openFullscreenVideo(movie.embedUrl, movie.title);
    });
  }
}

/**
 * Handle default movie details
 */
function handleDefaultMovieDetails() {
  const defaultMovie = {
    id: '550988',
    title: 'Free Guy',
    year: 2021,
    genre: 'Action, Adventure, Comedy',
    rating: '7.7',
    duration: '115 min',
    quality: 'HD',
    poster: './assets/images/movie-4.png',
    overview: 'A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.',
    embedUrl: 'https://player.autoembed.cc/embed/movie/550988'
  };
  updateMovieDetailsPage(defaultMovie);
}

/**
 * Initialize player controls
 */
function initializePlayerControls() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const refreshBtn = document.getElementById('refresh-btn');
  const iframe = document.getElementById('video-player-iframe');
  
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    });
  }
  
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const currentSrc = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = currentSrc;
      }, 100);
    });
  }
}

/**
 * Open movie player modal
 */
function openMoviePlayer(embedUrl, title) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close-btn" aria-label="Close">
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </div>
      <div class="modal-body">
        <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = modal.querySelector('.modal-close-btn');
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
}

/**
 * Open fullscreen video player
 */
function openFullscreenVideo(embedUrl, title) {
  const fullscreenContainer = document.createElement('div');
  fullscreenContainer.className = 'fullscreen-container';
  fullscreenContainer.innerHTML = `
    <div class="fullscreen-header">
      <h3>${title}</h3>
      <button class="fullscreen-close-btn" aria-label="Close">
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
    <div class="fullscreen-video">
      <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  
  document.body.appendChild(fullscreenContainer);
  
  const closeBtn = fullscreenContainer.querySelector('.fullscreen-close-btn');
  
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(fullscreenContainer);
  });
  
  // ESC key to close
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(fullscreenContainer);
      document.removeEventListener('keydown', escHandler);
    }
  });
}

/**
 * Initialize everything when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Movie details page loaded - EXTERNAL SCRIPT');
  loadMovieDetailsPageCustom();
  initializePlayerControls();
});
