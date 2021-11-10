const screens = document.querySelectorAll(".screen");
const chooseBirdButtons = document.querySelectorAll(".choose-bird-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selectedBird = {};

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  score++;
  if (score > 100) message.classList.add("visible");
  scoreElement.innerHTML = `Очки: ${score}`;
};

const addBirds = () => {
  setTimeout(createBird, 1000);
  setTimeout(createBird, 5000);
};

const catchBird = function () {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove, 2000);
  addBirds();
};

const getRandomLocation = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
};

function random() {
  var randoms = Math.floor(Math.random() * 2);
  if (randoms) return -1;
  else return 1;
}

const createBird = () => {
  const bird = document.createElement("div");
  bird.classList.add("bird");
  const { x, y } = getRandomLocation();
  bird.style.top = `${y}px`;
  bird.style.left = `${x}px`;
  bird.innerHTML = `<img src="${selectedBird.src}" 
  alt="${selectedBird.alt}"
  style="transform: scale(${random()},1); -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none;"
   />`;
  bird.style.animation = `img-animation-${Math.floor(Math.random()*2)} ${Math.random() *10+10}s infinite`;
  
  bird.addEventListener("click", catchBird);
  gameContainer.appendChild(bird);
};

const startGame = () => setInterval(increaseTime, 1000);

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Время игры: ${m}:${s}`;
  seconds++;
  if (seconds > 3) {
    alert(`Игра окончена, вы собрали ${score} очков`);
    seconds = 0;
    location.reload();
    screens[1].classList.remove("up");
    screens[1].classList.add("down");
  }
};

chooseBirdButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    selectedBird = { src};
    screens[1].classList.add("up");
    setTimeout(createBird, 1000);
    startGame();
  });
});