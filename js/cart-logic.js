// File: js/cart-logic.js
// Mục đích: Xử lý giao diện DOM và sự kiện người dùng

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lưu trữ các DOM Elements thường dùng
    const DOM = {
        cartBody: document.getElementById('cart-body'),
        emptyMsg: document.getElementById('empty-cart-msg'),
        cartTable: document.querySelector('.cart-table'),
        subtotal: document.getElementById('subtotal'),
        finalTotal: document.getElementById('final-total'),
        checkoutBtn: document.getElementById('checkout-btn')
    };

    const SHIPPING_FEE = 30000;

    // 2. Hàm định dạng tiền tệ Việt Nam
    const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

    // 3. Hàm Render chính (Style Minimalism)
    const renderCart = () => {
        const cart = window.cartSystem.getCart();

        // Xử lý UI khi giỏ hàng trống
        if (cart.length === 0) {
            DOM.emptyMsg.classList.remove('hidden');
            if (DOM.cartTable) DOM.cartTable.classList.add('hidden');
            
            DOM.emptyMsg.innerHTML = `
                <div class="empty-content" style="text-align: center; padding: 60px 0;">
                    <p style="margin-bottom: 20px; color: #666; font-size: 16px;">Giỏ hàng của bạn đang trống.</p>
                    <a href="index.html" class="btn-link" style="color: #000; font-weight: 600; text-decoration: none; border-bottom: 1px solid #000; padding-bottom: 4px; transition: opacity 0.3s;">Tiếp tục mua sắm &rarr;</a>
                </div>
            `;
            updateSummary(0);
            return;
        }

        // Hiện bảng giỏ hàng
        DOM.emptyMsg.classList.add('hidden');
        if (DOM.cartTable) DOM.cartTable.classList.remove('hidden');

        let htmlContent = '';
        let subtotalAmount = 0;

        // Duyệt qua từng sản phẩm để tạo HTML
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotalAmount += itemTotal;
            const category = item.category ? item.category : 'Sản phẩm công nghệ';

            htmlContent += `
                <tr>
                    <td data-label="Sản phẩm">
                        <img src="${item.img}" alt="${item.name}">
                    </td>
                    <td data-label="Chi tiết">
                        <div class="product-info">
                            <a href="#" class="product-name">${item.name}</a>
                            <span class="product-category">${category}</span>
                        </div>
                    </td>
                    <td data-label="Đơn giá" class="item-price">
                        ${formatMoney(item.price)}
                    </td>
                    <td data-label="Số lượng">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="cartUI.handleQty(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="text" class="qty-input" value="${item.quantity}" readonly>
                            <button class="qty-btn" onclick="cartUI.handleQty(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </td>
                    <td data-label="Thành tiền" class="item-total">
                        ${formatMoney(itemTotal)}
                    </td>
                    <td data-label="">
                        <button class="remove-btn" onclick="cartUI.handleRemove(${item.id})" title="Xóa sản phẩm">✕</button>
                    </td>
                </tr>
            `;
        });

        DOM.cartBody.innerHTML = htmlContent;
        updateSummary(subtotalAmount);
    };

    // 4. Hàm cập nhật Sidebar tính tiền
    const updateSummary = (subtotal) => {
        if (!DOM.subtotal || !DOM.finalTotal) return;
        
        DOM.subtotal.innerText = formatMoney(subtotal);
        
        if (subtotal === 0) {
            DOM.finalTotal.innerText = formatMoney(0);
        } else {
            DOM.finalTotal.innerText = formatMoney(subtotal + SHIPPING_FEE);
        }
    };

    // 5. Đóng gói các hàm xử lý sự kiện vào Object toàn cục
    window.cartUI = {
        handleQty: (id, newQty) => {
            if (newQty < 1) {
                if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                    window.cartSystem.removeItem(id);
                    renderCart();
                }
                return;
            }
            window.cartSystem.updateQuantity(id, newQty);
            renderCart(); 
        },

        handleRemove: (id) => {
            if (confirm('Bạn chắc chắn muốn bỏ sản phẩm này?')) {
                window.cartSystem.removeItem(id);
                renderCart();
            }
        },

        handleCheckout: () => {
            const cart = window.cartSystem.getCart();
            if (cart.length === 0) {
                alert('Giỏ hàng đang trống!');
                return;
            }
            // Chuyển hướng thẳng sang trang thanh toán
            window.location.href = 'checkout.html';
        }
    }; // <-- Lỗi của Sơn nằm ở đây (thiếu dấu ngoặc nhọn này)

    // 6. Gắn sự kiện cho nút Thanh toán
    if (DOM.checkoutBtn) {
        DOM.checkoutBtn.addEventListener('click', window.cartUI.handleCheckout);
    }

    // 7. Render lần đầu tiên khi mở trang
    renderCart();
});