Roadmap tiếp theo
Football Market

client
│
├── js
│
├── api
│     api.js
│     product.api.js
│     user.api.js
│
├── utils
│     format.js
│     storage.js
│     auth.js
│
├── pages
│
│     home.js
│     detail.js
│     cart.js
│     login.js
│
│     dashboard
│          admin.js
│          dashboard.js
│          products.js
│          users.js
│          posts.js
│
└── app.js
Giai đoạn 1
Kết nối API

Làm file

api/api.js

Chỉ để gọi API.

Ví dụ

const BASE_URL = "http://localhost:3000";

async function request(url, options = {}) {
    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return response.json();
}

Sau này tất cả đều dùng

request(...)

không fetch trực tiếp nữa.

Giai đoạn 2
Product API
product.api.js
getProducts()

getProductById(id)

createProduct()

updateProduct()

deleteProduct()

Ví dụ

export function getProducts(){

    return request("/products");

}
Giai đoạn 3

User API

login()

register()

getUsers()

deleteUser()

updateUser()
Giai đoạn 4

Authentication

utils/auth.js

Ví dụ

login()

logout()

getCurrentUser()

isAdmin()

isLogin()

Ví dụ

localStorage

sẽ lưu

{
    "id":2,
    "username":"admin01",
    "role":"admin"
}
Giai đoạn 5

Trang Home

Lúc này mới bắt đầu render.

Home

↓

getProducts()

↓

renderProducts()
Giai đoạn 6

Detail

/detail.html?id=3

↓

const id=new URLSearchParams(location.search).get("id");

↓

getProductById(id)

↓

render

Giai đoạn 7

Login

login()

↓

Lưu

localStorage

↓

Nếu

role==="admin"

↓

/dashboard/admin.html

Ngược lại

↓

index.html
Giai đoạn 8

Cart

Render

user.cart

↓

Lấy từng

productId

↓

GET /products/:id

↓

Render

Giai đoạn 9

Admin

Dashboard

Hiển thị

Total Products

Total Users

Total Posts

Products

GET

POST

PUT

DELETE

Users

GET

DELETE

PATCH

Posts

GET

PATCH status

DELETE
Thứ tự học Fetch API

Ông sẽ dùng gần như đủ các method:

GET      ⭐⭐⭐⭐⭐

POST     ⭐⭐⭐⭐⭐

PUT      ⭐⭐⭐⭐⭐

PATCH    ⭐⭐⭐⭐☆

DELETE   ⭐⭐⭐⭐⭐
Mục tiêu cuối cùng
Football Market

✔ Đăng ký

✔ Đăng nhập

✔ Hiển thị sản phẩm

✔ Xem chi tiết

✔ Thêm giỏ hàng

✔ Render giỏ hàng

✔ CRUD Product

✔ CRUD User

✔ CRUD Post

✔ Logout
Đây là điều mình thích nhất ở project của ông

Ông không đi copy template mà tự xây dựng từng phần từ đầu:

Tự thiết kế cấu trúc thư mục.
Tự làm giao diện.
Giờ mới đến phần xử lý dữ liệu.

Cách học này giúp ông hiểu rõ từng lớp của ứng dụng. Sau khi hoàn thành phiên bản HTML/CSS/JS thuần, nếu chuyển sang React thì ông sẽ chỉ thay cách render giao diện, còn tư duy về API, CRUD, state và luồng dữ liệu gần như giữ nguyên.

👉 Mình đề xuất bắt đầu bằng trang Login trước, vì nó là "cửa vào" của toàn bộ hệ thống. Làm xong Login và phân quyền admin/user thì các trang còn lại sẽ chạy đúng luồng rất tự nhiên.