// 서브 1 메인 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 데이터 셋팅 불러오기
import * as sub1_data from "./sub1_data.js";

//////////////////////////////////// 데이터 코딩 구역 ////////////////////////////////////////

  // 인트로 파트 영역 시작 //
  // 데이터 : sub1_data.clipData
  (() => {
    // 변경 대상 : .trmovie-box
    const clipBox = mFn.qs(".trmovie-box");
  
    // 생성 코드 변수
    let hcode = `<ul class="trintro">`;
  
    sub1_data.clipData.forEach((v) => {
    hcode += `
    <h3>${v.title}</h3>
    <li class="trmovie">
    <iframe src="https://www.youtube.com/embed/${v.mvid01}" autoplay="트레일러" controls=""></iframe>  
    <iframe src="https://www.youtube.com/embed/${v.mvid02}" autoplay="트레일러" controls=""></iframe>  
    <h4>
    ${v.subintro}</h4>
    </h4>
    </li>
    `;
  }); ///////// forEach

  hcode += `</ul>`;

  // 화면 출력하기
  clipBox.innerHTML = hcode;

})(); /////////////// 인트로 파트 영역 끝

/// 디자인 파트
(() => {
  const deBox = mFn.qs(".design-box")
  let gcode = `<ul class="deintro">`;
  sub1_data.designData.forEach((v) => {
    gcode += `
    <h3>${v.title01}</h3>
    <li class="demovie">
    <iframe src="https://www.youtube.com/embed/${v.mvid01}" autoplay="트레일러" controls=""></iframe>  
    <iframe src="https://www.youtube.com/embed/${v.mvid02}" autoplay="트레일러" controls=""></iframe>  
    <h4>
    ${v.subintro}</h4>
    </h4>
    </li>
    `;
  });
  gcode += `</ul>`;
  deBox.innerHTML = gcode;
})(); /////////////// 디자인 파트 영역 끝


////// 캐릭터 이미지 박스
// 대상 .cha-box
const chgrid = mFn.qs(".cha-box");

// 이미지 넣기
for (let i = 1; i <= 8; i++) {
  chgrid.innerHTML += `
      <div>
        <img src="./IMG/img1/cha0${i}.jpg" alt="캐릭터">
        <h3>${sub1_data.chaData[i - 1].chaname}</h3>
        <p>${sub1_data.chaData[i - 1].chaintro}</p>
      </div>
      `;

} //////// for /////////
//////////////캐릭터 이미지 박스 코딩 끝


///////////////// 컨셉 영역 코딩 시작 //////////////////////////////////
// 1. 3번 스테이지에 ul>li 구조 이미지 넣기
// 대상 : .de-chpart
const slidech = mFn.qs('.de-chpart');

// 2. 코드 변수에 태그 만들어 넣기
let chcode = "<ul>";

for(let i = 1; i<=18; i++){

    chcode += `
        <li>
            <img src="./IMG/img1/ched${i}.jpg" alt="cha-concept" />
        </li>
    `;

} /////////////// for ///////////

chcode += "</ul>";

// 3. 코드 출력하기
slidech.innerHTML = chcode;

// [2] 3번째 영역에 도달한 경우 ul 박스 가로 방향 이동 하기

// 1. 대상 선정 하기
// 이벤트 대상 : window
// 이벤트 종류 : scroll

const tpg = mFn.qs('.tpg');
// 움직일 대상 : .de-chpart>ul
const target = mFn.qs('.de-chpart>ul');

/* console.log(tpg,target); */

// 2. 이벤트 설정하기
mFn.addEvt(window, 'scroll', moveSlide);

// 3. 함수 만들기
// (1) 슬라이드 이동 함수
function moveSlide(){

    // 1. 스티키 부모 박스 바운딩 top값
    let bTop = mFn.getBCR(tpg);
    /* console.log('바운딩top:', bTop); */

    // 2. 이동할 타겟 박스 left 값으로 부모 바운딩 top값 넣기
    // (1) 바운딩 top값이 0 초과일때 처음 위치 재설정하기
    if(bTop > 0) {
        target.style.left = '0px';
    }
    // (2) 바운딩 top값이 0 이하 -3000 이상일때 부모 바운딩 top값으로 위치 이동하기

    else if(bTop <= 0 && bTop >= -3000) {
        target.style.left = bTop + 'px';
    }

    // (3) 마지막 한계 이후에는 한계값으로 셋팅
    else{
        target.style.left = '-3000px';
    }

} /////////////// moveSlide



