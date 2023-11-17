document.addEventListener("DOMContentLoaded", function () {
    // HTML 요소 가져오기
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");
    const ampmElement = document.getElementById("ampm");
    const dateDisplayElement = document.getElementById("date-display");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmSound = document.getElementById("alarm-sound");

    // 오디오 컨텍스트 생성
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 알람 시간 변수 초기화
    let alarmTime = null;

    // 부모 창에서 창을 닫는 함수 추가
    function closeAlarmModal() {
        document.getElementById("alarm-modal").remove();
    }

    // 부모 창에서 메시지 수신
    window.addEventListener("message", function (event) {
        // 저장된 알람 시간 설정
        if (event.data.type === "alarmSaved") {
            alarmTime = new Date(event.data.time);

            // 시간을 HH:mm 형식으로 변환하여 버튼 텍스트 업데이트
            const storedHours = alarmTime.getHours().toString().padStart(2, "0");
            const storedMinutes = alarmTime.getMinutes().toString().padStart(2, "0");
            setAlarmButton.textContent = `Set Alarm (${storedHours}:${storedMinutes})`;
        }
    });

    // 현재 시간을 표시하는 함수
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");

        // AM 또는 PM 설정
        let ampm = "AM";
        if (hours >= 12) {
            ampm = "PM";
            if (hours > 12) {
                hours -= 12;
            }
        }

        // 요일 및 월 변환
        const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()];
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][now.getMonth()];

        // 시간을 화면에 표시
        hourElement.textContent = hours.toString().padStart(2, "0");
        minuteElement.textContent = minutes;
        secondElement.textContent = seconds;
        ampmElement.textContent = ampm;
        dateDisplayElement.textContent = `${dayOfWeek} - ${month} ${now.getDate()}, ${now.getFullYear()}`;
    }

    // 설정된 알람 시간에 맞춰 알람 울리기
    function checkAlarm() {
        const now = new Date();

        if (alarmTime && now >= alarmTime) {
            // 알람 소리 재생
            playAudio(alarmSound.src, audioContext);
            // 알람 재생 후 알람 시간 초기화
            alarmTime = null;
        }
    }

    // 알람 설정 버튼 클릭 시
    setAlarmButton.addEventListener("click", function () {
        // 창을 열 때마다 저장된 알람 초기화
        localStorage.removeItem("alarmTime");
        // 알람 설정 모달 창 열기
        window.open("alarm_modal.html", "_blank", "width=400,height=400");
    });

    // 1초 간격으로 현재 시간 업데이트
    setInterval(updateClock, 1000);

    // 2초 간격으로 알람 확인
    setInterval(checkAlarm, 1500);
});
// 오디오 재생 함수
function playAudio(src, audioContext) {
    // AudioBufferSourceNode 생성
    const source = audioContext.createBufferSource();
    
    // Fetch API를 이용해서 오디오 파일을 가져옴
    fetch(src)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
        });
}