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


