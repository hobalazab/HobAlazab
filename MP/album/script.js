
const songs = [
  {
    name: "سنگ تراش",
    artist: "ئاوات بۆکانی",
    img: "https://kurdmusic.org/wp-content/uploads/2018/03/Awatbokani1.jpg",
    src: "https://dl.musickordi.com/Awat-Bokani/Awat-Bokani_Sang-Tarash[128].mp3"
  },
  {
    name: "Castle",
    artist: "Clarx & Harddope",
    img: "https://github.com/user-attachments/assets/9240f7ff-1b8e-4e62-a2d1-df78b285c7e0",
    src: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/HarddopeClarx-Castle.mp3"
  },
  {
    name: "Play Dead",
    artist: "Neffex",
    img: "https://github.com/user-attachments/assets/6e5ba953-49c5-4634-a1c5-4caf310cba86",
    src: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/PlayDead-NEFFEX.mp3"
  },
  {
    name: "Know Myself",
    artist: "Patrick Patrikios",
    img: "https://github.com/user-attachments/assets/a2ca0dfd-e53f-4e79-b8b0-288847e59b9a",
    src: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/KnowMyself-PatrickPatrikios.mp3"
  },
  {
    name: "Redemption",
    artist: "Besomorph & Coopex",
    img: "https://github.com/user-attachments/assets/b286d7ff-52a1-452d-9cd9-5920c937b16e",
    src: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/BesomorphCoopex-Redemption.mp3"
  }
];


const swiperWrapper = document.getElementById("swiperWrapper");
const playlistScroll = document.getElementById("playlistScroll");
const audioPlayer = document.getElementById("audioPlayer");
const progressBar = document.getElementById("progress-bar");
let pendingSeekTime = null;
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");

let currentSongIndex = 0;
let isSongLoaded = false;
let playMode = 'shuffle'; 


songs.forEach((song, index) => {

  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `<img src="${song.img}" /><h1>${song.artist}</h1>`;
  swiperWrapper.appendChild(slide);

  
  const item = document.createElement("div");
  item.className = "playlist-item";
  item.dataset.index = index;
  item.dataset.src = song.src;
  item.innerHTML = `
    <img src="${song.img}" alt="" />
    <div class="song">
      <p>${song.artist}</p>
      <p>${song.name}</p>
    </div>
    <p class="time">...</p>
  `;
  playlistScroll.appendChild(item);

  const tempAudio = new Audio(song.src);
  tempAudio.addEventListener("loadedmetadata", () => {
    const minutes = Math.floor(tempAudio.duration / 60);
    const seconds = Math.floor(tempAudio.duration % 60).toString().padStart(2,'0');
    item.querySelector(".time").textContent = `${minutes}:${seconds}`;
  });


  item.addEventListener("click", () => {
    loadAndPlaySong(index);
  });
});


var swiper = new Swiper(".swiper", {
  effect: "cards",
  cardsEffect: { perSlideOffset: 9, perSlideRotate: 3 },
  grabCursor: true,
  speed: 700,
  centeredSlides: true,
  loop: false
});

swiper.on("slideChange", () => {
  const newIndex = swiper.realIndex;
  if (newIndex !== currentSongIndex) {
    loadAndPlaySong(newIndex);
  }
});


function loadAndPlaySong(index) {
  const newSong = songs[index];
  const isNewSong = audioPlayer.src !== newSong.src;

  currentSongIndex = index;
  updatePlaylistHighlight();
  updateSwiperToMatchSong();

if (isNewSong) {
    audioPlayer.src = newSong.src;
    isSongLoaded = true;
    audioPlayer.load();

    // قبل از پلی کردن، مقدار نوار و زمان رو صفر می‌کنیم
    progressBar.value = 0;
    currentTimeEl.textContent = formatTime(0);
    pendingSeekTime = 0;

    audioPlayer.addEventListener("loadedmetadata", function handler() {
      applyPendingSeek();
      audioPlayer.removeEventListener("loadedmetadata", handler);
      audioPlayer.play().then(() => updatePlayPauseIcon(true));
    });
}

}


function updatePlayPauseIcon(isPlaying) {
  playPauseIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
}
function applyPendingSeek() {
  if (pendingSeekTime !== null && !isNaN(audioPlayer.duration)) {
    const t = Math.max(0, Math.min(pendingSeekTime, audioPlayer.duration));
    audioPlayer.currentTime = t;
    progressBar.value = t;
    currentTimeEl.textContent = formatTime(t);
    pendingSeekTime = null;
  }
}
function applyPendingSeek() {
  if (pendingSeekTime !== null && !isNaN(audioPlayer.duration)) {
    const t = Math.max(0, Math.min(pendingSeekTime, audioPlayer.duration));
    audioPlayer.currentTime = t;
    progressBar.value = t;
    currentTimeEl.textContent = formatTime(t);
    pendingSeekTime = null;
  }
}
function togglePlayPause() {
  if (audioPlayer.paused) {
    applyPendingSeek();
    audioPlayer.play();
    updatePlayPauseIcon(true);
  } else {
    audioPlayer.pause();
    updatePlayPauseIcon(false);
  }
}


function nextSong() {
  if(playMode==='shuffle'){
    currentSongIndex = Math.floor(Math.random()*songs.length);
  } else if(playMode==='repeat-one') {

  } else {
    currentSongIndex = (currentSongIndex+1)%songs.length;
  }
  loadAndPlaySong(currentSongIndex);
}
function prevSong() {
  if(playMode==='shuffle'){
    currentSongIndex = Math.floor(Math.random()*songs.length);
  } else if(playMode==='repeat-one') {

  } else {
    currentSongIndex = (currentSongIndex-1+songs.length)%songs.length;
  }
  loadAndPlaySong(currentSongIndex);
}


