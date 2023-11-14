document.addEventListener("DOMContentLoaded", function () {
    const selectSoundButton = document.getElementById("select-sound");
    const selectedSoundInput = document.getElementById("selected-sound");
    const soundFileInput = document.getElementById("sound-file");

    const hoursSelect = document.getElementById("hours");
    const minutesSelect = document.getElementById("minutes");

    const cancelAlarmButton = document.getElementById("cancel-alarm");
    const startAlarmButton = document.getElementById("start-alarm");

    for (let i = 1; i <= 12; i++) {
        hoursSelect.add(new Option(`${i} AM`, i));
    }
    for (let i = 1; i <= 12; i++) {
        hoursSelect.add(new Option(`${i} PM`, i + 12));
    }

    for (let i = 0; i < 60; i++) {
        minutesSelect.add(new Option(i.toString().padStart(2, "0"), i));
    }

    selectSoundButton.addEventListener("click", function () {
        soundFileInput.click(); 
    });

    cancelAlarmButton.addEventListener("click", function () {
        
        window.close(); 
    });

    startAlarmButton.addEventListener("click", function () {

        window.close(); 
    });
});
