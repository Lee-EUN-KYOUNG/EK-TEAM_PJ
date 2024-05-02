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






