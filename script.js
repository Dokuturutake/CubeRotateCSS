const dice = document.getElementById('dice');
const rollButton = document.getElementById('rollDice');
const unfoldButton = document.getElementById('unfoldDice');
const bullets = document.querySelectorAll('.bullet');
let currentFace = 1;
let isUnfolded = false;

// Initial animation
window.addEventListener('load', () => {
    dice.style.transform = 'scale(0.1)';
    setTimeout(() => {
        dice.style.transform = 'scale(1)';
    }, 100);
});

// Roll dice function
function rollDice() {
    if (isUnfolded) {
        foldDice();
    }
    const randomFace = Math.floor(Math.random() * 6) + 1;
    rotateDice(randomFace);
}

// Rotate dice function
function rotateDice(face) {
    let rotateX = 0;
    let rotateY = 0;

    switch (face) {
        case 1: rotateX = 0; rotateY = 0; break;
        case 2: rotateX = 0; rotateY = -90; break;
        case 3: rotateX = 90; rotateY = 0; break;
        case 4: rotateX = -90; rotateY = 0; break;
        case 5: rotateX = 0; rotateY = 90; break;
        case 6: rotateX = 0; rotateY = 180; break;
    }

    dice.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    currentFace = face;
    updateBullets();
}

// Update bullet navigation
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index + 1 === currentFace);
    });
}

// Unfold dice function
function unfoldDice() {
    if (!isUnfolded) {
        dice.classList.add('unfolded');
        isUnfolded = true;
        unfoldButton.textContent = 'Fold';
    } else {
        foldDice();
    }
}

// Fold dice function
function foldDice() {
    dice.classList.remove('unfolded');
    isUnfolded = false;
    unfoldButton.textContent = 'Unfold';
    rotateDice(currentFace);
}

// Event listeners
rollButton.addEventListener('click', rollDice);
unfoldButton.addEventListener('click', unfoldDice);

bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        if (isUnfolded) {
            foldDice();
        }
        rotateDice(index + 1);
    });
});

// Resize dice based on screen size
function resizeDice() {
    const minDimension = Math.min(window.innerWidth, window.innerHeight);
    const diceSize = Math.min(minDimension * 0.6, 300); // Max size of 300px
    document.documentElement.style.setProperty('--dice-size', `${diceSize}px`);
}

window.addEventListener('resize', resizeDice);
resizeDice();

// Initial dice face
rotateDice(1);