const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    e.preventDefault(); 

    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) {
      activeItem.classList.remove("active");
    }
    
    navItem.classList.add("active");
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector('.searchbox'); 
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');

  if (searchBtn && overlay) {
 
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => input.focus(), 300);
    });


    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    function closeSearch() {
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

document.querySelector('.btn-search')?.addEventListener('click', (e) => {
  e.preventDefault();
  const value = document.getElementById('searchInput').value.trim();
  if (value) {
    console.log('در حال جستجو برای:', value);
    
  }
});
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const value = searchInput.value;
  
  // اگر اولین کاراکتر فارسی بود، راست‌چین کن
  if (/^[\u0600-\u06FF]/.test(value)) {
    searchInput.style.direction = "rtl";
    searchInput.style.textAlign = "right";
  } else {
    searchInput.style.direction = "ltr";
    searchInput.style.textAlign = "left";
  }
});
const categoryBtn = document.querySelector('.nav__item a[href="#contactme"]');
const categoryOverlay = document.getElementById('categoryOverlay');
const closeCategory = document.getElementById('closeCategory');

categoryBtn.addEventListener('click', e => {
  e.preventDefault();
  categoryOverlay.style.display = 'flex';
});

closeCategory.addEventListener('click', () => {
  categoryOverlay.style.display = 'none';
});
categoryBtn.addEventListener('click', e => {
  e.preventDefault();
  categoryOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // غیر فعال کردن scroll صفحه
});

closeCategory.addEventListener('click', () => {
  categoryOverlay.style.display = 'none';
  document.body.style.overflow = ''; // فعال کردن دوباره scroll صفحه
});
categoryBtn.addEventListener('click', e => {
  e.preventDefault();
  categoryOverlay.style.display = 'flex';
  // غیر فعال کردن اسکرول کل صفحه
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
});

closeCategory.addEventListener('click', () => {
  categoryOverlay.style.display = 'none';
  // بازگردانی اسکرول صفحه
  document.body.style.position = '';
});
