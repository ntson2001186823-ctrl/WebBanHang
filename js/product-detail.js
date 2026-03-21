const id = localStorage.getItem("productId");

const product = products.find(p => p.id == id);

const div = document.getElementById("detail");

if(product){
    div.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.img}" width="300">
        <p>Giá: ${product.price.toLocaleString()}đ</p>
        <p>${product.desc}</p>
        <a href="products.html">← Quay lại</a>
    `;
}else{
    div.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
}
