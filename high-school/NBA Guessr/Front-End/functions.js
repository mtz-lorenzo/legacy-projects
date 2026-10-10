// imagenes

const images = [
    "ATLANTA HAWKS", "BOSTON CELTICS", "BROOKLYN NETS", "CHARLOTTE HORNETS", "CHICAGO BULLS", "CLEVELAND CAVALIERS", "DALLAS MAVERICKS", "DENVER NUGGETS", "DETROIT PISTONS", 
   "GOLDEN STATE WARRIORS", "HOUSTON ROCKETS", "INDIANA PACERS", "LOS ANGELES CLIPPERS", "LOS ANGELES LAKERS", "MEMPHIS GRIZZLIES", "MIAMI HEAT", "MILWAUKEE BUCKS", 
   "MINNESOTA TIMBERWOLVES", "NEW ORLEANS PELICANS", "NEW YORK KNICKS", "OKLAHOMA CITY THUNDER", "ORLANDO MAGIC", "PHILADELPHIA 76ERS", "PHOENIX SUNS", 
    "PORTLAND TRAIL BLAZERS", "SACRAMENTO KINGS", "SAN ANTONIO SPURS", "TORONTO RAPTORS", "UTAH JAZZ", "WASHINGTON WIZARDS"
];

const imagesPlayers = ["DOMINIQUE WILKINS", "JOHN HAVLICEK", "BROOK LOPEZ", "KEMBA WALKER", "MICHAEL JORDAN", "LEBRON JAMES", "DIRK NOWITZKI", "ALEX ENGLISH", "ISIAH THOMAS",
     "STEPHEN CURRY", "HAKEEM OLAJUWON", "REGGIE MILLER", "RANDY SMITH", "KOBE BRYANT", "MIKE CONLEY", "DWYANE WADE", "GIANNIS ANTETOKOUNMPO", "KEVIN GARNETT", "ANTHONY DAVIS", 
     "PATRICK EWING", "RUSSELL WESTBROOK", "DWIGHT HOWARD", "HAL GREER", "WALTER DAVIS", "DAMIAN LILLARD", "OSCAR ROBERTSON", "TIM DUNCAN", "DEMAR DEROZAN",  "KARL MALONE", 
     "ELVIN HAYES"
];

const imagePath = "images/teams/";

const imageType = ".png";

let remainingImages = [...images]; 

let remainingImagesPlayers = [...imagesPlayers]; 

let currentImage = "";

let currentImagePlayer = "";

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    const selectedImage = remainingImages.splice(randomIndex, 1)[0]; 
    return selectedImage;
}

function updateImage() {
    const imageElement = document.getElementById("team-image");
    const randomImage = getRandomImage();

    if (randomImage !== null) {
        imageElement.src = imagePath + randomImage + imageType;
        currentImage = randomImage;
    }
}

function getRandomImagePlayer() {
    const randomIndex = Math.floor(Math.random() * remainingImagesPlayers.length);
    const selectedImagePlayer = remainingImagesPlayers.splice(randomIndex, 1)[0]; 
    return selectedImagePlayer;
}

function updateImagePlayer() {
    const imagePlayerElement = document.getElementById("player-image");
    const randomImagePlayer = getRandomImagePlayer();

    if (randomImagePlayer !== null) {
        imagePlayerElement.src = imagePath + randomImagePlayer + imageType;
        currentImagePlayer = randomImagePlayer;
    }
}

//gifs

const gifType = ".gif";

// badscore

const badScoreGifPath = "gifs/bad score/";

const badScoreGifs = [
    "ben simmons",
    "failed dunk",
    "fultz",
];

function getRandomBadScoreGif() {
    const randomIndex = Math.floor(Math.random() * badScoreGifs.length);
    return badScoreGifs[randomIndex];
}

function updateBadScoreGif() {
    const imageElement = document.getElementById("bad-score-gif");
    const randomBadScoreGif = getRandomBadScoreGif();
    imageElement.src = badScoreGifPath + randomBadScoreGif + gifType;
}

function changeToBadScoreGif(){
    document.getElementById("game").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("goodScore").style.display = "none";
    document.getElementById("badScore").style.display = "";
}

//midscore

const midScoreGifPath = "gifs/mid score/";

const midScoreGifs = [
    "curry",
    "embiid",
    "kobe",
    "random",
];

function getRandomMidScoreGif() {
    const randomIndex = Math.floor(Math.random() * midScoreGifs.length);
    return midScoreGifs[randomIndex];
}

function updateMidScoreGif() {
    const imageElement = document.getElementById("mid-score-gif");
    const randomMidScoreGif = getRandomMidScoreGif();
    imageElement.src = midScoreGifPath + randomMidScoreGif + gifType;
}

function changeToMidScoreGif(){
    document.getElementById("game").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("goodScore").style.display = "none";
    document.getElementById("midScore").style.display = "";
    document.getElementById("badScore").style.display = "none";
}
//goodscore

const goodScoreGifPath = "gifs/good score/";

const goodScoreGifs = [
    "ant",
    "champagne",
    "michael jordan",
];

function getRandomGoodScoreGif() {
    const randomIndex = Math.floor(Math.random() * goodScoreGifs.length);
    return goodScoreGifs[randomIndex];
}

function updateGoodScoreGif() {
    const imageElement = document.getElementById("good-score-gif");
    const randomGoodScoreGif = getRandomGoodScoreGif();
    imageElement.src = goodScoreGifPath + randomGoodScoreGif + gifType;
}

function changeToGoodScoreGif(){
    document.getElementById("game").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("badScore").style.display = "none";
    document.getElementById("goodScore").style.display = "";
}

//manejo score
let score = 0;

function updateScore(newScore) {
    score = newScore;
    document.getElementById('score-square').textContent = score;
    document.getElementById('score-square').value = score;
    document.getElementById('score-square1').textContent = score;
    document.getElementById('score-square1').value = score;
    document.getElementById('score-square2').textContent = score;
    document.getElementById('score-square2').value = score;
    document.getElementById('score-square3').textContent = score;
    document.getElementById('score-square3').value = score;
}

function handleScoreFeedback() {
    if (score <= 120) {
        changeToBadScoreGif();
    } else if (score > 120 && score < 300) {
        changeToMidScoreGif();
    } else if (score = 300) {
        changeToGoodScoreGif();
    }
}

//manejo pantallas
function changeScreen() {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("guess team").style.display = "";
}

function changeToPlayerScreen(){
    document.getElementById("guess team").style.display = "none";
    document.getElementById("guess player").style.display = "";
}

function changeToNext() {
    updateImage(); 
}

function showRegister(){
    document.getElementById("register").style.display = "";
    document.getElementById("login").style.display = "none";
}

function restartGame() {
    location.reload();  // Esto recargará la página y reiniciará el juego
    
}

