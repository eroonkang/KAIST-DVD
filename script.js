const logo = document.getElementById('dvdLogo');
const container = document.querySelector('.container');

// Logo position and velocity
let x, y, velocityX, velocityY;

// Color rotation
let hue;

function getLogoWidth() {
    return logo.offsetWidth;
}

function getLogoHeight() {
    return logo.offsetHeight;
}

function initializeAnimation() {
    // Set random starting position
    x = Math.random() * (window.innerWidth - getLogoWidth());
    y = Math.random() * (window.innerHeight - getLogoHeight());
    
    // Set velocity based on window size
    velocityX = window.innerWidth / 256;
    velocityY = window.innerWidth / 256;
    
    // Start with random hue
    hue = Math.random() * 360;
    logo.querySelector('svg').style.filter = `hue-rotate(${hue}deg)`;
}

function animate() {
    const logoWidth = getLogoWidth();
    const logoHeight = getLogoHeight();
    
    // Update position
    x += velocityX;
    y += velocityY;
    
    // Check boundaries and bounce
    if (x <= 0 || x >= window.innerWidth - logoWidth) {
        velocityX = -velocityX;
        changeColor();
    }
    if (y <= 0 || y >= window.innerHeight - logoHeight) {
        velocityY = -velocityY;
        changeColor();
    }
    
    // Keep logo in bounds
    x = Math.max(0, Math.min(window.innerWidth - logoWidth, x));
    y = Math.max(0, Math.min(window.innerHeight - logoHeight, y));
    
    // Update position
    logo.style.left = x + 'px';
    logo.style.top = y + 'px';
    
    requestAnimationFrame(animate);
}

function changeColor() {
    hue = (hue + 60) % 360;
    logo.querySelector('svg').style.filter = `hue-rotate(${hue}deg)`;
}

// Initialize and start animation
initializeAnimation();
animate();

// Debounce resize events to wait until resizing finishes
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initializeAnimation();
    }, 100); // Wait 100ms after resize stops
});
