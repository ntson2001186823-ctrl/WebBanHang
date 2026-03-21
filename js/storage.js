/**
 * CART MANAGER - Tầng quản lý dữ liệu giỏ hàng (Singleton Pattern)
 * Đảm bảo toàn bộ dự án TechStore chỉ sử dụng duy nhất một cổng giao tiếp với LocalStorage.
 */
class CartManager {
    constructor() {
        // Đảm bảo chỉ có 1 instance (Singleton)
        if (CartManager.instance) {
            return CartManager.instance;
        }
        
        this.storageKey = 'techstore_cart';
        CartManager.instance = this;

        // Tự động đồng bộ UI lần đầu khi tải trang
        this.updateCartIcon();
    }

    // ==========================================
    // CÁC PHƯƠNG THỨC LÕI (CORE METHODS)
    // ==========================================

    /**
     * Lấy dữ liệu từ kho - Luôn trả về mảng để tránh lỗi vòng lặp
     * @returns {Array} Mảng chứa các sản phẩm
     */
    getCart() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Lỗi khi đọc dữ liệu giỏ hàng:", error);
            return []; // Fallback an toàn nếu LocalStorage bị hỏng định dạng
        }
    }

    /**
     * Lưu dữ liệu & Tự động đồng bộ UI
     * @param {Array} cart - Mảng sản phẩm cần lưu
     */
    saveCart(cart) {
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
        this.updateCartIcon(); // Auto-Sync Trigger
    }

    /**
     * Thêm sản phẩm vào giỏ hàng (Dành cho Lợi và Trường gọi ở index.html)
     * @param {Object} product - {id, name, price, img}
     */
    addItem(product) {
        // Validation: Chặn đứng dữ liệu rác (VD: Thiếu ID hoặc giá tiền âm)
        if (!product || !product.id || isNaN(product.price) || product.price <= 0) {
            console.error("CartManager: Dữ liệu sản phẩm không hợp lệ!", product);
            return;
        }

        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Chuẩn hóa dữ liệu trước khi đẩy vào kho
            cart.push({
                id: product.id,
                name: String(product.name).trim(),
                price: Number(product.price),
                img: product.img || 'images/default-product.png',
                quantity: 1
            });
        }

        this.saveCart(cart);
        this.showToast(product.name);
    }

    /**
     * Cập nhật số lượng (Dùng cho nút + / - ở trang cart.html)
     * @param {Number|String} id - ID sản phẩm
     * @param {Number} newQty - Số lượng mới
     */
    updateQuantity(id, newQty) {
        const qty = Number(newQty);
        if (isNaN(qty) || qty < 1) return; // Khóa chặn: Không cho số lượng tụt xuống dưới 1

        const cart = this.getCart();
        const item = cart.find(item => item.id === id);
        
        if (item) {
            item.quantity = qty;
            this.saveCart(cart);
        }
    }

    /**
     * Xóa 1 sản phẩm khỏi giỏ (Dùng cho nút Xóa ở trang cart.html)
     * @param {Number|String} id 
     */
    removeItem(id) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== id);
        this.saveCart(cart);
    }

    /**
     * Dọn sạch kho (Sau khi khách bấm Thanh toán thành công)
     */
    clearCart() {
        localStorage.removeItem(this.storageKey);
        this.updateCartIcon();
    }

    // ==========================================
    // TÍNH NĂNG THÔNG MINH (SMART FEATURES)
    // ==========================================

    /**
     * Auto-Sync UI: Tự động đếm tổng số lượng và cập nhật lên Header
     */
    updateCartIcon() {
        const cart = this.getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.innerHTML = `🛒 Giỏ hàng (${totalItems})`;
        }
    }

    /**
     * Hiển thị thông báo (Toast) dạng pop-up góc màn hình
     */
    showToast(productName) {
        const toast = document.createElement('div');
        toast.className = 'alert-success'; 
        toast.innerText = `Đã thêm ${productName} vào giỏ hàng!`;
        document.body.appendChild(toast);

        // Tự hủy sau 2.5 giây
        setTimeout(() => toast.remove(), 2500);
    }
}

// Khởi tạo một phiên bản duy nhất cho toàn bộ hệ thống
const cartSystem = new CartManager();

// Gắn biến này vào Window để thẻ HTML bên ngoài có thể gọi được
// Hướng dẫn cho đồng đội: Bấm nút mua thì gọi window.cartSystem.addItem(...)
window.cartSystem = cartSystem;