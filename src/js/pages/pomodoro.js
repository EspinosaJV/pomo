import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { pomodoroDashboardEventListeners } from '../events.js';
import { setProgress, initializeTimerUI } from '../ui.js';
import MicroModal from 'micromodal';
import '../../css/micromodal.css';

let activeCountdownInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    initializeTimerUI();
    startCountdown();

    const pomodoroTimerDisplay = document.getElementById("pomodoroTimerDisplay");
    const pomodoroTimerModalContinueBtn = document.getElementById("pomodoroTimerModalContinueBtn");
    const pomodoroTimerPauseButton = document.getElementById("pomodoroTimerPauseButton");
    const pomodoroModalTimerInput = document.getElementById("timer-input");

    let initialTimerValue = pomodoroTimerDisplay.textContent;

    pomodoroDashboardEventListeners();
    MicroModal.init({
        onShow: (modal) => {
            console.log("Pomodoro Modal timer is now showing.");
            const currentTime = pomodoroTimerDisplay.textContent;
            pomodoroModalTimerInput.value = currentTime;
            pomodoroModalTimerInput.select();
        },
        onClose: (modal) => {
            console.log("Modal is now closing.");
        },
    });

    setProgress(1);
    
    pomodoroTimerModalContinueBtn.addEventListener("click", () => {
        const newTimeValue = pomodoroModalTimerInput.value.trim();

        if (/^\d{1,2}:\d{2}$/.test(newTimeValue)) {
            initialTimerValue = newTimeValue;
            pomodoroTimerDisplay.textContent = newTimeValue;
            
            pauseCountdown();
            setProgress(1);
            pomodoroTimerPauseButton.src = 'src/assets/pausebutton.png';
            
            MicroModal.close();
            startCountdown();
        } else {
            alert("Please enter a valid time format (e.g., 25:00)");
        }
    });

    window.pomodoroTimerTogglePause = function() {
        const imgFileName = pomodoroTimerPauseButton.src.split('/').pop();

        if (imgFileName === 'pausebutton.png') {
            pauseCountdown();
            pomodoroTimerPauseButton.src = 'src/assets/playbutton.png';
        } else if (imgFileName === 'playbutton.png') {
            startCountdown();
            pomodoroTimerPauseButton.src = 'src/assets/pausebutton.png';
        }
    };

    window.pomodoroTimerToggleReset = function() {
        pauseCountdown(); 
        pomodoroTimerDisplay.textContent = initialTimerValue;
        setProgress(1); 
        pomodoroTimerPauseButton.src = 'src/assets/playbutton.png'; 
    };
});

function startCountdown() {
    if (activeCountdownInterval) {
        clearInterval(activeCountdownInterval);
    }

    const pomodoroTimerDisplay = document.getElementById("pomodoroTimerDisplay");
    let [min, sec] = pomodoroTimerDisplay.textContent.split(':').map(Number);
    let remaining = dayjs.duration({ minutes: min, seconds: sec });
    const totalDurationInSeconds = remaining.asSeconds();

    if (totalDurationInSeconds <= 0) {
        console.log("Timer is already at 0. Cannot start.");
        return;
    }

    activeCountdownInterval = setInterval(() => {
        remaining = remaining.subtract(1, 'second');
        const remainingSeconds = remaining.asSeconds();

        if (remainingSeconds < 0) { 
            clearInterval(activeCountdownInterval);
            activeCountdownInterval = null;
            pomodoroTimerDisplay.textContent = '00:00';
            setProgress(0); 
            document.getElementById("pomodoroTimerPauseButton").src = 'src/assets/playbutton.png';
            return;
        }

        const progress = remainingSeconds / totalDurationInSeconds;
        const timeText = `${String(remaining.minutes()).padStart(2, '0')}:${String(remaining.seconds()).padStart(2, '0')}`;

        pomodoroTimerDisplay.textContent = timeText;
        setProgress(progress);

    }, 1000);
}

function pauseCountdown() {
    if (activeCountdownInterval) {
        clearInterval(activeCountdownInterval);
        activeCountdownInterval = null;
        console.log("Countdown paused.");
    }
}