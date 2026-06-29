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
loadPage('dashboard');

