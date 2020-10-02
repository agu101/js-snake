/* game constants */
const SNAKE_SPEED = 10;
const board = document.getElementById('board');

/* game elements */
const snake = [{ x: 16, y: 16 }];
let vx = 0;
let vy = 0;

let bubble = { x: 1, y: 1 };


/* sets up game loop */
let lastRender = 0;

window.requestAnimationFrame(main);

function main(time) {
    window.requestAnimationFrame(main)
    let timeElapsed = (time - lastRender) / 1000;
    /* if time between render is too small, skip to next call*/
    if (timeElapsed < (1 / SNAKE_SPEED)) {
        return;
    }

    update();
    render(board);

    lastRender = time;
}

/* takes in user arrow key input */
window.addEventListener("keydown", e => {
    switch (e.key) {
        case 'ArrowUp':
            if (vy !== 1 || snake.length === 1) { vx = 0; vy = -1; }
            break
        case 'ArrowDown':
            if (vy !== -1 || snake.length === 1) { vx = 0; vy = 1; }
            break
        case 'ArrowLeft':
            if (vx !== 1 || snake.length === 1) { vx = -1; vy = 0; }
            break
        case 'ArrowRight':
            if (vx !== -1 || snake.length === 1) { vx = 1; vy = 0; }
            break
    }
});

/* updates the game logic each loop */
function update() {
    /* updates snake position */
    let head = { x: snake[0].x + vx, y: snake[0].y + vy };
    snake.unshift(head);
    /* grows snake if on food */
    if (snake[0].x === bubble.x && snake[0].y === bubble.y) {
        bubble.x = Math.floor(Math.random() * Math.floor(30)) + 1;
        bubble.y = Math.floor(Math.random() * Math.floor(30)) + 1;
    } else {
        snake.pop();
    }

}

/* renders graphics each loop */
function render(board) {
    /* reset board */
    board.textContent = "";
    /* draws each snake segment */
    snake.forEach(element => {
        const segment = document.createElement('div');
        segment.style.gridColumnStart = element.x;
        segment.style.gridRowStart = element.y;
        segment.classList.add('snake');
        board.appendChild(segment);
    });

    /* draws bubbles */
    const bub = document.createElement('div');
    bub.style.gridColumnStart = bubble.x;
    bub.style.gridRowStart = bubble.y;
    bub.classList.add('bubble');
    board.appendChild(bub);
}


