
const songs = [
  {
    name: "Feel Good",
    artist: "Syn Cole",
    img: "https://github.com/user-attachments/assets/d80e6b68-b67a-4e27-86ee-e00581883d5c",
    src: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/SynCole-FeelGood.mp3"
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
  currentSongIndex = index;
  audioPlayer.src = songs[index].src;
  isSongLoaded = true;
  audioPlayer.load();
  audioPlayer.play()
    .then(() => {
      updatePlayPauseIcon(true); 
    })
    .catch(() => {
      updatePlayPauseIcon(false); 
    });
  updatePlaylistHighlight();
  updateSwiperToMatchSong();
}



function updatePlayPauseIcon(isPlaying) {
  playPauseIcon.className = isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
}

function togglePlayPause() {
  if (!isSongLoaded || !audioPlayer.src) {
    loadAndPlaySong(currentSongIndex);
  } else if (audioPlayer.paused) {
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
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  updateProgressVisual();
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  updateProgressVisual();
});

progressBar.addEventListener("change", () => { audioPlayer.play(); });

audioPlayer.addEventListener("ended", () => {
  if(playMode==='repeat-one'){
    audioPlayer.currentTime=0;
    audioPlayer.play();
  } else {
    nextSong();
  }
});


function formatTime(time){
  const m = Math.floor(time/60);
  const s = Math.floor(time%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}


function updateProgressVisual(){
  const duration = audioPlayer.duration||0;
  const current = audioPlayer.currentTime||0;
  let bufferedEnd=0;
  try{
    if(audioPlayer.buffered.length) bufferedEnd=audioPlayer.buffered.end(audioPlayer.buffered.length-1);
  } catch(e){}
  const playedPercent=duration?(current/duration)*100:0;
  const bufferedPercent=duration?(bufferedEnd/duration)*100:0;
  const gradient=`linear-gradient(90deg,
    var(--primary-clr) 0% ${playedPercent}%,
    rgba(255,255,255,0.25) ${playedPercent}% ${bufferedPercent}%,
    rgba(255,255,255,0.06) ${bufferedPercent}% 100%)`;
  progressBar.style.background=gradient;
}


playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);


loadSong(currentSongIndex);

