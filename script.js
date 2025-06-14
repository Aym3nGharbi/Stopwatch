let display = document.getElementById('displayTime');
let [hh, mm, ss] = [0, 0, 0];
let intervalId = null;

window.addEventListener('load', () =>{
    const savedTime = localStorage.getItem('StopwatchTime');
    if(savedTime){
        [hh, mm, ss] = savedTime.split(':').map(Number);
    }
    updateDisplay();
})

function updateDisplay() {
    display.innerHTML = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
}

function saveTime(){
    localStorage.setItem('StopwatchTime', `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`)
}



function stopwatch() {
    if (ss < 60) {
        ss++;
    } else {
        ss = 0;
        mm++;
        if (mm >= 60) {
            mm = 0;
            hh++;
        }
    }
    updateDisplay();
    saveTime();
}

function start() {
    if (intervalId === null) {
        intervalId = setInterval(stopwatch, 1000);
    }
}

function stop() {
    clearInterval(intervalId);
    intervalId = null;
}

function reset(){
    clearInterval(intervalId);
    intervalId = null;
    [hh, mm, ss] = [0, 0, 0];
    updateDisplay();
    localStorage.removeItem('StopwatchTime');
}

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('stopBtn').addEventListener('click', stop);
document.getElementById('resetBtn').addEventListener('click', reset);