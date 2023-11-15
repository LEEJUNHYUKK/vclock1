self.addEventListener("message", function (event) {
    const data = event.data;

    // 알람 시간 및 선택된 소리 경로
    const alarmTime = data.alarmTime;
    const selectedSoundPath = data.selectedSoundPath;

    // 현재 시간
    const currentTime = new Date().getTime();

    // 알람 시간에 도달하면 알람 재생
    if (currentTime >= alarmTime) {
        const alarmSound = new Audio(selectedSoundPath);
        alarmSound.play();
    }
}); //웹 워커를 사용한 이유는 백그라운드에서 알람설정을 처리하고, 
// 메인 스레드에서 발생하는 제약을 피하기 위해
