import { getCurrentFormattedDate,getCurrentFormattedTime } from './utils.js';
// import { getQuote } from './utils.js'; //TODO: uncomment this for prod cuz dont wanna waste api tokens

const currentDateDisplay = document.getElementById("currentDateDisplay");
const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const currentQuoteDisplay = document.getElementById("currentQuoteDisplay");
const currentAuthorDisplay = document.getElementById("currentAuthorDisplay");

// what is the month day and year now
export function renderCurrentDateDisplay() {
    if (currentDateDisplay) {
        currentDateDisplay.innerHTML = getCurrentFormattedDate();
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
    }
}

//TODO: uncomment this shit out for prod cuz dont wanna waste api tokens
// quote display egh
// export async function renderCurrentQuoteDisplay() {
//     if ((currentQuoteDisplay) && (currentAuthorDisplay)) {
//         const { quote,author } = await getQuote();
        
//         currentQuoteDisplay.innerHTML = `"${quote}"`;
//         currentAuthorDisplay.innerHTML = `—${author}`;
//     }
// }