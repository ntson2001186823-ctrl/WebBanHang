document.addEventListener('DOMContentLoaded', () => {

    // =====================================================================
    // 1. QUẢN LÝ TRẠNG THÁI OVERLAY (MENU THẢ XUỐNG)
    // =====================================================================
    const menuWrapper = document.getElementById('menu-wrapper');
    const overlay = document.getElementById('page-overlay');

    if (menuWrapper && overlay) {
        menuWrapper.addEventListener('mouseenter', () => overlay.classList.add('active'));
        menuWrapper.addEventListener('mouseleave', () => overlay.classList.remove('active'));
    }

    // =====================================================================
    // 2. BỘ ĐẾM NGƯỢC FLASH SALE (REAL-TIME COUNTDOWN)
    // =====================================================================
    function startFlashSaleTimer() {
        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('mins');
        const sEl = document.getElementById('secs');

        if (!hEl || !mEl || !sEl) return;

        // Set thời gian mẫu: 2 giờ 18 phút 40 giây
        let totalSeconds = (2 * 3600) + (18 * 60) + 40;

        const timer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                return;
            }
            totalSeconds--;

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            hEl.innerText = String(hours).padStart(2, '0');
            mEl.innerText = String(minutes).padStart(2, '0');
            sEl.innerText = String(seconds).padStart(2, '0');
        }, 1000);
    }
    startFlashSaleTimer();

    // =====================================================================
    // 3. TỐI ƯU SLIDER (CHỐNG DOUBLE-SKIP)
    // =====================================================================
    let slides = document.querySelectorAll(".slide");
    let nextBtn = document.querySelector(".next");
    let prevBtn = document.querySelector(".prev");
    let index = 0;
    let slideInterval;

    function showSlide(i) {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove("active"));
        slides[i].classList.add("active");
    }

    function startAutoPlay() {
        if (slides.length > 1) {
            slideInterval = setInterval(() => {
                index = (index + 1) % slides.length;
                showSlide(index);
            }, 4000);
        }
    }

    function resetAutoPlay() {
        clearInterval(slideInterval); // Xóa bộ đếm cũ
        startAutoPlay(); // Chạy lại đếm ngược từ đầu
    }

    if (nextBtn) {
        nextBtn.onclick = function() {
            index = (index + 1) % slides.length;
            showSlide(index);
            resetAutoPlay(); // Fix lỗi nhảy cóc
        }
    }

    if (prevBtn) {
        prevBtn.onclick = function() {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
            resetAutoPlay(); // Fix lỗi nhảy cóc
        }
    }

    startAutoPlay(); // Bắt đầu chạy slider khi load trang

    // =====================================================================
    // 4. PHÂN LUỒNG RENDER SẢN PHẨM (DATA ROUTING)
    // =====================================================================
    function renderProducts() {
        const fsContainer = document.getElementById('fs-product-list');
        const mainContainer = document.getElementById('main-product-list');
        
        if (!window.products) return;

        let fsHTML = '';
        let mainHTML = '';

        window.products.forEach(p => {
            // Xử lý Badge giảm giá
            const badgeHTML = p.discountLabel 
                ? `<span class="discount-badge">${p.discountLabel}</span>` 
                : '';

            // Xử lý Thanh tiến độ (chỉ dành cho Flash Sale)
            const progressHTML = p.isFlashSale 
                ? `<div class="progress-container">
                       <div class="progress-fill" style="width: ${p.soldPercent}%;"></div>
                       <span class="progress-text">Đã bán ${p.soldPercent}%</span>
                   </div>` 
                : '';

            // Tạo thẻ Card chuẩn (Click cả thẻ)
            const cardStr = `
                <div class="product-card" onclick="handleCardClick(${p.id}, '${p.name}', ${p.price}, '${p.img}')">
                    ${badgeHTML}
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toLocaleString('vi-VN')}đ</p>
                    ${progressHTML}
                </div>
            `;

            // Phân luồng dữ liệu
            if (p.isFlashSale) {
                fsHTML += cardStr;
            } else {
                mainHTML += cardStr;
            }
        });

        if (fsContainer) fsContainer.innerHTML = fsHTML;
        if (mainContainer) mainContainer.innerHTML = mainHTML;
    }

    renderProducts();
    updateCartBadge(); // Cập nhật số lượng giỏ hàng khi load
});

// =====================================================================
// 5. HIỆU ỨNG GIỎ HÀNG (CART SHAKE ANIMATION)
// =====================================================================
window.handleCardClick = function(id, name, price, img) {
    if (window.cartSystem) {
        window.cartSystem.addItem({ id, name, price, img });
        updateCartBadge();
        
        // Kích hoạt hiệu ứng rung giỏ hàng
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.classList.remove('cart-shake'); // Gỡ class cũ
            void cartIcon.offsetWidth;               // Bắt buộc trình duyệt vẽ lại DOM (Reflow Trick)
            cartIcon.classList.add('cart-shake');    // Thêm lại để kích hoạt animation
        }
    } else {
        console.error("Lỗi: Không tìm thấy hệ thống giỏ hàng (cartSystem). Hãy kiểm tra file storage.js");
    }
};

window.updateCartBadge = function() {
    const badge = document.getElementById('cart-count');
    if (badge && window.cartSystem) {
        badge.innerText = window.cartSystem.getTotalCount();
    }
};

let currentSlide = 0;
const slides = document.querySelectorAll('.slider-track img');
const dots = document.querySelectorAll('.dot');
const track = document.querySelector('.slider-track');
const nextBtn = document.querySelector('.slider-btn.next');
const prevBtn = document.querySelector('.slider-btn.prev');

function updateSlider(index) {
    currentSlide = index;
    // Chặn trường hợp index vượt quá giới hạn
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    // Di chuyển hình ảnh
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Cập nhật dấu chấm
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Sự kiện khi click nút Next
nextBtn.addEventListener('click', () => {
    updateSlider(currentSlide + 1);
});

// Sự kiện khi click nút Prev
prevBtn.addEventListener('click', () => {
    updateSlider(currentSlide - 1);
});

// Click vào các dấu chấm để chuyển ảnh nhanh
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => updateSlider(i));
});

// Tự động chạy mỗi 5 giây (tăng thời gian để người dùng kịp nhìn)
let autoSlide = setInterval(() => updateSlider(currentSlide + 1), 5000);

// Dừng tự động chạy khi người dùng di chuột vào để họ tự bấm mũi tên
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

// Chạy lại khi di chuột ra ngoài
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => updateSlider(currentSlide + 1), 5000);
});