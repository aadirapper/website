// Initialize the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const birdSize = 20;
const gravity = 0.6;
const lift = -12;
const pipeWidth = 50;
const pipeGap = 120;
const pipeSpeed = 2;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let pipes = [];
let score = 0;
let frame = 0;

// Load images
const birdImage = new Image();
birdImage.src = 'https://www.pngmart.com/files/7/Bird-PNG-Pic.png';
const pipeImage = new Image();
pipeImage.src = 'https://www.pngmart.com/files/4/Pipe-PNG-Pic.png';

// Game loop
function gameLoop() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Bird physics
    birdVelocity += gravity;
    birdY += birdVelocity;
    
    // Draw bird
    ctx.drawImage(birdImage, 50, birdY, birdSize, birdSize);

    // Handle pipes
    if (frame % 60 === 0) {
        const pipeHeight = Math.random() * (canvas.height - pipeGap - 40) + 20;
        pipes.push({
            x: canvas.width,
            y: pipeHeight
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
        ctx.drawImage(pipeImage, pipe.x, 0, pipeWidth, pipe.y); // Top pipe
        ctx.drawImage(pipeImage, pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height); // Bottom pipe
        
        // Check for collisions
        if (pipe.x < 50 + birdSize && pipe.x + pipeWidth > 50) {
            if (birdY < pipe.y || birdY + birdSize > pipe.y + pipeGap) {
                // Collision detected
                alert('Game Over! Your score: ' + score);
                document.location.reload();
            }
        }
        
        // Remove off-screen pipes and update score
        if (pipe.x < -pipeWidth) {
            pipes.shift();
            score++;
        }
    });

    // Draw score
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + score, 10, 30);
    
    // Check for game over conditions
    if (birdY + birdSize > canvas.height || birdY < 0) {
        alert('Game Over! Your score: ' + score);
        document.location.reload();
    }

    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', () => {
    birdVelocity = lift;
});

// Start the game
gameLoop();
