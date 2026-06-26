//
const banner = document.querySelector('.banner');
const bannerImg = document.querySelector('.banner-img');
const categoryImg = document.querySelector('.category-img');

//
window.addEventListener('scroll', () => {
  // const scrollY = window.scrollY; //lấy vị trí của window scroll từ đầu
  const rectBanner = banner.getBoundingClientRect();//lấy vị trí của banner để scroll lun 

  bannerImg.style.transform = `translateY(${-rectBanner.top * .2}px)`;

});

