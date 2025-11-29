const profileUpload = document.getElementById('profileUpload');
    const profileImg = document.querySelector('.profile-img');

    profileImg.addEventListener('click', () => profileUpload.click());

    profileUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });