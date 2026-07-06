// 1. Element Selection matching exact test specs
const player = document.querySelector('.player');
const video = player.querySelector('.player__video'); // Updated to .player__video
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); // Targeted directly

// Targets both the rewind and forward buttons
const skipButtons = player.querySelectorAll('.rewind, .skip'); 
const volumeInput = player.querySelector('input[name="volume"]');
const speedInput = player.querySelector('input[name="playbackSpeed"]');

// 2. Core Playback Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolumeUpdate() {
  video.volume = this.value;
}

function handleSpeedUpdate() {
  video.playbackRate = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 3. Bind Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);

skipButtons.forEach(button => button.addEventListener('click', skip));
volumeInput.addEventListener('input', handleVolumeUpdate);
speedInput.addEventListener('input', handleSpeedUpdate);