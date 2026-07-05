//import api.js
import { getApi } from '../../api/api.js';
//
export function initProductAdd() {
    // Show/off modal post product
    console.log("Product loaded");
    const btnAdd = document.querySelector(".btn-add");
    const modalAdd = document.querySelector("#addProductModal");
    const closeModalAdd = document.querySelector("#closeModal");


    btnAdd.addEventListener("click", () => {
        modalAdd.classList.add("show");
        console.log(btnAdd);

    });

    closeModalAdd.addEventListener("click", () => {
        modalAdd.classList.remove("show");
    });



    // Post api
    postProductApi();
}


export function postProductApi() {
    const btnSubmit = document.querySelector('#btn-submit');
    const productForm = document.querySelector('#productForm');
    productForm.addEventListener('submit', async function (e) {
        let productName = document.querySelector('#productName').value.trim();
        let category = document.querySelector('#category').value;
        let quantity = document.querySelector('#quantity').value;
        let price = document.querySelector('#price').value;
        let sale = document.querySelector('#sale').value;
        let image = document.querySelector('#image');
        let description = document.querySelector('#description').value.trim();

        e.preventDefault();
        const file = image.files[0];
        // Validate
        if (
            !productName ||
            !category ||
            !quantity ||
            !price ||
            !sale ||
            !description
            // || !file
        ) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }
        //kiểm tra chọn ảnh chưa
        if (!file) {
            alert("Vui lòng chọn ảnh!");
            return;
        }

        //Post api nè
        const imagePath = `/client/image/${file.name}`;//đường dẫn tệp file trong project để lấy file image
        const newProduct = {
            name: productName,
            price: Number(price),
            sale: Number(sale),
            quantity: Number(sale),
            category: category,
            image: imagePath,
            description: description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        try {
            let response = await fetch(`http://localhost:3000/products`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            }
            );
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                console.log('success');
            } else {
                console.log('false');

            }
        } catch (error) {
            throw new Error(error);
        }
    });
}


export async function showProduct() {
    const dataProduct = await getApi('products');
    const productList = document.querySelector('#product-list');

    console.log("dataproduct nè", dataProduct);

    productList.innerHTML = '';
    console.log(productList);
    dataProduct.forEach(item => {
        productList.innerHTML += `
            <tr>
              <td>
                <img class="product-image" src="${item.image}" />
              </td>

              <td>${item.name}</td>

              <td>${item.category}</td>

              <td>${item.price}$</td>

              <td>${item.sale}</td>

              <td>
                <span class="status in-stock"> In Stock </span>
              </td>
              <td>${item.createdAt}</td>
              <td>
                <div class="action">
                  <button class="view">
                    <i class="fa-solid fa-eye"></i>
                  </button>

                  <button class="edit" data-id="${item.id}">
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button class="delete" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
        `
    });

}

export function editProductApi() {

}

export function initProductEdit() {
    // Show/off modal edit product
    let btnEdit = document.querySelectorAll('.edit');
    let modelEdit = document.querySelector('#editProductModal');
    let closeModalEdit = document.querySelector('#closeEditModal');

    //
    btnEdit.forEach(btn => {
        btn.addEventListener('click', async function (e) {
            modelEdit.classList.add('show');
            //
            let id = btn.dataset.id;
            let product = await getProductById(id);
            modelEdit.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Edit Product</h2>
                        <span id="closeEditModal">&times;</span>
                    </div>

                    <form id="editProductForm">
                        <input type="hidden" id="editProductId" />

                        <input
                        type="text"
                        placeholder="Product Name"
                        id="editProductName" value="${product.name}"
                        />

                        <select id="editCategory">
                            <option value="Shoes">Shoes</option>
                            <option value="Hat">Hat</option>
                            <option value="Jacket">Jacket</option>
                            <option value="Glasses">Glasses</option>
                            <option value="Shirt">Shirt</option>
                        </select>

                        <input
                        type="number"
                        min="0"
                        placeholder="Quantity"
                        id="editQuantity" value="${product.quantity}"
                        />

                        <input type="number" min="0" placeholder="Price" id="editPrice" value="${product.price}" />

                        <input type="number" min="0" placeholder="Sale" id="editSale" value="${product.sale}" />

                        <div class="image-preview">
                        <p>Current Image</p>
                        <img
                            id="editPreviewImage"
                            src="${product.image}"
                            alt="Preview"
                        />
                        </div>

                        <input type="file" id="editImage" />

                        <textarea placeholder="Description" id="editDescription">${product.description}</textarea>

                        <button type="submit">Update Product</button>
                    </form>
                </div>
            `;

            //gán category option
            let productCategory = document.getElementById("editCategory").value = product.category;

            //gán edit image
            let editImage = document.getElementById('editImage'); //input nhập url ảnh mới
            let imagePreview = document.getElementById('editPreviewImage'); // ảnh hiển thị của product
            editImage.addEventListener('change', function () {
                const file = editImage.files[0];
                //đường dẫn image
                const imagePath = `/client/image/${file.name}`;//đường dẫn tệp file trong project để lấy file image
                if (file) {
                    // imagePreview.src = URL.createObjectURL(file);
                    imagePreview.src = imagePath;
                    console.log(imagePreview.src);
                }
            });


            //đóng modal
            closeModalEdit = document.querySelector('#closeEditModal');
            closeModalEdit.addEventListener('click', () => {
                modelEdit.classList.remove('show');
            });
        });
    });


}

export async function getProductById(id) {
    try {
        let response = await fetch(`http://localhost:3000/products/${id}`);

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
}


//handle link image front-end
/*
const file = imageInput.files[0];

const imagePath = `/client/assets/images/${file.name}`;

console.log(imagePath);

//reset from
document.querySelector("#productForm").reset();

//dong model
document.querySelector("#addProductModal").classList.remove("show");

//render lại
renderProducts();
*/