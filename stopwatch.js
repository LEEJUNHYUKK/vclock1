// 스톱워치의 상태를 저장하기 위한 변수들을 선언
let stopwatchInterval;
let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchMilliseconds = 0;

// 스톱워치를 시작하는 함수
function startStopwatch() {
    // setInterval 함수를 이용하여 updateStopwatch 함수를 10ms마다 호출
    stopwatchInterval = setInterval(updateStopwatch, 10);  
}

// 스톱워치를 멈추는 함수
function stopStopwatch() {
    // clearInterval 함수를 이용하여 updateStopwatch 함수의 반복 호출을 멈춤
    clearInterval(stopwatchInterval);
}

// 스톱워치를 리셋하는 함수
function resetStopwatch() {
    // 스톱워치의 상태를 저장하는 변수들을 모두 0으로 초기화
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    // 스톱워치 상태를 화면에 표시
    updateStopwatchDisplay();
}

// 스톱워치 상태를 업데이트하는 함수
function updateStopwatch() {
    
    stopwatchMilliseconds++;
    // 1/100초가 100에 도달하면 1초를 증가시키고 1/100초를 0으로 초기화
    if (stopwatchMilliseconds >= 100) {
        stopwatchSeconds++;
        stopwatchMilliseconds = 0;
    }
    // 1초가 60에 도달하면 1분을 증가시키고 1초를 0으로 초기화
    if (stopwatchSeconds >= 60) {
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }
    // 스톱워치 상태를 화면에 표시
    updateStopwatchDisplay();
}

// 스톱워치 상태를 화면에 표시하는 함수
function updateStopwatchDisplay() {

    const stopwatchElement = document.getElementById('stopwatch');
    // 분, 초, 1/100초를 2자리 문자열로 만듬
    const minutes = stopwatchMinutes.toString().padStart(2, '0');
    const seconds = stopwatchSeconds.toString().padStart(2, '0');
    const milliseconds = stopwatchMilliseconds.toString().padStart(2, '0');
    // 분:초:1/100초 형식의 문자열을 만들어 HTML 요소에 설정
    stopwatchElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
}
