import MicroModal from 'micromodal';
import '../css/micromodal.css';

export function homeDashboardEventListeners() {
    // BUTTONS 
    const pomodoroNavButton = document.getElementById("pomodoroNavButton");
    
    // from home dashboard to pomodoro dashboard
    pomodoroNavButton.addEventListener("click", (event) => {
        if (pomodoroNavButton) {
            console.log("Navigating to Pomodoro Dashboard Tab");
            window.location.href = "pomodoro.html";
        }
    })
}

export function pomodoroDashboardEventListeners() {
    // BUTTONS
    const pomodoroDashboardHomeButton = document.getElementById("pomodoroDashboardHomeButton");
    const pomodoroDashboardForTodayButton = document.getElementById("pomodoroDashboardForTodayButton");
    const pomodoroDashboardEndOfDayButton = document.getElementById("pomodoroDashboardEndOfDayButton");

    // from pomodoro dashboard to home
    pomodoroDashboardHomeButton.addEventListener("click", (event) => {
        console.log("Going back to home dashboard now!");
        window.location.href = "index.html";
    })

    // from pomodoro dashboard to for today
    pomodoroDashboardForTodayButton.addEventListener("click", (event) => {
        console.log("Going to for today page now!");
        window.location.href = "todolist.html";
    })

    // from pomodoro to end of day
    pomodoroDashboardEndOfDayButton.addEventListener("click", (event) => {
        console.log("Going to end of day page now!");
        window.location.href = "endofday.html";
    })
}

export function forTodayDashboardEventListeners() {
    const forTodayDashboardNewJournalBtn = document.getElementById("forTodayDashboardNewJournalBtn");
    const journalModalSubmitBtn = document.getElementById("journalModalSubmitBtn");
    const journalTextArea = document.getElementById("journalTextArea");
    const forTodayDashboardContainerContentJournalSectionText = document.getElementById("forTodayDashboardContainerContentJournalSectionText");

    let journalTextInput;

    forTodayDashboardNewJournalBtn.addEventListener("click", (event) => {
        MicroModal.show('modal-3', {
            onShow: (modal) => {
                console.log("Modal 3 is now going to be showed");
            }
        });
    });

    journalModalSubmitBtn.addEventListener("click", (event) => {
        console.log("Submitting journal content!");
        journalTextInput = journalTextArea.value;
        forTodayDashboardContainerContentJournalSectionText.innerHTML = journalTextInput;

    })
}