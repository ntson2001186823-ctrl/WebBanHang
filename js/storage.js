window.cartSystem = (() => {
    const CART_KEY = 'smart_study_hub_cart';

    // Lấy dữ liệu giỏ hàng từ LocalStorage
    const getCart = () => {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch {
            return [];
        }
    };

    // Lưu dữ liệu xuống LocalStorage
    const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

    return {
        getCart,
        
        // Thêm sản phẩm mới hoặc tăng số lượng nếu đã có
        addItem: (product) => {
            const cart = getCart();
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            saveCart(cart);
            alert('Đã thêm sản phẩm vào giỏ hàng thành công!');
        },

        // Cập nhật số lượng (+ / - / nhập số)
        updateQuantity: (id, newQty) => {
            const cart = getCart();
            const item = cart.find(item => item.id === id);
            if (item) {
                item.quantity = newQty;
                saveCart(cart);
            }
        },

        // Xóa một sản phẩm khỏi giỏ
        removeItem: (id) => {
            saveCart(getCart().filter(item => item.id !== id));
        },

        // Xóa toàn bộ giỏ (Dùng khi thanh toán xong)
        clearCart: () => localStorage.removeItem(CART_KEY),

        // Đếm tổng số lượng sản phẩm (Dùng cho Badge icon giỏ hàng)
        getTotalCount: () => getCart().reduce((total, item) => total + item.quantity, 0)
    };
})();