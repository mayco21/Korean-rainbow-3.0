let gradientImage;
const revealSize = 20; // Size of the revealing circle
let song1, song2, song3, song4, song5, song6, song7, song8, song9;
let playingSong = null;

function preload() {
  // Load the songs
  song1 = loadSound("song1.mp3");
  song2 = loadSound("song2.mp3");
  song3 = loadSound("song3.mp3");
  song4 = loadSound("song4.mp3");
  song5 = loadSound("song5.mp3");
  song6 = loadSound("song6.mp3");
  song7 = loadSound("song7.mp3");
  song8 = loadSound("song8.mp3");
  song9 = loadSound("song9.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the rainbow gradient background
  gradientImage = createRainbowGradientImage(width, height);
  // Draw the black cover
  drawBlackCover();
}

function draw() {
  if (mouseIsPressed) {
    // Reveal the gradient background when the mouse is pressed
    eraseBlackCover(mouseX, mouseY);
  }
}

// Function to create a rainbow gradient image
function createRainbowGradientImage(w, h) {
  let img = createImage(w, h);
  img.loadPixels();

  let colors = [
    color(255, 0, 0), // Red
    color(255, 127, 0), // Orange
    color(255, 255, 0), // Yellow
    color(0, 255, 0), // Green
    color(0, 0, 255), // Blue
    color(75, 0, 130), // Indigo
    color(143, 0, 255), // Violet
  ];

  for (let y = 0; y < h; y++) {
    let inter = map(y, 0, h, 0, 1);
    let c = lerpRainbowColor(colors, inter);
    for (let x = 0; x < w; x++) {
      img.set(x, y, c);
    }
  }
  img.updatePixels();
  return img;
}

// Function to interpolate between multiple colors
function lerpRainbowColor(colors, t) {
  let steps = colors.length - 1;
  let step = t * steps;
  let i = floor(step);
  let inter = step - i;
  return lerpColor(colors[i], colors[i + 1], inter);
}

// Function to draw the black cover
function drawBlackCover() {
  fill(0);
  rect(0, 0, width, height);
}

// Function to erase part of the black cover with a circle
function eraseBlackCover(x, y) {
  // Draw the part of the gradient image
  image(
    gradientImage,
    x - revealSize / 2,
    y - revealSize / 2,
    revealSize,
    revealSize,
    x - revealSize / 2,
    y - revealSize / 2,
    revealSize,
    revealSize
  );
}

// To handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gradientImage = createRainbowGradientImage(width, height);
  drawBlackCover();
}

// Function to play or stop a song
function toggleSong(song) {
  if (song.isPlaying()) {
    song.stop();
    playingSong = null;
  } else {
    if (playingSong && playingSong !== song) {
      playingSong.stop();
    }
    song.play();
    playingSong = song;
  }
}

// Function to handle key presses
function keyPressed() {
  if (key == "e") {
    // Restart everything from the beginning
    if (playingSong) {
      playingSong.stop();
      playingSong = null;
    }
    drawBlackCover(); // Redraw the black cover
  } else if (key === "1") {
    toggleSong(song1);
  } else if (key === "2") {
    toggleSong(song2);
  } else if (key === "3") {
    toggleSong(song3);
  } else if (key === "4") {
    toggleSong(song4);
  } else if (key === "5") {
    toggleSong(song5);
  } else if (key === "6") {
    toggleSong(song6);
  } else if (key === "7") {
    toggleSong(song7);
  } else if (key === "8") {
    toggleSong(song8);
  } else if (key === "9") {
    toggleSong(song9);
  }
}
