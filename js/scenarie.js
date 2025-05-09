"use strict";

// Hamburger-menu
const mobileMenutrigger = document.getElementById("mobileMenuTrigger");
const mobileMenu = document.querySelector(".nav-links-container");
const navLinks = document.querySelectorAll(".nav-links li a");

mobileMenutrigger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileMenutrigger.classList.toggle("active");
  mobileMenutrigger.setAttribute(
    "aria-expanded",
    mobileMenu.classList.contains("active")
  );
});

navLinks.forEach((link) => {
  if (link.href === window.location.href) {
    link.setAttribute("aria-current", "page");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    mobileMenu.classList.remove("active");
    mobileMenutrigger.classList.remove("active");
  }
});

//Scenarie
let userChoices = [];
const textElement = document.querySelector('.text');
const optionsBtnElement = document.querySelector('#option-buttons');
const timerElement = document.querySelector('#timer');
let countdown;
let timeLeft = 20;
let currentNodeId = 1;


// Start
function startScenario() {
  currentNodeId = 1;
  timeLeft = 20;
  userChoices = []; // Nulstil brugerens valg
  showTextNode(currentNodeId);
  startTimer();
}

// Timer-funktion
function startTimer() {
  clearInterval(countdown);
  timerElement.innerText = `Tid: ${timeLeft}s`;

  countdown = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Tid: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      showEndNode();
    }
  }, 1000);
}

// Viser spørgsmål og knapper
function showTextNode(id) {
  const node = textNodes.find((n) => n.id === id);
  if (!node) return;

  currentNodeId = id;
  textElement.innerText = node.text;
  optionsBtnElement.innerHTML = '';

  node.options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('scenario-btn');
    button.addEventListener('click', () => selectOption(option));
    optionsBtnElement.appendChild(button);
  });
}

// Når brugeren vælger et svar
function selectOption(option) {
  userChoices.push(option.text);
  if (option.nextText === 'end') {
    clearInterval(countdown);
    showEndNode();
  } else {
    showTextNode(option.nextText);
  }
}

// Slutskærm
function showEndNode() {
  textElement.innerText =
    'Tak fordi du deltog! Du har nu lært, hvordan phishing på sociale medier foregår og hvordan du beskytter dig.';
  optionsBtnElement.innerHTML = '';

  const button = document.createElement('button');
  button.innerText = 'Prøv igen';
  button.classList.add('btn');
  button.addEventListener('click', () => {
    startScenario();
  });
  optionsBtnElement.appendChild(button);

  // Viser de valgte svar
  const userChoicesElement = document.createElement('div');
  userChoicesElement.classList.add('user-choices');

  const choicesHeader = document.createElement('h3');
  choicesHeader.innerText = 'Dine valg:';
  userChoicesElement.appendChild(choicesHeader);

  userChoices.forEach((choice, index) => {
    const choiceElement = document.createElement('p');
    choiceElement.innerText = `${index + 1}. ${choice}`;
    userChoicesElement.appendChild(choiceElement);
  });

  optionsBtnElement.appendChild(userChoicesElement);

  // Link til at læse mere om phishing
  const link = document.createElement('a');
  link.href = 'http://inferi.dk/datasikkerhed/phising.html';
  link.innerText = 'Læs mere om phishing her';
  link.target = '_blank';
  link.classList.add('article-link');
  optionsBtnElement.appendChild(link);
}

// Spørgsmål
const textNodes = [
  {
    id: 1,
    text: 'Du får en venlig besked på TikTok fra en person, der ser ud til at være en bekendt. Han sender et link til en "fantastisk app". Hvad gør du?',
    options: [
      { text: 'Jeg klikker på linket og downloader appen.', nextText: 2 },
      { text: "Jeg googler navnet på app'en.", nextText: 3 },
      { text: 'Jeg sender mine kontaktoplysninger.', nextText: 4 },
      { text: 'Jeg stopper samtalen og anmelder profilen.', nextText: 5 },
    ],
  },
  {
    id: 2,
    text: 'Appen viser sig at være phishing. Du har muligvis givet dine oplysninger til svindlere. Hvad gør du nu?',
    options: [
      { text: 'Jeg ændrer mine passwords.', nextText: 'end' },
      { text: 'Jeg kontakter TikTok og rapporterer appen.', nextText: 'end' },
      { text: 'Jeg scanner min telefon for malware.', nextText: 'end' },
      { text: 'Jeg advarer mine venner.', nextText: 'end' },
    ],
  },
  {
    id: 3,
    text: 'Du finder ud af, at appen er kendt svindel. Hvad gør du nu?',
    options: [
      { text: 'Jeg anmelder og bloker personen.', nextText: 'end' },
      { text: 'Jeg indsamler beviser og rapporterer.', nextText: 'end' },
      { text: 'Jeg spørger hvordan de fandt min profil.', nextText: 'end' },
      { text: 'Jeg advarer andre.', nextText: 'end' },
    ],
  },
  {
    id: 4,
    text: 'Du drukner i spamopkald. Dine oplysninger er blevet misbrugt. Hvad gør du nu?',
    options: [
      { text: 'Jeg ændrer adgangskoder og aktiverer 2FA.', nextText: 'end' },
      { text: 'Jeg kontakter min bank.', nextText: 'end' },
      { text: 'Jeg sletter mine sociale medier.', nextText: 'end' },
      { text: 'Jeg advarer mine venner.', nextText: 'end' },
    ],
  },
  {
    id: 5,
    text: 'TikTok fjerner den falske profil. Du har undgået at blive snydt. Hvad gør du nu?',
    options: [
      { text: 'Jeg informerer TikTok om flere profiler.', nextText: 'end' },
      { text: 'Jeg lærer mere om phishing.', nextText: 'end' },
      { text: 'Jeg rapporterer andre profiler.', nextText: 'end' },
      { text: 'Jeg deler min oplevelse online.', nextText: 'end' },
    ],
  },
];

// Scenarie efter klik
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('scenario').style.display = 'block';
    startScenario();
  });
});