// Get api
// user
async function getApi(name) {
    try {
        let response = await fetch(`http://localhost:3000/${name}`);
        if (response.ok) {
            let data = await response.json();
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
}
getApi('users');

//function login
let btnLogin = document.querySelector('#btn-login');
let inputAccountLogin = document.querySelector('.inputAccountLogin');
let inputPasswordLogin = document.querySelector('.inputPasswordLogin');
btnLogin.addEventListener('click', async function (e) {
    e.preventDefault();
    let userName = inputAccountLogin.value;
    let password = inputPasswordLogin.value;
    //
    let apiUser = await getApi('users');
    let check = apiUser.find(u => u.username === userName
        && u.password === password
    )

    if (check) {
        if (check.role === 'admin') {
            localStorage.setItem('currentUser', JSON.stringify(check));
            window.location.href = "/client/dashboard/admin.html";
        } else if (check.role === 'user') {
            localStorage.setItem('currentUser', JSON.stringify(check));
            window.location.href = "/client/index.html";
        }
    } else {
        console.log('fails');
    }

});


