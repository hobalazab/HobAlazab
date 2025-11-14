new Vue({
  el: "#app",
  data() {
    return {
      audioPlayers: [],
      dragging: false,
      dragIndex: null,
      currentPage: 1,
      perPage: 12,
      searchQuery: '',
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
        }
      ]
    };
  },
  computed: {
    filteredTracks() {
      const q = (this.searchQuery || '').toString().trim().toLowerCase();
      if (!q) return this.tracks;
      return this.tracks.filter(t => {
        return (t.name || '').toString().toLowerCase().includes(q) ||
               (t.artist || '').toString().toLowerCase().includes(q);
      });
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredTracks.length / this.perPage));
    },
    paginatedTracks() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredTracks.slice(start, start + this.perPage);
    }
  },
  mounted() {
   
    document.addEventListener('touchstart', (e) => {
      if (this.dragging && e.cancelable) e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (this.dragging && e.cancelable) e.preventDefault();
      this.onDrag(e);
    }, { passive: false });

    document.addEventListener('touchend', this.stopDrag);
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);


    this.tracks.forEach((track, index) => {
      this.$set(this.tracks[index], 'barWidth', '0%');
      this.$set(this.tracks[index], 'bufferedWidth', '0%');
      this.$set(this.tracks[index], 'currentTime', '00:00');
      this.$set(this.tracks[index], 'duration', '00:00');
      this.$set(this.tracks[index], 'isPlaying', false);
    });
  },
  methods: {
    play(index) {
      const track = this.tracks[index];

      if (!this.audioPlayers[index]) {
        const audio = new Audio(track.source);
        this.audioPlayers[index] = audio;

        audio.ontimeupdate = () => this.updateProgress(index);
        audio.onprogress = () => this.updateBuffered(index);
        audio.onended = () => (track.isPlaying = false);

       
        this.$set(this.tracks[index], 'barWidth', '0%');
        this.$set(this.tracks[index], 'bufferedWidth', '0%');
        this.$set(this.tracks[index], 'currentTime', '00:00');
        this.$set(this.tracks[index], 'duration', '00:00');
        this.$set(this.tracks[index], 'isPlaying', false);
      }

      const audio = this.audioPlayers[index];

      this.audioPlayers.forEach((a, i) => {
        if (i !== index && a) {
          a.pause();
          this.tracks[i].isPlaying = false;
        }
      });


      if (audio.paused) {
        audio.play();
        track.isPlaying = true;
      } else {
        audio.pause();
        track.isPlaying = false;
      }
    },

    updateProgress(index) {
      const track = this.tracks[index];
      const audio = this.audioPlayers[index];
      if (!audio || !audio.duration) return;
      const progress = (100 / audio.duration) * audio.currentTime;
      track.barWidth = progress + "%";
      const durmin = Math.floor(audio.duration / 60) || 0;
      const dursec = Math.floor(audio.duration % 60) || 0;
      const curmin = Math.floor(audio.currentTime / 60) || 0;
      const cursec = Math.floor(audio.currentTime % 60) || 0;
      track.duration = `${durmin.toString().padStart(2, "0")}:${dursec.toString().padStart(2, "0")}`;
      track.currentTime = `${curmin.toString().padStart(2, "0")}:${cursec.toString().padStart(2, "0")}`;
    },

    updateBuffered(index) {
      const audio = this.audioPlayers[index];
      const track = this.tracks[index];
      if (!audio || !audio.buffered || !audio.duration) return;
      if (audio.buffered.length > 0) {
        const buffered = (audio.buffered.end(audio.buffered.length - 1) / audio.duration) * 100;
        track.bufferedWidth = buffered + "%";
      }
    },

    seekTrack(e, index) {
      const audio = this.audioPlayers[index];
      if (!audio || !audio.duration) return;
      const progressBar = e.currentTarget;
    
      const rect = progressBar.getBoundingClientRect();
      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const percent = (clientX - rect.left) / rect.width;
      audio.currentTime = Math.max(0, Math.min(1, percent)) * audio.duration;
    },

    startDrag(e, index) {
      this.dragging = true;
      this.dragIndex = index;
      this.onDrag(e);
      if (e.cancelable) e.preventDefault();
    },

    onDrag(e) {
      if (!this.dragging) return;
      const index = this.dragIndex;
      const audio = this.audioPlayers[index];

      const progressRefs = this.$refs.progress || [];
      const refEl = progressRefs[index];
      if (!refEl) return;
      const progressBar = refEl.querySelector(".progress__bar");

      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const rect = progressBar.getBoundingClientRect();
      let percent = (clientX - rect.left) / rect.width;
      percent = Math.max(0, Math.min(1, percent));

      if (audio && audio.duration) {
        audio.currentTime = percent * audio.duration;
        this.tracks[index].barWidth = (percent * 100) + "%";
      } else {
        this.tracks[index].barWidth = (percent * 100) + "%";
      }

      if (e.cancelable) e.preventDefault();
    },

    stopDrag() {
      this.dragging = false;
      this.dragIndex = null;
    },

    toggleFavorite(index) {
      this.tracks[index].favorited = !this.tracks[index].favorited;
    },

    prevTrack(index) {
      const audio = this.audioPlayers[index];
      if (!audio) return;
      audio.currentTime = 0;
    },

    nextTrack(index) {
      const audio = this.audioPlayers[index];
      if (!audio || !audio.duration) return;
      audio.currentTime = audio.duration;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    goToPage(page) {
      this.currentPage = page;
    },

    search() {
      this.currentPage = 1;
    },

    saveTrack(index) {

      console.log("saveTrack", index, this.tracks[index]);
      alert("ذخیره شد (شبیه‌سازی) : " + this.tracks[index].name);
    }
  }
});
