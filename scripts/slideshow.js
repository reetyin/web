//    Project 4
//    Name: Rui Yin	
//    Date: Dec 4,2024
//    Description: This JavaScript file implements a responsive slideshow with automatic cycling, manual navigation controls, and pause-on-hover functionality. It manages slides and indicators dynamically for a seamless user experience.

let slideIndex = 1;
showSlides(slideIndex);

// Autoplay the slideshow
let slideInterval = setInterval(() => {
    changeSlide(1);
}, 3000);

// Control slide changes using navigation buttons
function changeSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

// Control slide changes using dots
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slide');
    let dots = document.querySelectorAll('.dot');
    
    // Reset to the first slide if the index exceeds the total number of slides
    if (n > slides.length) {
        slideIndex = 1;
    }
    // Reset to the last slide if the index is less than 1
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show the current slide and activate the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add('active');
}

// Pause autoplay when the mouse hovers over the slideshow
document.getElementById('slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Resume autoplay when the mouse leaves the slideshow
document.getElementById('slideshow-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3000);
});
