/* =========================
   MENU MOBILE
========================= */
const menuBtn = document.getElementById('menu-btn');
const menuClose = document.getElementById('menu-close');
const navigation = document.querySelector('.navigation');

if (menuBtn && menuClose && navigation) {
    menuBtn.addEventListener('click', function() {
        navigation.classList.add('active');
    });
    menuClose.addEventListener('click', function() {
        navigation.classList.remove('active');
    });
}

/* =========================
   FADE-IN AU SCROLL
========================= */
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
});