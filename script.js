// Input
const inputContainer = document.getElementById('input-container');
const contdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Countdown
const countdown = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const countSpan = document.querySelectorAll('span');

// Complete
const complete = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let titleCount = '';
let dateCount = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;

let today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        inputContainer.hidden = true;

        if(distance < 0) {
            countdown.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${titleCount} finished on ${dateCount}`;
            complete.hidden = false;
        } else {

            countdownTitle.textContent = `${titleCount}`;
            countSpan[0].textContent = `${days}`;
            countSpan[1].textContent = `${hours}`;
            countSpan[2].textContent = `${minutes}`;
            countSpan[3].textContent = `${seconds}`;
            complete.hidden = true;
            countdown.hidden = false;
        }
    },second)
}

function reset() {
    inputContainer.hidden = false;
    countdown.hidden = true;
    complete.hidden = true;
    clearInterval(countdownActive);
    let titleCount = '';
    let dateCount = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        titleCount = savedCountdown.title;
        dateCount = savedCountdown.date;
        countdownValue = new Date(dateCount).getTime();
        updateDOM();
    }
}


function updateCountdown(e){
    e.preventDefault();
    titleCount = e.srcElement[0].value;
    dateCount = e.srcElement[1].value;
    savedCountdown = {
        title: titleCount,
        date: dateCount
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    if(dateCount === '') {
        alert('Please enter a date');
    } else {
        countdownValue = new Date(dateCount).getTime();
        updateDOM();
    }
}

contdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);

restorePreviousCountdown();