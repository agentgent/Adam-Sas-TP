

//variables
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;
let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
} 

let cactusArray = [];

let cactusWidth = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//game physics
let velocityX = -5; //cactus moves left
let velocityY = 0;
let gravity = .4

let gameOver = false;

//score variables
let score = 0;
let scoreboard = parseInt(localStorage.getItem("scoreboard")) || 0;
const scorecap = 1000;
const scorecapheavy = 2500;

//sounds
const deathaudio = new Audio('explosion.wav');
const scoreup = new Audio('scoreup.wav');
const scoreupcooler = new Audio('scoreupcooler.wav')
const restartsound = new Audio('restartsound.wav');
const restartscores = new Audio('restartscores.wav');


//cool gent code
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    dinoImg = new Image();
    dinoImg.src = "dino.png";
    dinoImg.onload = function() {
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "cactus2.png";
    
    cactus3Img = new Image();
    cactus3Img.src = "cactus3.png";


requestAnimationFrame(update);
setInterval(placeCactus, 1000); //1000 ms (1 second)
document.addEventListener("keydown", moveDino);

}

function update() {
requestAnimationFrame(update)
if (gameOver){
    return;
}

context.clearRect(0, 0, board.width, board.height);

//code for dinosaur
velocityY += gravity;
dino.y = Math.min(dino.y + velocityY, dinoY); //applies gravity to dino.y, so it doesnt fly off :skull:
context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

//code for cactus
for (let i = 0; i < cactusArray.length; i++) {
    let cactus = cactusArray[i];
    cactus.x += velocityX;
    context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

    if (detectCollision(dino, cactus)) {
        gameOver = true;
        dinoImg.src = "dino-dead.png";
        deathaudio.play();
        dinoImg.onload = function() {
            context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        }
    }
}



//code for score
context.fillStyle="saddlebrown";
context.font="20px sans-serif";
score++;
context.fillText(score, 5, 28);
//highscore (scoreboard) code
context.fillText(`HIGH SCORE: ${scoreboard}`, 402, 39)
if (score > scoreboard) {
scoreboard = score; //updates
localStorage.setItem("scoreboard", scoreboard.toString()); //stores it in localStorage
};



//score cap sound play
if (score % scorecap === 0){
    scoreup.play();
}

if (score % scorecapheavy === 0){
    scoreupcooler.play();
    if (scorecap, score){
        return;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 't' || event.key === 'T') {
        score = 0;
        scoreboard = 0; //resets highscore to 0
        localStorage.setItem("scoreboard", scoreboard.toString()); // Store it in localStorage
        restartscores.play()
    }
});

//restart sound
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        restartsound.play();
    }
});

}

function moveDino(e){
    if (gameOver){
        return;
    }

if ((e.code == "Space" && dino.y == dinoY)) {
    //jumping
    velocityY = -12;
}

}

document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        setTimeout(function() {
            window.location.reload();
        }, 110);
    }
});




function placeCactus() {
    if (gameOver){
        return;
    }

    //placing cactusses
    let cactus = {
        img : null,
        x : cactusX,
        y : cactusY,
        width : null,
        height : cactusHeight
    }

    let placeCactusChance = Math.random();


if (placeCactusChance > .90) { //vro's spawn rate is 10%
cactus.img = cactus3Img;
cactus.width = cactus3Width;
cactusArray.push(cactus);
}
else if (placeCactusChance > .70) { //vro's spawn rate is 30%
cactus.img = cactus2Img;
cactus.width = cactus2Width;
cactusArray.push(cactus);
}
else if (placeCactusChance > .40) { //vro's spawn rate is 60%
cactus.img = cactus1Img;
cactus.width = cactusWidth;
cactusArray.push(cactus);
} 

if (cactusArray.length > 5)
cactusArray.shift(); //removes stacking cactuses from array
}

function detectCollision(a, b) {
    return a.x < b.x + b.width && //a top left corner cant reach b top right corner.
    a.x + a.width > b.x && //same thing but a top right b top left
    a.y < b.y + b.height && //same thing but a top left b bottom left
    a.y + a.height > b.y; //same thing but bottomg left b top left
}

//jump sound
const audio = new Audio('jumpsound2.wav');
let audioPlays = false;

window.addEventListener('keydown', function(event) {
    if (gameOver){
        return;
    }
    if (event.key === " " && !audioPlays) {
        audio.currentTime = 0;
        audio.play();
        isPlaying = true;
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === " ") {
        setTimeout(function() {
            audio.pause();
            audio.currentTime = 0;
        }, 160);

        audioPlays = false;
    }
});

