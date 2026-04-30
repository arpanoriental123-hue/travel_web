let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}

document.querySelectorAll('.about .video-container .controls .control-btn').forEach(btn => {
    btn.onclick = () =>{
        let src = btn.getAttribute('data-src');
        document.querySelector('.about .video-container .video').src = src;
    }
});

const destinationSearchInput = document.querySelector('#destination-search');
if (destinationSearchInput) {
    const destinationCards = document.querySelectorAll('.destination .dest-row .box');
    destinationSearchInput.addEventListener('input', () => {
        const q = destinationSearchInput.value.trim().toLowerCase();
        destinationCards.forEach((card) => {
            const nameEl = card.querySelector('.content h3');
            const name = nameEl ? nameEl.textContent.trim().toLowerCase() : '';
            card.style.display = (q === '' || name.includes(q)) ? '' : 'none';
        });
    });
}