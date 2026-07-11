import { getApi } from "./api/api.js"
//
const banner = document.querySelector('.banner');
const bannerImg = document.querySelector('.banner-img');

//
window.addEventListener('scroll', () => {
    // const scrollY = window.scrollY; //lấy vị trí của window scroll từ đầu
    const rectBanner = banner.getBoundingClientRect();//lấy vị trí của banner để scroll lun 
    bannerImg.style.transform = `translateY(${-rectBanner.top * .2}px)`;

});

// btn-detail to detail page (not yet data-id).
const btnDetail = document.querySelectorAll('.btn-detail');
btnDetail.forEach(btn => {
    btn.addEventListener('click', function () {
        window.location.href = 'detail.html';
    });
});



//infor user in header index.html page
let inforUser = document.querySelector('.infor_user');
let fullName = document.querySelector('.fullName');
let logout = document.querySelector('.logout');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser);


if (currentUser) {
    fullName.textContent = currentUser.fullName;
    logout.textContent = 'Logout';
} else {
    logout.textContent = 'Login';
}

inforUser.addEventListener('click', function (e) {
    if (getComputedStyle(logout).display === 'none') { // tại sao không dùng logout.style.display để kiểm tra lun: vì lúc đầu nó sẽ kh biết display là gì và nó là "", nên bấm 2 lần mới chạy, lần 1 là lấy display của logout trong css, lần sau mới ktra và chạy, nên dùng cái ở trên để lấy lần đầu lun
        logout.style.display = 'block';
    } else {
        logout.style.display = 'none';
    }
    //

});

logout.addEventListener('click', function (e) {
    if (logout.textContent === 'Logout') {
        localStorage.removeItem('currentUser');
        window.location.href = '/client/index.html'
    } else {
        window.location.href = '/client/login.html'
    }
});


//get all categories
let apiCategory = await getApi('categories');
let apiProduct = await getApi('products');

//
console.log(apiCategory);
console.log(apiProduct);

//render category
function renderCategory() {
    let categoriesList = document.getElementById('categories_list');
    let html = '';
    //
    if (!apiCategory) return;
    //
    apiCategory.forEach(category => {
        html += `
            <div class="categories-item">
                <img
                class="category-img"
                src="${category.image}"
                alt=""
                />
                <div class="name">${category.name}</div>
                <button class="btn-categories" data-category="${category.id}">
                SHOP NOW
                </button>
            </div>
        `;
    })
    categoriesList.innerHTML = html;
}

renderCategory();



//render featured
function renderFeatured(){
    let featuredList = document.getElementById('feature_list');
    let html = '';
    
    //lấy product mỗi category 1 cái
    const result = [];
    if(!apiProduct) return
    if(!apiCategory) return

    apiCategory.forEach(c => {
        const product = apiProduct.find(p =>(
            p.categoryId == c.id
        ))
        if(product){
            result.push(product);
        }
    });

    //render
    result.forEach(rs => {
        html += `
            <div class="product-item">
                <div class="img">
                <img src="${rs.image}" alt="" />
                </div>
                <div class="name">${rs.name}</div>
                <div class="price">${rs.price}$</div>
                <button class="btn-detail" data-id="">Detail</button>
                <div class="product-item_actions">
                <button class="btn-buy">Buy <i></i></button>
                <button class="btn-addCart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
                </div>
            </div>
        `
    });
    featuredList.innerHTML = html;   
}

renderFeatured();
