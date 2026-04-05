document.addEventListener('DOMContentLoaded', () => {
    // === 1. CẤU HÌNH THÔNG TIN NGÂN HÀNG Ở ĐÂY ===
    const BANK_ID = "MB"; // Mã ngân hàng (MB, VCB, ICB, v.v.)
    const ACCOUNT_NO = "02406051010"; // Số tài khoản của bạn
    const ACCOUNT_NAME = "NGUYEN THE SON"; // Tên chủ tài khoản (Không dấu)
    // ==========================================

    // Kiểm tra giỏ hàng
    if (!window.cartSystem) {
        console.error("Lỗi: Không tìm thấy hệ thống cartSystem.");
        return;
    }

    const cart = window.cartSystem.getCart();
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống. Hãy chọn sản phẩm trước khi thanh toán nhé!');
        window.location.href = 'index.html';
        return;
    }

    const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

    // === 2. CẬP NHẬT RENDER SIDEBAR ĐƠN HÀNG ===
    const renderCheckoutItems = () => {
        const itemsContainer = document.getElementById('checkout-items');
        if (!itemsContainer) return;
        
        let html = '';
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += (item.price * item.quantity);
            // Cấu trúc HTML khớp với CSS sang xịn: Ảnh 60x60 bo góc, có cấu hình, giá tiền đỏ
            html += `
                <div class="checkout-item" style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
                    <div class="item-img" style="position: relative;">
                        <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; background: #f9f9f9;">
                        <span class="item-qty" style="position: absolute; top: -8px; right: -8px; background: #d70018; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; font-weight: bold; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">${item.quantity}</span>
                    </div>
                    <div class="item-info" style="flex: 1;">
                        <h4 class="item-name" style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600; color: #333;">${item.name}</h4>
                        ${item.selection ? `<p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">${item.selection}</p>` : ''}
                        <p class="item-price" style="margin: 0; font-size: 14px; color: #d70018; font-weight: 700;">${formatMoney(item.price * item.quantity)}</p>
                    </div>
                </div>
            `;
        });

        itemsContainer.innerHTML = html;
        document.getElementById('checkout-subtotal').innerText = formatMoney(subtotal);
        document.getElementById('checkout-total').innerText = formatMoney(subtotal);
    };

    renderCheckoutItems();

    // === 3. HỢP NHẤT LOGIC SUBMIT (HIỆN MODAL QR) ===
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Chặn tải lại trang
            
            const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderId = 'STH' + Date.now().toString().slice(-6);

            // Tạo Link VietQR tự động
            const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${totalAmount}&addInfo=Thanh toan don hang ${orderId}&accountName=${ACCOUNT_NAME}`;

            // Lấy các phần tử Modal
            const modal = document.getElementById('payment-modal');
            const qrImg = document.getElementById('qr-image');
            const payAmount = document.getElementById('pay-amount');
            const payContent = document.getElementById('pay-content');

            // Cập nhật thông tin và Hiện Modal QR
            if (modal && qrImg) {
                qrImg.src = qrUrl;
                payAmount.innerText = formatMoney(totalAmount);
                payContent.innerText = `Thanh toan don hang ${orderId}`;
                modal.classList.remove('hidden');
            }
        });
    }

    // === 4. LOGIC KẾT THÚC ĐƠN HÀNG ===
    const confirmBtn = document.getElementById('confirm-paid-btn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            alert('Cảm ơn bạn! Hệ thống đang kiểm tra giao dịch (thường mất 1-3 phút). Đơn hàng sẽ sớm được xử lý.');
            window.cartSystem.clearCart(); // Xóa giỏ hàng
            window.location.href = 'index.html'; // Quay về trang chủ
        };
    }

    // Đóng modal khi bấm Hủy
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('payment-modal').classList.add('hidden');
        };
    }
});