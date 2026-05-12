let video;
let display;
let progress;
let volume;

video = document.querySelector('#vid-player');
progress = document.querySelector('#progress-bar');
video.ontimeupdate = progressUpdate;
progress.onclick = vidScrolling;

document.querySelector('#play').onclick = play;
document.querySelector('#pause').onclick = pause;
document.querySelector('#stop').onclick = stop;

document.querySelector('#speed-up').onclick = speedUp;
document.querySelector('#speed-down').onclick = speedDown;
document.querySelector('#speed-normal').onclick = speedNormal;

document.querySelector('#volume').value = video.volume * 100;
document.querySelector('#volume').oninput = videoVolume;

document.querySelector('#time-range-minus').onclick = rewindBefore;
document.querySelector('#time-range-plus').onclick = rewindAfter;


function play() {
    video.play();
}

function pause() {
    video.pause();
}

function stop() {
    video.pause();
    video.currentTime = 0;
}

function speedUp() {
    video.play();
    video.playbackRate = 2;
}

function speedDown() {
    video.play();
    video.playbackRate = 0.7;
}

function speedNormal() {
    video.play();
    video.playbackRate = 1;
}

function videoVolume() {
    let v = this.value;
    console.log(v);
    video.volume = v / 100;
}

function progressUpdate() {
    let d = video.duration;
    let c = video.currentTime;
    progress.value = (100* c) / d;

    document.querySelector('#curtime').innerHTML = sec2time(c);
}

function sec2time(timeInSeconds) {
    var pad = function (num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + '.' + pad(milliseconds, 3);
}

function vidScrolling() {
    let w = this.offsetWidth;
    let o = event.offsetX;
    this.value = 100 * o / w;
    video.pause();
    video.currentTime = video.duration * (o/w);
    video.play();
}

function rewindAfter() {
    video.pause();
    let c = video.currentTime;
    video.currentTime = c + 10;
    video.play();
}

function rewindBefore() {
    video.pause();
    let c = video.currentTime;
    video.currentTime = c - 10;
    video.play();
}

