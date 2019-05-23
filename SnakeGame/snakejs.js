const board = [];
const boardWidth = 26, boardHeight = 16;

let score=0;
let snakeX;
let snakeY;
let snakeLength;
let snakeDirection;


function firstGame() {
    const boardElement = document.getElementById('board');

    for (let y = 0; y < boardHeight; ++y) {
        let row = [];
        for (let x = 0; x < boardWidth; ++x) {
            let cell = {};
            
            cell.element = document.createElement('div');
            
            boardElement.appendChild(cell.element);

            row.push(cell);
        }

        board.push(row);
    }

    startGame();

    gameLoop();
}

function placeFood() {
    let foodX = Math.floor(Math.random() * boardWidth);
    let foodY = Math.floor(Math.random() * boardHeight);

    board[foodY][foodX].food = 1;
}
    
function startGame() {
    
    snakeX = Math.floor(boardWidth / 2);
    snakeY = Math.floor(boardHeight / 2);
    snakeLength = 5;
    snakeDirection = 'Up';
    

    for (let y = 0; y < boardHeight; ++y) {
        for (let x = 0; x < boardWidth; ++x) {
            board[y][x].snake = 0;
            board[y][x].food = 0;
        }
    }

    board[snakeY][snakeX].snake = snakeLength;

    placeFood();
    score =0;
}

function gameLoop() {

    switch (snakeDirection) {
        case 'Up':    snakeY--; break;
        case 'Down':  snakeY++; break;
        case 'Left':  snakeX--; break;
        case 'Right': snakeX++; break;
    }

    if (snakeX < 0 || snakeY < 0 || snakeX >= boardWidth || snakeY >= boardHeight) { 
        startGame();
    }

    if (board[snakeY][snakeX].snake > 0) { 
       startGame();
    }

    if (board[snakeY][snakeX].food === 1) {
        snakeLength++;
        board[snakeY][snakeX].food = 0;
        placeFood();
        score++;
    }

    document.getElementById("scores").innerHTML = score;


    board[snakeY][snakeX].snake = snakeLength;

    for (let y = 0; y < boardHeight; ++y) {
        for (let x = 0; x < boardWidth; ++x) {
            let cell = board[y][x];

            if (cell.snake > 0) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            }
            else if (cell.food === 1) {
                cell.element.className = 'food';
            }
            else {
                cell.element.className = '';
            }
        }
    }

    setTimeout(gameLoop, 1000 / snakeLength);
}

function enterKey(event) {
    switch (event.key) {
        case 'ArrowUp': snakeDirection = 'Up'; break;
        case 'ArrowDown': snakeDirection = 'Down'; break;
        case 'ArrowLeft': snakeDirection = 'Left'; break;
        case 'ArrowRight': snakeDirection = 'Right'; break;
        default: break;
    }
    event.preventDefault();
}