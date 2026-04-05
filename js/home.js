document.addEventListener('DOMContentLoaded', () => {
    const menuWrapper = document.getElementById('menu-wrapper');
    const overlay = document.getElementById('page-overlay');

    if (menuWrapper && overlay) {
        menuWrapper.addEventListener('mouseenter', () => overlay.classList.add('active'));
        menuWrapper.addEventListener('mouseleave', () => overlay.classList.remove('active'));
    }

    function startFlashSaleTimer() {
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('mins');
        const sEl = document.getElementById('secs');
        if (!hEl || !mEl || !sEl) return;

        let totalSeconds = (2 * 3600) + (18 * 60) + 40;
        const timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                return;
            }
            totalSeconds--;
            hEl.innerText = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            mEl.innerText = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            sEl.innerText = String(totalSeconds % 60).padStart(2, '0');
        }, 1000);
    }
    startFlashSaleTimer();

    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    let index = 0;
    let slideInterval;

    function showSlide(i) {
        if (!track || slides.length === 0) return;
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, idx) => dot.classList.toggle("active", idx === index));
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => showSlide(index + 1), 4000);
    }

    if (nextBtn) nextBtn.onclick = () => { showSlide(index + 1); resetAutoPlay(); };
    if (prevBtn) prevBtn.onclick = () => { showSlide(index - 1); resetAutoPlay(); };
    dots.forEach((dot, i) => dot.onclick = () => { showSlide(i); resetAutoPlay(); });

    slideInterval = setInterval(() => showSlide(index + 1), 4000);

    window.renderProducts = function(filter = 'all') {
        const fsContainer = document.getElementById('fs-product-list');
        const mainContainer = document.getElementById('main-product-list');
        const fsSection = document.getElementById('flash-sale-section');
        
        const data = (typeof products !== 'undefined') ? products : (window.products || []);
        if (!data || data.length === 0) return;

        if (fsSection) fsSection.style.display = (filter === 'all') ? "block" : "none";

        let fsHTML = '';
        let mainHTML = '';

        data.forEach(p => {
            if (filter !== 'all' && p.category !== filter) return;

            const badgeHTML = p.discountLabel ? `<span class="discount-badge">${p.discountLabel}</span>` : '';
            const progressHTML = p.isFlashSale ? `
                <div class="progress-container">
                    <div class="progress-fill" style="width: ${p.soldPercent || 70}%;"></div>
                    <span class="progress-text">Đã bán ${p.soldPercent || 70}%</span>
                </div>` : '';

            const cardStr = `
                <div class="product-card">
                    <div class="product-info" onclick="window.viewDetail(${p.id})">
                        ${badgeHTML}
                        <img src="${p.img}" alt="${p.name}">
                        <h3>${p.name}</h3>
                        <p class="price">${p.price.toLocaleString('vi-VN')}đ</p>
                        ${progressHTML}
                    </div>
                    <button class="btn-add-cart" onclick="window.handleCardClick(${p.id}, '${p.name}', ${p.price}, '${p.img}')">
                        Thêm vào giỏ
                    </button>
                </div>
            `;

            if (p.isFlashSale && filter === 'all') fsHTML += cardStr;
            else mainHTML += cardStr;
        });

        if (fsContainer) fsContainer.innerHTML = fsHTML;
        if (mainContainer) mainContainer.innerHTML = mainHTML;
    };

    window.renderProducts('all');
    window.updateCartBadge();
});

window.handleCardClick = function(id, name, price, img) {
    if (window.cartSystem) {
        window.cartSystem.addItem({ id, name, price, img });
        window.updateCartBadge();
        const cartIcon = document.querySelector('.cart-icon-wrapper');
        if (cartIcon) {
            cartIcon.classList.remove('cart-shake');
            void cartIcon.offsetWidth; 
            cartIcon.classList.add('cart-shake');
        }
        alert(`Đã thêm ${name} vào giỏ!`);
    }
};

window.updateCartBadge = function() {
    const badge = document.querySelector('.badge');
    if (badge && window.cartSystem) {
        badge.innerText = window.cartSystem.getTotalCount();
    }
};

window.viewDetail = function(id) {
    localStorage.setItem("productId", id);
    window.location.href = "detail.html";
};

window.filterByCategory = function(cat) {
    const title = document.getElementById('main-title');
    if (title) title.innerText = cat === 'all' ? "SẢN PHẨM NỔI BẬT" : "DANH MỤC: " + cat.toUpperCase();
    window.renderProducts(cat);
};