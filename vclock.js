document.addEventListener("DOMContentLoaded", function () {
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const ampmElement = document.getElementById("ampm");
    const dateDisplayElement = document.getElementById("date-display");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmSound = document.getElementById("alarm-sound");

    let alarmTime = null;

    // 수정: 부모 창에서 창을 닫는 함수 추가
    function closeAlarmModal() {
        document.getElementById("alarm-modal").remove();
    }

    // 수정: 부모 창에서 메시지 수신
    window.addEventListener("message", function (event) {
        if (event.data.type === "alarmSaved") {
            alarmTime = new Date(event.data.time);
        
            const storedHours = alarmTime.getHours().toString().padStart(2, "0");
            const storedMinutes = alarmTime.getMinutes().toString().padStart(2, "0");
            setAlarmButton.textContent = `Set Alarm (${storedHours}:${storedMinutes})`;
        }

        alert(event.data);
        // 수정: localStorage에서 알람 시간 불러오기
        const storedAlarmTime = localStorage.getItem("alarmTime");
        if (storedAlarmTime) {
            alarmTime = new Date(storedAlarmTime);

            // 수정: 저장된 알람 시간을 표시
            const storedHours = alarmTime.getHours().toString().padStart(2, "0");
            const storedMinutes = alarmTime.getMinutes().toString().padStart(2, "0");
            setAlarmButton.textContent = `Set Alarm (${storedHours}:${storedMinutes})`;
        }
    });

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

        // 알람 시간에 도달하면 알람 재생
        if (alarmTime && now >= alarmTime) {
            alarmSound.play();
            // 알람 재생 후 알람 시간 초기화
            alarmTime = null;
        }
    }

    setAlarmButton.addEventListener("click", function () {
        // 수정: 창을 열 때마다 저장된 알람 메시지 초기화
        localStorage.removeItem("alarmTime");
        window.open("alarm_modal.html", "_blank", "width=400,height=400");
    });

    setInterval(updateClock, 1000);
});
