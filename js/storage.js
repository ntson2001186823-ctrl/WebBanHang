window.cartSystem = (() => {
    const CART_KEY = 'techstore_cart';

    const getCart = () => {
        try {
            const data = localStorage.getItem(CART_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    };

    const updateBadge = () => {
        const badge = document.querySelector('.cart-icon-wrapper .badge');
        if (badge) {
            const cart = getCart();
            const total = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.innerText = total;
        }
    };

    const saveCart = (cart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateBadge();
    };

    document.addEventListener('DOMContentLoaded', updateBadge);

    return {
        getCart,
        
        addItem: (product) => {
            const cart = getCart();
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ 
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    img: product.img, 
                    category: product.category || 'Tech',
                    quantity: 1 
                });
            }
            saveCart(cart);
        },

        updateQuantity: (id, newQty) => {
            const cart = getCart();
            const item = cart.find(item => item.id === id);
            if (item) {
                if (newQty <= 0) {
                    saveCart(cart.filter(i => i.id !== id));
                } else {
                    item.quantity = newQty;
                    saveCart(cart);
                }
            }
        },

        removeItem: (id) => {
            const newCart = getCart().filter(item => item.id !== id);
            saveCart(newCart);
        },

        clearCart: () => {
            localStorage.removeItem(CART_KEY);
            updateBadge();
        },

        getTotalCount: () => getCart().reduce((total, item) => total + item.quantity, 0)
    };
})();