shuffleBtn.addEventListener("click", () => {
  shuffleBtn.classList.remove('fa-shuffle','fa-repeat','fa-list');
  if(playMode==='shuffle'){
    playMode='repeat-one';
    shuffleBtn.classList.add('fa-repeat');
    shuffleBtn.title='تکرار یک آهنگ';
  } else if(playMode==='repeat-one'){
    playMode='normal';
    shuffleBtn.classList.add('fa-list');
    shuffleBtn.title='پخش منظم';
  } else {
    playMode='shuffle';
    shuffleBtn.classList.add('fa-shuffle');
    shuffleBtn.title='پخش تصادفی';
  }
});

function updatePlaylistHighlight() {
  const playlistScroll = document.querySelector(".playlist-scroll");

  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active-playlist-item", i === currentSongIndex);
  });

  const activeItem = playlistScroll.children[currentSongIndex];
  if (activeItem) {
    activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}




function updateSwiperToMatchSong(){
  if(swiper.activeIndex!==currentSongIndex){
    swiper.slideTo(currentSongIndex);
  }
}


audioPlayer.addEventListener("loadedmetadata", () => {
    progressBar.max = audioPlayer.duration || 0;
    durationEl.textContent = formatTime(audioPlayer.duration || 0);

    // حالا طول آهنگ مشخص شد، اسلایدر رو فعال می‌کنیم
    progressBar.disabled = false;

    applyPendingSeek();
});


audioPlayer.addEventListener("timeupdate", () => {
    const duration = audioPlayer.duration || 0;
    let current = audioPlayer.currentTime || 0;
    let bufferedEnd = 0;

    try {
        if(audioPlayer.buffered.length) 
            bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1);
    } catch(e){}

    
    if (current > bufferedEnd) {
        audioPlayer.currentTime = bufferedEnd;
        current = bufferedEnd;
    }

    progressBar.value = current;
    currentTimeEl.textContent = formatTime(current);

 
    const visualEnd = Math.max(current, bufferedEnd);
    const playedPercent = duration ? (current / duration) * 100 : 0;
    const bufferedPercent = duration ? (visualEnd / duration) * 100 : 0;

    const gradient = `linear-gradient(90deg,
        var(--primary-clr) 0% ${playedPercent}%,
        rgba(255,255,255,0.25) ${playedPercent}% ${bufferedPercent}%,
        rgba(255,255,255,0.06) ${bufferedPercent}% 100%)`;

    progressBar.style.background = gradient;
});


progressBar.addEventListener("input", () => {
    if (isNaN(audioPlayer.duration)) return; // اگر طول مشخص نشده، کاری نکن

    pendingSeekTime = Number(progressBar.value) || 0;
    currentTimeEl.textContent = formatTime(pendingSeekTime);

    audioPlayer.currentTime = pendingSeekTime;
    updateProgressVisual();
});



function formatTime(time){
  const m = Math.floor(time/60);
  const s = Math.floor(time%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}


function updateProgressVisual() {
    const duration = audioPlayer.duration || 0;
    const current = pendingSeekTime !== null ? pendingSeekTime : (audioPlayer.currentTime || 0);
    let bufferedEnd = 0;
    try {
        if(audioPlayer.buffered.length) 
            bufferedEnd = audioPlayer.buffered.end(audioPlayer.buffered.length - 1);
    } catch(e){}

    const playedPercent = duration ? (current / duration) * 100 : 0;
    const bufferedPercent = duration ? (bufferedEnd / duration) * 100 : 0;

    const gradient = `linear-gradient(90deg,
        var(--primary-clr) 0% ${playedPercent}%,
        rgba(255,255,255,0.25) ${playedPercent}% ${bufferedPercent}%,
        rgba(255,255,255,0.06) ${bufferedPercent}% 100%)`;

    progressBar.style.background = gradient;
}



playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);



audioPlayer.src = songs[currentSongIndex].src;
isSongLoaded = false;
audioPlayer.load();
updatePlaylistHighlight();
updateSwiperToMatchSong(); 
progressBar.disabled = true;

playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", () => {
  shuffleBtn.classList.remove('fa-shuffle','fa-repeat','fa-list');
  if(playMode==='shuffle'){
    playMode='repeat-one';
    shuffleBtn.classList.add('fa-repeat');
    shuffleBtn.title='تکرار یک آهنگ';
  } else if(playMode==='repeat-one'){
    playMode='normal';
    shuffleBtn.classList.add('fa-list');
    shuffleBtn.title='پخش منظم';
  } else {
    playMode='shuffle';
    shuffleBtn.classList.add('fa-shuffle');
    shuffleBtn.title='پخش تصادفی';
  }
});

audioPlayer.addEventListener("ended", () => {
    if (playMode === "repeat-one") {
        // تکرار همون آهنگ
        loadAndPlaySong(currentSongIndex);
    } else if (playMode === "shuffle") {
        // آهنگ تصادفی
        const nextIndex = Math.floor(Math.random() * songs.length);
        loadAndPlaySong(nextIndex);
    } else {
        // حالت عادی: رفتن به آهنگ بعدی
        const nextIndex = (currentSongIndex + 1) % songs.length;
        loadAndPlaySong(nextIndex);
    }
});
