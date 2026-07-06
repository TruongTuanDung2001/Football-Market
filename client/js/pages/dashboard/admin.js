//import
import { initProductAdd, initProductEdit, showProduct, removeProductById, searchProduct} from './products.js';
//

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser || currentUser.role !== 'admin') {
    alert('Error login !!!');
    // window.location.href = "/client/login.html";
} else {
    // alert('Login success !!!');
}
//
const content = document.querySelector('#content');
async function loadPage(page) {
    const response = await fetch(`/client/dashboard/${page}.html`);
    if (response.ok) {
        const html = await response.text();
        content.innerHTML = html;
    } else {
        console.log('No data content');
    }
};

// local show dashboard page
document.addEventListener('DOMContentLoaded', async () => {
    await loadPage('dashboard');
});

// menu sidebar
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', async function (e) {
        const page = item.dataset.page;
        if (!page) { return; }
        await loadPage(page);
        setActive(item);
        switch (page) {
            case "dashboard":
                setActive(item);
                break;

            case "products":
                initProductAdd();
                setActive(item);
                await showProduct(); // phải dùng await vì bên kia nó phải fetch dữ liệu api xong render ra
                initProductEdit(); //kh cần await
                removeProductById(); //kh kh cần await
                await searchProduct();
                break;

            case "users":
                setActive(item);
                break;

            case "posts":
                setActive(item);
                break;
            default:
                break;
        }
    });
});

// setActive sidebar menu item
function setActive(item) {
    menuItems.forEach(item => {
        item.classList.remove("active");
    });
    item.classList.add("active");
}

// logout click
const logoutAdmin = document.querySelector('.logout');
logoutAdmin.addEventListener('click', function () {
    localStorage.removeItem('currentUser');
    window.location.href = '/client/login.html';
});
