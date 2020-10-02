/* game constants */
let SNAKE_SPEED = 10;
const board = document.getElementById('board');
const score = document.getElementById('score');

/* game elements */
let snake = [{ x: 16, y: 16 }];
let vx = 0;
let vy = 0;

let bubble = { x: 1, y: 1 };
newBubblePos();

/* sets up game loop */
let lastRender = 0;

window.requestAnimationFrame(main);

function main(time) {
    /* checks for game end */
    if (gameEnd()) {
        if (confirm("You lost! Start over?")) {
            window.location.reload();
        }
        return;
    }

    window.requestAnimationFrame(main);
    /* if time between render is too small, skip to next call*/
    let timeElapsed = (time - lastRender) / 1000;
    if (timeElapsed < (1 / SNAKE_SPEED)) {
        return;
    }
    lastRender = time;

    update();
    render(board);
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
    /* grows snake if on bubble */
    if (snake[0].x === bubble.x && snake[0].y === bubble.y) {
        newBubblePos();
    } else {
        snake.pop();
    }
    /* speed ramp */
    SNAKE_SPEED = Math.log(snake.length) + 5;
}

/* finds a new position for the bubble so its not on the snake */
function newBubblePos() {
    let onSnake = true;
    while (onSnake) {
        bubble.x = Math.floor(Math.random() * Math.floor(31)) + 1;
        bubble.y = Math.floor(Math.random() * Math.floor(31)) + 1;
        if (!isOnSnake()) {
            onSnake = false;
        }
    }
}

/* checks if bubble is spawned on snake */
function isOnSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (bubble.x === snake[i].x && bubble.y === snake[i].y) {
            return true;
        }
    }
    return false;
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

    /* updates score */
    score.textContent = `Score: ${snake.length - 1}`;
}

/* checks for end-conditions */
function gameEnd() {
    /* has snake head collided with the body */
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    /* check if wall hit */
    if (snake[0].x < 1 || snake[0].x > 31 || snake[0].y < 1 || snake[0].y > 31) {
        return true;
    }
    return false;
}
