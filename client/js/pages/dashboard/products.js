//import api.js
import { getApi } from '../../api/api.js';

//
let allProducts = await getApi('products');


// Show modal add product in window
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

// Post new product
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

// Render all product in product dashboard page
export function showProduct() {
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';
    allProducts.forEach(item => {
        productList.innerHTML += `
            <tr>
              <td>
                <img class="product-image" src="${item.image}" />
              </td>

              <td>${item.name}</td>

              <td>${item.category}</td>

              <td>${item.price}$</td>

              <td>${item.sale}</td>

              <td>${item.quantity}</td>

              <td>
                <span class="status in-stock">${item.quantity === 0 ? 'Sold Out' : item.quantity < 20 ? 'Low Stock' : 'In Stock'}</span>
              </td>
              <td>${item.createdAt}</td>
              <td>
                <div class="action">

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

// Edit product by id product
export function editProductApi(id) {
    let btnEdit = document.getElementById('btn-edit');
    btnEdit.addEventListener('click', async function (e) {
        e.preventDefault();
        //
        let editName = document.getElementById('editProductName').value;
        let editCategory = document.getElementById('editCategory').value;
        let editQuantity = document.getElementById('editQuantity').value;
        let editPrice = document.getElementById('editPrice').value;
        let editSale = document.getElementById('editSale').value;
        let editPreviewImage = document.getElementById('editPreviewImage').getAttribute('src');
        let editDescription = document.getElementById('editDescription').value;
        try {
            const newProduct = {
                id: id,
                name: editName,
                price: Number(editPrice),
                sale: Number(editSale),
                quantity: Number(editQuantity),
                category: editCategory,
                image: editPreviewImage,
                description: editDescription,
                updatedAt: new Date().toISOString()
            }
            let response = await fetch(`http://localhost:3000/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            })
            if (response.ok) {
                let data = await response.json();
                console.log(data);
            }
        } catch (error) {
            throw new Error(error);
        }
    });
}

// Show modal edit in window, get infor data product by id in modal
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
            let createAt = product.createdAt;
            //
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

                        <button type="submit" id="btn-edit">Update Product</button>
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
                }
            });

            //edit nè
            editProductApi(id);

            //đóng modal
            closeModalEdit = document.querySelector('#closeEditModal');
            closeModalEdit.addEventListener('click', () => {
                modelEdit.classList.remove('show');
            });
        });
    });


}

// Get product by id
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

// Remove product by id
export function removeProductById() {
    const btnDelete = document.querySelectorAll('.delete');
    btnDelete.forEach(btn => {
        btn.addEventListener('click', async function (e) {
            const id = btn.dataset.id;
            const result = confirm("Do you want to delete your product");
            if (id) {
                if (result) {
                    try {
                        let response = await fetch(`http://localhost:3000/products/${id}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            let data = await response.json();
                            console.log('Delete success');
                            console.log(data);
                        }
                    } catch (error) {
                        throw new Error(error);
                    }
                }
            }
        });
    })
}

// Search product
export async function searchProduct() {
    let inputSearch = document.getElementById('searchProducts');
    inputSearch.addEventListener('input', async function (e) {
        let keyword = this.value.toLowerCase();
        let resultSearch = allProducts.filter(product => {
            return product.name.toLowerCase().includes(keyword);
        });
        renderProduct(resultSearch);
    });
}

// Render product after search and filter product
function renderProduct(allProduct) {
    const productList = document.querySelector('#product-list');

    productList.innerHTML = '';
    allProduct.forEach(item => {
        productList.innerHTML += `
            <tr>
              <td>
                <img class="product-image" src="${item.image}" />
              </td>

              <td>${item.name}</td>

              <td>${item.category}</td>

              <td>${item.price}$</td>

              <td>${item.sale}</td>

              <td>${item.quantity}</td>

              <td>
                <span class="status in-stock">${item.quantity === 0 ? 'Sold Out' : item.quantity < 20 ? 'Low Stock' : 'In Stock'}</span>
              </td>
              <td>${item.createdAt}</td>
              <td>
                <div class="action">

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

// Filter product by category product
export function filterCategory() {
    const filterCategory = document.getElementById('filterCategory');

    filterCategory.addEventListener('change', function (e) {
        let keyword = filterCategory.value.toLowerCase();

        let filterProduct = allProducts.filter(product => {
            return product.category.toLowerCase().includes(keyword);
        })
        if (keyword === 'all categories') {
            renderProduct(allProducts);
            return;
        }
        renderProduct(filterProduct);
    });

}

// Filter product by quantity product
export function filterStatus() {
    //quantity === 0: sold out => < 20: low stock => > 20: in stock
    const filterStatus = document.getElementById('filterStatus');
    let resultFilter;
    filterStatus.addEventListener('change', function (e) {
        let keyword = filterStatus.value.toLowerCase();
        console.log(keyword);

        if (keyword === 'sold out') {
            resultFilter = allProducts.filter(product => {
                return product.quantity === 0;
            })
            renderProduct(resultFilter);
        }
        else if (keyword === 'low stock') {
            resultFilter = allProducts.filter(product => {
                return product.quantity < 20 && product.quantity > 0;
            });
            renderProduct(resultFilter);
        }
        else if (keyword === 'in stock') {
            resultFilter = allProducts.filter(product => {
                return product.quantity > 20;
            })
            renderProduct(resultFilter);
        }
        else {
            renderProduct(allProducts);
        }
    });
}

// Filter product form category / status by button filterAll
export function filterAll() {
    const filterCategory = document.getElementById('filterCategory');
    const filterStatus = document.getElementById('filterStatus');
    const btnFilterAll = document.getElementById('filterAll');
    //
    btnFilterAll.addEventListener('click', function (e) {
        let keyCategory = filterCategory.value.toLowerCase();
        let keyStatus = filterStatus.value.toLowerCase();

        //
        if (keyCategory === 'all categories' && keyStatus === 'all status') {
            renderProduct(allProducts);
        }
        else if (keyCategory === 'all categories' && keyStatus !== 'all status') {
            let resultFilter = allProducts.filter(product => {
                if (keyStatus === 'sold out') {
                    return product.quantity === 0;
                }
                else if (keyStatus === 'low stock') {
                    return product.quantity < 20 && product.quantity > 0;
                }
                else if (keyStatus === 'in stock') {
                    return product.quantity > 20;
                }
            })
            renderProduct(resultFilter);
        }
        else if (keyCategory !== 'all categories' && keyStatus === 'all status') {
            let resultFilter = allProducts.filter(product => {
                return product.category.toLowerCase().includes(keyCategory);
            })
            renderProduct(resultFilter);
        }
        else if (keyCategory !== 'all categories' && keyStatus !== 'all status') {
            let resultFilter = allProducts.filter(product => {
                return product.category.toLowerCase().includes(keyCategory);
            });

            resultFilter = resultFilter.filter(product => {
                if (keyStatus === 'sold out') {
                    return product.quantity === 0;
                }
                else if (keyStatus === 'low stock') {
                    return product.quantity < 20 && product.quantity > 0;
                }
                else if (keyStatus === 'in stock') {
                    return product.quantity > 20;
                }
            })
            renderProduct(resultFilter);
        }
    });
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

icon eye
                  <button class="view">
                    <i class="fa-solid fa-eye"></i>
                  </button>
*/