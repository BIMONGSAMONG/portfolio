const pageNumbersContainer = document.querySelector('.page-numbers');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');


let currentPage = 1;
let totalPages = 10; 

function renderPagination() {
    pageNumbersContainer.innerHTML = ''; 
    
    let pageArray = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pageArray.push(i);
        
    } else {
        if (currentPage <= 4) {
            pageArray = [1, 2, 3, 4, 5, '...', totalPages];
            
        } else if (currentPage >= totalPages - 3) {
            pageArray = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            
        } else {
            pageArray = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }

    pageArray.forEach(item => {
        if (item === '...') {
            const span = document.createElement('span');
            span.className = 'dots';
            span.textContent = '...';
            pageNumbersContainer.appendChild(span);
        } else {
            const btn = document.createElement('button');
            btn.className = 'page-btn';
            btn.textContent = item;
            
            if (item === currentPage) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                currentPage = item; 
                renderPagination(); 
            });
            
            pageNumbersContainer.appendChild(btn);
        }
    });

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    prevBtn.style.opacity = currentPage === 1 ? '0.3' : '1';
    nextBtn.style.opacity = currentPage === totalPages ? '0.3' : '1';
    
    prevBtn.style.cursor = currentPage === 1 ? 'default' : 'pointer';
    nextBtn.style.cursor = currentPage === totalPages ? 'default' : 'pointer';
}


prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPagination();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderPagination();
    }
});

renderPagination();