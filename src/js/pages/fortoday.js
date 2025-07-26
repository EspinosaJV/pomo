import MicroModal from 'micromodal';
import '../../css/micromodal.css';
import { forTodayDashboardEventListeners } from '../events.js';
import { renderCurrentDateDisplay, renderCurrentTimeDisplay } from '../ui.js';

document.addEventListener("DOMContentLoaded", () => {
    forTodayDashboardEventListeners();
    
    MicroModal.init({
        onClose: (modal) => {
            console.log("Journal Modal is now closing");
        },
        debugMode: true
    });

    renderCurrentDateDisplay();
    renderCurrentTimeDisplay();

})