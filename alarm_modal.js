document.addEventListener("DOMContentLoaded", function () {
    const selectSoundButton = document.getElementById("select-sound");
    const selectedSoundInput = document.getElementById("selected-sound");
    const soundFileInput = document.getElementById("sound-file");
    const cancelAlarmButton = document.getElementById("cancel-alarm");
    const startAlarmButton = document.getElementById("start-alarm");

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
