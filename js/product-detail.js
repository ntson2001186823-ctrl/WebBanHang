const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// giả sử data.js có mảng products
const product = products.find(p => p.id == id);

const detailDiv = document.getElementById("detail");

if (product) {
    detailDiv.innerHTML = `
        <div class="product-detail">
            <img src="${product.img}">
            <h2>${product.name}</h2>
            <p class="price">${product.price.toLocaleString()}đ</p>
            <button onclick="addToCart()">Thêm vào giỏ</button>
        </div>
    `;
} else {
    detailDiv.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
}

function addToCart() {
    alert("Đã thêm vào giỏ!");
}
