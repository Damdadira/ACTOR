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
  selectNavItem(target);
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

//navbar에서 해당 섹션으로 이동(활성화)할 때 그 부분을 활성화시키려면?(밑줄 옮겨가는거)

//1.모든 섹션 요소들을 가져옴
//모든 아이디를 배열(문자열)로 저장
const sectionIds = ['#home', '#profile', '#filmography', '#award', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
// console.log(sections);
// console.log(navItems);

//2.IntersectionObserver를 이용해서 모든 섹션들을 관찰
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observeCallback = (entries, observer) => {
  entries.forEach((entry) => {
    // console.log(entry.target);
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      //entry가 진입하지 않거나(밖으로 나가거나) 현재 entry의 intersectionRatio가 무조건 0 이상인 경우
      const index = sectionIds.indexOf(`#${entry.target.id}`); //indexOf(특정 문자의 위치 찾기)
      // console.log(index, entry.target.id);

      //스크롤이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1; //바로 뒤에 따라오는 index를 선택하겠다
      } else {
        //페이지가 내려가는 경우
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observeCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

//3.보여지는 섹션에 해댱하는 메뉴 아이템을 활성화
window.addEventListener('wheel', () => {
  //'wheel'->사용자가 스스로 스크롤을 할때 이벤트가 발생
  if (window.scrollY === 0) {
    //스크롤이 제일 위에 있다면 'Home'을 선택해라
    selectedNavIndex = 0;
  } else if (
    //scrollY와 window창의 innerHeight값을 더한값이 document.body.clientHeight값과
    //정확하게 일치하지 않는 경우가 있기 때문에 더한값을 반올림 해줘야 함
    //ex->(scrollY+innerHeignt = 1269.2) != (document.body.clientHeight = 1270)
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    //스크롤이 제일 밑에 도달했다면 'Contact'를 선택해라
    selectedNavIndex = navItems.length - 1; //배열의 가장 마지막 인덱스를 선택해라
  }
  selectNavItem(navItems[selectedNavIndex]);
});
