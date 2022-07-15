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
  navbarMenu.classList.remove('open'); //small screen에서 처음 시작할 때 navbar메뉴 안보이도록
  scrollIntoView(link);
});

//small screen에서 navbar toggle button 작동하도록
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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

//스크롤을 내리면 arrow up버튼이 보여지도록
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    //Home에서 스크롤이 절반 정도 내려오면
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

//arrow up 버튼 누르면 상단으로 올라가도록
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

//Filmography
const filmographyBtnContainer = document.querySelector(
  '.filmography__categories'
);
const contentContainer = document.querySelector('.filmography__contents');
const contents = document.querySelectorAll('.content'); //각각의 필모를 배열로 받아오겠다
filmographyBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // console.log(filter);
  if (filter == null) {
    return;
  }

  //이전에 선택된 아이는 제거하고 새롭게 선택된 아이템 선택
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  contentContainer.classList.add('anim-out'); //애니메이션을 추가하면 css에서 설정할대로 opacity:0(투명)
  setTimeout(() => {
    contents.forEach((content) => {
      // console.log(content.dataset.type);
      if (filter === '*' || filter === content.dataset.type) {
        content.classList.remove('invisible');
      } else {
        content.classList.add('invisible');
      }
    });
    //시간이 지나면 애니메이션이 사라지도록 설정해줘야함
    contentContainer.classList.remove('anim-out'); //opcacity:1
  }, 300);
});

//반복되니까 따로 빼서 함수로 만듦
function scrollIntoView(selector) {
  //'selector'를 주면 이동할 수 있도록
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
