document.addEventListener("DOMContentLoaded", function () {
    const selectSoundButton = document.getElementById("select-sound");
    const selectedSoundSpan = document.getElementById("selected-sound");
    const soundFileInput = document.getElementById("sound-file");

    const hoursSelect = document.getElementById("hours");
    const minutesSelect = document.getElementById("minutes");

    const startAlarmButton = document.getElementById("start-alarm");
    const cancelAlarmButton = document.getElementById("cancel-alarm");
    const alarmSound = document.getElementById("alarm-sound");

    let selectedSoundPath = null;

    for (let i = 1; i <= 12; i++) {
        hoursSelect.add(new Option(`${i} AM`, i));
        hoursSelect.add(new Option(`${i} PM`, i + 12));
    }

    for (let i = 0; i < 60; i++) {
        minutesSelect.add(new Option(i.toString().padStart(2, "0"), i));
    }

    selectSoundButton.addEventListener("click", function () {
        soundFileInput.click();
    });

    soundFileInput.addEventListener("change", function () {
        selectedSoundSpan.textContent = soundFileInput.files[0].name;
        selectedSoundPath = URL.createObjectURL(soundFileInput.files[0]);
    });

    startAlarmButton.addEventListener("click", function () {
        const selectedHour = parseInt(hoursSelect.value);
        const selectedMinute = parseInt(minutesSelect.value);

        const alarmDate = new Date();
        alarmDate.setHours(selectedHour);
        alarmDate.setMinutes(selectedMinute);
        alarmDate.setSeconds(0);

        if (selectedSoundPath) {
            alarmSound.src = selectedSoundPath;
            alarmSound.play();

            
            window.close();
        } else {
            alert("노래를 선택해주세요");
        }
    });

    cancelAlarmButton.addEventListener("click", function () {
        window.close();
    });
});
