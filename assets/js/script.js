const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const displayScore = document.querySelector('.score');

const ballRadius = 10, 
    bumperHeight = 20, 
    bumperWidth = 150,
    nbCol = 8,
    nbRow = 5,
    brickWidth = 150,
    brickHeight = 40;

let x = canvas.width / 2, 
    y = canvas.height - 30, 
    bumperX = (canvas.width - bumperWidth) / 2,
    end = false,
    vitesseX = 5,
    vitesseY = -5,
    score = 0;

function createBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}
createBall();

function createBumper() {
    ctx.beginPath();
    ctx.rect(bumperX, canvas.height - bumperHeight - 2, bumperWidth, bumperHeight);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}
createBumper();

const bricks = [];
for(let i = 0 ; i < nbRow ; i++) {
    bricks[i] = [];

    for(let j = 0 ; j < nbCol ; j++) {
        bricks[i][j] = {x: 0, y: 0, statut: 1}
    }
}

function createBricks() {
    for(let i = 0 ; i < nbRow; i++) {
        for(let j = 0 ; j < nbCol; j++) {
            if(bricks[i][j].statut === 1) {
                let brickX = (j * (brickWidth + 10) + 70);
                let brickY = (i * (brickHeight + 10) + 60);

                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#9C4786';
                ctx.fill();
                ctx.closePath;
            }
        }
    } 
}
createBricks();

function create() {
    if(end === false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createBricks();
        createBall();
        createBumper();
        colisionDetection();

        if(x + vitesseX > canvas.width - ballRadius || x + vitesseX < ballRadius) {
            vitesseX = -vitesseX
        }
        if(y + vitesseY < ballRadius) {
            vitesseY = -vitesseY;
        }
        if(y + vitesseY > canvas.height - ballRadius) {
            if(x > bumperX && x < bumperX + bumperWidth) {
                vitesseX = vitesseX + 0.1;
                vitesseY = vitesseY + 0.1;
                vitesseY = -vitesseY;
            } else {
                end = true;
                displayScore.innerHTML = `Perdu ! <br> Clique sur le casse-briques pour recommencer`
            }
        }
        x += vitesseX;
        y += vitesseY;
        requestAnimationFrame(create);
    }
}

create();

function colisionDetection() {
    for(let i = 00 ; i < nbRow ; i++) {
        for(let j = 0 ; j < nbCol ; j++) {

            let b = bricks[i][j];

            if(b.statut === 1) {
                if(x > b.x - bumperHeight && x < b.x + brickWidth - bumperHeight && y > b.y - bumperHeight && y < b.y + bumperHeight - bumperHeight ||
                    x > b.x + bumperHeight && x < b.x + brickWidth + bumperHeight && y > b.y + bumperHeight && y < b.y + bumperHeight + bumperHeight) {
                    vitesseY = - vitesseY;
                    b.statut = 0;
                    score++;
                    displayScore.innerHTML = `Score : ${score}`;

                    if(score === nbCol * nbRow) {
                        displayScore.innerHTML = `Bravo ! <br> Clique sur le casse-briques pour recommencer`;
                        end = true;
                    }
                }
            }
        }
    }
}

document.addEventListener('mousemove', mouseMove);

function mouseMove(e) {
    let posXBumper = e.clientX - canvas.offsetLeft;
    
    if(posXBumper > 70 && posXBumper < canvas.width - 70) {
        bumperX = posXBumper - bumperWidth / 2;
    }
}
canvas.addEventListener('click', () => {
    if(end === true) {
        end = false;
        document.location.reload();
    }
})