// File: js/data.js
const products = [
    {
        id: 1,
        name: "Laptop Gaming ASUS ROG",
        category: "laptop",
        price: 20000000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner2.png?raw=true",
        desc: "Chính hãng VN/A, cấu hình mạnh mẽ cho game thủ.",
        isFlashSale: true,
        variants: ["RTX 3050 | 8GB", "RTX 4050 | 16GB", "RTX 4060 | 32GB"],
        colors: ["Graphite Black", "Eclipse Gray"]
    },
    {
        id: 2,
        name: "iPhone 17 Pro Max 256GB",
        category: "phone",
        price: 25000000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner3.png?raw=true",
        desc: "Siêu phẩm Apple với chip xử lý mới nhất.",
        isFlashSale: true,
        variants: ["256GB", "512GB", "1TB"],
        colors: ["Titan Tự Nhiên", "Titan Sa Mạc", "Titan Trắng", "Titan Đen"]
    },
    {
        id: 3,
        name: "Tai nghe Sony WH-1000XM5",
        category: "audio",
        price: 6500000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/headphone.png?raw=true",
        desc: "Chống ồn chủ động đỉnh cao.",
        isFlashSale: false,
        variants: ["Tiêu chuẩn"],
        colors: ["Đen", "Bạc", "Xanh Dương"]
    },
    {
        id: 4,
        name: "Chuột Gaming Logitech G Pro",
        category: "accessory",
        price: 2500000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/mouse.png?raw=true",
        desc: "Siêu nhẹ, cảm biến HERO 25K.",
        isFlashSale: false,
        colors: ["Đen", "Trắng", "Hồng"]
    },
    {
        id: 5,
        name: "Macbook Pro M3 14 inch",
        category: "laptop",
        price: 39990000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner2.png?raw=true",
        desc: "Hiệu năng cực đỉnh cho đồ họa và lập trình.",
        isFlashSale: false,
        variants: ["8GB - 512GB", "16GB - 512GB", "16GB - 1TB"],
        colors: ["Space Grey", "Silver"]
    },
    {
        id: 6,
        name: "Samsung Galaxy S24 Ultra",
        category: "phone",
        price: 29990000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner3.png?raw=true",
        desc: "Camera 200MP, hỗ trợ AI thông minh.",
        isFlashSale: true,
        variants: ["256GB", "512GB", "1TB"],
        colors: ["Xám Titan", "Đen Titan", "Tím Titan", "Vàng Titan"]
    },
    {
        id: 7,
        name: "Bàn phím cơ Akko 3068B",
        category: "accessory",
        price: 1850000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/mouse.png?raw=true",
        desc: "Kết nối 3 chế độ, hotswap linh hoạt.",
        isFlashSale: false,
        variants: ["Blue Switch", "Orange Switch", "Pink Switch"],
        colors: ["Black & Gold", "White & Cyan"]
    },
    {
        id: 8,
        name: "Máy ảnh Canon EOS R50",
        category: "accessory",
        price: 18990000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner2.png?raw=true",
        desc: "Lấy nét cực nhanh, quay phim 4K.",
        isFlashSale: false,
        variants: ["Body", "Kit 18-45mm"],
        colors: ["Đen", "Trắng"]
    },
    {
        id: 9,
        name: "AirPods 4",
        category: "audio",
        price: 3490000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/headphone.png?raw=true",
        desc: "Âm thanh không gian cá nhân hóa.",
        isFlashSale: true,
        variants: ["Bản tiêu chuẩn", "Bản chống ồn ANC"],
        colors: ["Trắng"]
    },
    {
        id: 10,
        name: "Thẻ nhớ MicroSD 128GB",
        category: "accessory",
        price: 450000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/mouse.png?raw=true",
        desc: "Tốc độ đọc nhanh, bền bỉ.",
        isFlashSale: false,
        variants: ["64GB", "128GB", "256GB"]
    },
    {
        id: 11,
        name: "Gimbal DJI RS 3 Mini",
        category: "accessory",
        price: 6990000,
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner2.png?raw=true",
        desc: "Chống rung chuyên nghiệp cho máy ảnh.",
        isFlashSale: true,
        variants: ["Tiêu chuẩn", "Combo chuyên nghiệp"],
        colors: ["Đen"]
    },
    // --- 5 SẢN PHẨM MỚI BỔ SUNG ---
    { 
        id: 12, 
        name: "Loa Marshall Stanmore III", 
        category: "audio", 
        price: 9290000, 
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/headphone.png?raw=true", 
        desc: "Âm thanh sống động, thiết kế cổ điển.",
        isFlashSale: false,
        colors: ["Đen", "Kem", "Nâu"]
    },
    { 
        id: 13, 
        name: "Apple Watch Series 9", 
        category: "phone", 
        price: 10490000, 
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner3.png?raw=true", 
        desc: "Theo dõi sức khỏe và thông báo thông minh.",
        isFlashSale: true,
        variants: ["41mm", "45mm"],
        colors: ["Hồng", "Midnight", "Starlight", "Bạc"]
    },
    { 
        id: 14, 
        name: "PC Gaming TechPower v1", 
        category: "laptop", 
        price: 15990000, 
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner2.png?raw=true", 
        desc: "Cỗ máy chiến game mạnh mẽ nhất tầm giá.",
        isFlashSale: false,
        variants: ["Core i5 | 16GB", "Core i7 | 32GB"],
        colors: ["White RGB", "Black Edition"]
    },
    { 
        id: 15, 
        name: "Máy lọc không khí Xiaomi 4", 
        category: "accessory", 
        price: 3290000, 
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/mouse.png?raw=true", 
        desc: "Lọc bụi mịn, mang lại không khí trong lành.",
        isFlashSale: false,
        variants: ["Lite", "Standard", "Pro"],
        colors: ["Trắng"]
    },
    { 
        id: 16, 
        name: "Máy đọc sách Kindle PPW5", 
        category: "accessory", 
        price: 3850000, 
        img: "https://github.com/ntson2001186823-ctrl/WebBanHang/blob/main/images/banner3.png?raw=true", 
        desc: "Màn hình e-ink không mỏi mắt, pin cực lâu.",
        isFlashSale: true,
        variants: ["8GB", "16GB", "32GB (Signature)"],
        colors: ["Đen", "Xanh Diệp Lục"]
    }
];
