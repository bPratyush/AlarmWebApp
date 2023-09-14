document.addEventListener("DOMContentLoaded", function () {
    const alarmTimeInput = document.getElementById("alarm-time");
    const setAlarmButton = document.getElementById("set-alarm");
    const dismissAlarmButton = document.getElementById("dismiss-alarm");
    const snoozeAlarmButton = document.getElementById("snooze-alarm");
    const alarmStatusText = document.getElementById("alarm-status-text");
    const alarmSound = document.getElementById("alarm-sound");
    let alarmTimeout;
    let isAlarmSet = false;

    const modeToggle = document.getElementById("mode-toggle");
    const modeLabel = document.getElementById("mode-label");

    modeToggle.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("dark-mode")) {
            modeLabel.textContent = "Light Mode";
        } else {
            modeLabel.textContent = "Dark Mode";
        }
    });

    setAlarmButton.addEventListener("click", function () {
        const alarmTime = alarmTimeInput.value;
        if (alarmTime) {
            const now = new Date();
            const alarm = new Date(now.toDateString() + " " + alarmTime);

            if (alarm <= now) {
                alarm.setDate(alarm.getDate() + 1);
            }

            const timeUntilAlarm = alarm - now;

            alarmStatusText.textContent = "Alarm set for " + alarmTime;

            clearTimeout(alarmTimeout);

            alarmTimeout = setTimeout(function () {
                alarmStatusText.textContent = "Time to wake up!";
                alarmSound.play();
                dismissAlarmButton.style.display = "inline";
                snoozeAlarmButton.style.display = "inline";
                isAlarmSet = true;
            }, timeUntilAlarm);
        } else {
            alert("Please enter a valid alarm time.");
        }
    });

    dismissAlarmButton.addEventListener("click", function () {
        stopAlarm();
    });

    snoozeAlarmButton.addEventListener("click", function () {
        snoozeAlarm();
    });

    document.addEventListener("click", function (event) {
        if (isAlarmSet && event.target !== setAlarmButton) {
            event.preventDefault();
        }
    });

    function stopAlarm() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        dismissAlarmButton.style.display = "none";
        snoozeAlarmButton.style.display = "none";
        alarmStatusText.textContent = "Alarm dismissed";
        clearTimeout(alarmTimeout);
        isAlarmSet = false;
    }

    function snoozeAlarm() {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        snoozeAlarmButton.style.display = "none";
        alarmStatusText.textContent = "Alarm snoozed for 5 minutes";

        const snoozeDuration = 5 * 60 * 1000;
        setTimeout(function () {
            alarmStatusText.textContent = "Alarm dismissed";
            setAlarmButton.click();
        }, snoozeDuration);
    }

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.key === "m") {
            toggleDarkMode();
        } else if (event.ctrlKey && event.key === "s") {
            setAlarmButton.click();
        } else if (event.ctrlKey && event.key === "d") {
            dismissAlarmButton.click();
        } else if (event.ctrlKey && event.key === "z") {
            snoozeAlarmButton.click();
        }
    });
});
