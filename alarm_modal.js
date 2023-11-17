document.addEventListener("DOMContentLoaded", function () {
    // HTML 요소들을 가져오기
    const selectSoundButton = document.getElementById("select-sound");
    const selectedSoundSpan = document.getElementById("selected-sound");
    const soundFileInput = document.getElementById("sound-file");

    const hoursSelect = document.getElementById("hours");
    const minutesSelect = document.getElementById("minutes");

    const startAlarmButton = document.getElementById("start-alarm");
    const cancelAlarmButton = document.getElementById("cancel-alarm");
    const alarmSound = document.getElementById("alarm-sound");

    // 선택된 사운드의 경로를 저장할 변수
    let selectedSoundPath = null;

    // 시간과 분 선택을 위한 옵션 설정
    for (let i = 1; i <= 12; i++) {
        hoursSelect.add(new Option(`${i} AM`, i));
        hoursSelect.add(new Option(`${i} PM`, i + 12));
    }

    for (let i = 0; i < 60; i++) {
        minutesSelect.add(new Option(i.toString().padStart(2, "0"), i));
    }

    // "Choose Sound" 버튼 클릭 시 파일 선택 다이얼로그 열기
    selectSoundButton.addEventListener("click", function () {
        soundFileInput.click();
    });

    // 파일 선택이 변경되었을 때 호출되는 이벤트 리스너
    soundFileInput.addEventListener("change", function () {
        // 선택된 파일의 이름을 표시
        selectedSoundSpan.textContent = soundFileInput.files[0].name;
        // 선택된 사운드의 경로를 저장
        selectedSoundPath = URL.createObjectURL(soundFileInput.files[0]);
    });

    // "Start Alarm" 버튼 클릭 시
    startAlarmButton.addEventListener("click", function () {
        // 선택된 시간 및 분으로 알람 시간 설정
        const selectedHour = parseInt(hoursSelect.value);
        const selectedMinute = parseInt(minutesSelect.value);
        const alarmDate = new Date();
        alarmDate.setHours(selectedHour);
        alarmDate.setMinutes(selectedMinute);
        alarmDate.setSeconds(0);

        // 선택된 사운드가 있는 경우에만 처리
        if (selectedSoundPath) {
            // 웹 워커 생성 및 알람 정보 전송
            const worker = new Worker("alarm_worker.js");
            worker.postMessage({
                alarmTime: alarmDate.getTime(),
                selectedSoundPath: selectedSoundPath
            });
    
            // 저장된 알람 시간을 메인 창에 전달
            window.opener.postMessage({ type: "alarmSaved", time: alarmDate.toString() }, "*");

            // modal 창 닫기
            window.close();
        } else {
            // 선택된 사운드나 시간이 없는 경우 알림
            alert("알람시간과 노래를 선택해주세요.");
        }
    });

    // "Cancel Alarm" 버튼 클릭 시 modal 창 닫기
    cancelAlarmButton.addEventListener("click", function () {
        window.close();
    });
});
