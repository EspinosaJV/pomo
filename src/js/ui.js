import { getCurrentFormattedDate,getCurrentFormattedTime } from './utils.js';
import { getQuote } from './utils.js'; 

const currentDateDisplay = document.getElementById("currentDateDisplay");
const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const currentQuoteDisplay = document.getElementById("currentQuoteDisplay");
const currentAuthorDisplay = document.getElementById("currentAuthorDisplay");
const forTodayDashboardContainerContentDate = document.getElementById("forTodayDashboardContainerContentDate");
const forTodayDashboardContainerContentTime = document.getElementById("forTodayDashboardContainerContentTime");
let progressCircle = null;
let circumference = 0;

// function is called after DOM is initialized to initialize timer circle graphic
export function initializeTimerUI() {
    progressCircle = document.querySelector('.progress-ring__foreground');

    if (!progressCircle) {
        console.error("Timer progress circle element not found in the DOM");
        return;
    }

    const radius = progressCircle.r.baseVal.value;
    circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.setProperty('--progress-offset', '0');
}

// we need this function so that the circle graphic around timer is based off of the timer value
export function setProgress(percent) {
    if (!progressCircle) return;

    const clampedPercent = Math.max(0, Math.min(1, percent));
    const offset = circumference - clampedPercent * circumference
    progressCircle.style.setProperty('--progress-offset', offset.toString());
    console.log("Here is the current clampedPercent & offset value", clampedPercent, offset);
}

// what is the month day and year now
export function renderCurrentDateDisplay() {
    if (currentDateDisplay) {
        currentDateDisplay.innerHTML = getCurrentFormattedDate();
    } else if (forTodayDashboardContainerContentDate) {
        forTodayDashboardContainerContentDate.innerHTML = getCurrentFormattedDate();
    }
}

// live current time updater shish
export function renderCurrentTimeDisplay() {
    if (currentTimeDisplay) {
        const updateCurrentTime = () => {
            currentTimeDisplay.innerHTML = getCurrentFormattedTime();
        }
        
        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);
    } else if (forTodayDashboardContainerContentTime) {
        const updateCurrentTime = () => {
            forTodayDashboardContainerContentTime.innerHTML = getCurrentFormattedTime();
        }

        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);
    }


}

export async function renderCurrentQuoteDisplay() {
    if ((currentQuoteDisplay) && (currentAuthorDisplay)) {
        const { quote,author } = await getQuote();
        
        currentQuoteDisplay.innerHTML = `"${quote}"`;
        currentAuthorDisplay.innerHTML = `—${author}`;
    }
}