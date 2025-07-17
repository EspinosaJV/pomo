export function homeDashboardEventListeners() {
    const pomodoroNavButton = document.getElementById("pomodoroNavButton");

    pomodoroNavButton.addEventListener("click", (event) => {
        if (pomodoroNavButton) {
            console.log("Navigating to Pomodoro Dashboard Tab");
            window.location.href = "pomodoro.html";
        }
    })
}