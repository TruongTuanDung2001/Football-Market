//import api.js
import { getApi } from '../../api/api.js';

//
let allProducts = await getApi('products');
let resultFilterProducts = [...allProducts];
//
let allCategories = await getApi('categories');


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
        let categoryId = document.querySelector('#category').selectedOptions[0].dataset.id;
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
            categoryId: Number(categoryId),
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
        let categoryId = document.querySelector('#editCategory').selectedOptions[0].dataset.id;
        try {
            const newProduct = {
                id: id,
                name: editName,
                price: Number(editPrice),
                sale: Number(editSale),
                quantity: Number(editQuantity),
                categoryId: Number(categoryId),
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

            //
            renderCategories();

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

        resultFilterProducts = resultSearch;
        currentPage = 1; //quay về trang 1
        paginationProduct();
        // renderProduct(resultSearch);
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
            resultFilterProducts = allProducts;
            paginationProduct();
            // renderProduct(allProducts);
            return;
        }
        resultFilterProducts = filterProduct;
        currentPage = 1;
        paginationProduct();
        // renderProduct(filterProduct);
    });

}

// Filter product by quantity product
export function filterStatus() {
    //quantity === 0: sold out => < 20: low stock => > 20: in stock
    const filterStatus = document.getElementById('filterStatus');
    let resultFilter;
    filterStatus.addEventListener('change', function (e) {
        let keyword = filterStatus.value.toLowerCase();
        //
        currentPage = 1;
        if (keyword === 'sold out') {
            resultFilter = allProducts.filter(product => {
                return product.quantity === 0;
            })

            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
        }
        else if (keyword === 'low stock') {
            resultFilter = allProducts.filter(product => {
                return product.quantity < 20 && product.quantity > 0;
            });

            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
        }
        else if (keyword === 'in stock') {
            resultFilter = allProducts.filter(product => {
                return product.quantity > 20;
            })

            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
        }
        else {
            resultFilterProducts = allProducts;
            paginationProduct();
            // renderProduct(allProducts);
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
            currentPage = 1;
            resultFilterProducts = allProducts;
            paginationProduct();
            // renderProduct(allProducts);
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
            currentPage = 1;
            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
        }
        else if (keyCategory !== 'all categories' && keyStatus === 'all status') {
            let resultFilter = allProducts.filter(product => {
                return product.category.toLowerCase().includes(keyCategory);
            })
            currentPage = 1;
            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
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
            currentPage = 1;
            resultFilterProducts = resultFilter;
            paginationProduct();
            // renderProduct(resultFilter);
        }
    });
}

// Pagination
let currentPage = 1;
let itemsPerPage = 3;

// Get product for current page
export function paginationProduct() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const productPerpage = resultFilterProducts.slice(start, end);
    console.log(productPerpage);
    //
    renderProduct(productPerpage);
    renderButtonPagination();

    //
    initProductEdit(); //kh cần await
    removeProductById(); //kh kh cần await
}

function renderButtonPagination() {
    const totalPages = Math.ceil(resultFilterProducts.length / itemsPerPage);
    /**
    Math.ceil() → làm tròn lên (dùng để tính số trang) 1.2 thành 2
    Math.floor() → làm tròn xuống 1.9 thành 1
    Math.round() → làm tròn theo quy tắc 0.5
     */
    let html = "";
    for (let i = 1; i <= totalPages; i++) {
        const active = currentPage == i ? "show" : ""
        html += `
            <button class="btn-page ${active}" data-page=${i}>${i}</button>
        `
    }

    document.querySelector('#paginationProduct').innerHTML = html;

    document.querySelectorAll('.btn-page').forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (this.dataset.page) {
                currentPage = this.dataset.page; //currentPage thay đổi thì cái phân trang khi chạy cũng đổi vì dữ liệu page đổi theo currentPage
                paginationProduct();
            }
        });
    })


}

//
export function renderCategories() {
    const filterCategory = document.getElementById('filterCategory');
    let html = '';

    if (!allCategories) return;
    allCategories.forEach(cate => {
        html += `
        <option data-id="${cate.id}">${cate.name}</option> 
        `
    });

    //
    let addCategories = document.getElementById('category');
    let editCategories = document.getElementById('editCategory');
    //
    filterCategory.innerHTML = '<option>All Categories</option> ' + html;
    addCategories.innerHTML = html;
    editCategories.innerHTML = html;
    console.log(editCategories);
    
} 
