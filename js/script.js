const navbar = document.querySelector('.header .navbar');
const menuBtn = document.querySelector('#menu-btn');

if (menuBtn && navbar) {
  menuBtn.onclick = () => {
    navbar.classList.toggle('active');
  };

  window.addEventListener('scroll', () => {
    navbar.classList.remove('active');
  });
}

document.querySelectorAll('.about .video-container .controls .control-btn').forEach((btn) => {
  btn.onclick = () => {
    const src = btn.getAttribute('data-src');
    const video = document.querySelector('.about .video-container .video');
    if (src && video) {
      video.src = src;
    }
  };
});