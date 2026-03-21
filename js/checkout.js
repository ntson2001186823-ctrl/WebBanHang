import CartStorage from './storage.js';

// Các Regex dùng để kiểm tra định dạng
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Regex số điện thoại VN: Bắt đầu bằng 0 hoặc +84, tiếp theo là 3,5,7,8,9 và đúng 8 số cuối
const REGEX_PHONE_VN = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/; 

/**
 * Mô phỏng API gọi lên Backend để tạo đơn hàng
 * @param {Object} orderData Dữ liệu khách hàng và giỏ hàng
 * @returns {Promise} Trả về kết quả sau 2 giây
 */
async function processOrder(orderData) {
    console.log('Đang gửi dữ liệu lên server...', orderData);
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Giả lập tỷ lệ thành công 95%
            const isSuccess = Math.random() > 0.05;
            if (isSuccess) {
                resolve({ status: 200, message: 'Đặt hàng thành công!', orderId: 'ORD-' + Date.now() });
            } else {
                reject({ status: 500, message: 'Lỗi hệ thống, vui lòng thử lại sau.' });
            }
        }, 2000);
    });
}

/**
 * Xử lý validation form trước khi submit
 */
function handleCheckoutFormSubmit(event) {
    event.preventDefault(); // Ngăn trình duyệt reload trang

    const form = event.target;
    const fullName = form.querySelector('#fullName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const address = form.querySelector('#address').value.trim();

    // 1. Validation Frontend (Client-side)
    if (!fullName || !address) {
        alert('Vui lòng nhập đầy đủ Họ tên và Địa chỉ giao hàng.');
        return;
    }

    if (!REGEX_EMAIL.test(email)) {
        alert('Email không đúng định dạng. Vui lòng kiểm tra lại.');
        return;
    }

    if (!REGEX_PHONE_VN.test(phone)) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam (VD: 0912345678).');
        return;
    }

    const cart = CartStorage.get();
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi thanh toán.');
        window.location.href = 'cart.html';
        return;
    }

    // 2. Gom dữ liệu gửi đi
    const orderData = {
        customer: { fullName, email, phone, address },
        items: cart,
        total: calculateTotalTemp(cart) // Giả định bạn có hàm tính tổng tiền
    };

    // Khóa nút submit để tránh user click nhiều lần (Double Submit)
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';

    // 3. Gọi hàm xử lý đơn hàng (Async/Await)
    submitData(orderData, submitBtn);
}

/**
 * Tách riêng logic Async/Await để code sạch sẽ hơn
 */
async function submitData(orderData, submitBtn) {
    try {
        const response = await processOrder(orderData);
        
        // Thành công: Xóa giỏ hàng và chuyển hướng
        alert(`${response.message} Mã đơn: ${response.orderId}`);
        CartStorage.clear();
        window.location.href = 'thank-you.html'; // Chuyển hướng sang trang cảm ơn

    } catch (error) {
        // Thất bại: Báo lỗi và mở khóa nút submit
        alert(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Hoàn tất đặt hàng';
        console.error('Checkout Error:', error);
    }
}

// Hàm hỗ trợ tính tổng tiền tạm thời (nếu cần gửi kèm)
function calculateTotalTemp(cart) {
    // Trong thực tế, Backend sẽ tự tính lại tổng tiền dựa trên ID sản phẩm để bảo mật
    return cart.reduce((total, item) => total + (item.quantity * 100000), 0); 
}

// Lắng nghe sự kiện submit form
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutFormSubmit);
    }
});