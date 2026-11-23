const train = document.querySelector('.slide-train');
const prevBtn = document.querySelector('.slide-btn.prev');
const nextBtn = document.querySelector('.slide-btn.next');

const bars = document.querySelectorAll('.slide-indicator .bar');

let currentIndex = 0; 
const totalImages = 14; 

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
        train.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    updateIndicator();
});


prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        train.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    updateIndicator();
});

function updateIndicator() {
    bars.forEach(bar => {
        bar.classList.remove('active');
    });
    bars[currentIndex].classList.add('active');
}