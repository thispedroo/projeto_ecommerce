document.addEventListener("DOMContentLoaded", function() {

    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.hero-slide');
    
    let slideInterval;
    const slideDuration = 5000;

    function changeSlide(targetId) {
        
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        const targetSlide = document.getElementById(targetId);
        const targetIndicator = document.querySelector(`.indicator[data-slide="${targetId}"]`);
        
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
        if (targetIndicator) {
            targetIndicator.classList.add('active');
        }
    }

    function autoAdvance() {
        const currentActiveIndicator = document.querySelector('.hero-indicators .active');
        
        let nextIndicator = currentActiveIndicator.nextElementSibling;
        
        if (!nextIndicator) {
            nextIndicator = document.querySelector('.hero-indicators .indicator');
        }
        
        const nextSlideId = nextIndicator.getAttribute('data-slide');
        changeSlide(nextSlideId);
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            
            const targetId = this.getAttribute('data-slide');
            
            changeSlide(targetId);
            clearInterval(slideInterval);
            
            slideInterval = setInterval(autoAdvance, slideDuration);
        });
    });
    
    slideInterval = setInterval(autoAdvance, slideDuration);

});