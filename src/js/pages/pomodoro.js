import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { pomodoroDashboardEventListeners } from '../events.js';
import { setProgress, initializeTimerUI } from '../ui.js';
import MicroModal from 'micromodal';
import '../../css/micromodal.css';

let activeCountdownInterval = null;
let pomodoroSessionCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    initializeTimerUI();
    startCountdown();
    pomodoroDashboardEventListeners();
    setProgress(1);

    const pomodoroTimerDisplay = document.getElementById("pomodoroTimerDisplay");
    const pomodoroTimerModalContinueBtn = document.getElementById("pomodoroTimerModalContinueBtn");
    const pomodoroTimerPauseButton = document.getElementById("pomodoroTimerPauseButton");
    const pomodoroModalTimerInput = document.getElementById("timer-input");
    const pomodoroSessionModalBtn = document.getElementById("pomodoroSessionModalBtn");

    let initialTimerValue = pomodoroTimerDisplay.textContent;

    MicroModal.init({
        onClose: (modal) => {
            console.log(`Modal '${modal.id}' is now closing.`);
        },
        debugMode: true
    });

    pomodoroTimerDisplay.addEventListener("click", () => {
        MicroModal.show('modal-1', {
            onShow: (modal) => {
                console.log("Showing modal-1: Adjust Timer MicroModal");
                const currentTime = pomodoroTimerDisplay.textContent;
                pomodoroModalTimerInput.value = currentTime;
                pomodoroModalTimerInput.select();
            }
        });
    });

    pomodoroSessionModalBtn.addEventListener("click", () => {
        console.log("Pomodoro Session Modal Button has been clicked!");
        MicroModal.show('modal-2');
    })

    pomodoroTimerModalContinueBtn.addEventListener("click", () => {
        const newTimeValue = pomodoroModalTimerInput.value.trim();

        if (/^\d{1,2}:\d{2}$/.test(newTimeValue)) {
            initialTimerValue = newTimeValue;
            pomodoroTimerDisplay.textContent = newTimeValue;
            
            pauseCountdown();
            setProgress(1);
            pomodoroTimerPauseButton.src = 'src/assets/pausebutton.png';
            
            MicroModal.close('modal-1');
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

    window.pomodoroTimerLog = function() {
        console.log("Now logging the current Pomodoro session!");
        pomodoroSessionCount++;
        console.log("Here is the current Pomodoro Session count", pomodoroSessionCount);
        pomodoroTimerToggleReset();
    }
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