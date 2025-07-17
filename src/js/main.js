import { renderCurrentDateDisplay,renderCurrentTimeDisplay, } from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    // PUT ALL IMPORTED SHIT HERE
    renderCurrentDateDisplay();
    renderCurrentTimeDisplay();
    // renderCurrentQuoteDisplay(); //TODO: uncomment this shit in prod
})