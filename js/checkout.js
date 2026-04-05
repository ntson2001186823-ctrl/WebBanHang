document.addEventListener('DOMContentLoaded', () => {
    const BANK_ID = "MB"; 
    const ACCOUNT_NO = "02406051010"; 
    const ACCOUNT_NAME = "NGUYEN THE SON"; 
    const SHIPPING_FEE = 30000; 


    if (!window.cartSystem) {
        console.error("Lỗi: Không tìm thấy hệ thống cartSystem.");
        return;
    }

    const cart = window.cartSystem.getCart();


    const formatMoney = (amount) => amount.toLocaleString('vi-VN') + 'đ';

    // === 2. HÀM VẼ ĐƠN HÀNG ===
    const renderCheckoutItems = () => {
    const itemsContainer = document.getElementById('checkout-items');
    // Tui sẽ tìm cả class checkout-sidebar HOẶC checkout-summary để đổ tiền vào
    const sidebar = document.querySelector('.checkout-sidebar') || document.querySelector('.checkout-summary') || document.querySelector('aside');

    if (!itemsContainer) return;
    
    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += (item.price * item.quantity);
        html += `
            <div class="checkout-item" style="display: flex; gap: 15px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
                <div class="item-img" style="position: relative;">
                    <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px; border: 1px solid #eee; background: #f9f9f9;">
                    <span class="item-qty" style="position: absolute; top: -8px; right: -8px; background: #d70018; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 12px; font-weight: bold; display: flex; align-items: center; justify-content: center;">${item.quantity}</span>
                </div>
                <div class="item-info" style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600; color: #333;">${item.name}</h4>
                    <p style="margin: 0; font-size: 14px; color: #d70018; font-weight: 700;">${formatMoney(item.price * item.quantity)}</p>
                </div>
            </div>
        `;
    });

    itemsContainer.innerHTML = html;
    const finalTotal = subtotal + SHIPPING_FEE;

    // Kiểm tra và tạo hộp tính tiền
    let calcBox = document.getElementById('calc-box');
    if (!calcBox) {
        calcBox = document.createElement('div');
        calcBox.id = 'calc-box';
        // Chèn nó vào ngay sau danh sách sản phẩm
        itemsContainer.insertAdjacentElement('afterend', calcBox);
    }

    // Đổ nội dung vào hộp tính tiền với style cực mạnh
    calcBox.innerHTML = `
        <div style="margin-top: 20px; padding: 20px; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #f0f0f0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #666;">
                <span>Tạm tính</span>
                <span style="font-weight: 500; color: #333;">${formatMoney(subtotal)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #666;">
                <span>Phí giao hàng</span>
                <span style="font-weight: 500; color: #333;">${formatMoney(SHIPPING_FEE)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 15px; border-top: 2px dashed #eee;">
                <span style="font-size: 16px; font-weight: 700; color: #333;">Tổng cộng</span>
                <span style="font-size: 22px; font-weight: 900; color: #d70018; letter-spacing: -0.5px;">${formatMoney(finalTotal)}</span>
            </div>
        </div>
    `;
};

    renderCheckoutItems();

    // === 3. XỬ LÝ THANH TOÁN (MÃ QR) ===
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const currentCart = window.cartSystem ? window.cartSystem.getCart() : [];
            if (currentCart.length === 0) return;

            const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
            
            const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const totalAmount = subtotal + SHIPPING_FEE; 
            
            const orderId = 'STH' + Date.now().toString().slice(-6);

            const modal = document.getElementById('payment-modal');
            const qrImg = document.getElementById('qr-image');
            const payAmount = document.getElementById('pay-amount');
            const payContent = document.getElementById('pay-content');
            const modalTitle = document.querySelector('#payment-modal h3');

            if (modal && qrImg) {
                if (paymentMethod === 'momo') {
                    if (modalTitle) modalTitle.innerHTML = `Thanh toán qua Ví MoMo`;
                    qrImg.src = 'images/momo-qr.jpg'; 
                    qrImg.style.width = "220px";
                    qrImg.style.height = "220px";
                    qrImg.style.objectFit = "contain"; 
                } else {
                    const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${totalAmount}&addInfo=Thanh toan don hang ${orderId}&accountName=${ACCOUNT_NAME}`;
                    qrImg.src = qrUrl;
                    if (modalTitle) modalTitle.innerHTML = `Thanh toán MB Bank`;
                    qrImg.style.width = "100%"; 
                    qrImg.style.height = "auto";
                    qrImg.style.objectFit = "unset";
                }

                if (payAmount) payAmount.innerText = formatMoney(totalAmount);
                if (payContent) payContent.innerText = `Thanh toan don hang ${orderId}`;
                modal.classList.remove('hidden');
            }
        });
    }

    // === 4. LOGIC KẾT THÚC ĐƠN HÀNG ===
    const confirmBtn = document.getElementById('confirm-paid-btn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            alert('Cảm ơn bạn! Hệ thống đang kiểm tra giao dịch (thường mất 1-3 phút). Đơn hàng sẽ sớm được xử lý.');
            window.cartSystem.clearCart(); 
            window.location.href = 'index.html'; 
        };
    }

    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('payment-modal').classList.add('hidden');
        };
    }
});