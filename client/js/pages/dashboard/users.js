import { getApi } from "../../api/api.js";

const apiUsers = await getApi('users')

export async function getAllUsers() {
    if (await apiUsers) {
        renderListUser();
        initUser();
    }
}

function renderListUser() {
    let usersList = document.getElementById('users-list');
    let html = '';
    //
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
    //
    usersList.innerHTML = html;
}

function initUser() {
    //modal add user
    let btnAdd = document.querySelector('.btn-add');
    let modalAddUser = document.getElementById('addUsersModal');
    let closeModel = document.getElementById('closeModal');
    btnAdd.addEventListener('click', function () {
        modalAddUser.classList.add('show');
    });

    closeModel.addEventListener('click', () => {
        modalAddUser.classList.remove('show');
    });

    //model edit user
    let btnEdit = document.querySelectorAll('.edit');
    let modalEditUser = document.getElementById('editProductModal');
    let closeEditUser = document.getElementById('closeEditModal');

    btnEdit.forEach(btn => {
        btn.addEventListener('click', () => {
            modalEditUser.classList.add('show');
        });
    })

    closeEditUser.addEventListener('click', () => {
        modalEditUser.classList.remove('show');
    });
}