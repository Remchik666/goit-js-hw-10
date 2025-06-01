import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
                title: 'Invalid date!',
                message: 'Please choose a date in the future',
                position: 'topRight',
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });
            startBtn.disabled = true;
        } else { 
            startBtn.disabled = false;
        }
    },
};

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

let selectedDate;
let timerId;

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

flatpickr(dateTimePicker, options); 


function updateTimer() {
    const currentTime = new Date();
    const diff = selectedDate - currentTime;

    if (diff <= 0) {
        clearInterval(timerId);
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    dateTimePicker.disabled = true;

    updateTimer();
    timerId = setInterval(updateTimer, 1000);
});