const logo = document.getElementById('dvdLogo');
const container = document.querySelector('.container');

// Logo position and velocity
let x = Math.random() * (window.innerWidth - getLogoWidth());
let y = Math.random() * (window.innerHeight - getLogoHeight());
let velocityX = 5;
let velocityY = 5;

// Color rotation
let hue = 0;

function getLogoWidth() {
    return logo.offsetWidth;
}

function getLogoHeight() {
    return logo.offsetHeight;
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

// Start animation
animate();
