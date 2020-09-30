/* game constants */
const SNAKE_SPEED = 2;

/* initial snake */
const snake = [{ x: 16, y: 16 }];

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
    render();

    lastRender = time;
}

/* updates the game logic each loop */
function update() {

}

/* renders graphics each loop */
function render(board) {
    snake.forEach(element => {
        const
    });
}

