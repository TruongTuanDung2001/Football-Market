import { getApi } from "../../api/api.js";

const apiUsers = await getApi('users')

export async function getAllUsers() {
    console.log(apiUsers);
    renderListUser();
    initProduct();
}

async function renderListUser() {
    let usersList = document.getElementById('users-list');
    let html = '';
    if (await apiUsers) {
        let users = apiUsers.filter(user => user.role == "user");
        users.forEach(user => {
            html += `
            <tr>
              <td>${user.fullName}</td>

              <td>${user.email}</td>

              <td>
                <span class="role admin"> ${user.role} </span>
              </td>

              <td>${user.createdAt}</td>

              <td>
                <span class="status active"> ${user.status}</span>
              </td>

              <td>
                <div class="action">

                  <button class="edit">
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button class="ban">
                    <i class="fa-solid fa-user-slash"></i>
                  </button>

                  <button class="delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
            `
        });
    }
    usersList.innerHTML = html;
}

function initProduct(){
    let btnAdd = document.querySelector('.btn-add');
    let modelAddUser = document.getElementById('addUsersModal');
    let closeModel = document.getElementById('closeModal');
    btnAdd.addEventListener('click', function(){
        modelAddUser.classList.add('show');
        console.log();
        
    });

    closeModel.addEventListener('click', ()=>{
    modelAddUser.classList.remove('show'); 
    });
}