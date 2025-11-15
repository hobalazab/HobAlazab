const progress = document.getElementById("progress");

let isDragging = false;

progress.addEventListener("mousedown", () => {
  isDragging = true;
});

progress.addEventListener("touchstart", () => {
  isDragging = true;
});
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");
const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration-time");

const songs = [
   {
    title: "Symphony",
    name: "Clean Bandit ft. Zara Larsson",
    source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Clean-Bandit-Symphony.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d3ca28bf-e1b7-467e-a00b-c7785be8e397",
 
    
  },

  {
       title: "Pawn It All",
    name: "Alicia Keys",
source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Pawn-It-All.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/1afe4c6a-0287-43f0-9076-92f8be49d9dc",
 
    
  },
  {

  title: "Seni Dert Etmeler",
    name: "Madrigal",
 source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Madrigal-Seni-Dert-Etmeler.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/abaa23bd-8c93-4219-a3ef-0d0cb6f12566",
   
  

   
  },
  {

    title: "Instant Crush",
    name: "DaftPunk",
source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Daft-Punk-Instant-Crush.mp3",
    cover: "68716-Lightning-McQueen-Mater-CarsLightning-McQueen-4k.jpg",
 


    
  },
  {

    title: "As It Was",
    name: "Harry Styles",
 source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Harry-Styles-As-It-Was.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/18bc2436-740b-44c4-9dd8-fd7be51a07ad",
    


   
  },
  {

    title: "Physical",
     name: "Dua Lipa",
 source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Dua-Lipa-Physical.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4c5c1727-8b32-48c1-91de-b0496ccf10f6",
 


   
  },
  {

  title: "Delicate",
      name: "Taylor Swift",
 source: "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Taylor-Swift-Delicate.mp3",
    cover: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/23e440e5-a0fa-4a85-8175-bcc485a20ee6",
 
  
 
   
  },
];
songs.forEach((song, index) => {
  const audio = new Audio(song.source);
  audio.addEventListener("loadedmetadata", () => {
    const duration = formatTime(audio.duration);
    const item = document.querySelectorAll(".playlist-item")[index];
    const durationElement = item.querySelector(".duration");
    if (durationElement) {
      durationElement.textContent = duration;
    }
  });
});

const swiperWrapper = document.querySelector(".swiper-wrapper");
swiperWrapper.innerHTML = "";

songs.forEach((song) => {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.innerHTML = `
    <img src="${song.cover}" />
    <div class="overlay">
      <a href="${song.youtube}" target="_blank"><i class="fa-solid fa-download"></i></a>
    </div>
  `;
  swiperWrapper.appendChild(slide);
});





document.querySelectorAll(".playlist-item").forEach((item, index) => {
  const img = item.querySelector("img");
  const name = item.querySelector(".song p:first-child");
  const title = item.querySelector(".song p:last-child");
  const duration = item.querySelector("p:nth-of-type(2)");

  if (songs[index]) {
  img.src = songs[index].cover;
  name.textContent = songs[index].name;
  title.textContent = songs[index].title;
  duration.textContent = songs[index].duration;
}

});

let currentSongIndex = 0;



function updateMenuButtons(index) {
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}







function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}


function updateSongInfo() {

document.querySelectorAll(".playlist-item").forEach((item, i) => {
  item.classList.toggle("active", i === currentSongIndex);
  updateMenuButtons(currentSongIndex);

});
function handleSongEnd() {
  if (modes[currentModeIndex] === "repeat") {
    song.currentTime = 0;
    playSong(); 
    return;
  }

  let nextIndex;
  if (modes[currentModeIndex] === "shuffle") {
    nextIndex = Math.floor(Math.random() * songs.length);
  } else {
    nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
  }

  swiper.slideTo(nextIndex);
}



  const current = songs[currentSongIndex];
  songName.textContent = current.title;
  artistName.textContent = current.name;
  song.src = current.source;
  song.load();

  progress.value = 0;
  progress.max = 0;
  currentTimeDisplay.textContent = "0:00";
  durationDisplay.textContent = "0:00";
  progress.style.background = `linear-gradient(to right, #ff0055 0%, #ff0055 0%, #333 0%, #333 100%)`;

song.onloadedmetadata = () => {
  progress.max = song.duration;
  durationDisplay.textContent = formatTime(song.duration);
  updateProgressBar();


  const activeItem = document.querySelectorAll(".playlist-item")[currentSongIndex];
  const durationElement = activeItem.querySelector("p:nth-of-type(2)");
  if (durationElement) {
  
  }
};



  song.ontimeupdate = updateProgressBar;

  updateMenuButtons(currentSongIndex);
}


function updateProgressBar() {
  if (!song.duration) return;

  const played = (song.currentTime / song.duration) * 100;
  let buffered = 0;

  if (song.buffered.length > 0) {
    buffered = (song.buffered.end(song.buffered.length - 1) / song.duration) * 100;
  }

  progress.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);

  progress.style.background = `linear-gradient(to right,
    #0a58ca 0%, #0dcaf0 ${played}%,
    #aaaaaaff ${played}%, #575757ff ${buffered}%,
    #333 ${buffered}%, #333 100%)`;


if (!isDragging && song.currentTime >= song.duration) {
  handleSongEnd();
}


}



