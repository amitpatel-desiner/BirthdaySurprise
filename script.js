// ===== Floating Hearts Generator =====
function createFloatingHearts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const heartCount = 15;
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 6) + 's';
    heart.style.animationDelay = (Math.random() * 10) + 's';
    heart.style.fontSize = (14 + Math.random() * 10) + 'px';
    container.appendChild(heart);
  }
}
createFloatingHearts('floating-hearts');

// ===== Scene Switcher =====
function goToScene(sceneId) {
  document.querySelectorAll('.scene').forEach(function(scene) {
    scene.classList.remove('active-scene');
  });
  document.getElementById(sceneId).classList.add('active-scene');
}

// ===== Background Music =====
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let musicPlaying = false;

musicToggle.addEventListener('click', function() {
  if (musicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔇';
  } else {
    bgMusic.play().catch(function() {});
    musicToggle.textContent = '🔊';
  }
  musicPlaying = !musicPlaying;
});

// ===== Scene 1 -> Scene 2 =====
const openSurpriseBtn = document.getElementById('open-surprise');
openSurpriseBtn.addEventListener('click', function() {
  goToScene('scene-gift');
  if (!musicPlaying) {
    bgMusic.play().then(function() {
      musicPlaying = true;
      musicToggle.textContent = '🔊';
    }).catch(function() {});
  }
});

// ===== Gift Box Open Interaction =====
const giftBox = document.getElementById('gift-box');
const giftHint = document.getElementById('gift-hint');
const lightBurst = document.getElementById('light-burst');
const continueBtn = document.getElementById('continue-btn');

giftBox.addEventListener('click', function() {
  if (giftBox.classList.contains('opened')) return;
  giftBox.classList.add('opened');
  giftHint.classList.add('hidden');
  lightBurst.classList.add('burst');
  setTimeout(function() { continueBtn.classList.remove('hidden'); }, 700);
});

// ===== Scene 2 -> Scene 3 (Letter) =====
continueBtn.addEventListener('click', function() {
  goToScene('scene-letter');
  startTypewriter();
});

// ===== Typewriter Effect for Letter =====
const letterMessage =
"Hii murgi... Kaisi ho? 😁\n\n" +
"Sabse pehle, Happy Birthday to you! 🎊\n\n" +
"Ye tumhara doosra birthday hai jab hum mile hain. Humein mile hue 2 saal+ ho gaye hain, aur is time mein humne jo bhi pal saath bitaye hain, unhe shabdon mein bayaan nahi kar sakta.\n\n" +
"Is poore samay mein tumne mere upar itne saare one-sided efforts kiye hain — mere nakhre uthaye, mere bewajah gussa hone par bhi mujhe manaya, aur meri galti na hone par bhi sorry bola.\n\n" +
"Starting se ab tak tumne jitne efforts kiye hain, aur uske saamne maine jitna tumhe pareshan kiya hai — usme tum mujhe block bhi kar deti to yakeenan haq banta tha. Isi sab ke liye thank you 💕\n\n" +
"Aur kyunki aaj tumhara birthday hai, isliye maine socha ise thoda special banaya jaaye — isliye maine apne favorite person ke liye ek birthday website banane ki koshish ki.\n\n" +
"Aur thank you, mujhe samajhne ke liye 🐔\n\n" +
"Happy Birthday, Akriti 🎈\n\n\n\n" +
"Tumhare bina din adhoora lagta hai,\n" +
"Tumhare hone se sab poora lagta hai.\n" +
"Kyu hai aisa, samajh nahi aata,\n" +
"Bas itna pata hai — tumhre hote sab acha lagta hai.";

const letterTextEl = document.getElementById('letter-text');
const letterContinueBtn = document.getElementById('letter-continue-btn');
let typewriterStarted = false;

function startTypewriter() {
  if (typewriterStarted) return;
  typewriterStarted = true;
  let i = 0;
  letterTextEl.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  function typeChar() {
    if (i < letterMessage.length) {
      letterTextEl.textContent = letterMessage.substring(0, i + 1);
      letterTextEl.appendChild(cursor);
      i++;
      setTimeout(typeChar, 22);
    } else {
      cursor.remove();
      letterContinueBtn.classList.remove('hidden');
    }
  }
  typeChar();
}

// ===== Scene 3 -> Scene 4 (Gallery) =====
letterContinueBtn.addEventListener('click', function() {
  goToScene('scene-gallery');
  startGalleryReveal();
});

let galleryStarted = false;
function startGalleryReveal() {
  if (galleryStarted) return;
  galleryStarted = true;
  const cards = document.querySelectorAll('.memory-card');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('revealed');
    });
  }, { threshold: 0.2 });
  cards.forEach(function(card) { observer.observe(card); });
}

// ===== Scene 4 -> Scene 5 (Distance) =====
const galleryContinueBtn = document.getElementById('gallery-continue-btn');
galleryContinueBtn.addEventListener('click', function() {
  goToScene('scene-distance');
});

// ===== Scene 5 -> Roadmap =====
const distanceContinueBtn = document.getElementById('distance-continue-btn');
distanceContinueBtn.addEventListener('click', function() {
  goToScene('scene-roadmap');
  startRoadAnimation();
});

// ===== Roadmap: Self-drawing road + traveling heart =====
let roadStarted = false;
function startRoadAnimation() {
  if (roadStarted) return;
  roadStarted = true;

  const path = document.getElementById('road-path');
  const heart = document.getElementById('road-heart');
  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.transition = 'stroke-dashoffset 2.5s ease-in-out';

  requestAnimationFrame(function() {
    path.style.strokeDashoffset = '0';
  });

  setTimeout(function() {
    heart.style.opacity = '1';
  }, 2400);
}

// ===== Roadmap -> Scene 6 (Cake) =====
const roadmapContinueBtn = document.getElementById('roadmap-continue-btn');
roadmapContinueBtn.addEventListener('click', function() {
  goToScene('scene-cake');
});

// ===== Scene 6: Candle Blow Interaction =====
const candles = document.querySelectorAll('.candle');
const cakeHint = document.getElementById('cake-hint');
const cakeContinueBtn = document.getElementById('cake-continue-btn');

candles.forEach(function(candle) {
  candle.addEventListener('click', function() {
    if (candle.classList.contains('blown')) return;
    candle.classList.add('blown');
    const allBlown = Array.from(candles).every(function(c) { return c.classList.contains('blown'); });
    if (allBlown) {
      cakeHint.textContent = 'Make a wish!';
      setTimeout(function() { cakeContinueBtn.classList.remove('hidden'); }, 800);
    }
  });
});

// ===== Scene 6 -> Scene 7 (Celebration) =====
cakeContinueBtn.addEventListener('click', function() {
  goToScene('scene-celebration');
  startConfetti();
});

// ===== Scene 7: Confetti =====
let confettiStarted = false;
function startConfetti() {
  if (confettiStarted) return;
  confettiStarted = true;
  const container = document.getElementById('confetti-container');
  const colors = ['#e8c988', '#f5a3c7', '#fff0d6', '#c9a860', '#f0e2c8'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (3 + Math.random() * 3) + 's';
    piece.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(piece);
  }
}

// ===== Scene 7 -> Scene 8 (Final Surprise) =====
const celebrationContinueBtn = document.getElementById('celebration-continue-btn');
celebrationContinueBtn.addEventListener('click', function() {
  goToScene('scene-final');
  createFloatingHearts('floating-hearts-final');
});