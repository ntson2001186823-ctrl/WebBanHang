document.addEventListener('DOMContentLoaded', () => {
    // 1. Kiểm tra giỏ hàng, nếu trống thì đá về trang chủ
    const cart = window.cartSystem.getCart();
    if (cart.length === 0) {
        alert('Chưa có sản phẩm nào để thanh toán!');
        window.location.href = 'index.html';
        return;
    }

    const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

    // 2. Render danh sách sản phẩm ra Sidebar bên phải
    const renderCheckoutItems = () => {
        const itemsContainer = document.getElementById('checkout-items');
        let html = '';
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += (item.price * item.quantity);
            html += `
                <div class="checkout-item">
                    <div class="item-info">
                        <div class="item-img">
                            <img src="${item.img}" alt="${item.name}">
                            <span class="item-qty">${item.quantity}</span>
                        </div>
                        <span class="item-name">${item.name}</span>
                    </div>
                    <span class="item-price">${formatMoney(item.price * item.quantity)}</span>
                </div>
            `;
        });

        itemsContainer.innerHTML = html;
        document.getElementById('checkout-subtotal').innerText = formatMoney(subtotal);
        document.getElementById('checkout-total').innerText = formatMoney(subtotal); // Bỏ phí vận chuyển nếu là khóa học online
    };

    renderCheckoutItems();

    // 3. Xử lý khi Submit Form Đặt Hàng
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = 'STH' + Date.now().toString().slice(-6); // Tạo mã đơn hàng ngẫu nhiên
    const bankId = "MB"; // Thay bằng mã ngân hàng của bạn (MB, VCB, ICB...)
    const accountNo = "02406051010"; // !!! THAY SỐ TÀI KHOẢN CỦA SƠN VÀO ĐÂY !!!
    const accountName = "NGUYEN THE SON"; // !!! THAY TÊN CỦA SƠN (KHÔNG DẤU) !!!

    // Link tạo mã QR tự động từ VietQR
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${totalAmount}&addInfo=Thanh toan don hang ${orderId}&accountName=${accountName}`;

    // Hiển thị Popup
    document.getElementById('qr-image').src = qrUrl;
    document.getElementById('pay-amount').innerText = totalAmount.toLocaleString('vi-VN') + 'đ';
    document.getElementById('pay-content').innerText = `Thanh toan don hang ${orderId}`;
    document.getElementById('payment-modal').classList.remove('hidden');
});

// Xử lý khi nhấn "Tôi đã chuyển khoản"
document.getElementById('confirm-paid-btn').addEventListener('click', () => {
    alert('Hệ thống đang kiểm tra giao dịch của bạn (thường mất 1-3 phút). Cảm ơn bạn!');
    window.cartSystem.clearCart();
    window.location.href = 'index.html';
});

// Đóng modal
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('payment-modal').classList.add('hidden');
});

        // Ở đây thực tế sẽ dùng fetch() hoặc axios() gửi data lên Server (Database)
        console.log("Đơn hàng gửi đi:", { customer: customerInfo, items: cart });

        // Giả lập xử lý API mất 1 giây
        const btn = document.querySelector('.btn-place-order');
        btn.innerText = "ĐANG XỬ LÝ...";
        btn.disabled = true;

        setTimeout(() => {
            alert(`Cảm ơn ${customerInfo.name}! Đơn hàng của bạn đã được ghi nhận.`);
            window.cartSystem.clearCart(); // Đặt xong thì xóa giỏ hàng
            window.location.href = 'index.html'; // Chuyển về trang chủ (hoặc trang success.html tùy bạn)
        }, 1000);
    });
