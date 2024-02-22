var sentences = [
  // Understanding how to keep the human body healthy
  "Our bodies are amazing! Understanding how to keep them healthy empowers us to thrive.",
  "Move your body! Regular exercise builds strength, improves mood, and boosts energy.",
  "Get enough sleep! Rest allows your body to repair and recharge, impacting everything from memory to immunity.",
  "Listen to your body! Eat when hungry, rest when tired, and don't push through pain.",
  "Hydration is key! Aim for water throughout the day for optimal function and energy.",

  // Healthy Habits
  "Start small! Choose one healthy habit to focus on for a few weeks before adding another.",
  "Make healthy choices convenient! Keep fruits and veggies prepped, have water readily available, and plan your meals.",
  "Find an activity you enjoy! Exercise becomes easier when it's fun, whether it's dancing, swimming, or playing a sport.",
  "Buddy up! Partner with a friend or family member for support and accountability on your health journey.",
  "Celebrate small wins! Acknowledge and reward yourself for sticking to your healthy habits.",

  // Balanced Diet
  "Fill your plate with colors! Aim for a variety of fruits, vegetables, and whole grains for diverse nutrients.",
  "Choose lean protein sources! Chicken, fish, beans, and lentils provide essential building blocks for your body.",
  "Limit unhealthy fats! Opt for healthy fats found in avocados, nuts, and olive oil.",
  "Be mindful of sugar! Limit sugary drinks and processed foods, and choose natural sources like fruits.",
  "Read food labels! Pay attention to portion sizes, ingredients, and added sugars to make informed choices.",

  // Reading Food Labels
  "Ingredients are listed in order of quantity! The first few ingredients should be recognizable and whole foods.",
  "Serving size matters! Compare serving size to the amount you're actually eating to avoid overconsumption.",
  "Focus on nutrients you need! Look for vitamins, minerals, and fiber, and limit saturated fat, sodium, and added sugars.",
  "Percentage Daily Value (%DV) tells you how much of a nutrient a serving provides based on a daily diet.",
  "Don't be afraid to ask questions! If you're unsure about an ingredient or label, research it online or ask a registered dietitian.",

  // Improved Dietary Choices
  "Swap sugary drinks for water or unsweetened tea.",
  "Choose whole grains over refined grains like brown rice over white rice.",
  "Snack on fruits and vegetables instead of processed chips.",
  "Cook more meals at home to control ingredients and portion sizes.",
  "Try new healthy recipes to expand your culinary repertoire and keep things exciting."
]

function generateRandomSentence() {
  var randomSentenceIndex = Math.floor(Math.random() * sentences.length);
  var randomSentence = sentences[randomSentenceIndex];
  document.getElementById('advice').innerText = randomSentence;
}

generateRandomSentence();

const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  generateRandomSentence()
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}
