// 1. Lấy ID sản phẩm từ localStorage
const productId = localStorage.getItem("productId");
const foundProduct = products.find(p => p.id == productId);
const detailContainer = document.getElementById("product-content");

if (detailContainer && foundProduct) {
    const renderOptions = (list, title) => {
        if (!list || list.length === 0) return "";
        return `
            <div class="option-group">
                <p class="option-title">Chọn ${title}:</p>
                <div class="option-list">
                    ${list.map((item, index) => `
                        <div class="option-item ${index === 0 ? 'active' : ''}" onclick="selectOption(this, '${title}')">
                            ${item}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    let variantLabel = foundProduct.category === "phone" ? "dung lượng" : (foundProduct.category === "laptop" ? "cấu hình" : "phiên bản");

    detailContainer.innerHTML = `
        <div class="breadcrumb">
            <a href="index.html">Trang chủ</a> / <span>${foundProduct.category.toUpperCase()}</span> / ${foundProduct.name}
        </div>
        <div class="product-main">
            <div class="product-left">
                <div class="main-img-wrapper">
                    <img src="${foundProduct.img}" class="main-img">
                </div>
            </div>
            <div class="product-right">
                <h1 class="product-title">${foundProduct.name}</h1>
                <div class="flash-sale-box">
                    <div class="fs-price">${foundProduct.price.toLocaleString()}đ</div>
                </div>
                ${renderOptions(foundProduct.variants, variantLabel)}
                ${renderOptions(foundProduct.colors, "màu sắc")}
                
                <button class="btn-buy-now" onclick="addToCartAndRedirect()">
                    MUA NGAY <br>
                    <span style="font-size: 12px; font-weight: normal;">(Thêm vào giỏ và quay về trang chủ)</span>
                </button>
            </div>
        </div>
    `;
}

window.selectOption = function(element, type) {
    const parent = element.parentElement;
    parent.querySelectorAll('.option-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
};

// GIỎ HÀNG CHÍNH ---

window.addToCartAndRedirect = function() {
    // 1. Kiểm tra xem hệ thống giỏ hàng đã sẵn sàng chưa
    if (!window.cartSystem) {
        console.error("Lỗi: Không tìm thấy cartSystem. Hãy kiểm tra file storage.js");
        return;
    }

    // 2. Lấy các tùy chọn người dùng đã chọn (active)
    const selectedOptions = document.querySelectorAll('.option-item.active');
    let details = [];
    selectedOptions.forEach(opt => details.push(opt.innerText.trim()));
    const selectionString = details.join(" - "); 

    // 3. Sử dụng hệ thống cartSystem để thêm hàng

    window.cartSystem.addItem({
        id: foundProduct.id,
        name: foundProduct.name,
        price: foundProduct.price,
        img: foundProduct.img,
        category: foundProduct.category,
        selection: selectionString 
    });

    // 4. Thông báo và chuyển hướng
    alert(`Đã thêm ${foundProduct.name} (${selectionString}) vào giỏ hàng!`);
    
    window.location.href = "index.html"; 
};
