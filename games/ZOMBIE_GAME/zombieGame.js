let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 10
};

let zombies = [];

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawZombies() {
    ctx.fillStyle = 'red';
    for (let i = 0; i < zombies.length; i++) {
        let zombie = zombies[i];
        ctx.fillRect(zombie.x, zombie.y, zombie.width, zombie.height);
        zombie.y += zombie.speed;
        if (player.x < zombie.x + zombie.width &&
            player.x + player.width > zombie.x &&
            player.y < zombie.y + zombie.height &&
            player.y + player.height > zombie.y) {
            // Collision detected
            clearInterval(gameInterval);
            alert('Game Over!');
        }
    }
}

function spawnZombie() {
    let zombie = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 50,
        height: 50,
        speed: 2
    };
    zombies.push(zombie);
}

let gameInterval = setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawZombies();
    if (Math.random() < 0.03) {
        spawnZombie();
    }
}, 1000/60);

window.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    } else if (e.key == 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});