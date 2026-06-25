const bannerImg = document.querySelector('.banner-img');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  bannerImg.style.transform =
    `translateY(${scrollY * .4}px)`;
});