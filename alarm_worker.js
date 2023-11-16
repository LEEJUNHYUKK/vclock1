self.addEventListener("message", function (event) {
    const data = event.data;

    if (data.type === "setAlarm") {
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
    }
});
