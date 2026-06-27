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
