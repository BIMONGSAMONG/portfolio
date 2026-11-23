document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.benefit-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show'); 
            }
        });
    }, {
        threshold: 0.1 
    });
    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.slot-item');
    let currentIndex = 0;

    function rollSlot() {
        items.forEach((item, i) => {
            item.className = 'slot-item';
            const offset = (i - currentIndex + items.length) % items.length;
            
            if (offset === 0) {
                item.classList.add('center');
            } else if (offset === 1) {
                item.classList.add('right');  
            } else if (offset === items.length - 1) {
                item.classList.add('left');   
            }
        });
        currentIndex = (currentIndex + 1) % items.length;
    }

    rollSlot();
    setInterval(rollSlot, 2000);
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.orbit-card');
    const positions = [
        'pos-center',
        'pos-r1',
        'pos-r2',
        'pos-r3',
        'pos-l3',
        'pos-l2',
        'pos-l1'
    ];
    let currentIndex = 0;

    function rotateOrbit() {
        cards.forEach((card, i) => {
            const posIndex = (i - currentIndex + cards.length) % cards.length;
            card.className = 'orbit-card ' + positions[posIndex];
        });
        currentIndex = (currentIndex + 1) % cards.length;
    }

    rotateOrbit();
    setInterval(rotateOrbit, 2500); 
});

document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll('.sticky-nav li');
    const sections = document.querySelectorAll('.page');
    const scrollContainer = document.querySelector('.container');
    const nav = document.querySelector('.sticky-nav');
    
    let lastScrollTop = 0;
    let hideTimer = null;

    navItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                showNav();
            }
        });
    });

    const observerOptions = {
        root: scrollContainer,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const link = item.querySelector('a');
                    if (link && link.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    function showNav() {
        if (nav) {
            nav.classList.remove('nav-hidden');
            startHideTimer();
        }
    }

    function hideNav() {
        if (nav && !nav.matches(':hover')) {
            nav.classList.add('nav-hidden');
        }
    }

    function startHideTimer() {
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(hideNav, 2000);
    }

    if (scrollContainer && nav) {
        nav.classList.add('nav-hidden');

        scrollContainer.addEventListener('scroll', function() {
            let scrollTop = scrollContainer.scrollTop;
            
            if (scrollTop < lastScrollTop) {
                showNav();
            } else {
                hideNav();
            }
            
            lastScrollTop = scrollTop;
            startHideTimer();
        }, { passive: true });

        nav.addEventListener('mouseenter', () => {
            if (hideTimer) clearTimeout(hideTimer);
        });

        nav.addEventListener('mouseleave', startHideTimer);
    }
});