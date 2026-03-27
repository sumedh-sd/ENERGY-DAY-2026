document.addEventListener('DOMContentLoaded', () => {
    // Init Animations
    AOS.init({
        duration: 800,
        once: true
    });

    // Mobile Menu
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    
    if(toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Init carousel
    updateCarousel();
});

// Speaker carousel scroll function
function scrollSpeakers(direction) {
    const wrapper = document.getElementById('speakersWrapper');
    if(wrapper) {
        const cardWidth = 260; // approximate width + gap
        wrapper.scrollBy({
            left: direction * cardWidth,
            behavior: 'smooth'
        });
    }
}

// Photo carousel functions
let currentSlideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.getElementById('carouselDots');
    
    if(!slides.length) return;
    
    currentSlideIndex += direction;
    if(currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if(currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    
    updateCarousel();
}

function currentSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((slide, idx) => {
        slide.style.display = idx === currentSlideIndex ? 'block' : 'none';
    });
    
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlideIndex);
    });
}