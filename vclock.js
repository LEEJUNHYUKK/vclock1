document.addEventListener("DOMContentLoaded", function () {
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const ampmElement = document.getElementById("ampm");
    const dateDisplayElement = document.getElementById("date-display");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmSound = document.getElementById("alarm-sound");

    let alarmTime = null;

    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        
        let ampm = "AM";
        if (hours >= 12) {
            ampm = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        }

        const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][now.getMonth()];

        hourElement.textContent = hours.toString().padStart(2, "0");
        minuteElement.textContent = minutes;
        secondElement.textContent = seconds;
        ampmElement.textContent = ampm;
        dateDisplayElement.textContent = `${dayOfWeek} - ${month} ${now.getDate()}, ${now.getFullYear()}`;

        if (alarmTime && alarmTime === `${hours}:${minutes}:00`) {
            alarmSound.play();
            
        }
    }

    setAlarmButton.addEventListener("click", function () {
        
        window.open("alarm_modal.html", "_blank", "width=400,height=400");
    });

    setInterval(updateClock, 1000);
});
