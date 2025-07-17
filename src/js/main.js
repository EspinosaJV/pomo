import { renderCurrentDateDisplay,renderCurrentTimeDisplay, } from './ui.js';
import { homeDashboardEventListeners } from './events.js';

document.addEventListener("DOMContentLoaded", () => {
    // PUT ALL IMPORTED SHIT HERE
    renderCurrentDateDisplay();
    renderCurrentTimeDisplay();
    homeDashboardEventListeners();
    // renderCurrentQuoteDisplay(); //TODO: uncomment this shit in prod
})