//
const banner = document.querySelector('.banner');
const bannerImg = document.querySelector('.banner-img');

//
window.addEventListener('scroll', () => {
  // const scrollY = window.scrollY; //lấy vị trí của window scroll từ đầu
  const rectBanner = banner.getBoundingClientRect();//lấy vị trí của banner để scroll lun 
  bannerImg.style.transform = `translateY(${-rectBanner.top * .2}px)`;

});

// btn-detail to detail page (not yet data-id).
const btnDetail = document.querySelectorAll('.btn-detail');
btnDetail.forEach(btn => {
    btn.addEventListener('click', function(){
        window.location.href = 'detail.html';
    });
});



//infor user in header index.html page
let inforUser = document.querySelector('.infor_user');
let fullName = document.querySelector('.fullName');
let logout = document.querySelector('.logout');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser);


if(currentUser){
    fullName.textContent = currentUser.fullName;
    logout.textContent = 'Logout';
}else{
    logout.textContent = 'Login';
}

inforUser.addEventListener('click', function(e){
    if(getComputedStyle(logout).display === 'none'){ // tại sao không dùng logout.style.display để kiểm tra lun: vì lúc đầu nó sẽ kh biết display là gì và nó là "", nên bấm 2 lần mới chạy, lần 1 là lấy display của logout trong css, lần sau mới ktra và chạy, nên dùng cái ở trên để lấy lần đầu lun
        logout.style.display = 'block';
    }else{
        logout.style.display = 'none';
    }
    //

});

logout.addEventListener('click', function(e){
    if(logout.textContent === 'Logout'){
        localStorage.removeItem('currentUser');
        window.location.href = '/client/index.html'
    }else{
        window.location.href = '/client/login.html'
    }
});


