'use strict';

//navbar 올라가면 투명, 내려오면 색상 출력
const navbar = document.querySelector('#navbar'); //CSS에서 불러오겠다 '#navbar라는 항목을'
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

//navbar에서 메뉴 선택했을때 해당 페이지로 이동하도록 설정
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  //console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return; //link가 null이거나 undefined라면 아무것도 하지마
  }
  console.log(event.target.dataset.link);
  // 스무스하게 이동하겠다
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: 'smooth' });
  scrollIntoView(link);
});

//Home의 'Contact me'버튼을 누르면 Contact페이지로 이동하도록
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  // const scrollTo = document.querySelector('#contact');
  // scrollTo.scrollIntoView({ behavior: 'smooth' });
  scrollIntoView('#contact');
});

//스크롤 내릴 때 Home부분이 점점 투명해지도록
const home = document.querySelector('.home__container'); //배경은 그대로 두고, 안에 있는 콘텐츠만 투명해지도록 home__container로 묶음
const homeHeight = home.getBoundingClientRect().height;
// console.log(homeHeight);
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
  //불투명:1, 투명:0
});

function scrollIntoView(selector) {
  //반복되니까 따로 빼서 함수로 만듦
  //'selector'를 주면 이동할 수 있도록
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
