// Get Elements
const display = document.getElementById('display');
const timerBox = document.getElementById('timerBox');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

// Format time to MM:SS:MS
function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function update() {
    let now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        // STOP Logic
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Resume';
        // Remove active styles
        startStopBtn.classList.remove('active-state');
        timerBox.classList.remove('running');
    } else {
        // START Logic
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(update, 10);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
        // Add active styles (changes color and adds pulse)
        startStopBtn.classList.add('active-state');
        timerBox.classList.add('running');
        
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    
    // Reset UI styling
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('active-state');
    timerBox.classList.remove('running');
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Clear laps with a quick fade out effect before removal
    lapsList.style.opacity = '0';
    setTimeout(() => {
        lapsList.innerHTML = '';
        lapsList.style.opacity = '1';
    }, 300);
});

lapBtn.addEventListener('click', () => {
    if (!isRunning) return;
    
    lapCount++;
    const li = document.createElement('li');
    // The CSS animation 'slideInLeft' plays automatically when this LI is added to the DOM
    li.innerHTML = `
        <span class="lap-number">Lap ${lapCount}</span>
        <span>${display.textContent}</span>
    `;
    lapsList.prepend(li);
});