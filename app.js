const div = document.querySelector("div");
const audio = document.getElementById("audio");
const lyricsDiv = document.getElementById("lyrics");

const playBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seek-bar");
const currentTimeLabel = document.getElementById("current-time");
const durationLabel = document.getElementById("duration");

const lyrics = [
  { time: 18, text: "kimi ga" },
  { time: 22, text: "Breathing in your dust" },
  { time: 25, text: "I wanna be your Ford Cortina" },
  { time: 29, text: "I will never rust" },
  { time: 32, text: "If you like your coffee hot" },
  { time: 36, text: "Let me be your coffee pot" },
  { time: 39, text: "You call the shots, babe" },
  { time: 42, text: "I just wanna be yours" },
  { time: 46, text: "Secrets I have held in my heart" },
  { time: 50, text: "Are harder to hide than I thought" },
  { time: 53, text: "Maybe I just wanna be yours" },
  { time: 57, text: "I wanna be yours" },
  { time: 59, text: "Wanna be yours" },

  { time: 60 + 15, text: "Let me be your leccy meter" },
  { time: 60 + 18, text: "And I'll never run out" },
  { time: 60 + 21, text: "Let me be the portable heater" },
  { time: 60 + 26, text: "That you'll get cold without" },
  { time: 60 + 29, text: "I wanna be your setting lotion (wanna be)" },
  { time: 60 + 33, text: "Hold your hair in deep devotion (How deep?)" },
  { time: 60 + 36, text: "At least as deep as the Pacific Ocean" },
  { time: 60 + 39, text: "Now I wanna be yours" },
  { time: 60 + 43, text: "Secrets I have held in my heart" },
  { time: 60 + 47, text: "Are harder to hide than I thought" },
  { time: 60 + 50, text: "Maybe I just wanna be yours" },
  { time: 60 + 54, text: "I wanna be yours" },
  { time: 60 + 56, text: "Wanna be yours" },

  { time: 120 + 26, text: "I wanna be your vacuum cleaner (wanna be yours)" },
  { time: 120 + 30, text: "Breathing in your dust (wanna be yours)" },
  { time: 120 + 33, text: "I wanna be your Ford Cortina (wanna be yours)" },
  { time: 120 + 37, text: "I will never rust (wanna be yours)" },
  { time: 120 + 40, text: "I just wanna be yours (wanna be yours)" }
  ];


audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const currentLyric = lyrics.find(
    (lyric, index) =>
      currentTime >= lyric.time &&
      (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time)
  );
  if (currentLyric) {
    lyricsDiv.textContent = currentLyric.text;
  }
});

playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      div.classList.add("active");
      lyricsDiv.textContent = "[ playing ]"
      playPauseBtn.textContent = "Pause";
    } else {
      audio.pause();
      div.classList.remove("active");
      lyricsDiv.textContent = "[ paused ]"
      playPauseBtn.textContent = "Play";
    }
  });

audio.addEventListener("ended", () => {
  div.classList.remove("active"); 
  lyricsDiv.textContent = ""
});

speedBtn.addEventListener("click", () => {
  if (audio.playbackRate === 1) {
    audio.playbackRate = 2; 
    speedBtn.textContent = "Normal Speed";
  } else {
    audio.playbackRate = 1; 
    speedBtn.textContent = "2x Speed";
  }
});


audio.addEventListener("timeupdate", () => {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
    updateCurrentTimeLabel();
})

seekBar.addEventListener("input", () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
    updateCurrentTimeLabel();
})

audio.addEventListener("loadedmetadata", () => {
    seekBar.max = 100;
    updateDurationLabel();
});

function updateCurrentTimeLabel() {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
}

function updateDurationLabel() {
    durationLabel.textContent = formatTime(audio.duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}
