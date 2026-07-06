// 1. Select the necessary DOM elements
const speedContainer = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');
const video = document.querySelector('.flex');

/**
 * Handles the mouse moving over the speed scrubber track.
 * Calculates spatial percentages and maps them to video playback rate speeds.
 */
function handleScrub(e) {
  // Calculate relative pixel position from the top of the scrubber container
  const y = e.pageY - speedContainer.offsetTop;
  
  // Convert pixels to a percentage decimal (0.0 to 1.0)
  const percent = y / speedContainer.offsetHeight;
  
  // Establish baseline limits for safe video processing speed bounds
  const minSpeed = 0.4;
  const maxSpeed = 4.0;
  
  // Clamp the percentage between 0 and 1 so moving the mouse outside doesn't break UI styles
  const clampedPercent = Math.max(0, Math.min(1, percent));
  
  // Calculate the visual fill height percentage
  const heightPercentage = Math.round(clampedPercent * 100) + '%';
  
  // Map the percentage line to a target playback speed value
  const playbackRate = clampedPercent * (maxSpeed - minSpeed) + minSpeed;
  
  // 2. Update structural styles and text readouts
  speedBar.style.height = heightPercentage;
  speedBar.textContent = playbackRate.toFixed(1) + '×';
  
  // 3. Assign the mathematical product back directly to native element playback mechanics
  video.playbackRate = playbackRate;
}

// Attach the listener for real-time tracking updates
speedContainer.addEventListener('mousemove', handleScrub);