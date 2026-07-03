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

    postProductApi();
}

export function postProductApi() {
    const btnSubmit = document.querySelector('#btn-submit');

    btnSubmit.addEventListener('click', async function (e) {
        let productName = document.querySelector('#productName').value;
        let category = document.querySelector('#category').value;
        let quantity = document.querySelector('#quantity').value;
        let price = document.querySelector('#price').value;
        let sale = document.querySelector('#sale').value;
        let image = document.querySelector('#image');
        let description = document.querySelector('#description').value;

        e.preventDefault();


        const file = image.files[0];
        const imagePath = `/client/assets/images/${file.name}`;
        console.log(productName, category, quantity, price, sale, image.value, file.name, description);
        console.log(imagePath);//đường dẫn tệp file trong project để lấy file image
        //kiểm tra chọn ảnh chưa

        if (!file) {
            alert("Vui lòng chọn ảnh!");
            return;
        }
        //Post api nè
        const newProduct = {
            name: productName,
            price: Number(price),
            sale: Number(sale),
            quantity: Number(sale),
            category: category,
            image: imagePath,
            description: description,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        try {
            let response = await fetch(`http://localhost:3000/products`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            }
            );
            if (response.ok) {
                let data = await response.json();
                console.log(data);
                console.log('success');
            } else {
                console.log('false');

            }
        } catch (error) {
            throw new Error(error);
        }
    });
}

//handle link image front-end
/*
const file = imageInput.files[0];

const imagePath = `/client/assets/images/${file.name}`;

console.log(imagePath);
*/