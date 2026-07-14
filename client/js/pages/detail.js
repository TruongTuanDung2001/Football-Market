//
import { getApi } from "../../js/api/api.js"
// get id product
const params = new URLSearchParams(window.location.search);
// id product 
const id = params.get("id");
//get api
let apiCategory = await getApi('categories');
let apiProduct = await getApi('products');

console.log(id);
console.log(apiProduct);

const product = apiProduct.filter(p => p.id == id);
console.log(product);

//get product in detail content
function showProductDetail() {
    const detailProduct = document.querySelector('.detail-content');
    if (!product) return;
    let html = '';
    product.forEach(p => {
        html = `
        <div class="detail-image">
            <img src="${p.image} " alt="" />
        </div>
        <div class="detail-info">
            <div class="name">Name: ${p.name}</div>
            <div class="price">Price: ${p.price}$</div>
            <div class="category">Category: ${p.category}</div>
            <div class="description">
            ${p.description}
            </div>
            <div class="actions">
            <button class="btn-buy">Buy</button>
            <button class="btn-addCart">
                <i class="fa-solid fa-cart-shopping"></i>
            </button>
            </div>
            <!-- sử lý chỗ này nếu là giày ? / áo ? / áo khoác ? / nón và kính thì kh cần -->
            <!-- trước mắt thì để trống -->
            <div class="side"></div>
        </div>
    `;
    })

    detailProduct.innerHTML = html;
}

showProductDetail();
