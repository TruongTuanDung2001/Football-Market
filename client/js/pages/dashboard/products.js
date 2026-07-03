//
export function initProduct() {
    console.log("Product loaded");
    const btnAdd = document.querySelector(".btn-add");
    const modal = document.querySelector("#addProductModal");
    const closeModal = document.querySelector("#closeModal");


    btnAdd.addEventListener("click", () => {
        modal.classList.add("show");
        console.log(btnAdd);

    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

//handle link image front-end
/*
    const file = imageInput.files[0];

const imagePath = `/client/assets/images/${file.name}`;

console.log(imagePath);
*/