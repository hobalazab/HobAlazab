/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      manualSeekToEnd: false,
      isDragging: false,
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
         bufferedWidth: "0%", 
      isTimerPlaying: false,
      
      tracks: [
        {
          name: "Mekanın Sahibi",
          artist: "Norm Ender",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Everybody Knows",
          artist: "Leonard Cohen",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true
        },
        {
          name: "Extreme Ways",
          artist: "Moby",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Butterflies",
          artist: "Sia",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
          url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
          favorited: false
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true
        },
        {
          name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "The Comeback Kid",
          artist: "Lindi Ortega",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
scrollToActiveTrack(force = false) {
  if (this._isAutoScrolling && !force) return;

  this.$nextTick(() => {
    setTimeout(() => {
      const list = this.$refs.trackList;
      const activeItem = list?.children[this.currentTrackIndex];
      if (!list || !activeItem) return;

      const listHeight = list.clientHeight;
      const itemHeight = activeItem.offsetHeight;
      const itemTop = activeItem.offsetTop;
      const itemBottom = itemTop + itemHeight;
      const currentScroll = list.scrollTop;

      if (window.innerWidth < 768) {

        if (itemTop < currentScroll) {
          list.scrollTo({ top: itemTop - 10, behavior: "smooth" });
        } else if (itemBottom > currentScroll + listHeight) {
          list.scrollTo({ top: itemBottom - listHeight + 10, behavior: "smooth" });
        }
        return;
      }

   
      const target = itemTop - listHeight / 2 + itemHeight / 2;
      const safeTarget = Math.max(0, Math.min(target, list.scrollHeight - listHeight));
      this._isAutoScrolling = true;
      list.scrollTo({ top: safeTarget, behavior: "smooth" });
      setTimeout(() => (this._isAutoScrolling = false), 500);
    }, 250); 
  });
}



,
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
updateBar(x) {
  const progress = this.$refs.progress;
  const maxduration = this.audio.duration;
  const position = x - progress.offsetLeft;
  let percentage = (100 * position) / progress.offsetWidth;

  percentage = Math.max(0, Math.min(percentage, 100));
  const newTime = (maxduration * percentage) / 100;


  const safeTime = Math.min(newTime, maxduration - 0.5);

  this.barWidth = percentage + "%";
  this.circleLeft = percentage + "%";
  this.audio.currentTime = safeTime;

  if (!this.isDragging) {
    this.audio.play();
    this.isTimerPlaying = true;
  }
}





,
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
 dragStart(e) {
  this.isDragging = true;

  this.audio.pause();
  this.isTimerPlaying = false;


  if (e.cancelable) e.preventDefault();

  const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.pageX;
  this.updateBar(clientX);

  document.addEventListener("mousemove", this.dragMove);
  document.addEventListener("mouseup", this.dragEnd);
  document.addEventListener("touchmove", this.dragMove, { passive: false });
  document.addEventListener("touchend", this.dragEnd);
}
,
dragMove(e) {
  if (this.isDragging) {
    const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.pageX;
    this.updateBar(clientX);
  }
},
dragEnd() {
  if (this.isDragging) {
    this.audio.play();
    this.isTimerPlaying = true;
  }
  this.isDragging = false;

}
,
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
nextTrack() {
  this.transitionName = "scale-out";
  this.isShowCover = false;

  if (this.currentTrackIndex < this.tracks.length - 1) {
    this.currentTrackIndex++;
  } else {
    this.currentTrackIndex = 0;
  }

  this.currentTrack = this.tracks[this.currentTrackIndex];
  this.resetPlayer(); 
}


,


resetPlayer() {
  this.barWidth = 0;
  this.circleLeft = 0;
  this.audio.currentTime = 0;
  this.audio.src = this.currentTrack.source;

  this.$nextTick(() => {
    setTimeout(() => {
      const list = this.$refs.trackList;
      const activeItem = list?.children[this.currentTrackIndex];
      if (list && activeItem) {

        const listTop = list.scrollTop;
        const itemTop = activeItem.offsetTop;
        const itemHeight = activeItem.offsetHeight;
        const listHeight = list.clientHeight;

        const scrollTarget = itemTop - listHeight / 2 + itemHeight / 2;


        if (Math.abs(listTop - scrollTarget) > 10) {
          list.scrollTo({
            top: scrollTarget,
            behavior: "smooth"
          });
        }
      }
    }, 50);
  });

  setTimeout(() => {
    if (this.isTimerPlaying) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }, 300);
}


,
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    },
selectTrack(index) {
  this.currentTrackIndex = index;
  this.currentTrack = this.tracks[index];
  this.resetPlayer();
}




,

    formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

  },
  created() {
  let vm = this;
  this.currentTrack = this.tracks[0];
  this.audio = new Audio();
  this.audio.src = this.currentTrack.source;

this.audio.ontimeupdate = function() {
  vm.generateTime();

  if (!vm.isDragging && (vm.manualSeekToEnd || vm.audio.currentTime >= vm.audio.duration)) {
    vm.manualSeekToEnd = false;
    vm.nextTrack();
    vm.isTimerPlaying = true;
  }
  this.audio.onended = () => {
  if (!this.isDragging) {
    this.nextTrack(); 
    this.isTimerPlaying = true;
  }
};
this.$nextTick(() => {
  setTimeout(() => {
    this.scrollToActiveTrack(true);
  }, 80);
});
};





  this.audio.onloadedmetadata = function() {
    vm.generateTime();
  };
this.audio.onended = function() {
  if (!vm.isDragging) {
    vm.nextTrack();
    vm.isTimerPlaying = true;
    vm.scrollToActiveTrack(); 
  }
};


  this.audio.onprogress = function() {
    if (this.buffered.length > 0 && this.duration > 0) {
      const bufferedEnd = this.buffered.end(this.buffered.length - 1);
      const percent = (bufferedEnd / this.duration) * 100;
      vm.bufferedWidth = percent + "%";
    }
  };


  for (let index = 0; index < this.tracks.length; index++) {
    const element = this.tracks[index];
    let link = document.createElement('link');
    link.rel = "prefetch";
    link.href = element.cover;
    link.as = "image";
    document.head.appendChild(link);
  }
  this.tracks.forEach((track, index) => {
  const audio = new Audio(track.source);
  audio.addEventListener("loadedmetadata", () => {
    const duration = this.formatTime(audio.duration);
    this.$set(this.tracks[index], "duration", duration);
  });
});
this.audio.onended = () => {
  if (!this.isDragging) {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.isTimerPlaying = true;

    this.resetPlayer();
    this.scrollToActiveTrack(true); 
  }
};


;


}

});
const safeTime = Math.min(newTime, maxduration - 1);
this.audio.currentTime = safeTime;

containers.forEach((container) => {
  let touchStartX = 0;
  let touchScrollLeft = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX - container.offsetLeft;
    touchScrollLeft = container.scrollLeft;
  }, { passive: true });

  container.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX - container.offsetLeft;
    const step = (x - touchStartX) * 0.6;
    container.scrollLeft = touchScrollLeft - step;
  }, { passive: true });
});
