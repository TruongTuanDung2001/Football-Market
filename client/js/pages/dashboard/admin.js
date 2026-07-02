let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if(!currentUser || currentUser.role !== 'admin'){
    alert('Error login !!!');
    // window.location.href = "/client/login.html";
}else{
    // alert('Login success !!!');
}
//
const content = document.querySelector('#content');
async function loadPage(page){
    const response = await fetch(`/client/dashboard/${page}.html`);
    if(response.ok){
        const html = await response.text();
        content.innerHTML = html;
    }else{
        console.log('No data content');
    }
};

// local show dashboard page
document.addEventListener('DOMContentLoaded', () => {
    loadPage('dashboard');
});

// menu sidebar
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', function(e){
        if(item.dataset.page){
            const page = item.dataset.page;
            loadPage(page);
            setActive(item);
        }else{

        }
    });
});

// setActive sidebar menu item
function setActive(item){
    menuItems.forEach(item => {
        item.classList.remove("active");
    });
    item.classList.add("active");
}

// logout click
const logoutAdmin = document.querySelector('.logout');
logoutAdmin.addEventListener('click', function(){
    localStorage.removeItem('currentUser');
    window.location.href = '/client/login.html';
});

