const products = [
    {
        id: 1,
        name: "Laptop Gaming ASUS ROG",
        category: "laptop",
        price: 20000000,
        img: "images/hinh1.jpg",
        desc: "Laptop gaming mạnh mẽ ",
        isFlashSale: true,
        variants: ["RTX 3050 | 8GB", "RTX 4050 | 16GB", "RTX 4060 | 32GB"],
        colors: ["Graphite Black", "Eclipse Gray"]
    },
    {
        id: 2,
        name: "iPhone 17 Pro Max 256GB",
        category: "Điện thoại",
        price: 25000000,
        img: "images/hinh2.jpg",
        desc: "Siêu phẩm Apple với chip xử lý mới nhất.",
        isFlashSale: true,
        variants: ["256GB", "512GB", "1TB"],
        colors: ["Titan Tự Nhiên", "Titan Sa Mạc", "Titan Trắng", "Titan Đen"]
    },
    {
        id: 3,
        name: "Tai nghe Sony WH-1000XM5",
        category: "Âm thanh",
        price: 6500000,
        img: "images/hinh3.jpg",
        desc: "Chống ồn chủ động đỉnh cao.",
        isFlashSale: false,
        variants: ["Tiêu chuẩn"],
        colors: ["Đen", "Bạc", "Xanh Dương"]
    },
    {
        id: 4,
        name: "Chuột Gaming Logitech G Pro",
        category: "Phụ kiện",
        price: 2500000,
        img: "images/hinh4.jpg",
        desc: "Siêu nhẹ, cảm biến HERO 25K.",
        isFlashSale: false,
        colors: ["Đen", "Trắng", "Hồng"]
    },
    {
        id: 5,
        name: "Macbook Pro M3 14 inch",
        category: "laptop",
        price: 39990000,
        img: "images/hinh5.jpg",
        desc: "Hiệu năng cực đỉnh cho đồ họa và lập trình.",
        isFlashSale: false,
        variants: ["8GB - 512GB", "16GB - 512GB", "16GB - 1TB"],
        colors: ["Space Grey", "Silver"]
    },
    {
        id: 6,
        name: "Samsung Galaxy S24 Ultra",
        category: "Điện thoại",
        price: 29990000,
        img: "images/hinh6.jpg",
        desc: "Camera 200MP, hỗ trợ AI thông minh.",
        isFlashSale: true,
        variants: ["256GB", "512GB", "1TB"],
        colors: ["Xám Titan", "Đen Titan", "Tím Titan", "Vàng Titan"]
    },
    {
        id: 7,
        name: "Bàn phím cơ Akko 3068B",
        category: "Phụ kiện",
        price: 1850000,
        img: "images/hinh7.jpg",
        desc: "Kết nối 3 chế độ, hotswap linh hoạt.",
        isFlashSale: false,
        variants: ["Blue Switch", "Orange Switch", "Pink Switch"],
        colors: ["Black & Gold", "White & Cyan"]
    },
    {
        id: 8,
        name: "Máy ảnh Canon EOS R50",
        category: "Phụ kiện",
        price: 18990000,
        img: "images/hinh8.jpg",
        desc: "Lấy nét cực nhanh, quay phim 4K.",
        isFlashSale: false,
        variants: ["Body", "Kit 18-45mm"],
        colors: ["Đen", "Trắng"]
    },
    {
        id: 9,
        name: "AirPods 4",
        category: "Âm thanh",
        price: 3490000,
        img: "images/hinh9.jpg",
        desc: "Âm thanh không gian cá nhân hóa.",
        isFlashSale: true,
        variants: ["Bản tiêu chuẩn", "Bản chống ồn ANC"],
        colors: ["Trắng"]
    },
    {
        id: 10,
        name: "Thẻ nhớ MicroSD 128GB",
        category: "Phụ kiện",
        price: 450000,
        img: "images/hinh10.jpg",
        desc: "Tốc độ đọc nhanh, bền bỉ.",
        isFlashSale: false,
        variants: ["64GB", "128GB", "256GB"]
    },
    {
        id: 11,
        name: "Gimbal DJI RS 3 Mini",
        category: "Phụ kiện",
        price: 6990000,
        img: "images/hinh11.jpg",
        desc: "Chống rung chuyên nghiệp cho máy ảnh.",
        isFlashSale: true,
        variants: ["Tiêu chuẩn", "Combo chuyên nghiệp"],
        colors: ["Đen"]
    },
    { 
        id: 12, 
        name: "Loa Marshall Stanmore III", 
        category: "Âm thanh", 
        price: 9290000, 
        img: "images/hinh12.jpg", 
        desc: "Âm thanh sống động, thiết kế cổ điển.",
        isFlashSale: false,
        colors: ["Đen", "Kem", "Nâu"]
    },
    { 
        id: 13, 
        name: "Apple Watch Series 9", 
        category: "phone", 
        price: 10490000, 
        img: "images/hinh13.jpg", 
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
        img: "images/hinh14.jpg", 
        desc: "Cỗ máy chiến game mạnh mẽ nhất tầm giá.",
        isFlashSale: false,
        variants: ["Core i5 | 16GB", "Core i7 | 32GB"],
        colors: ["White RGB", "Black Edition"]
    },
    { 
        id: 15, 
        name: "Máy lọc không khí Xiaomi 4", 
        category: "Phụ kiện", 
        price: 3290000, 
        img: "images/hinh15.jpg", 
        desc: "Lọc bụi mịn, mang lại không khí trong lành.",
        isFlashSale: false,
        variants: ["Lite", "Standard", "Pro"],
        colors: ["Trắng"]
    },
    { 
        id: 16, 
        name: "Máy đọc sách Kindle PPW5", 
        category: "Phụ kiện", 
        price: 3850000, 
        img: "images/hinh16.jpg", 
        desc: "Màn hình e-ink không mỏi mắt, pin cực lâu.",
        isFlashSale: true,
        variants: ["8GB", "16GB", "32GB (Signature)"],
        colors: ["Đen", "Xanh Diệp Lục"]
    },
    { 
        id: 17, 
        name: "iPad Air 11 inch M4 Wifi 128GB  ", 
        category: "tablet", 
        price: 16980000, 
        img: "images/m4.png", 
        desc: "Màn hình e-ink không mỏi mắt, pin cực lâu.",
        isFlashSale: false,
        variants: [ "128GB"],
        colors: ["Đen", "Xám"]
    },
    {
        id: 18, 
        name: "iPad Pro chip M5 11 inch Wifi 256GB", 
        category: "tablet", 
        price: 28250000, 
        img: "images/m5.png", 
        desc: "Màn hình Ultra Retina XDR.",
        isFlashSale: false,
        variants: [ "256GB"],
        colors: ["Đen", "Bạc"]
    }

];
