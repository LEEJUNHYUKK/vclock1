self.addEventListener("message", function (event) {
    const data = event.data;
    const alarmTime = data.alarmTime;
    const selectedSoundPath = data.selectedSoundPath;

    const currentTime = new Date().getTime();

    if (currentTime >= alarmTime) {
        // 오디오 재생에 Howler.js 사용
        const sound = new Howl({
            src: [selectedSoundPath]
        });

        // 사운드 재생
        sound.play();
    }
});