function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}


playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  pauseSong();
const maxTime = song.duration;

  song.currentTime = Math.min(progress.value, maxTime);
});

progress.addEventListener("change", () => {
  if (song.currentTime < song.duration - 0.5) {
    playSong();
  }
});






nextButton.addEventListener("click", () => {
  let nextIndex = currentSongIndex;

  const mode = modes[currentModeIndex];

  if (mode === "repeat") {

    song.currentTime = 0;
    playSong();
    return;
  }

  if (mode === "shuffle") {
 
    if (songs.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentSongIndex);
    }
  } else {

    nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
  }

  swiper.slideTo(nextIndex);
});

prevButton.addEventListener("click", () => {
  let prevIndex = currentSongIndex;

  const mode = modes[currentModeIndex];

  if (mode === "repeat") {

    song.currentTime = 0;
    playSong();
    return;
  }

  if (mode === "shuffle") {

    if (songs.length > 1) {
      do {
        prevIndex = Math.floor(Math.random() * songs.length);
      } while (prevIndex === currentSongIndex);
    }
  } else {

    prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) prevIndex = songs.length - 1;
  }

  swiper.slideTo(prevIndex);
});



document.querySelectorAll(".song-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
item.addEventListener("click", () => {
  swiper.slideTo(index);
});


  });
});


var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: currentSongIndex,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },

});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  playSong();
});



song.addEventListener("ended", handleSongEnd);


const modeBtn = document.querySelector(".mode-btn");
const modeIcon = document.getElementById("modeIcon");

const modes = ["repeat", "shuffle", "sequence"];
let currentModeIndex = 0;

function updateModeIcon() {
  const mode = modes[currentModeIndex];

  if (mode === "repeat") {
    modeIcon.classList.replace(modeIcon.classList.item(1), "fa-repeat");
  } else if (mode === "shuffle") {
    modeIcon.classList.replace(modeIcon.classList.item(1), "fa-shuffle");
  } else if (mode === "sequence") {
    modeIcon.classList.replace(modeIcon.classList.item(1), "fa-arrow-down-short-wide");
  }
}


modeBtn.addEventListener("click", () => {
  currentModeIndex = (currentModeIndex + 1) % modes.length;
  updateModeIcon();
});

const playlistContainer = document.querySelector(".playlist-container");
playlistContainer.innerHTML = "";

songs.forEach((song, index) => {
  const item = document.createElement("div");
item.className = "col-12 col-lg-6 mb-5 mt-5";






item.innerHTML = `
  <div class="playlist-item position-relative rounded p-4 text-white overflow-visible">

    <!-- تصویر بیرون‌زده -->
    <div class="cover-wrapper click-target">
      <img src="${song.cover}" class="cover-img" alt="" />
    </div>

    <!-- ناحیه کلیک‌پذیر واقعی -->
    <div class="click-target">
      <h5 class="song-title mt-2 mb-3 fw-bold text-center">${song.title}</h5>
      <div class="info-row d-flex justify-content-between px-2 mb-3">
        <p class="artist-name mb-0 text-start">${song.name}</p>
        <p class="duration mb-0 text-end">--:--</p>
      </div>
    </div>

    <!-- دکمه‌ها -->
<div class="actions d-flex justify-content-center gap-3">
  <button class="action-btn download-btn"><i class="fa-solid fa-download"></i></button>
  <button class="action-btn save-btn"><i class="fa-solid fa-bookmark"></i></button>
  <button class="action-btn like-btn"><i class="fa-regular fa-heart"></i></button>
</div>
`;




  item.addEventListener("click", () => {
    swiper.slideTo(index);
  });


  item.querySelector(".like-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLike(index);
  });

  item.querySelector(".save-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSave(index);
  });

  item.querySelector(".download-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    downloadSong(index);
  });

  playlistContainer.appendChild(item);
});

updateSongInfo();
// رعد
const flash = document.querySelector(".light-flash");

function flashOnce(duration = 200) {
  flash.style.opacity = "1";
  setTimeout(() => {
    flash.style.opacity = "0";
  }, duration);
}

function flashDouble() {
  flashOnce(100);
  setTimeout(() => flashOnce(100), 150);
}

function flashLong() {
  flashOnce(600);
}
setInterval(() => {
  const level = Math.floor(Math.random() * 200); 

  if (level > 180) flashDouble();
  else if (level > 120) flashOnce();
  else if (level > 80) flashLong();
}, 3000);

// رعد

item.querySelectorAll(".click-target").forEach(el => {
el.addEventListener("click", () => {
swiper.slideTo(index);
});
});


function handleSongEnd() {
  let nextIndex = currentSongIndex;
  const mode = modes[currentModeIndex];

  if (mode === "repeat") {
   
    song.currentTime = 0;
    playSong();
    return;
  }

  if (mode === "shuffle") {

    if (songs.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentSongIndex);
    }
  }

  if (mode === "sequence") {
    nextIndex = currentSongIndex + 1;
    if (nextIndex >= songs.length) nextIndex = 0;
  }


  if (nextIndex !== currentSongIndex) {
    currentSongIndex = nextIndex;
    updateSongInfo();
    playSong();
    
    swiper.slideTo(currentSongIndex, 600, true);
  }
}
