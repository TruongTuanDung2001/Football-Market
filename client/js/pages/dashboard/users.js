import { getApi } from "../../api/api.js";

const apiUsers = await getApi('users')

export async function getAllUsers() {
    if (await apiUsers) {
        renderListUser();
        initUser();
        postUser();
        removeUserById();
        editUserById();
        changeStatusUser();
    }
}

function renderListUser() {
    let usersList = document.getElementById('users-list');
    let html = '';
    //
    let users = apiUsers.filter(user => user.role == "user");
    console.log(users);

    users.forEach(user => {
        html += `
            <tr>
              <td>${user.id}</td>

              <td>${user.username}</td>
              
              <td>${user.password}</td>

              <td>${user.fullName}</td>

              <td>${user.email}</td>
              
              <td>${user.phone}</td>

              <td>
                <span class="role admin"> ${user.role} </span>
              </td>

              <td>${user.createdAt}</td>

              <td>
                <span class="status active"> ${user.status}</span>
              </td>

              <td>
                <div class="action">

                  <button class="edit" data-id=${user.id}>
                    <i class="fa-solid fa-pen"></i>
                  </button>

                  <button class="ban" data-id=${user.id}>
                    <i class="fa-solid fa-user-slash"></i>
                  </button>

                  <button class="delete" data-id=${user.id}>
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
    let editFromModal = document.getElementById('editProductForm');
    let html = '';
    btnEdit.forEach(btn => {
        btn.addEventListener('click', async () => {
            let idUser = btn.dataset.id;
            let user = await getUserById(idUser);
            //
            if (user) {
                html = `
                <input type="text" placeholder="UserName" id="userNameEdit" required minlength="4" maxlength="20" value = "${user.username}" />    
    
                <input type="text" placeholder="User Password" id="userPasswordEdit" required minlength="6" value = "${user.password}" />
    
                <input type="text" placeholder="User Full Name" id="userFullNameEdit" required value = "${user.fullName}" />
    
                <input type="email" placeholder="User Email" id="userEmailEdit" required value = "${user.email}" />
                
                <input type="number" placeholder="User Phone" id="userPhoneEdit" required pattern="[0-9]{10}" minlength="10" min="0" value = "${user.phone}" />
    
                <select id="statusUserEdit">
                    <option ${user.status == 'Active' ? "selected" : ""}>Active</option>
                    <option ${user.status == 'Banned' ? "selected" : ""}>Banned</option>
                </select>
    
                <button type="submit" data-id="${user.id}" id="btn-edit">Edit User</button>
                `;

            }
            editFromModal.innerHTML = html;
            modalEditUser.classList.add('show');
        });
    })

    closeEditUser.addEventListener('click', () => {
        modalEditUser.classList.remove('show');
    });
}

function postUser() {
    const btnSubmitAdd = document.getElementById('btn-submit');
    const fromAdd = document.getElementById('productForm');
    fromAdd.addEventListener('submit', async function () {
        const userName = document.getElementById('userName').value;
        const password = document.getElementById('userPassword').value;
        const fullNameUser = document.getElementById('userFullName').value;
        const emailUser = document.getElementById('userEmail').value;
        const phoneUser = document.getElementById('userPhone').value;
        const statusUser = document.getElementById('statusUser').value;
        let newUser = {
            username: userName,
            password: password,
            role: "user",
            fullName: fullNameUser,
            email: emailUser,
            phone: phoneUser,
            createdAt: new Date().toISOString(),
            status: statusUser,
        }
        try {
            let response = await fetch(`http://localhost:3000/users`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                }
            );
            if (response) {
                alert("Add user success !!!");
            }

        } catch (error) {
            throw new Error(error);
        }
    })

}

function removeUserById() {
    const btnDelete = document.querySelectorAll('.delete');
    btnDelete.forEach(btn => {
        btn.addEventListener('click', async function (e) {
            try {
                let idUser = this.dataset.id;
                let result = confirm("Do you want delete user ?");
                if (result) {
                    let response = await fetch(`http://localhost:3000/users/${idUser}`,
                        {
                            method: "delete"
                        }
                    );
                    if (response.ok) {
                        alert("Deleted user success !!!");
                    }
                }

            } catch (error) {
                throw new Error(error);
            }
        });
    })

}

async function getUserById(idUser) {
    try {
        let response = await fetch(`http://localhost:3000/users/${idUser}`
        );
        if (response.ok) {
            let data = await response.json();
            return data;
        }
    } catch (error) {
        throw new Error(error)
    }
}

function editUserById() {
    let editFromModal = document.getElementById('editProductForm');
    editFromModal.addEventListener('submit', async function (e) {
        e.preventDefault();
        const userName = document.getElementById('userNameEdit').value;
        const password = document.getElementById('userPasswordEdit').value;
        const fullNameUser = document.getElementById('userFullNameEdit').value;
        const emailUser = document.getElementById('userEmailEdit').value;
        const phoneUser = document.getElementById('userPhoneEdit').value;
        const statusUser = document.getElementById('statusUserEdit').value;
        //
        const idUser = document.getElementById('btn-edit').dataset.id;
        let editUser = {
            username: userName,
            password: password,
            role: "user",
            fullName: fullNameUser,
            email: emailUser,
            phone: phoneUser,
            createdAt: new Date().toISOString(),
            status: statusUser,
        }        

        try {
            
            let response = await fetch(`http://localhost:3000/users/${idUser}`, 
                {
                    method: 'PATCH', 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(editUser)
                }
            )
            if(response.ok){
                alert('Edit user success !!!');
            }
        } catch (error) {
            throw new Error(error);
        }
    });
}

function changeStatusUser(){
    let btnBan = document.querySelectorAll('.ban');
    btnBan.forEach(btn => {
        btn.addEventListener('click', async function(e){
            let idUser = btn.dataset.id;
            let user = await getUserById(idUser);

            if(!user) return; 
            //
            let changeStatus = {
                status: user.status === "Active" ? "Banned" : "Active"
            }
            
            //
            let response = await fetch(`http://localhost:3000/users/${idUser}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(changeStatus)
            });
            if(response.ok){
                alert("Change status user success !!!")
            }
        });
    })
}