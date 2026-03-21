/**
 * CART UI LOGIC - Tầng hiển thị và tương tác của Giỏ hàng
 * Chịu trách nhiệm render HTML và lắng nghe sự kiện từ người dùng.
 */

// Đảm bảo DOM đã tải xong mới chạy code
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lưu trữ các DOM Elements thường dùng (Tránh query nhiều lần)
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

    // 3. Hàm Render chính (Re-render mọi lúc khi có thay đổi)
    const renderCart = () => {
        // Gọi dữ liệu từ Singleton cartSystem (đã định nghĩa ở storage.js)
        const cart = window.cartSystem.getCart();

        // Xử lý UI khi giỏ hàng trống
        if (cart.length === 0) {
            DOM.emptyMsg.classList.remove('hidden');
            if (DOM.cartTable) DOM.cartTable.classList.add('hidden');
            updateSummary(0);
            return;
        }

        // Hiện bảng, ẩn thông báo trống
        DOM.emptyMsg.classList.add('hidden');
        if (DOM.cartTable) DOM.cartTable.classList.remove('hidden');

        let htmlContent = '';
        let subtotalAmount = 0;

        // Vẽ từng hàng sản phẩm (Sử dụng Template Literals)
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotalAmount += itemTotal;

            // Lưu ý: data-label được thêm vào để hỗ trợ CSS Responsive trên Mobile
            htmlContent += `
                <tr>
                    <td data-label="Sản phẩm"><img src="${item.img}" alt="${item.name}"></td>
                    <td data-label="Tên sản phẩm" class="item-name">${item.name}</td>
                    <td data-label="Đơn giá">${formatMoney(item.price)}</td>
                    <td data-label="Số lượng">
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="cartUI.handleQty(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="qty-number">${item.quantity}</span>
                            <button class="qty-btn" onclick="cartUI.handleQty(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                    </td>
                    <td data-label="Thành tiền" class="item-total">${formatMoney(itemTotal)}</td>
                    <td data-label="Hành động">
                        <button class="del-btn" onclick="cartUI.handleRemove(${item.id})">❌</button>
                    </td>
                </tr>
            `;
        });

        // Đổ HTML vào tbody
        DOM.cartBody.innerHTML = htmlContent;

        // Cập nhật khu vực Sidebar Tóm tắt
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

    // 5. Đóng gói các hàm xử lý sự kiện (Event Handlers) vào một Object toàn cục
    window.cartUI = {
        handleQty: (id, newQty) => {
            if (newQty < 1) {
                if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                    window.cartSystem.removeItem(id);
                    renderCart();
                }
                return;
            }
            // Giao tiếp với storage.js để cập nhật data
            window.cartSystem.updateQuantity(id, newQty);
            renderCart(); // Gọi vẽ lại ngay lập tức (Re-render)
        },

        handleRemove: (id) => {
            if (confirm('Xóa sản phẩm này nhé?')) {
                window.cartSystem.removeItem(id);
                renderCart();
            }
        },

        handleCheckout: () => {
            const cart = window.cartSystem.getCart();
            if (cart.length === 0) {
                alert('Giỏ hàng trống, hãy mua sắm thêm nhé!');
                return;
            }

            // Thanh toán thành công -> Dọn kho -> Chuyển trang
            alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng tại TechStore.');
            window.cartSystem.clearCart();
            window.location.href = 'index.html';
        }
    };

    // 6. Gắn sự kiện cho nút Thanh toán
    if (DOM.checkoutBtn) {
        DOM.checkoutBtn.addEventListener('click', window.cartUI.handleCheckout);
    }

    // 7. Kích hoạt Render lần đầu tiên khi mở trang
    renderCart();
});