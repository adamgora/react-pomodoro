export function formatTime(t) {
    let minutes = parseInt(t / 60, 0);
    let seconds = t % 60;
    seconds =  seconds < 10 ? '0' + seconds : seconds;
    minutes =  minutes < 10 ? '0' + minutes : minutes;
    return `${minutes}:${seconds}`;
}